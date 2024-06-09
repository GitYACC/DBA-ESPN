import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { twMerge } from "tailwind-merge"
import Image from "next/image"
import axios from "axios"
import { Team } from "@/pages/api/db/teams"
import { useEffect, useState } from "react"
import TeamDescription from "./TeamDescription"

async function getTeams() {
    return (await axios.get("../api/db/teams")).data
}

export default function Teams() {
    const [data, setData] = useState([] as Team[])

    useEffect(() => {
        getTeams().then((res) => {
            setData(res.result)
        })
    }, [])

    return (
        <div className="flex w-full h-full justify-center p-10">
            <div className="flex flex-col divide-y border rounded-lg shadow-sm w-full h-fit bg-white">
                {data.map((value: Team, index: any) => (
                    <Disclosure key={index} as="div" className="flex flex-col w-full h-full">
                        {({ open }) => (
                            <>
                                <DisclosureButton>
                                    <div className="flex justify-between items-center px-16 py-8">
                                        <div className="flex items-center gap-8">
                                            <Image src={"/" + value.name.toLowerCase() + ".png"} width={64} height={64} alt={value.name}/>
                                            <div className="flex flex-col items-start gap-2">
                                                <span className="font-semibold text-2xl text-gray-800 px-2">{value.name}</span>
                                                <div className="flex divide-x-2 divide-gray-400 text-gray-500 text-xs">
                                                    <div className="px-2">Accolades: </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-8 items-center">
                                            <div className="flex flex-col justify-center items-center text-blue-600 px-2 py-1 rounded-md border bg-blue-50 border-blue-200">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xs font-semibold text-blue-300">OVR</span>
                                                    <span>{value.overall}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </DisclosureButton>
                                <DisclosurePanel>
                                    <div className="px-16 pb-8">
                                        <TeamDescription team={value}/>
                                    </div>
                                </DisclosurePanel>
                            </>
                        )}
                    </Disclosure>
                ))}
            </div>
        </div>
    )
}