import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { NextApiResponse, NextApiRequest } from 'next'
import { prisma } from "../_base"
import { getToken } from "next-auth/jwt"

export interface User {
    id: number
    username: string
    password: string
    admin: boolean
    name: string
}


/*
    Query:
        id?:<number> returns specific user record

    returns all user records
*/
async function GET(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect()
    if (req.query.id) {
        const user = await prisma.users.findUnique({
            where: {
                id: parseInt(req.query.id as string)
            }
        })

        await prisma.$disconnect()
        return res.status(200).json({result: user})
    }

    const all_users = await prisma.users.findMany()
    res.status(200).json({result: all_users})
    await prisma.$disconnect()
}


/*
    Query:
        _existence?:<bool> debug option

    Body:
        username:<string>
        password:<string>
        name:<string>
        admin?:<bool>
*/
async function POST(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect()
    if (req.query._existence) {
        const user = await prisma.users.findFirst({
            where: req.body
        })

        await prisma.$disconnect()
        return res.status(200).json({result: user})
    }

    if (!req.body.username) {
        await prisma.$disconnect()
        return res.status(400).json({
            message: "username is required", 
            details: "request body error"
        })
    }

    const exists = await prisma.users.findFirst({
        where: {
            username: req.body.username
        }
    })

    if (exists) {
        await prisma.$disconnect()
        return res.status(400).json({
            message: "username already exists",
            details: "request body error"
        })
    }

    if (!req.body.password) {
        await prisma.$disconnect()
        return res.status(400).json({
            message: "password is required",
            details: "request body error"
        })
    }

    if (!req.body.name) {
        await prisma.$disconnect()
        return res.status(400).json({
            message: "name is required",
            details: "request body error"
        })
    }

    const new_user = await prisma.users.create({
        data: {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            admin: req.body.admin ? true : false
        }
    })

    res.status(200).json({result: new_user})
    await prisma.$disconnect()
}

/*
    Query:
        id?:<number> specific user record to delete

    Deletes every records if id not provided
*/
async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect()
    if (!req.query.id) {
        await prisma.users.deleteMany()
        await prisma.$disconnect()
        return res.status(200).json({message: "all users deleted"})
    }

    await prisma.users.delete({
        where: {
            id: parseInt(req.query.id as string)
        }
    })

    res.status(200).json({message: `user ${req.query.id as string} deleted`})
    await prisma.$disconnect()
}

/*
    Query:
        id:<number> user to be updated

    Body:
        username?:<string>
        password?:<string>
        name?:<string>
        admin?:<bool>
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
        const updated = await prisma.users.update({
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