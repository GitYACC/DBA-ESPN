import { Select } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { Dispatch, SetStateAction } from "react";

const select = [
    "2024",
    "2025",
    "2026"
]

interface SelectorProps {
    setActive: Dispatch<SetStateAction<string>>
}

export default function YearSelector(props: SelectorProps) {
    return (
        <div 
            className={twMerge(
                "flex text-sm font-medium border border-gray-300/75", 
                "rounded-md w-fit h-8 bg-white pl-2 pr-3"
            )}
        >
            <Select 
                className={twMerge(
                    "outline-none cursor-pointer"
                )}
                onChange={(e) => props.setActive(e.target.value.toLowerCase())}
            >
                {select.map((val, index) => (
                    <option 
                        key={index} 
                        value={val}
                    >{val}</option>
                ))}
            </Select>
        </div>
    )
}