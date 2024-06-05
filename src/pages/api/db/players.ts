import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { prisma } from "../_base"
import { NextApiRequest, NextApiResponse } from "next"

export interface Player {
    id: number
    name: string
    team: number
    position: "PG" | "SF" | "SG" | "PF" | "C"
    overall: number
    height: number
    weight: number
    wingspan: number
    vertical: number
    age: number
    jersey: number
    draft_round: number
    draft_pick: number
    fg_file: string
    bg_file: string
}

/*
    Query:
        id?:<number> returns specific player profile

    returns all player profiles
*/
async function GET(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect()
    if (req.query.id) {
        const user = await prisma.players.findUnique({
            where: {
                id: parseInt(req.query.id as string)
            }
        })

        await prisma.$disconnect()
        return res.status(200).json({result: user})
    }

    const all_players = await prisma.players.findMany()
    res.status(200).json({result: all_players})
    await prisma.$disconnect()
}

/*
    Query:
        _existence?:<bool>

    Body:
        id:<number>
        name:<string>
        team:<number>
        position:<string>
        overall:<number>
        height:<number>
        weight:<number>
        wingspan:<number>
        vertical:<number>
        age:<number>
        jersey:<number>
        draft_round:<number>
        draft_pick:<number>
        bg_file:<blob>
        fg_file:<blob>

    Creates player profile for user <id>
*/
async function POST(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect()
    if (req.query._existence) {
        const user = await prisma.players.findFirst({
            where: req.body
        })

        await prisma.$disconnect()
        return res.status(200).json({result: user})
    }

    if (!req.body.id) {
        await prisma.$disconnect()
        return res.status(400).json({
            message: "id is required",
            details: "request body error"
        })
    }

    const exists = await prisma.players.findFirst({
        where: {
            id: req.body.id
        }
    })

    if (exists) {
        await prisma.$disconnect()
        return res.status(400).json({message: "user player profile already exists (consider using PATCH)"})
    }

    if (
        req.body.name === null
        || req.body.team === null
        || req.body.position === null
        || req.body.overall === null
        || req.body.height === null
        || req.body.weight === null
        || req.body.wingspan === null
        || req.body.vertical === null
        || req.body.age === null
        || req.body.jersey === null
        || req.body.draft_round === null
        || req.body.draft_pick === null
        || req.body.fg_file === null
        || req.body.bg_file === null
    ) {
        await prisma.$disconnect()
        return res.status(400).json({
            message: "missing one (or more) attributes",
            details: "request body error"
        })
    }

    const jersey = await prisma.players.findFirst({
        where: {
            jersey: req.body.jersey
        }
    })

    if (jersey) {
        await prisma.$disconnect()
        return res.status(400).json({
            message: "jersey number taken",
            details: "request body error"
        })
    }

    const new_player = await prisma.players.create({
        data: req.body
    })

    res.status(200).json({result: new_player})
    await prisma.$disconnect()
}

/*
    Query:
        id?:<number> specific player profile to delete

    Deletes every player profile if id not provided
*/
async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect()
    if (!req.query.id) {
        await prisma.players.deleteMany()
        await prisma.$disconnect()
        return res.status(200).json({message: `all user player profiles deleted`})
    }

    await prisma.players.delete({
        where: {
            id: parseInt(req.query.id as string)
        }
    })

    res.status(200).json({message: `user ${req.query.id as string} player profile deleted`})
    await prisma.$disconnect()
}

/*
    Query:
        id:<number> user to be updated

    Body:
        name?:<string>
        team?:<number>
        position?:<string>
        overall?:<number>
        height?:<number>
        weight?:<number>
        wingspan?:<number>
        vertical?:<number>
        age?:<number>
        jersey?:<number>
        draft_round?:<number>
        draft_pick?:<number>
        fg_file?:<blob>
        bg_file?:<blob>
*/
async function PATCH(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect()
    if (!req.query.id) {
        await prisma.$disconnect()
        return res.status(400).json({
            message: "id required",
            details: "query error"
        })
    }

    if (req.body) {
        const updated = await prisma.players.update({
            where: {
                id: parseInt(req.query.id as string)
            },
            data: req.body
        })
        await prisma.$disconnect()
        return res.status(200).json({result: updated})
    }

    res.status(400).json({
        message: "new values required",
        details: "request body error"
    })
    await prisma.$disconnect()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") {
        await GET(req, res)
    } else if (req.method == "POST") {
        await POST(req, res)
    } else if (req.method == "DELETE") {
        await DELETE(req, res)
    } else if (req.method == "PATCH") {
        await PATCH(req, res)
    }
}

export function player(
    idx: number, 
    first_name: string, 
    last_name: string,
    team: string,
    position: string,
    overall: string,
    height: string,
    weight: string,
    wingspan: string,
    vertical: string,
    age: string,
    number: string,
    fg_file: string,
    bg_file: string,
    defending: number,
    finishing: number,
    iq: number,
    passing: number,
    speed: number,
    rebounding: number,
    shooting: number,
    handling: number
) {
    return {
        index: idx,
        first_name: first_name,
        last_name: last_name,
        team: team,
        position: position,
        overall: overall,
        height: height,
        weight: weight,
        wingspan: wingspan,
        vertical: vertical,
        age: age,
        number: number,
        fg_file: fg_file,
        bg_file: bg_file,
        defending: defending,
        finishing: finishing,
        iq: iq,
        passing: passing,
        speed: speed,
        rebounding: rebounding,
        shooting: shooting,
        handling: handling
    }
}