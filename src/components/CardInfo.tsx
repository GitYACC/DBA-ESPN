import Link from "next/link";
import LeftArrow from "./svg/LeftArrow";
import StaticCardSelect from "./StaticCardSelect";
import DynamicCardSelect from "./DynamicCardSelect";
import StaticFaceCard from "./StaticFaceCard";
import DynamicFaceCard from "./DynamicFaceCard";

import { twMerge } from "tailwind-merge";
import { useState } from "react";

export default function CardInfo() {
    const [fgName, setFgName] = useState('')
    const [bgName, setBgName] = useState('')
    const [cardType, setCardType] = useState("static")

    const fileCaptureFg = (e: any) => {
        const selectedFile: File = e.target.files[0]
        setFgName(selectedFile.name)
    }
    
    const fileCaptureBg = (e: any) => {
        const selectedFile: File = e.target.files[0]
        setBgName(selectedFile.name)
    }
    
    return (
        <div className="flex flex-col">
            <div>
                <div className="pb-12">
                    <div className="flex gap-2 items-center">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Player Card
                        </h2>
                        <h3 className="text-sm text-gray-700">
                            (optional for now)
                        </h3>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        You can choose two different player cards to represent your player profile
                    </p>
                </div>
            </div>
            <div className="flex border border-gray-900/10 rounded-lg py-6 bg-cyan-100/25">
                <div className="flex justify-center w-full">
                    <div className="flex flex-col gap-4">
                        <span 
                            onClick={() => setCardType("dynamic")}
                            className={twMerge(
                                "flex justify-center items-center w-full", 
                                "text-lg font-semibold text-gray-700", 
                                "hover:cursor-pointer border", 
                                "border-gray-900/10 rounded-lg", 
                                cardType == "dynamic" && "bg-blue-700 text-white",
                                cardType != "dynamic" && "hover:bg-gray-100"
                            )}
                        >
                            Dynamic
                        </span>
                        <DynamicFaceCard
                            teamImg="/trojans.png"
                            playerFg="/cwill_fg.png"
                            playerBg="/cwill_bg.png"
                            number={13}
                        >
                            Caleb Williams
                        </DynamicFaceCard>
                        <span className="flex justify-center items-center w-full text-xs text-gray-500">
                            Hover over me!
                        </span>
                    </div>
                </div>
                <div className="flex justify-center w-full">
                    <div className="flex flex-col gap-4">
                        <span 
                            onClick={() => setCardType("static")}
                            className={twMerge(
                                "flex justify-center items-center w-full text-lg", 
                                "font-semibold text-gray-700 hover:cursor-pointer", 
                                "border border-gray-900/10 rounded-lg",
                                cardType == "static" && "bg-blue-700 text-white",
                                cardType != "static" && "hover:bg-gray-100"
                            )}
                        >
                            Static
                        </span>
                        <StaticFaceCard
                            teamImg="/trojans.png"
                            playerBg="/cwill_bg.png"
                            number={13}
                        >
                            Caleb Williams
                        </StaticFaceCard>
                    </div>
                </div>
            </div>
            {cardType == "dynamic" && 
                <DynamicCardSelect 
                    bgName={bgName}
                    fgName={fgName}
                    fileCaptureBg={fileCaptureBg}
                    fileCaptureFg={fileCaptureFg}
                />
            }
            {cardType == "static" && 
                <StaticCardSelect 
                    bgName={bgName}
                    fileCaptureBg={fileCaptureBg}
                />
            }
            {/*!submittable && <div className="flex justify-end mt-4 text-xs text-red-500">One or more fields are missing/incorrect</div>*/}
        </div>
    )
}