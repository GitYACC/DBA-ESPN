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

export interface PlayerRecord {
    index: number, 
    first_name: string, 
    last_name: string,
    team: string,
    position: string,
    overall: string,
    height: string,
    weight: string,
    wingspan: string,
    vertical: string,
    age: string,
    number: string,
    fg_file: string,
    bg_file: string,
    defending: number,
    finishing: number,
    iq: number,
    passing: number,
    speed: number,
    rebounding: number,
    shooting: number,
    handling: number
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

function generateTable(
    users: User[], 
    players: Player[], 
    stats: Stat[], 
    overalls: Overall[], 
    teams: Team[]
) {
    console.log(users, players, stats, overalls, teams)
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



interface LeagueDataProps {
    player: string | null
}

export default function LeagueData(props: LeagueDataProps) {
    const [selectedItem, setSelectedItem] = useState<PlayerRecord | null>(test[0])
    const [active, setActive] = useState<PlayerRecord | null>(test[0])

    const [query, setQuery] = useState("")
    const filteredItems =
      query === ''
        ? test
        : test.filter((item) => 
            (item.first_name + " " + item.last_name)
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    useEffect(() => {
        // get all users and their respective player/overall/stats/teams records
        // merge them into one required object
        getData().then((value) => {
            
        })
        setQuery(props.player ? props.player : "")
        setActive(filteredItems[0])
    }, [props.player])
    
    return (
        <div className="flex h-full w-full justify-center items-center">
        <Combobox 
            className="bg-white divide-y rounded-lg shadow-md border border-gray-300 w-[70rem]" 
            as="div" 
            value={selectedItem} 
            onChange={setSelectedItem}
        >
            {active != null ? (
            <div className='flex flex-col-reverse divide-y-reverse gap-4'>
                <ComboboxOptions static className="h-[25rem] w-full bg-white">
                    <>{query.length != 0 && filteredItems.length == 0 && setActive(null)}</>
                    <ScrollableXY 
                        headers={headers}
                    >
                        <ScrollRecords 
                            headers={headers} 
                            data={filteredItems}
                            setActive={setActive}
                            valueRepr={(item) => item.first_name + " " + item.last_name}
                        ></ScrollRecords>
                    </ScrollableXY>
                </ComboboxOptions>
                <RecordDescription active={active}/>
            </div>) : (
                <EmptyData />
            )}
            <div className="flex flex-row w-full p-3 gap-3 bg-white items-center rounded-b-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 stroke-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <ComboboxInput 
                    className="!outline-none w-full"
                    placeholder='Search...'
                    onChange={(event) => {
                        window.history.replaceState(null, "", window.location.pathname)
                        setQuery(event.target.value)
                        setActive(test[0])
                    }}
                />
            </div>
        </Combobox>
        </div>
    )
}
