import { ComboboxOption } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import type { PlayerRecord } from "./LeagueData";


interface Data<T> {
    data: (T & {[key: string]: any})[]
    setActive?: Dispatch<SetStateAction<T | null>>
}

interface ScrollRecordsProps {
    headers: string[]
    valueRepr?: (e: any) => any
    disabled?: boolean
}

export default function ScrollRecords<T>(props: ScrollRecordsProps & Data<T>) {
    return props.data.map((item, index) => (
        <tr key={index} className="w-full">
            <td className="sticky left-0 bg-gray-100">
            <ComboboxOption
                key={index}
                value={props.valueRepr ? props.valueRepr(item) : item[props.headers[0].toLowerCase()]}
            >
                {({selected, focus}) => (
                    <div className={twMerge(
                        "text-gray-900 group w-full border-r px-6",
                        focus && !props.disabled && "cursor-pointer"
                    )}>
                        <div className={`bg-gray-100 p-2 w-full`}>
                            <>{focus && props.setActive && props.setActive(item)}</>
                            <span className={`text-sm text-nowrap text-gray-900 ${!props.disabled && "group-hover:text-blue-500"}`}>
                                {props.valueRepr ? props.valueRepr(item) : item[props.headers[0].toLowerCase()]}
                            </span>
                        </div>
                    </div>
                )}
            </ComboboxOption>
            </td>
            {props.headers.slice(1).map((header: string) => (
                <td key={header} className="text-center p-2">{
                    item[header.toLowerCase()] instanceof Object 
                        ? "{}"
                        : item[header.toLowerCase()] == true || item[header.toLowerCase()] == false
                            ? item[header.toLowerCase()].toString()
                            : item[header.toLowerCase()]
                }</td>
            ))}
        </tr>
    ))
}