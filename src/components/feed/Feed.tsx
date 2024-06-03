import { GameCastAsFeed } from "../league/GameCast";
import Alert from "../svg/Alert";
import Bell from "../svg/Bell";
import Info from "../svg/Info";
import Megaphone from "../svg/Megaphone";
import RightArrow from "../svg/RightArrow";
import Swap from "../svg/Swap";
import SwapUp from "../svg/SwapUp";

type FeedStack = {
    id: number
    type: "draft" | "trade" | "score" | "rating"
    date: string
    data?: {
        teams?: string[]
        players?: string[]
        swaps?: {
            giving?: string
            taking?: string
        }[]
        playerPosition?: "PG" | "SF" | "SG" | "PF" | "C"
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
        draftRound?: number,
        draftPick?: number
    }
}

function simpleDate(): string {
    const today = new Date()
    const dd = today.getDate()
    const mm = today.getMonth() + 1
    const yy = today.getFullYear()
    return mm + "/" + dd + "/" + yy
}

const feed: FeedStack[] = [
    {
        id: 1,
        type: "draft",
        date: simpleDate(),
        data: {
            teams: ["Spurs"],
            players: ["Victor Wembanyama"],
            playerPosition: "C",
            draftPick: 1,
            draftRound: 1
        }
    },
    {
        id: 1,
        type: "draft",
        date: simpleDate(),
        data: {
            teams: ["Cavaliers"],
            players: ["Lebron James"],
            playerPosition: "PF",
            draftPick: 2,
            draftRound: 1
        }
    },
    {
        id: 2,
        type: "draft",
        date: simpleDate(),
        data: {
            teams: ["Warriors"],
            players: ["Naz Reid"],
            playerPosition: "PG",
            draftPick: 3,
            draftRound: 1
        }
    },
    {
        id: 3,
        type: "trade",
        date: simpleDate(),
        data: {
            teams: ["Warriors", "Cavaliers"],
            swaps: [
                {giving: "Lebron James", taking: "2025 Round 1 Pick"},
                {taking: "2026 Round 1 Pick"},
                {taking: "2027 Round 1 Pick"},
                {taking: "2028 Round 1 Pick"}
            ]
        }
    },
    {
        id: 4,
        type: "score",
        date: simpleDate(),
        data: {
            teams: ["Warriors", "Cavaliers"],
            score: [123, 118]
        }
    },
    {
        id: 5,
        type: "rating",
        date: simpleDate(),
        data: {
            players: ["Naz Reid"],
            playerRatingType: "defending",
            old: 86,
            new: 99
        }
    },
]

