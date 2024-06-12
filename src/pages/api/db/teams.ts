import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../_base"


export interface Team {
    id: number
    name: string
    overall: number
    players: number[]
    gm: string
    coach: string
    wins: number
    loss: number
}


/*
    Query:
        id?:<number> returns a specific team

    returns all teams
*/
async function GET(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect() 
    if (req.query.id) {
        const team = await prisma.teams.findUnique({
            where: {
                team_id: parseInt(req.query.id as string)
            }
        })

        await prisma.$disconnect()
        return res.status(200).json({result: team})
    }

    const all_teams = await prisma.teams.findMany()

    res.status(200).json({result: all_teams})
    await prisma.$disconnect()
}

/*
    Body:
        name:<string>
        overall:<number>
        players:<number[]>
        gm:<string>
        coach:<string>
        wins:<number>
        loss:<number>

    Creates a team with <id>
*/
async function POST(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect()
    if (!req.body.name) {
        await prisma.$disconnect()
        return res.status(400).json({
            message: "name is required",
            details: "request body error"
        })
    }

    const exists = await prisma.teams.findFirst({
        where: {
            name: req.body.name
        }
    })

    if (exists) {
        await prisma.$disconnect()
        return res.status(400).json({
            message: "team already exists (consider using PATCH)"
        })
    }

    if (
        req.body.overall === null
        || req.body.players === null
        || req.body.gm === null
        || req.body.coach === null
        || req.body.wins === null
        || req.body.loss === null
    ) {
        await prisma.$disconnect()
        return res.status(400).json({
            message: "missing one (or more) attributes",
            details: "request body error"
        })
    }

    const new_stat = await prisma.teams.create({
        data: req.body
    })

    res.status(200).json({result: new_stat})
    await prisma.$disconnect()
}

/*
    Query:
        id?:<number> specific team to delete

    Deletes every team
*/
async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect()
    if (req.query.id) {
        const team = await prisma.teams.delete({
            where: {
                team_id: parseInt(req.query.id as string)
            }
        })

        await prisma.$disconnect()
        return res.status(400).json({message: `team ${req.query.id} deleted`})
    }

    await prisma.teams.deleteMany()
    res.status(200).json({
        message: "all teams deleted"
    })
    await prisma.$disconnect()
}

/*
    Query:
        id:<number> team to be updated

    Body:
        name?:<string>
        overall?:<number>
        players?:<number[]>
        gm?:<string>
        coach?:<string>
        wins?:<number>
        loss?:<number>
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
        const updated = await prisma.teams.update({
            where: {
                team_id: parseInt(req.query.id as string)
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

