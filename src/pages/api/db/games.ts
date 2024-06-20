import { prisma } from "../_base"
import { NextApiRequest, NextApiResponse } from "next"

export interface Game {
    game_id: number
    winner: number
    loser: number
    win_score: number
    loss_score: number
    game: number
    year: string
}

/*
    Query:
        year?<string> returns all games in the year
        id?:<number> returns specific game regardless of year

    returns all games
*/
async function GET(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect()

    if (req.query.id) {
        const game = await prisma.games.findUnique({
            where: {
                game_id: parseInt(req.query.id as string)
            }
        })
        await prisma.$disconnect()
        return res.status(200).json({result: game})
    }

    if (!req.query.year) {
        await prisma.$disconnect()
        return res.status(400).json({
            message: "year is required",
            details: "query error"
        })
    }

    const all_games = await prisma.games.findMany()
    res.status(200).json({result: all_games})
    await prisma.$disconnect()
}

/*
    Body:
        winner:<number>
        loser:<number>
        win_score:<number>
        loss_score:<number>
        game:<number>
        year:<string>

    Creates overall record for player <id>
*/
async function POST(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect()
    if (!req.body.year) {
        await prisma.$disconnect()
        return res.status(400).json({
            message: "year is required",
            details: "request body error"
        })
    }

    const exists = await prisma.games.findFirst({
        where: {
            game: req.body.game,
            year: req.body.year
        }
    })

    if (exists) {
        await prisma.$disconnect()
        return res.status(400).json({message: "game record in this year already exists (consider using PATCH)"})
    }

    if (
        req.body.winner === null
        || req.body.loser === null
        || req.body.win_score === null
        || req.body.loss_score === null
    ) {
        await prisma.$disconnect()
        return res.status(400).json({
            message: "missing one (or more) attributes",
            details: "request body error"
        })
    }

    const new_game = await prisma.games.create({
        data: req.body
    })

    res.status(200).json({result: new_game})
    await prisma.$disconnect()
}

/*
    Query:
        game?:<number> specific game to delete
        year:<string> specific year to delete

    Deletes every game of the year if game not provided
*/
async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect()

    if (!req.query.year) {
        await prisma.$disconnect()
        return res.status(400).json({
            message: `year is required`,
            details: "query error"
        })
    }

    if (req.query.game) {
        await prisma.games.deleteMany({
            where: {
                game: parseInt(req.query.game as string),
                year: req.query.year as string
            }
        })

        await prisma.$disconnect()
        return res.status(200).json({message: `game ${req.query.game} in ${req.query.year} deleted`})
    }

    await prisma.games.deleteMany({
        where: {
            year: req.query.year as string
        }
    })

    res.status(200).json({
        message: `all games in ${req.query.year} deleted`
    })
    await prisma.$disconnect()
}

/*
    Query:
        id:<number> game to be updated

    Body:
        winner:<number>
        loser:<number>
        win_score:<number>
        loss_score:<number>
        game:<number>
        year:<string>
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
        const updated = await prisma.games.update({
            where: {
                game_id: parseInt(req.query.id as string)
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