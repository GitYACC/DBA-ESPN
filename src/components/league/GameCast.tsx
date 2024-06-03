import Image from "next/image"
import RightTriangle from "../svg/RightTriangle"
import LeftTriangle from "../svg/LeftTriangle"

interface Name {
    name: string
}

interface Team {
    logo: string
    wins: number
    loss: number
    score: number
}

interface GameCastProps {
    team1: Team & Name
    team2: Team & Name
}

interface GameCastFeedProps {
    team1: Team
    team2: Team
}

function Winner(props: {score: number, isWinner: boolean, left: boolean}) {
    if (props.isWinner) {
        return (
            <div className="flex gap-1">
                {!props.left 
                    ? (
                        <>
                            <RightTriangle className="w-6 h-6 fill-gray-900" />
                            <div className="font-semibold w-7 text-right">{props.score}</div>
                        </>
                    )
                    : (
                        <>
                            <div className="font-semibold w-7 text-left">{props.score}</div>
                            <LeftTriangle className="w-6 h-6 fill-gray-900" />
                        </>
                    )
                }
                
            </div>
        )
    }

    return <div className="font-semibold w-6">{props.score}</div>
}

export default function GameCast(props: GameCastProps) {
    return (
        <div className="flex flex-col gap-2 hover:bg-gray-50 cursor-pointer">
            <div className="flex p-4 border rounded-lg w-fit gap-4 items-center">
                <div className="flex flex-col items-end">
                    <div className="text-gray-900 font-semibold text-base w-20 text-right">{props.team1.name}</div>
                    <div className="text-gray-600 text-xs">{props.team1.wins}-{props.team1.loss}</div>
                </div>
                <Image 
                    src={props.team1.logo}
                    alt={props.team1.name}
                    width={32}
                    height={32}
                />
                <Winner 
                    score={props.team1.score} 
                    isWinner={props.team1.score > props.team2.score} 
                    left={true}
                />
                <div className="mx-4 text-sm font-normal">Final</div>
                <Winner 
                    score={props.team2.score} 
                    isWinner={props.team1.score < props.team2.score} 
                    left={false}
                />
                <Image 
                    src={props.team2.logo}
                    alt={props.team2.name}
                    width={32}
                    height={32}
                />
                <div className="flex flex-col">
                    <div className="text-gray-900 font-semibold text-base w-20 text-left">{props.team2.name}</div>
                    <div className="text-gray-600 text-xs">{props.team2.wins}-{props.team2.loss}</div>
                </div>
            </div>
        </div>
    )
}

export function GameCastAsFeed(props: GameCastFeedProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex rounded-lg w-fit gap-5 items-center">
                <Image 
                    src={props.team1.logo}
                    alt=""
                    width={32}
                    height={32}
                />
                <Winner 
                    score={props.team1.score} 
                    isWinner={props.team1.score > props.team2.score} 
                    left={true}
                />
                <div className="mx-4 text-sm font-normal">Final</div>
                <Winner 
                    score={props.team2.score} 
                    isWinner={props.team1.score < props.team2.score} 
                    left={false}
                />
                <Image 
                    src={props.team2.logo}
                    alt=""
                    width={32}
                    height={32}
                />
            </div>
        </div>
    )
}