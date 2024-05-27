import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { prisma } from "../_base"
import { NextApiRequest, NextApiResponse } from "next"

export interface Stat {
    id: number
    year: string
    points: number
    rebounds: number
    assists: number
    steals: number
    blocks: number
    fga: number
    fgm: number
    fta: number
    ftm: number
}

/*
    Query:
        id?:<number> returns specific user stat sheet
        year<number> returns specific stat year

    returns all stat records from a certain year
*/
async function GET(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect() 
    if (!req.query.year) {
        await prisma.$disconnect()
        return res.status(400).json({message: "query attribute 'year' required"})
    }

    if (req.query.id && req.query.year) {
        const stat = await prisma.stats.findUnique({
            where: {
                id: parseInt(req.query.id as string),
                year: req.query.year as string
            }
        })

        await prisma.$disconnect()
        return res.status(200).json({result: stat})
    }

    const all_stats = await prisma.stats.findMany({
        where: {
            year: req.query.year as string
        }
    })
    res.status(200).json({result: all_stats})
    await prisma.$disconnect()
}

/*
    Body:
        id:<number>
        year:<string>
        points:<number>
        rebounds:<number>
        assists:<number>
        steals:<number>
        blocks:<number>
        fga:<number>
        fgm:<number>
        fta:<number>
        ftm:<number>

    Creates stat record for player <id>
*/
async function POST(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect()
    if (!req.body.id) {
        await prisma.$disconnect()
        return res.status(400).json({message: "request body attribute 'id' is required"})
    }

    if (!req.body.year) {
        await prisma.$disconnect()
        return res.status(400).json({message: "request body attribute 'year' is required"})
    }

    const exists = await prisma.stats.findFirst({
        where: {
            id: req.body.id,
            year: req.body.year
        }
    })

    if (exists) {
        await prisma.$disconnect()
        return res.status(400).json({
            message: "user stat record for this year already exists (consider using PATCH)"
        })
    }

    if (!(
        req.body.points
        && req.body.rebounds
        && req.body.assists
        && req.body.steals
        && req.body.blocks
        && req.body.fga
        && req.body.fgm
        && req.body.fta
        && req.body.ftm
    )) {
        await prisma.$disconnect()
        return res.status(400).json({
            message: "missing one (or more) request body attributes"
        })
    }

    const new_stat = await prisma.stats.create({
        data: {
            id: req.body.id,
            year: req.body.year,
            points: req.body.points,
            rebounds: req.body.rebounds,
            assists: req.body.assists,
            blocks: req.body.blocks,
            steals: req.body.steals,
            fga: req.body.fga,
            fgm: req.body.fgm,
            fta: req.body.fta,
            ftm: req.body.ftm
        }
    })

    res.status(200).json({result: new_stat})
    await prisma.$disconnect()
}

/*
    Query:
        id?:<number> specific user stat record to delete
        year:<string> specific stat year to delete

    Deletes every stat records from the given year if id not provided
*/
async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect()
    if (!req.query.year) {
        await prisma.$disconnect()
        return res.status(400).json({message: "query attribute 'year' required"})
    }

    if (!req.query.id) {
        await prisma.stats.deleteMany({
            where: {
                year: req.query.year as string
            }
        })
        await prisma.$disconnect()
        return res.status(200).json({message: `all '${req.query.year}' user stat records deleted`})
    }

    await prisma.stats.delete({
        where: {
            id: parseInt(req.query.id as string),
            year: req.query.year as string
        }
    })

    res.status(200).json({
        message: `[${req.query.year}] user ${req.query.id as string} stat record deleted`
    })
    await prisma.$disconnect()
}

/*
    Query:
        id:<number> user to be updated
        year:<string>

    Body:
        points?:<number>
        rebounds?:<number>
        assists?:<number>
        steals?:<number>
        blocks?:<number>
        fga?:<number>
        fgm?:<number>
        fta?:<number>
        ftm?:<number>
*/
async function PATCH(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect()
    if (!req.query.id) {
        await prisma.$disconnect()
        return res.status(400).json({message: "query attribute 'id' required"})
    }

    if (!req.query.year) {
        await prisma.$disconnect()
        return res.status(400).json({message: "query attribute 'year' required"})
    }

    if (req.body) {
        const updated = await prisma.stats.update({
            where: {
                id: parseInt(req.query.id as string),
                year: req.query.year as string
            },
            data: req.body
        })
        await prisma.$disconnect()
        return res.status(200).json({result: updated})
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