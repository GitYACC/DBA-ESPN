import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { Player } from './players'
import { Team } from './teams'
import { prisma } from "../_base"

interface FeedData {
    type: "draft" | "trade" | "score" | "rating"
    date: string
    data?: {
        teams?: Team[]
        players?: Player[]
        swaps?: {
            giving?: string
            taking?: string
        }[]
        //playerPosition?: "PG" | "SF" | "SG" | "PF" | "C"
        playerRatingType?:
              "defending"
            | "finishing"
            | "iq"
            | "passing"
            | "speed"
            | "rebounding"
            | "shooting"
            | "handling"
        old?: number
        new?: number
        score?: [number, number]
        //draftRound?: number,
        //draftPick?: number
    }
}