import { ReactNode } from "react"
import Image from "next/image"
import { twMerge } from "tailwind-merge"

interface FaceCardStyle {
    from: string,
    to: string
}

interface StaticFaceCardProps {
    teamImg: string,
    style?: FaceCardStyle,
    number: number,
    playerBg: string,
    children: ReactNode
}



export default function StaticFaceCard(fcprops: StaticFaceCardProps) {
    return (
        <div className={twMerge(
            "group relative z-[1] flex flex-col bg-white", 
            "rounded-r-lg rounded-bl-lg w-[11rem] h-[11rem]", 
            "shadow-xl border border-black"
        )}>
            <div className="absolute z-[997] top-0 left-0 bg-white rounded-br-lg px-3 py-1 font-bold">
                #{fcprops.number}
            </div>
            <div className={twMerge(
                "flex gap-5 bg-gradient-to-r", 
                fcprops.style && fcprops.style.from 
                    ? fcprops.style.from : null, 
                fcprops.style && fcprops.style.to 
                    ? fcprops.style.to : null, 
                "absolute z-[1000] bottom-0 w-full", 
                "bg-white rounded-lg px-3 py-2", 
                "font-bold text-xs justify-center items-center"
            )}>
                    <img className="h-4 w-4" src={fcprops.teamImg}></img>
                    <span>{fcprops.children}</span>
            </div>
            <div className="absolute h-full w-full overflow-hidden rounded-r-lg rounded-bl-lg">
                <div className="absolute w-full h-full">
                <Image
                    src={fcprops.playerBg}
                    alt="cwill"
                    layout="fill"
                    objectFit="cover"
                />
                </div>
            </div>
        </div>
    )
}