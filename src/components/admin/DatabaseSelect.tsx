import test from "@/pages/test"
import { Combobox, ComboboxInput, ComboboxOptions } from "@headlessui/react"
import { useEffect, useState } from "react"
import { User } from "@/pages/api/db/users"
import EmptyData from "../league/EmptyData"
import ScrollableXY from "../league/ScrollableXY"
import ScrollRecords from "../league/ScrollRecords"
import axios from "axios"
import { config } from "./tablereprs"

interface DatabaseProps {
    selected: string
}

async function getDatabase(s: string) {
    return await axios.get(
        `../api/db/${s}`
    )
}

export default function DatabaseSelect(props: DatabaseProps) {
    const [headers, setHeaders] = useState([] as any[])
    const [data, setData] = useState([] as any[])
    const [selected, setSelected] = useState(data[0])

    const [query, setQuery] = useState("")
    const filtered =
      query === ''
        ? data
        : data.filter((item) => 
            // make it search through all given fields of an object
            // probably a nested loop over object keys
            (item.id)
                .toString()
                .replace(/\s+/g, '')
                .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    
    useEffect(() => {
        getDatabase(props.selected).then((value) => {
            setData(value.data.result)
            if (value.data.result[0])
                setHeaders(config[props.selected].order)
            setSelected(data[0])
        })
    }, [props.selected])

    return (
        <div className="w-full h-full">
            <Combobox 
                className="flex flex-col bg-white divide-y w-full h-full" 
                as="div" 
                value={selected} 
                onChange={setSelected}
            >
                <div className="flex flex-row w-full p-4 gap-3 bg-white items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 stroke-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <ComboboxInput 
                        className="!outline-none w-full"
                        placeholder='Search...'
                        onChange={(event) => {
                            setQuery(event.target.value)
                        }}
                    />
                </div>
                {filtered.length != 0 ? (
                <div className='flex flex-col gap-4'>
                    <ComboboxOptions static className="h-full w-full bg-white">
                        <ScrollableXY 
                            headers={headers}
                        >
                            <ScrollRecords 
                                disabled
                                headers={headers} 
                                data={filtered}
                            ></ScrollRecords>
                        </ScrollableXY>
                    </ComboboxOptions>
                </div>) : (
                    <EmptyData />
                )}
            </Combobox>
        </div>
    )
}