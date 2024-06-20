import Ellipsis from "@/components/svg/Ellipsis"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type json = Object;

interface Record<T> {
    name: string
    data: T
    opened?: boolean
}

interface JSONOptions {
    size: "xs" | "sm" | "md" | "lg" | "xl"
    className?: string
}

function String({ children }: { children: ReactNode }) {
    return (
        <div>
            <span className="text-amber-700">&quot;{children}&quot;</span>
        </div>
    )
}

function StringRecord(props: Record<string>) {
    return (
        <div className="flex gap-4 bg-white">
            <span className="text-gray-800">{props.name}:</span>
            <String>{props.data}</String>
        </div>
    )
}

function Number({ children }: { children: ReactNode }) {
    return (
        <div>
            <span className="text-sky-700">{children}</span>
        </div>
    )
}

function NumberRecord(props: Record<number>) {
    return (
        <div className="flex gap-4 bg-white">
            <span className="text-gray-800">{props.name}:</span>
            <Number>{props.data}</Number>
        </div>
    )
}

function Bool({ children }: { children: ReactNode }) {
    return (
        <div>
            <span className="text-yellow-600">{children}</span>
        </div>
    )
}

function BoolRecord(props: Record<boolean>) {
    return (
        <div className="flex gap-4 bg-white">
            <span className="text-gray-800">{props.name}:</span>
            <Bool>{props.data.toString()}</Bool>
        </div>
    )
}

function List(props: Record<Array<any>> & JSONOptions) {
    return (
        <div className={`flex flex-col text-${props.size} bg-white font-mono`}>
            <Disclosure defaultOpen={props.opened}>
                {({ open }) => (
                    <>
                    <DisclosureButton className="flex items-center group">
                        <div className="text-gray-800">
                            <span>{props.name}</span>
                            <span>:</span>
                            <span>{" ["}</span>
                        </div>
                        {open && 
                            <div className="text-2xs text-gray-700 invisible group-hover:visible ml-4">
                                Collapse
                            </div>
                        }
                        {!open &&
                            <>
                                <Ellipsis className={twMerge(
                                    ["xs", "sm"].includes(props.size) && "w-4 h-4",
                                    ["md", "lg"].includes(props.size) && "w-5 h-5",
                                    props.size == "xl" && "w-6 h-6",
                                    "stroke-gray-800 group-hover:stroke-blue-400"
                                )} />
                                <span>{"]"}</span>
                            </>
                        }
                    </DisclosureButton>
                    <DisclosurePanel>
                        {props.data.map((value, index) => {
                            switch (typeof value) {
                                case "string":
                                    return (
                                        <div key={index} className={twMerge(
                                            ["xs", "sm"].includes(props.size) && "pl-4",
                                            ["md", "lg"].includes(props.size) && "pl-8",
                                            props.size == "xl" && "pl-16",
                                        )}>
                                            <String>{value}</String>
                                        </div>
                                    )
                                case "number":
                                    return (
                                        <div key={index} className={twMerge(
                                            ["xs", "sm"].includes(props.size) && "pl-4",
                                            ["md", "lg"].includes(props.size) && "pl-8",
                                            props.size == "xl" && "pl-16",
                                        )}>
                                            <Number>{value}</Number>
                                        </div>
                                    )
                                case "boolean":
                                    return (
                                        <div key={index} className={twMerge(
                                            ["xs", "sm"].includes(props.size) && "pl-4",
                                            ["md", "lg"].includes(props.size) && "pl-8",
                                            props.size == "xl" && "pl-16",
                                        )}>
                                            <Bool>{value.toString()}</Bool>
                                        </div>
                                    )
                                case "object":
                                    return (
                                        <div key={index} className={twMerge(
                                            ["xs", "sm"].includes(props.size) && "pl-4",
                                            ["md", "lg"].includes(props.size) && "pl-8",
                                            props.size == "xl" && "pl-16",
                                        )}>
                                            <JSON 
                                                size={props.size}
                                                data={value}
                                            />
                                        </div>
                                    )
                            }
                        })}
                        <span>{"]"}</span>
                    </DisclosurePanel>
                    </>
                )}
            </Disclosure>
        </div>
    )
}

export default function JSON(props: Partial<Record<json>> & JSONOptions) {
    return (
        <div className={`flex flex-col text-${props.size} bg-white font-mono ${props.className}`}>
            <Disclosure defaultOpen={props.opened}>
                {({ open }) => (
                    <>
                    <DisclosureButton className="flex items-center group">
                        <div className="text-gray-800">
                            {props.name && <>
                                <span>{props.name}</span>
                                <span>:</span>
                            </>}
                            <span>{" {"}</span>
                        </div>
                        {open && 
                            <div className="text-2xs text-gray-700 invisible group-hover:visible ml-4">
                                Collapse
                            </div>
                        }
                        {!open &&
                            <>
                                <Ellipsis className={twMerge(
                                    ["xs", "sm"].includes(props.size) && "w-4 h-4",
                                    ["md", "lg"].includes(props.size) && "w-5 h-5",
                                    props.size == "xl" && "w-6 h-6",
                                    "stroke-gray-800", 
                                    "group-hover:stroke-blue-400"
                                )} />
                                <span>{"}"}</span>
                            </>
                        }
                    </DisclosureButton>
                    <DisclosurePanel>
                        {Object.entries(props.data!).map((value, index) => {
                            if (Array.isArray(value[1])) {
                                return (
                                    <div key={index} className={twMerge(
                                        ["xs", "sm"].includes(props.size) && "pl-4",
                                        ["md", "lg"].includes(props.size) && "pl-8",
                                        props.size == "xl" && "pl-16",
                                    )}>
                                        <List 
                                            size={props.size}
                                            name={value[0]} 
                                            data={value[1]} 
                                        />
                                    </div>
                                )
                            }
                            switch (typeof value[1]) {
                                case "string":
                                    return (
                                        <div key={index} className={twMerge(
                                            ["xs", "sm"].includes(props.size) && "pl-4",
                                            ["md", "lg"].includes(props.size) && "pl-8",
                                            props.size == "xl" && "pl-16",
                                        )}>
                                            <StringRecord 
                                                name={value[0]} 
                                                data={value[1]} 
                                            />
                                        </div>
                                    )
                                case "number":
                                    return (
                                        <div key={index} className={twMerge(
                                            ["xs", "sm"].includes(props.size) && "pl-4",
                                            ["md", "lg"].includes(props.size) && "pl-8",
                                            props.size == "xl" && "pl-16",
                                        )}>
                                            <NumberRecord 
                                                name={value[0]} 
                                                data={value[1]} 
                                            />
                                        </div>
                                    )
                                case "boolean":
                                    return (
                                        <div key={index} className={twMerge(
                                            ["xs", "sm"].includes(props.size) && "pl-4",
                                            ["md", "lg"].includes(props.size) && "pl-8",
                                            props.size == "xl" && "pl-16",
                                        )}>
                                            <BoolRecord 
                                                name={value[0]} 
                                                data={value[1]} 
                                            />
                                        </div>
                                    )
                                case "object":
                                    return (
                                        <div key={index} className={twMerge(
                                            ["xs", "sm"].includes(props.size) && "pl-4",
                                            ["md", "lg"].includes(props.size) && "pl-8",
                                            props.size == "xl" && "pl-16",
                                        )}>
                                            <JSON 
                                                size={props.size}
                                                name={value[0]} 
                                                data={value[1]}
                                            />
                                        </div>
                                    )
                            }
                        })}
                        <span>{"}"}</span>
                    </DisclosurePanel>
                    </>
                )}
            </Disclosure>
        </div>
    )
}