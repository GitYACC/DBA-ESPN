import { AxiosError } from "axios"
import JSON from "./JSON"
import { useEffect, useState } from "react"
import FormType from "./FormType"

interface RecordEntryProps {
    selected: string
    error: {
        message: string
        details: string
    }
}


export default function RecordEntry(props: RecordEntryProps) {
    const [data, setData] = useState<Object>({})

    return (
        <div className="flex w-full h-full">
            <div className="flex w-1/2 h-full bg-white p-20 border-r justify-start items-start text-nowrap overflow-x-scroll">
                <JSON opened size="xl" data={data}/>
            </div>
            <div className="w-1/2 h-full bg-white border-l p-10">
                <FormType selected={props.selected} setData={setData} />
            </div>
        </div>
    )
}