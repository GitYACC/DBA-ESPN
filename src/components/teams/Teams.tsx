import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { twMerge } from "tailwind-merge"
import { PlayerRecord } from "../league/LeagueData"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { Team } from "@/pages/api/db/teams"
import { useEffect, useState } from "react"
import { Player } from "@/pages/api/db/players"

const teams = [
    "Warriors",
    "Cavaliers",
    "Spurs",
    "Celtics"
]

async function getTeams() {
    return (await axios.get("../api/db/teams")).data
}

async function getPlayers() {
    return (await axios.get("../api/db/players")).data
}

interface DescriptionProps {
    team: Team
}

function TeamDescription(props: DescriptionProps) {
    const [players, setPlayers] = useState([] as Player[])

    useEffect(() => {
        getPlayers().then((res) => {
            setPlayers(res.result.filter(
                (item: Player) => props.team.players.includes(item.id)
            ))
        })
    }, [])

    return (
        <div>
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-800">Team Description</h3>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">GM</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{props.team.gm}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Coach</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{props.team.coach}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Players</dt>
                    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200 overflow-hidden">
                        {players.map((player, index) => (
                            <Link key={index} href={`/league?player=${player.name}`} className="group">
                                <li className="group-hover:bg-gray-50 flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                <div className="flex w-0 flex-1 items-center">
                                    <div className="font-semibold text-gray-800 w-8">{player.position}</div>
                                    <span className="ml-4 min-w-0 truncate font-medium">{player.name}</span>
                                </div>
                                <span className="flex-shrink-0 text-xs text-gray-400">R{player.draft_round} / P{player.draft_pick}</span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                    </dd>
                </div>
                </dl>
            </div>
        </div>
    )
}

export default function Teams() {
    const [data, setData] = useState([] as Team[])

    useEffect(() => {
        getTeams().then((res) => {
            console.log(res)
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