import { Combobox, ComboboxInput, ComboboxOptions } from "@headlessui/react"
import { useEffect, useState } from "react"
import EmptyData from "../league/EmptyData"
import ScrollableXY from "../league/ScrollableXY"
import ScrollRecords from "../league/ScrollRecords"
import axios from "axios"
import { config } from "./tablereprs"
import Search from "../svg/Search"

interface DatabaseProps {
    selected: string
}

async function getDatabase(s: string) {
    return await axios.get(
        `../api/db/${s}${s == "stats" ? "?year=2024" : ""}`
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
                    <Search className="h-6 w-6" />
                    <ComboboxInput 
                        className="!outline-none w-full"
                        placeholder='Search...'
                        onChange={(event) => {
                            setQuery(event.target.value)
                        }}
                    />
                </div>
                {filtered.length != 0 ? (
                <div className='flex flex-col gap-4 overflow-scroll'>
                    <ComboboxOptions static className="h-full w-full bg-white">
                        <ScrollableXY 
                            headers={headers}
                        >
                            <ScrollRecords 
                                disabled
                                headers={headers} 
                                data={filtered}
                            />
                        </ScrollableXY>
                    </ComboboxOptions>
                </div>) : (
                    <EmptyData />
                )}
            </Combobox>
        </div>
    )
}