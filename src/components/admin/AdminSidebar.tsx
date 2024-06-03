import { Tab, TabList } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";
import Bars from "../svg/Bars";
import BarsArrow from "../svg/BarsArrow";
import Pencil from "../svg/Pencil";
import Stats from "../svg/Stats";
import YearSelector from "./YearSelector";
import TableSelector from "./TableSelector";

interface AdminSidebarProps {
    setYear: Dispatch<SetStateAction<string>>
    setTable: Dispatch<SetStateAction<string>>
}

export default function AdminSidebar(props: AdminSidebarProps) {
    return (
        <TabList className="flex flex-col w-1/5 p-4 gap-8 flex-none">
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                    <span className="font-semibold">Data</span>
                    <TableSelector setActive={props.setTable} />
                </div>
                <Tab as={Fragment}>{({hover, selected}) => (
                    <div className={twMerge(
                        "bg-white rounded-md border border-gray-300/75 text-gray-900",
                        "flex items-center gap-4 p-2 font-semibold cursor-pointer",
                        "outline-none text-sm",
                        hover && "bg-gray-100",
                        selected && "bg-blue-500 text-white border-transparent"
                    )}>
                        <Bars className={twMerge(
                            "w-6 h-6 stroke-gray-900",
                            selected && "stroke-white"
                        )} />
                        <span>Database View</span>
                    </div>
                )}</Tab>
                <Tab as={Fragment}>{({hover, selected}) => (
                    <span className={twMerge(
                        "bg-white rounded-md border border-gray-300/75 text-gray-900",
                        "flex items-center gap-4 p-2 font-semibold cursor-pointer",
                        "outline-none text-sm",
                        hover && "bg-gray-100",
                        selected && "bg-blue-500 text-white border-transparent"
                    )}>
                        <BarsArrow className={twMerge(
                            "w-6 h-6 stroke-gray-900",
                            selected && "stroke-white"
                        )} />
                        <span>Record Entry</span>
                    </span>
                )}</Tab>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                    <span className="font-semibold">Season</span>
                    <YearSelector setActive={props.setYear} />
                </div>
                <Tab as={Fragment}>{({hover, selected}) => (
                    <span className={twMerge(
                        "bg-white rounded-md border border-gray-300/75 text-gray-900",
                        "flex items-center gap-4 p-2 font-semibold cursor-pointer",
                        "outline-none text-sm",
                        hover && "bg-gray-100",
                        selected && "bg-blue-500 text-white border-transparent"
                    )}>
                        <Pencil className={twMerge(
                            "w-6 h-6 stroke-gray-900 fill-none",
                            selected && "stroke-white"
                        )} />
                        <span>Game Entry</span>
                    </span>
                )}</Tab>
                <Tab as={Fragment}>{({hover, selected}) => (
                    <span className={twMerge(
                        "bg-white rounded-md border border-gray-300/75 text-gray-900",
                        "flex items-center gap-4 p-2 font-semibold cursor-pointer",
                        "outline-none text-sm",
                        hover && "bg-gray-100",
                        selected && "bg-blue-500 text-white border-transparent"
                    )}>
                        <Stats className={twMerge(
                            "w-6 h-6 stroke-gray-900 fill-none",
                            selected && "stroke-white"
                        )} />
                        <span>Player Statistics</span>
                    </span>
                )}</Tab>
            </div>
        </TabList>
    )
}