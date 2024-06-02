import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { Team } from './teams'
import { prisma } from "../_base"
import { NextApiRequest, NextApiResponse } from "next"

export interface Overalls {
    id: number
    defending: number
    finishing: number
    iq: number
    passing: number
    speed: number
    rebounding: number
    shooting: number
    handling: number
}

/*
    Query:
        id?:<number> returns specific user overalls

    returns all overalls
*/
async function GET(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect()
    if (req.query.id) {
        const user = await prisma.overalls.findUnique({
            where: {
                id: parseInt(req.query.id as string)
            }
        })
        await prisma.$disconnect()
        return res.status(200).json({result: user})
    }

    const all_users = await prisma.overalls.findMany()
    res.status(200).json({result: all_users})
    await prisma.$disconnect()
}

/*
    Body:
        id:<number>
        defending:<number>
        finishing:<number>
        iq:<number>
        passing:<number>
        speed:<number>
        rebounding:<number>
        shooting:<number>
        handling:<number>

    Creates overall record for player <id>
*/
async function POST(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect()
    if (!req.body.id) {
        await prisma.$disconnect()
        return res.status(400).json({
            message: "id is required",
            details: "request body error"
        })
    }

    const exists = await prisma.overalls.findFirst({
        where: {
            id: req.body.id
        }
    })

    if (exists) {
        await prisma.$disconnect()
        return res.status(400).json({message: "user overall record already exists (consider using PATCH)"})
    }

    if (
        req.body.defending === null
        || req.body.finishing === null
        || req.body.iq === null
        || req.body.passing === null
        || req.body.speed === null
        || req.body.rebounding === null
        || req.body.shooting === null
        || req.body.handling === null
    ) {
        await prisma.$disconnect()
        return res.status(400).json({
            message: "missing one (or more) attributes",
            details: "request body error"
        })
    }

    const new_stat = await prisma.overalls.create({
        data: req.body
    })

    res.status(200).json({result: new_stat})
    await prisma.$disconnect()
}

/*
    Query:
        id?:<number> specific user overalls to delete

    Deletes every overall record if id not provided
*/
async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect()
    if (!req.query.id) {
        await prisma.overalls.deleteMany()
        await prisma.$disconnect()
        return res.status(200).json({message: `all user overall record deleted`})
    }

    await prisma.overalls.delete({
        where: {
            id: parseInt(req.query.id as string)
        }
    })

    res.status(200).json({message: `user ${req.query.id as string} overall record deleted`})
    await prisma.$disconnect()
}

/*
    Query:
        id:<number> user to be updated

    Body:
        defending?:<number>
        finishing?:<number>
        iq?:<number>
        passing?:<number>
        speed?:<number>
        rebounding?:<number>
        shooting?:<number>
        handling?:<number>
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
        const updated = await prisma.overalls.update({
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