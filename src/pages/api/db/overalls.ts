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

        res.status(200).json({result: user})
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
        res.status(400).json({message: "request body attribute 'id' is required"})
    }

    const exists = await prisma.overalls.findFirst({
        where: {
            id: req.body.id
        }
    })

    if (exists) {
        res.status(400).json({message: "user overall record already exists (consider using PATCH)"})
    }

    if (!(
        req.body.defending
        && req.body.finishing
        && req.body.iq
        && req.body.passing
        && req.body.speed
        && req.body.rebounding
        && req.body.shooting
        && req.body.handling
    )) {
        res.status(400).json({
            message: "missing one (or more) request body attributes"
        })
    }

    const new_stat = await prisma.overalls.create({
        data: {
            id: req.body.id,
            defending: req.body.defending,
            finishing: req.body.finishing,
            iq: req.body.iq,
            passing: req.body.passing,
            speed: req.body.speed,
            rebounding: req.body.rebounding,
            shooting: req.body.shooting,
            handling: req.body.handling
        }
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
        res.status(200).json({message: `all user overall record deleted`})
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
        res.status(400).json({message: "query attribute 'id' required"})
    }

    if (req.body) {
        const updated = await prisma.overalls.update({
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