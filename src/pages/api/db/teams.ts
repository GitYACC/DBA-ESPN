import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { Player } from './players'
import { prisma } from "../_base"

export interface Team {
    id: number
    name: string
    overall: number
    players: Player[]
    gm: string
    coach: string
    wins: number
    loss: number
}