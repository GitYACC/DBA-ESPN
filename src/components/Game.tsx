import Image from "next/image"

interface GameProps {
    team1: {
        name: string
        logo: string
        wins: number
        loss: number
    }
    team2: {
        name: string
        logo: string
        wins: number
        loss: number
    }
}

export default function Game(props: GameProps) {
    return (
        <div className="flex flex-col justify-between hover:bg-gray-50 cursor-pointer">
            <div className="flex p-4 border rounded-lg gap-4 items-center">
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
                <div className="mx-4 text-2xl font-normal">@</div>
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