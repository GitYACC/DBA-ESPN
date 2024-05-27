import { ReactNode } from "react"
import Image from "next/image"
import { twMerge } from "tailwind-merge"

interface FaceCardStyle {
    from: string,
    to: string
}

interface DynamicFaceCardProps {
    playerFg: string
    teamImg: string,
    style?: FaceCardStyle,
    number: number,
    playerBg: string,
    children: ReactNode
}

export default function DynamicFaceCard(fcprops: DynamicFaceCardProps) {
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
                "flex gap-5 bg-gradient-to-r text-nowrap", 
                fcprops.style && fcprops.style.from, 
                fcprops.style && fcprops.style.to, 
                "absolute z-[1000] bottom-0 w-full",
                "bg-white rounded-lg px-3 py-2", 
                "font-bold text-xs items-center"
            )}>
                    <Image 
                        alt="sumn"
                        src={fcprops.teamImg}
                        height={16}
                        width={16}
                    />
                    <span>{fcprops.children}</span>
            </div>
            <div className="relative h-full w-full group">
                <div className="absolute h-full w-full overflow-hidden rounded-r-lg rounded-bl-lg">
                    <div className="absolute w-full h-full">
                    <Image
                        className="opacity-[85%] transition-all group-hover:-translate-y-3 group-hover:scale-110"
                        src={fcprops.playerBg}
                        alt="cwill"
                        fill
                        objectFit="cover"
                    />
                    </div>
                </div>
                <div className="absolute h-full w-full overflow-visible">
                    <div className="absolute w-full h-full">
                        <Image
                            className={twMerge(
                                "z-[999] overflow-visible", 
                                "transition-all group-hover:-translate-y-3", 
                                "group-hover:scale-110"
                            )}
                            src={fcprops.playerFg}
                            alt="cwill"
                            fill
                            objectFit="cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}