export default function Feed() {
    return (
        <div className="flex flex-col w-1/3 h-full bg-white overflow-y-scroll">
            <ul className="overflow-scroll">
                {feed.map((stack: FeedStack) => {
                    switch(stack.type) {
                        case "draft":
                            return (
                                <li key={stack.id} className="flex flex-col p-6 gap-4 border-b">
                                    <div className="flex justify-between items-center gap-4">
                                        <div className="flex gap-2 items-center stroke-gray-700">
                                            <div className=" bg-blue-50 p-1.5 rounded-lg">
                                                <Megaphone className="w-5 h-5 stroke-blue-600"/>
                                            </div>
                                            <span className="flex gap-1 text-base text-gray-900">
                                                <span className="font-semibold">{stack.data?.teams![0]}</span>
                                                <span>select</span>
                                            </span>
                                        </div>
                                        <div className="text-gray-400 text-xs font-semibold">{stack.date}</div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center justify-center border p-2 rounded-md">
                                            <span className="text-xs font-semibold text-gray-400 text-nowrap">R{stack.data?.draftRound} / P{stack.data?.draftPick}</span>
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            <span className="font-bold text-xl text-gray-700">{stack.data?.players![0]}</span>
                                            <div className="flex items-center justify-center w-10 h-10 bg-blue-50 text-blue-600 rounded-lg font-semibold">{stack.data?.playerPosition}</div>
                                        </div>
                                    </div>
                                </li>
                            )
                        case "trade":
                            return (
                                <li key={stack.id} className="flex flex-col p-6 gap-4 border-b">
                                    <div className="flex justify-between items-center gap-4">
                                        <div className="flex gap-2 items-center stroke-gray-700">
                                            <div className=" bg-blue-50 p-1.5 rounded-lg">
                                                <Alert className="w-5 h-5 stroke-blue-600"/>
                                            </div>
                                            <span className="flex gap-1 text-base text-gray-900">
                                                <span className="font-semibold">{stack.data?.teams![0]}</span>
                                                <span>trade with</span>
                                                <span className="font-semibold">{stack.data?.teams![1]}</span>
                                            </span>
                                        </div>
                                        <div className="text-gray-400 text-xs font-semibold">{stack.date}</div>
                                    </div>
                                    <div className="flex justify-between items-center px-10">
                                        <div className="flex flex-col gap-2">
                                            {stack.data?.swaps!.map((swap, index) => {
                                                if (swap.giving) {
                                                    return <div key={index} className="text-gray-700 text-sm">
                                                        {swap.giving}
                                                    </div>
                                                }
                                            })}
                                        </div>
                                        <Swap className="w-8 h-8 stroke-gray-700"/>
                                        <div className="flex flex-col gap-2">
                                            {stack.data?.swaps!.map((swap, index) => {
                                                if (swap.taking) {
                                                    return <div key={index} className="text-gray-700 text-sm">
                                                        {swap.taking}
                                                    </div>
                                                }
                                            })}
                                        </div>
                                    </div>
                                </li>
                            )
                        case "score":
                            return (
                                <li key={stack.id} className="flex flex-col p-6 gap-4 border-b">
                                    <div className="flex justify-between items-center gap-4">
                                        <div className="flex gap-2 items-center stroke-gray-700">
                                            <div className=" bg-blue-50 p-1.5 rounded-lg">
                                                <Info className="w-5 h-5 stroke-blue-600"/>
                                            </div>
                                            <span className="flex gap-1 text-base text-gray-900">
                                                <span className="font-semibold">{stack.data?.teams![0]}</span>
                                                <span>vs.</span>
                                                <span className="font-semibold">{stack.data?.teams![1]}</span>
                                            </span>
                                        </div>
                                        <div className="text-gray-400 text-xs font-semibold">{stack.date}</div>
                                    </div>
                                    <div className="flex items-center px-10 gap-2">
                                        <GameCastAsFeed 
                                            team1={{
                                                logo: `/${stack.data?.teams![0].toLowerCase()}.png`,
                                                wins: 2,
                                                loss: 2,
                                                score: stack.data?.score![0] as number
                                            }}
                                            team2={{
                                                logo: `/${stack.data?.teams![1].toLowerCase()}.png`,
                                                wins: 2,
                                                loss: 2,
                                                score: stack.data?.score![1] as number
                                            }}
                                        />
                                    </div>
                                </li>
                            )
                        case "rating":
                            return (
                                <li key={stack.id} className="flex flex-col p-6 gap-4 border-b">
                                    <div className="flex justify-between items-center gap-4">
                                        <div className="flex gap-2 items-center stroke-gray-700">
                                            <div className=" bg-blue-50 p-1.5 rounded-lg">
                                                <SwapUp className="w-5 h-5 stroke-blue-600"/>
                                            </div>
                                            <span className="flex gap-1 text-base text-gray-900">
                                                <span className="font-semibold">{stack.data?.players![0]}</span>
                                            </span>
                                        </div>
                                        <div className="text-gray-400 text-xs font-semibold">{stack.date}</div>
                                    </div>
                                    <div className="flex items-center w-fit px-10 gap-6">
                                        <span className="font-bold text-sm text-rose-600">
                                            {stack.data?.playerRatingType!.toUpperCase()}
                                        </span>
                                        <div className="flex gap-2 items-center">
                                            <span className="flex items-center justify-center font-semibold w-10 h-10 bg-blue-600 text-white rounded-lg">
                                                {stack.data?.old!}
                                            </span>
                                            <RightArrow className="w-6 h-6 stroke-gray-700"/>
                                            <span className="flex items-center justify-center font-semibold w-10 h-10 bg-blue-600 text-white rounded-lg">
                                                {stack.data?.new!}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            )
                    }
                })}
            </ul>
        </div>
    )
}