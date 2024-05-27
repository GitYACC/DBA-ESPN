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

        res.status(200).json({result: user})
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

        res.status(200).json({result: user})
    }

    if (!req.body.id) {
        res.status(400).json({message: "request body attribute 'id' is required"})
    }

    const exists = await prisma.players.findFirst({
        where: {
            id: req.body.id
        }
    })

    if (exists) {
        res.status(400).json({message: "user player profile already exists (consider using PATCH)"})
    }

    if (!(
        req.body.name
        && req.body.team
        && req.body.position
        && req.body.overall
        && req.body.height
        && req.body.weight
        && req.body.wingspan
        && req.body.vertical
        && req.body.age
        && req.body.jersey
        && req.body.draft_round
        && req.body.draft_pick
        && req.body.fg_file
        && req.body.bg_file
    )) {
        res.status(400).json({
            message: "missing one (or more) request body attributes"
        })
    }

    const new_player = await prisma.players.create({
        data: {
            id: req.body.id,
            name: req.body.name,
            team: req.body.team,
            position: req.body.position,
            overall: req.body.overall,
            height: req.body.height,
            weight: req.body.weight,
            wingspan: req.body.wingspan,
            vertical: req.body.vertical,
            age: req.body.age,
            jersey: req.body.jersey,
            draft_round: req.body.draft_round,
            draft_pick: req.body.draft_pick,
            fg_file: req.body.fg_file,
            bg_file: req.body.bg_file
        }
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
        res.status(200).json({message: `all user player profiles deleted`})
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
        res.status(400).json({message: "query attribute 'id' required"})
    }

    if (req.body) {
        const updated = await prisma.players.update({
            where: {
                id: parseInt(req.query.id as string)
            },
            data: req.body
        })
        res.status(200).json({result: updated})
    }

    res.status(400).json({message: "request body with new values required"})
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
    fgphoto: string,
    bgphoto: string,
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
        fgphoto: fgphoto,
        bgphoto: bgphoto,
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