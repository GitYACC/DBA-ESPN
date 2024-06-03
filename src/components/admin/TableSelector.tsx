import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import UpDown from "../svg/UpDown";
import { twMerge } from "tailwind-merge";
import { Dispatch, SetStateAction, useState } from "react";

const select = [
    "Users",
    "Players",
    "Teams",
    "Stats",
    "Overalls",
    "Feed"
]

interface SelectorProps {
    setActive: Dispatch<SetStateAction<string>>
}

export default function TableSelector(props: SelectorProps) {
    const [active, setActive] = useState("Users")

    return (
        <Menu as="div" className="relative">
            <MenuButton className={twMerge(
                "flex text-sm font-medium border border-gray-300/75", 
                "rounded-md w-24 h-8 bg-white items-center gap-2",
                "justify-between px-2"
            )}>
                <span>{active}</span>
                <UpDown className="w-4 h-4"/>
            </MenuButton>
            <MenuItems as="div" className={twMerge(
                "absolute -right-28 top-0 bg-white rounded-md", 
                "border h-32 overflow-scroll"
            )}>
                {select.map((key, index) => (
                    <MenuItem 
                        key={index} 
                        as="div" 
                        className="px-6 py-2 hover:bg-gray-100 text-sm font-semibold cursor-pointer"
                        onClick={() => props.setActive(key.toLowerCase())}
                    >
                        {({ focus }) => {
                            if (focus) setActive(key)
                            return <>{key}</>
                        }}
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    )
}