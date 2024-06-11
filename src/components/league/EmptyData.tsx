import { ComboboxOption, ComboboxOptions } from "@headlessui/react";
import XBox from "../svg/XBox";

export default function EmptyData() {
    return (
        <ComboboxOptions static className="flex w-full justify-center items-center h-[37.25rem]">
            <ComboboxOption value={"null"} className={"flex flex-col gap-4 justify-center items-center"}>
                <XBox className="w-10 h-10 stroke-slate-400"/>
                <div className="flex flex-col gap-1 justify-center items-center">
                    <span className="font-bold">No record found</span>
                    <span className="text-gray-500">This record does not exist in the database</span>
                </div>
            </ComboboxOption>
        </ComboboxOptions>
    )
}