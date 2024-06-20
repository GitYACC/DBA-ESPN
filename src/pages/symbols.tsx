import { ChangeEvent, useState } from "react"
import { symbols } from "./sfsymbols"
import { Select } from "@headlessui/react"
import { twMerge } from "tailwind-merge"

function trim(s: string) {
    if (s.length > 14) {
        return s.slice(0, 14) + "..."
    }
    return s
}

function camelcase(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function Home() {
    const [data, setData] = useState<[string, any][]>(Object.entries(symbols.symbols))
    const [selected, setSelected] = useState<string>("black")

    function copySVG(name: string, svg: typeof symbols.symbols["pencil"]["black"]) {
        let svgName = name.split(".").map((value) => camelcase(value)).join("")
        navigator.clipboard.writeText(
`
interface ${svgName}Props {
    className?: string
}

export default function ${svgName}(props: ${svgName}Props) {
    return (
        <svg className={props.className} viewBox="0 0 ${svg.geometry.width} ${svg.geometry.height}">
            <path d="${svg.path}" />
        </svg>
    )
}
`
        )
    }

    function filter(e: ChangeEvent<HTMLInputElement>) {
        var filtered = Object.entries(symbols.symbols)
            .filter((symbol) => {
                return symbol[0]
                    .replaceAll(".", "")
                    .toString()
                    .toLowerCase()
                    .includes(
                        e.target.value
                        .replaceAll(" ", "")
                        .toString()
                        .toLowerCase()
                    )
            })
        setData(filtered)
    }

    return (
        <main className="flex flex-col w-full h-full">
            <div className="flex justify-center items-center gap-4">
                <input 
                    className="m-10 p-2 pl-4 w-96 border border-gray-300 rounded-lg outline-none text-sm text-gray-900"
                    placeholder="Search..."
                    onChange={filter}
                />
                <div className={twMerge(
                    "flex text-sm font-medium border border-gray-300/75", 
                    "rounded-md w-fit h-fit bg-white pl-2 pr-3 py-2.5", 
                    "justify-center border text-gray-700"
                )}>
                    <Select 
                        name="type" 
                        onChange={(e) => setSelected(e.target.value)}
                        className={"cursor-pointer outline-none"}
                    >
                        <option value={"black"}>Black</option>
                        <option value={"heavy"}>Heavy</option>
                        <option value={"bold"}>Bold</option>
                        <option value={"semibold"}>Semibold</option>
                        <option value={"medium"}>Medium</option>
                        <option value={"regular"}>Regular</option>
                        <option value={"light"}>Light</option>
                        <option value={"thin"}>Thin</option>
                        <option value={"ultralight"}>Ultralight</option>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-12 p-10 gap-4">
            {data.map(([key, value], index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                    <div 
                        className={twMerge(
                            "flex hover:cursor-pointer hover:border border-black", 
                            "w-24 h-24 items-center justify-center rounded-lg"
                        )}
                        onClick={(e) => copySVG(key, value[selected])}
                    >
                        <svg 
                            width={value[selected].geometry.width}
                            height={value[selected].geometry.height}
                        >
                            <path d={value[selected].path} />
                        </svg>
                    </div>
                    <span className="font-semibold text-2xs text-gray-600">{trim(key)}</span>
                </div>
            ))}
            </div>
        </main>
    )
}