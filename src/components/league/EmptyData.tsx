import { ComboboxOption, ComboboxOptions } from "@headlessui/react";

export default function EmptyData() {
    return (
        <ComboboxOptions static className="flex w-full justify-center items-center h-[37.25rem]">
            <ComboboxOption value={"null"} className={"flex flex-col gap-4 justify-center items-center"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 stroke-slate-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                <div className="flex flex-col gap-1 justify-center items-center">
                    <span className="font-bold">No record found</span>
                    <span className="text-gray-500">This record does not exist in the database</span>
                </div>
            </ComboboxOption>
        </ComboboxOptions>
    )
}