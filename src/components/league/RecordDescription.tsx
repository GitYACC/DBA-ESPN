import DynamicFaceCard from "../cards/DynamicFaceCard";
import type { PlayerRecord } from "./LeagueData";

interface RecordDescriptionProps {
    active: PlayerRecord
}

function trim(s: string): string {
    if (s.length > 16) 
        return s.slice(0, 16) + "..."
    return s
}

export default function RecordDescription(props: RecordDescriptionProps) {
    return (
        <div className='flex w-full mt-5 gap-5'>
            <div className='flex flex-col h-[10rem] w-[13rem] ml-5'>
                <DynamicFaceCard
                    teamImg={props.active.team}
                    number={parseInt(props.active.number)}
                    playerBg={props.active.bgphoto}
                    playerFg={props.active.fgphoto}
                >
                    {trim(props.active.first_name + " " + props.active.last_name)}
                </DynamicFaceCard>
            </div>
            <div className='flex flex-col gap-2 w-1/3'>
                <div className='flex flex-col divide-y gap-2'>
                    <div className="flex justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <div className="p-1 text-blue-600 bg-blue-50 rounded-md border border-blue-200">{props.active.position}</div>
                                <div className="font-semibold text-gray-900">{props.active.first_name}</div>
                            </div>
                            <p className="text-2xl tracking-[-0.048rem] font-semibold text-gray-900">{props.active.last_name}</p>
                        </div>
                        <a href="#" className="cursor-pointer flex items-center justify-center">
                            <div className="flex flex-col justify-center items-center text-blue-600 px-2 py-1 rounded-md border bg-blue-50 border-blue-200">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xs font-semibold text-blue-300">OVR</span>
                                    {props.active.overall}
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="flex pt-2 gap-2">
                        <div className="flex flex-col">
                            <div className="flex gap-2">
                                <div className="w-20 font-semibold text-gray-900">Height</div>
                                <div className="w-24 text-gray-700">{props.active.height}</div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-20 font-semibold text-gray-900">Weight</div>
                                <div className="w-24 text-gray-700">{props.active.weight}</div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-20 font-semibold text-gray-900">Wingspan</div>
                                <div className="w-24 text-gray-700">{props.active.wingspan}</div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex gap-2">
                                <div className="w-20 font-semibold text-gray-900">Vertical</div>
                                <div className="w-24 text-gray-700">{props.active.vertical}</div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-20 font-semibold text-gray-900">Age</div>
                                <div className="w-24 text-gray-700">{props.active.age}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center w-[40%]">
                <div className="flex flex-col overflow-hidden border-[1px] rounded-lg divide-y">
                    <div className="flex items-center justify-center py-1 text-gray-900 font-bold">2023 Season Stats</div>
                    <div className="flex gap-7 px-6 py-2">
                        <div className="flex flex-col justify-center items-center">
                            <div className="text-xs text-gray-400">PTS</div>
                            <div className="font-bold text-2xl text-gray-900">33.8</div>
                            <div className="text-xs text-gray-400">1st</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="text-xs text-gray-400">REB</div>
                            <div className="font-bold text-2xl text-gray-900">10.2</div>
                            <div className="text-xs text-gray-400">2nd</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="text-xs text-gray-400">AST</div>
                            <div className="font-bold text-2xl text-gray-900">11.1</div>
                            <div className="text-xs text-gray-400">2nd</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="text-xs text-gray-400">FG%</div>
                            <div className="font-bold text-2xl text-gray-900">52.5%</div>
                            <div className="text-xs text-gray-400">1st</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}