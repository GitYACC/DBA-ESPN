import { ComboboxOption, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";


interface Data<T> {
    data: (T & {[key: string]: any})[]
    setActive?: Dispatch<SetStateAction<T | null>>
}

interface ScrollRecordsProps {
    headers: string[]
    valueRepr?: (e: any) => any
    disabled?: boolean
    dialogClassName?: string
    children?: (selected: any, toggle: Dispatch<SetStateAction<boolean>>) => ReactNode
}

export default function ScrollRecords<T>(props: ScrollRecordsProps & Data<T>) {
    const [open, setOpen] = useState(false)

    const [selected, setSelected] = useState<Object>({})

    if (!props.children) {
        return props.data.map((item, index) => (
            <tr key={index} className="w-full">
                <td className="sticky left-0 bg-gray-100 text-center">
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
                            : item[header.toLowerCase()].toString()
                    }
                    </td>
                ))}
            </tr>
        ))
    }

    return (
        <>
            {props.data.map((item, index) => (
                <tr key={index} className="w-full">
                    <td className="sticky left-0 bg-gray-100 text-center">
                    <button className="w-full" onClick={() => {
                        setOpen(true)
                        setSelected(item)
                    }}>
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
                    </button>
                    </td>
                    {props.headers.slice(1).map((header: string) => (
                        <td key={header} className="text-center p-2">
                            <button className="w-full" onClick={() => {
                                setOpen(true)
                                setSelected(item)
                            }}>{
                                item[header.toLowerCase()] instanceof Object 
                                    ? "{}"
                                    : item[header.toLowerCase()].toString()
                            }</button>
                        </td>
                    ))}
                </tr>
            ))}
            <Transition appear show={open}>
                <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/25">
                        <div className="flex min-h-full items-center justify-center p-4">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 transform-[scale(95%)]"
                            enterTo="opacity-100 transform-[scale(100%)]"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 transform-[scale(100%)]"
                            leaveTo="opacity-0 transform-[scale(95%)]"
                        >
                            <DialogPanel className={props.dialogClassName}>
                                {props.children(selected, setOpen)}
                            </DialogPanel>
                        </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            
        </>
    )
}