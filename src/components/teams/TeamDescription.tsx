import { Player } from "@/pages/api/db/players"
import { Team } from "@/pages/api/db/teams"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

async function getPlayers() {
    return (await axios.get("../api/db/players")).data
}

interface DescriptionProps {
    team: Team
}

export default function TeamDescription(props: DescriptionProps) {
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