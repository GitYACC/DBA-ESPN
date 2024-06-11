"use client"

import { useEffect, useState } from 'react'
import { Combobox, ComboboxInput, ComboboxOptions } from '@headlessui/react'
import ScrollableXY from './ScrollableXY'
import ScrollRecords from './ScrollRecords'
import { Player, player } from '@/pages/api/db/players'
import RecordDescription from './RecordDescription'
import EmptyData from './EmptyData'
import axios from 'axios'
import { User } from '@/pages/api/db/users'
import { Stat } from '@/pages/api/db/stats'
import { Overall } from '@/pages/api/db/overalls'
import { Team } from '@/pages/api/db/teams'
import Search from '../svg/Search'

export interface PlayerRecord {
    index: number, 
    name: string,
    team: string,
    position: string,
    overall: number,
    height: number,
    weight: number,
    wingspan: number,
    vertical: number,
    age: number,
    jersey: number,
    fg_file: string,
    bg_file: string,
    defending: number,
    finishing: number,
    iq: number,
    passing: number,
    speed: number,
    rebounding: number,
    shooting: number,
    handling: number,
    points: number,
    rebounds: number,
    assists: number,
    fgpercent: number
}

const headers = [
    "Player", 
    "Defending", 
    "Finishing", 
    "IQ", 
    "Passing", 
    "Speed", 
    "Rebounding", 
    "Shooting", 
    "Handling"
]

function nameCapitalized(s: string) {
    let res = ""

    for (let str of s.split(" ")) {
        res += str.charAt(0).toUpperCase() + str.slice(1)
        res += " "
    }

    return res.slice(0, res.length - 1)
}

function average(overall: Overall) {
    let total = overall.defending
        + overall.finishing
        + overall.iq
        + overall.passing
        + overall.speed
        + overall.rebounding
        + overall.shooting
        + overall.handling

    return total / 8
}

function getStats(stats: Stat[]) {
    let result = stats.reduce((prev, curr) => {
        curr.points += prev.points
        curr.rebounds += prev.rebounds
        curr.assists += prev.assists
        curr.fga += prev.fga
        curr.fgm += prev.fgm
        return curr
    })

    return {
        points: result.points / stats.length,
        rebounds: result.rebounds / stats.length,
        assists: result.assists / stats.length,
        fgpercent: result.fgm * 100 / result.fga
    }
}

function generatePlayerProfile(
    user: User,
    player: Player, 
    stat: Stat[], 
    overall: Overall, 
    team: Team
): PlayerRecord {
    let stat_avg = getStats(stat)

    return {
        index: user.id,
        name: nameCapitalized(user.name),
        team: "/" + team.name.toLowerCase() + ".png",
        position: player.position,
        overall: Math.round(average(
            overall
        )),
        height: player.height,
        weight: player.weight,
        wingspan: player.wingspan,
        vertical: player.vertical,
        age: player.age,
        jersey: player.jersey,
        fg_file: [
            "/mahomes_fg.png", 
            "/cwill_fg.png", 
            "/purdy_fg.png", 
            "/jefferson_fg.png"
        ][user.id % 4],
        bg_file: [
            "/mahomes_bg.png",
            "/cwill_bg.png",
            "/purdy_bg.png",
            "/jefferson_bg.png"
        ][user.id % 4],
        defending: overall.defending,
        finishing: overall.finishing,
        iq: overall.iq,
        passing: overall.passing,
        speed: overall.speed,
        rebounding: overall.rebounding,
        shooting: overall.shooting,
        handling: overall.handling,
        points: stat_avg.points,
        rebounds: stat_avg.rebounds,
        assists: stat_avg.assists,
        fgpercent: stat_avg.fgpercent
    }
}

function generateTable(
    users: User[], 
    players: Player[], 
    stats: Stat[], 
    overalls: Overall[], 
    teams: Team[]
) {

    let table = []
    for(let user of users) {
        console.log(user.id, teams.find((t: Team) => t.players.includes(user.id)))
        table.push(
            generatePlayerProfile(
                user,
                players.find((p: Player) => p.id == user.id)!,
                stats.filter((s: Stat) => s.id == user.id)!,
                overalls.find((o: Overall) => o.id == user.id)!,
                teams.find((t: Team) => t.players.includes(user.id))!
            )
        )
    }
    return table
}

async function getData() {
    const { data: users } = await axios.get("../api/db/users")
    const { data: players } = await axios.get("../api/db/players")
    const { data: stats } = await axios.get("../api/db/stats?year=2024")
    const { data: overalls } = await axios.get("../api/db/overalls")
    const { data: teams } = await axios.get("../api/db/teams")

    return generateTable(
        users.result, 
        players.result,
        stats.result,
        overalls.result,
        teams.result
    )
}

