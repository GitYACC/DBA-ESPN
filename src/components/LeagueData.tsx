"use client"

import { useEffect, useState } from 'react'
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react'
import ScrollableXY from './ScrollableXY'
import ScrollRecords from './ScrollRecords'
import { player } from '@/pages/api/db/players'
import RecordDescription from './RecordDescription'

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
    fgphoto: string,
    bgphoto: string,
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

function EmptyData() {
    return (
        <ComboboxOptions static className="flex w-full justify-center items-center h-[37.25rem]">
            <ComboboxOption value={"null"} className={"flex flex-col gap-4 justify-center items-center"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 stroke-slate-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                <div className="flex flex-col gap-1 justify-center items-center">
                    <span className="font-bold">No player found</span>
                    <span className="text-gray-500">There is not a player with this name in the database</span>
                </div>
            </ComboboxOption>
        </ComboboxOptions>
    )
}

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
        setQuery(props.player ? props.player : "")
        setActive(filteredItems[0])
    }, [])
    
    return (
        <div className="flex h-full w-full justify-center items-center">
        <Combobox 
            className="bg-white divide-y rounded-lg shadow-md border-[1px] w-[70rem]" 
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
                        {query.length == 0 ? (
                            <ScrollRecords 
                                headers={headers} 
                                data={test}
                                setActive={setActive}
                            ></ScrollRecords>
                        ) : (
                            <ScrollRecords 
                                headers={headers} 
                                data={filteredItems}
                                setActive={setActive}
                            ></ScrollRecords>
                        )}
                        
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