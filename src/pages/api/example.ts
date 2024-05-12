import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    res.status(200).json({ name: "John Doe" })
}