/*
const test = [
    player(1, "Samarth",    "Shastry",      "/warriors.png",    "PG | SG",  "96",   "5'9",  "115 lbs", "5'11",      "26'", "19", "1",   "/mahomes_fg.png",   "/mahomes_bg.png",   99, 99, 99, 99, 99, 99, 99, 99),
    player(2, "Bhardwaj",   "Tallapragada", "/cavaliers.png",   "PG | SG",  "99",   "5'10", "140 lbs", "5'10",      "23'", "19", "8",   "/cwill_fg.png",     "/cwill_bg.png",     99, 99, 99, 99, 99, 99, 99, 99),
    player(3, "Pranav",     "Garigapatti",  "/spurs.png",       "PF",       "71",   "5'10", "160 lbs", "5'8",       "20'", "19", "2",   "/purdy_fg.png",     "/purdy_bg.png",     99, 99, 99, 99, 99, 99, 99, 99),
    player(4, "Jayanth",    "Jaisankar",    "/celtics.png",     "PF | C",   "95",   "6'2",  "170 lbs", "6'2",       "23'", "19", "3",   "/jefferson_fg.png", "/jefferson_bg.png", 99, 99, 99, 99, 99, 99, 99, 99),
    player(5, "Harun",      "Momin",        "/cavaliers.png",   "PF | C",   "78",   "6'4",  "165 lbs", "6'6",       "18'", "19", "5",   "/cwill_fg.png",     "/cwill_bg.png",     99, 99, 99, 99, 99, 99, 99, 99),
    player(6, "Sai",        "Balakumar",    "/spurs.png",       "PF",       "87",   "5'9",  "210 lbs", "5'9",       "18'", "19", "7",   "/purdy_fg.png",     "/purdy_bg.png",     99, 99, 99, 99, 99, 99, 99, 99),
    player(7, "Kaif",       "Jeelani",      "/celtics.png",     "PF | C",   "83",   "5'11", "170 lbs", "5'8",       "20'", "19", "6",   "/jefferson_fg.png", "/jefferson_bg.png", 99, 99, 99, 99, 99, 99, 99, 99),
    player(8, "Keenan",     "Kalra",        "/warriors.png",    "SG",       "61",   "5'7",  "130 lbs", "5'6",       "20'", "19", "9",   "/mahomes_fg.png",   "/mahomes_bg.png",   99, 99, 99, 99, 99, 99, 99, 99),
    player(9, "Srijan",     "Kagitam",      "/cavaliers.png",   "SG",       "88",   "5'10", "140 lbs", "5'10",      "26'", "19", "10",  "/cwill_fg.png",     "/cwill_bg.png",     99, 99, 99, 99, 99, 99, 99, 99),
    player(10, "Sunaad",    "Shastry",      "/warriors.png",    "SG",       "80",   "5'10", "125 lbs", "5'9",       "24'", "19", "12",  "/mahomes_fg.png",   "/mahomes_bg.png",   99, 99, 99, 99, 99, 99, 99, 99),
    player(11, "Ayush",     "Bhakandi",     "/cavaliers.png",   "SG",       "71",   "5'8",  "115 lbs", "5'8",       "22'", "19", "13",  "/cwill_fg.png",     "/cwill_bg.png",     99, 99, 99, 99, 99, 99, 99, 99),
]
*/



interface LeagueDataProps {
    player: string | null
}

export default function LeagueData(props: LeagueDataProps) {
    const [data, setData] = useState([] as PlayerRecord[])
    const [selectedItem, setSelectedItem] = useState<PlayerRecord | null>([] as any)
    const [active, setActive] = useState<PlayerRecord | null>([] as any)
    
    const [query, setQuery] = useState("")
    const filtered =
      query == ""
        ? data
        : data.filter((item) => {
            for (let object of Object.entries(item)) {
                let allowed = (object[1] as any)
                    .toString()
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))

                if (allowed) return true
            }
            return false
        })

    useEffect(() => {
        getData().then((result) => {
            setData(result)
        })
    }, [])

    useEffect(() => {
        setQuery(props.player ? props.player : "")
        // this null needs to be here because nextjs is retarded and 
        // doesn't allow switch between controlled and uncontrolled states
        setActive(filtered[0] || null)
        setSelectedItem(filtered[0] || null)
    }, [data])
    
    return (
        <div className="flex h-full w-full justify-center items-center">
        <Combobox 
            className="bg-white divide-y rounded-lg shadow-md border border-gray-300 w-[70rem]" 
            as="div" 
            value={selectedItem} 
            onChange={setSelectedItem}
        >
            {filtered.length != 0 && active != null ? (
            <div className='flex flex-col divide-y gap-4'>
                <RecordDescription active={active} />
                <ComboboxOptions static className="h-[25rem] w-full bg-white">
                    <ScrollableXY 
                        headers={headers}
                    >
                        <ScrollRecords 
                            headers={headers} 
                            data={filtered}
                            setActive={setActive}
                            valueRepr={(item) => item.name}
                        ></ScrollRecords>
                    </ScrollableXY>
                </ComboboxOptions>
            </div>) : (
                <EmptyData />
            )}
            <div className="flex flex-row w-full p-3 gap-3 bg-white items-center rounded-b-lg">
                <Search className="h-6 w-6" />
                <ComboboxInput 
                    className="!outline-none w-full"
                    placeholder='Search...'
                    onChange={(event) => {
                        window.history.replaceState(null, "", window.location.pathname)
                        setQuery(event.target.value)
                    }}
                />
            </div>
        </Combobox>
        </div>
    )
}
