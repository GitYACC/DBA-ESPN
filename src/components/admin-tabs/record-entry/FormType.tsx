import Plus from "@/components/svg/Plus"
import { User } from "@/pages/api/db/users"
import { Switch } from "@headlessui/react"
import { ChangeEvent, Dispatch, Fragment, SetStateAction, useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

interface FormTypeProps {
    selected: string
}

interface DataProps {
    setData: Dispatch<SetStateAction<Object>>
}

interface Dict {
    [key: string]: any
}

interface StackProps {
    label: string
    callbackFn: (name: string, value: string) => any
    data?: any
}

function StackString(props: StackProps) {
    return (
        <div className="flex w-full border">
            <div className="text-sm font-semibold font-mono bg-gray-100 w-48 text-center px-4 py-2 text-gray-800">
                {props.label}
            </div>
            <input 
                name={props.label} 
                className="w-full outline-none pl-4 text-sm" 
                onChange={(e) => props.callbackFn(e.target.name, e.target.value)} 
            />
        </div>
    )
}

function StackNumber(props: StackProps) {
    return (
        <div className="flex w-full border">
            <div className="text-sm font-semibold font-mono bg-gray-100 w-48 text-center px-4 py-2 text-gray-800">
                {props.label}
            </div>
            <input 
                name={props.label} 
                type="number"
                onWheel={(e) => {
                    e.currentTarget.blur()
                    e.stopPropagation()
                }}
                className="w-full outline-none pl-4 text-sm" 
                onChange={(e) => props.callbackFn(e.target.name, e.target.value)} 
            />
        </div>
    )
}

function StackToggle(props: StackProps) {
    const [bool, setBool] = useState(false)

    return (
        <div className="flex w-full">
            <div className="text-sm font-semibold font-mono border bg-gray-100 w-48 text-center px-4 py-2 text-gray-800">{props.label}</div>
            <Switch as={Fragment} checked={bool} onChange={(e) => {
                props.callbackFn(props.label, e.toString())
                setBool(e)
            }}>
            {({ checked, disabled }) => (
                <button
                    className={twMerge(
                        "w-full outline-none",
                        checked && "bg-blue-500",
                        !checked && "bg-orange-500"
                    )}
                >
                    {checked && <span className="text-sm font-semibold text-white">True</span>}
                    {!checked && <span className="text-sm font-semibold text-white">False</span>}
                </button>
            )}
            </Switch>
        </div>
    )
}

function USERS(props: DataProps) {
    const [internal, setInternal] = useState<Dict>({
        username: "",
        password: "",
        name: "",
        admin: false
    })

    function callback(name: string, value: string) {
        setInternal(prev => {
            switch (typeof prev[name]) {
                case "number":
                    prev[name] = parseInt(value)
                    return {...prev}
                case "string":
                    prev[name] = value
                    return {...prev}
                case "boolean":
                    prev[name] = value == "true"
                    return {...prev}
            }
            return {...prev}
        })
    }

    useEffect(() => {
        props.setData(internal)
    }, [internal])

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col w-full h-full p-10 gap-4">
                <div className="flex flex-col w-full">
                    <StackString label="username" callbackFn={callback} />
                    <StackString label="password" callbackFn={callback} />
                    <StackString label="name" callbackFn={callback} />
                </div>
                <StackToggle label="admin" callbackFn={callback} />
            </div>
            <button
                className="flex w-full rounded-lg bg-blue-500 p-3 items-center gap-4 justify-center"
            >
                <Plus className="w-4 h-4 stroke-white fill-white" />
                <span className="text-lg font-semibold text-white">Create Record</span>
            </button>
        </div>
    )
}

function PLAYERS(props: DataProps) {
    const [internal, setInternal] = useState<Dict>({
        id: 0,
        name: "",
        team: 0,
        position: "",
        overall: 0,
        height: 0,
        weight: 0,
        wingspan: 0,
        vertical: 0,
        age: 0,
        jersey: 0,
        draft_round: 0,
        draft_pick: 0,
        fg_file: "b64-string",
        bg_file: "b64-string",
    })

    function callback(name: string, value: string) {
        setInternal(prev => {
            switch (typeof prev[name]) {
                case "number":
                    prev[name] = parseInt(value)
                    return {...prev}
                case "string":
                    prev[name] = value
                    return {...prev}
                case "boolean":
                    prev[name] = value == "true"
                    return {...prev}
            }
            return {...prev}
        })
    }

    useEffect(() => {
        props.setData(internal)
    }, [internal])

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col w-full h-full p-10 overflow-scroll">
                <StackNumber label="id" callbackFn={callback} />
                <StackString label="name" callbackFn={callback} />
                <StackNumber label="team" callbackFn={callback} />
                <StackString label="position" callbackFn={callback} />
                <StackNumber label="overall" callbackFn={callback} />
                <StackNumber label="height" callbackFn={callback} />
                <StackNumber label="weight" callbackFn={callback} />
                <StackNumber label="wingspan" callbackFn={callback} />
                <StackNumber label="vertical" callbackFn={callback} />
                <StackNumber label="age" callbackFn={callback} />
                <StackNumber label="jersey" callbackFn={callback} />
                <StackNumber label="draft_round" callbackFn={callback} />
                <StackNumber label="draft_pick" callbackFn={callback} />
                <StackString label="fg_file" callbackFn={callback} />
                <StackString label="bg_file" callbackFn={callback} />
            </div>
            <div className="flex h-1/4 justify-center items-center">
                <button
                    className="flex w-full rounded-lg bg-blue-500 p-3 items-center gap-4 justify-center"
                >
                    <Plus className="w-4 h-4 stroke-white fill-white" />
                    <span className="text-lg font-semibold text-white">Create Record</span>
                </button>
            </div>
        </div>
    )
}

function TEAMS(props: DataProps) {
    return (
        <div></div>
    )
}

function OVERALLS(props: DataProps) {
    return (
        <div></div>
    )
}


export default function FormType(props: FormTypeProps & DataProps) {
    switch (props.selected) {
        case "users":
            return <USERS setData={props.setData} />
        case "players":
            return <PLAYERS setData={props.setData} />
        case "teams":
            return <TEAMS setData={props.setData} />
        case "overalls":
            return <OVERALLS setData={props.setData} />
        default:
            return <div className="flex h-full justify-center items-center text-gray-800 font-semibold">
                Use Game Entry or Player Statistic
            </div>
    }
}