import { Combobox, ComboboxInput, ComboboxOptions, Switch } from "@headlessui/react"
import { useEffect, useState } from "react"
import EmptyData from "../../league/EmptyData"
import ScrollableXY from "../../league/ScrollableXY"
import ScrollRecords from "../../league/ScrollRecords"
import axios from "axios"
import { config } from "../tablereprs"
import Search from "../../svg/Search"
import JSON from "../record-entry/JSON"
import { twMerge } from "tailwind-merge"

interface DatabaseProps {
    selected: string
}

async function getDatabase(s: string) {
    return await axios.get(
        `../api/db/${s}${["stats", "games"].includes(s) ? "?year=2024" : ""}`
    )
}

export default function DatabaseSelect(props: DatabaseProps) {
    const [headers, setHeaders] = useState([] as any[])
    const [data, setData] = useState([] as any[])
    const [selected, setSelected] = useState(data[0])
    const [enabled, setEnabled] = useState(false)

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
                <div className='flex flex-col gap-4 overflow-scroll no-scrollbar'>
                    <ComboboxOptions static className="h-full w-full bg-white">
                        <ScrollableXY 
                            headers={headers}
                        >
                            <ScrollRecords 
                                disabled
                                headers={headers} 
                                data={filtered}
                                dialogClassName="flex rounded-lg bg-white overflow-hidden h-[25rem]"
                            >
                                {(selected, toggle) =>
                                    <div className="flex flex-col w-full divide-y items-center">
                                        <JSON opened data={selected} size="xl" className="w-fit h-3/4 justify-center p-10"/>
                                        <div className="flex w-full h-1/4 justify-between items-center px-10">
                                            <button 
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold"
                                                onClick={() => toggle(false)}
                                            >Save</button>
                                            <Switch
                                                checked={enabled}
                                                onChange={setEnabled}
                                                className={twMerge(
                                                    "group flex items-center rounded-lg px-4 py-2",
                                                    "bg-gray-200 transition data-[checked]:bg-orange-500",
                                                    "text-nowrap"
                                                )}
                                            >{({ checked, disabled }) => (
                                                <span className={`${checked ? "text-white" : "text-black"} font-semibold`}>Update Feed</span>
                                            )}</Switch>
                                        </div>
                                    </div>
                                }
                            </ScrollRecords>
                        </ScrollableXY>
                    </ComboboxOptions>
                </div>) : (
                    <EmptyData />
                )}
            </Combobox>
        </div>
    )
}