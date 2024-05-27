import { ComboboxOption } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import type { PlayerRecord } from "./LeagueData";

interface ScrollRecordsProps {
    headers: string[]
    data: (PlayerRecord & {[key: string]: any})[]
    setActive: Dispatch<SetStateAction<PlayerRecord | null>>
}

export default function ScrollRecords(props: ScrollRecordsProps) {
    return props.data.map((item, index) => (
        <tr key={index}>
            <td className="sticky left-0 bg-gray-100">
            <ComboboxOption
                key={index}
                value={item.first_name + " " + item.last_name}
            >
                {({selected, focus}) => (
                    <div className={twMerge(
                        "text-gray-900 group w-full border-r pl-6", 
                        "pr-12 text-left", 
                        focus && "hover:text-blue-400 hover:cursor-pointer"
                    )}>
                        <div className={`bg-gray-100 gap-4 p-2 w-full`}>
                            <>{focus && props.setActive(item)}</>
                            <span className={`text-sm text-gray-900 group-hover:text-blue-400`}>
                                {item.first_name + " " + item.last_name}
                            </span>
                        </div>
                    </div>
                )}
            </ComboboxOption>
            </td>
            {props.headers.slice(1).map((header: string) => (
                <td key={header} className="text-center p-2">{item[header.toLowerCase()]}</td>
            ))}
        </tr>
    ))
}