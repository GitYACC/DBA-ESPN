"use client"

import { signIn, useSession } from "next-auth/react"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { twMerge } from "tailwind-merge"
import axios from "axios"

import Lock from "@/components/svg/Lock"
import ImageUpload from "@/components/svg/ImageUpload"
import DynamicFaceCard from "@/components/DynamicFaceCard"
import StaticFaceCard from "@/components/StaticFaceCard"
import LeftArrow from "@/components/svg/LeftArrow"
import Loading from "@/components/Loading"
import { User } from "./api/db/users"
import { Player } from "./api/db/players"
import Link from "next/link"

interface StringIndex {
    [s: string]: any
}

async function authenticate(user: User, player: Player) {
    const res = await axios.post(
        "../api/db/users", 
        user
    )

    const user_id = res.data.result.id

    console.log(user)
    console.log({...player, id: user_id, name: user.name})

    const profile = await axios.post(
        "../api/db/players",
        {...player, id: user_id, name: user.name}
    )

    const result = await signIn("credentials", {
        callbackUrl: "/",
        username: user.username,
        password: user.password
    })
}

const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    let user = {} as StringIndex
    let player = {
        team: 1,
        position: "SG",
        overall: 99,
        draft_round: 1,
        draft_pick: 1,
        bg_file: "null",
        fg_file: "null"
    } as StringIndex

    for(let item of formData.entries()) {
        if (["username", "password", "name"].includes(item[0])) {
            user[item[0]] = item[1]
        } else {
            if (!(item[1] instanceof File) && !Number.isNaN(parseInt(item[1]))) {
                player[item[0]] = parseInt(item[1])
            } else if (item[1] instanceof File) {
                let string = Buffer.from(await (item[1] as File).text(), "base64").toString("base64")
                if (string.length > 0) {
                    player[item[0]] = string
                } else {
                    player[item[0]] = "null"
                }
            } else {
                player[item[0]] = item[1]
            }
        }
    }

    await authenticate(user as User, player as Player)
}

export default function SignUp() {
    const { data: session, status } = useSession()
    const router = useRouter()

    const [passwordType, setPasswordType] = useState("password")
    const [fgName, setFgName] = useState('')
    const [bgName, setBgName] = useState('')
    const [cardType, setCardType] = useState("static")

    const [submittable, setSubmittable] = useState(true)
    const [errorStack, setErrorStack] = useState({
        "username": false,
        "jersey": false
    })

    const fileCaptureFg = (e: any) => {
        const selectedFile: File = e.target.files[0]
        setFgName(selectedFile.name)
    }
    
    const fileCaptureBg = (e: any) => {
        const selectedFile: File = e.target.files[0]
        setBgName(selectedFile.name)
    }


    const checkUser = async (e: any) => {
        const value = e.target.value
        const res = await axios.post(
            "http://localhost:3000/api/db/users?_existence=true",
            {
                username: value
            }
        )

        if (res.data.result != null) {
            setSubmittable(true)
            setErrorStack(prev => ({"username": true, "jersey": prev.jersey}))
            return
        }

        setSubmittable(false)
        setErrorStack(prev => ({"username": false, "jersey": prev.jersey}))
    }

    const checkJersey = async (e: any) => {
        const value = e.target.value ? e.target.value : 0
        const res = await axios.post(
            "http://localhost:3000/api/db/players?_existence=true",
            {
                jersey: parseInt(value as string)
            }
        )

        if (res.data.result != null) {
            setSubmittable(true)
            setErrorStack(prev => ({"username": prev.username, "jersey": true}))
            return
        }

        setSubmittable(false)
        setErrorStack(prev => ({"username": prev.username, "jersey": false}))
    }


    if (status === "loading") {
        return <Loading />
    }
    
    if (!session) {
        return (
            <main className="flex gap-20 justify-center min-h-screen w-full bg-gray-100">
                <form className="flex flex-col rounded-lg p-12 border border-gray-900/10 bg-white my-12" onSubmit={onSubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                This information will be displayed on your player profile
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-8 w-[36rem] mt-10">
                        <div className="w-full">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <div className={twMerge(
                                        "flex rounded-md shadow-sm ring-1 ring-inset",
                                        "ring-gray-300 focus-within:ring-2 focus-within:ring-inset pl-3",
                                        errorStack.username && "ring-red-500"
                                    )}>
                                        <input 
                                            type="text" 
                                            name="username" 
                                            id="username" 
                                            autoComplete="username" 
                                            className={twMerge(
                                                "outline-none block flex-1 text-sm border-0 bg-transparent",
                                                "py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                                            )} 
                                            placeholder="Username" 
                                            onChange={checkUser}
                                        />
                                    </div>
                                </div>
                            </div>
                            {errorStack.username && <div className="flex justify-start text-xs text-red-500 mt-2">Username taken</div>}
                        </div>
                        <div className="w-full">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <div className={twMerge(
                                        "flex items-center rounded-md shadow-sm ring-1 ring-inset", 
                                        "ring-gray-300 focus-within:ring-2 focus-within:ring-inset pl-3"
                                    )}>
                                        <input 
                                            type={passwordType} 
                                            name="password" 
                                            id="password" 
                                            autoComplete="password" 
                                            className={twMerge(
                                                "outline-none block flex-1 text-sm border-0 bg-transparent", 
                                                "py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                                            )} 
                                            placeholder="Password" 
                                        />
                                        <div className="mr-3 group hover:cursor-pointer" onClick={() => {
                                            passwordType == "password"
                                            ? setPasswordType("text")
                                            : setPasswordType("password")
                                        }}>
                                            <Lock className="w-4 h-4 fill-gray-400 group-hover:fill-gray-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-8 mt-10">
                        <div className="w-full">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Full Name
                                </label>
                                <div className="mt-2">
                                    <div className={twMerge(
                                        "flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300", 
                                        "pl-3 focus-within:ring-2 focus-within:ring-inset"
                                    )}>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            id="name" 
                                            autoComplete="name" 
                                            className={twMerge(
                                                "outline-none block flex-1 text-sm text-gray-700 border-0", 
                                                "bg-transparent py-2 placeholder:text-gray-400 focus:ring-0"
                                            )} 
                                            placeholder="Full Name" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full gap-8">
                            <div className="w-1/3">
                                <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">Age</label>
                                <div className="mt-2">
                                    <div className={twMerge(
                                        "flex rounded-md shadow-sm ring-1 ring-inset", 
                                        "ring-gray-300 focus-within:ring-2 focus-within:ring-inset"
                                    )}>
                                        <input 
                                            type="text" 
                                            name="age" 
                                            id="age" 
                                            autoComplete="age" 
                                            className={twMerge(
                                                "outline-none block flex-1 text-sm border-0 bg-transparent", 
                                                "pl-3 w-1", // for whatever reason this width corrects alignment
                                                "py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0" 
                                            )}
                                            placeholder="1"
                                            maxLength={3} 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/3">
                                <label htmlFor="jersey" className="block text-sm font-medium leading-6 text-gray-900">Jersey</label>
                                <div className="mt-2">
                                    <div className={twMerge(
                                        "flex rounded-md shadow-sm ring-1 ring-inset", 
                                        "ring-gray-300 focus-within:ring-2 focus-within:ring-inset",
                                        errorStack.jersey && "ring-red-500"
                                    )}>
                                        <span className="flex select-none items-center pl-3 text-gray-500">#</span>
                                        <input 
                                            type="text" 
                                            name="jersey" 
                                            id="jersey" 
                                            autoComplete="jersey" 
                                            className={twMerge(
                                                "outline-none block flex-1 text-sm bg-transparent w-1/3", 
                                                "py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0" 
                                            )}
                                            placeholder="1" 
                                            maxLength={3} 
                                            onChange={checkJersey}
                                        />
                                    </div>
                                </div>
                                {errorStack.jersey && <div className="flex justify-start text-xs text-red-500 text-nowrap mt-2">Jersey number taken</div>}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-12 my-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Physical Stats</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                This will be stored on your player profile
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-8 w-[36rem] mb-12">
                        <div className="w-full">
                            <div>
                                <label htmlFor="height" className="block text-sm font-medium leading-6 text-gray-900">
                                    Height
                                </label>
                                <div className="mt-2">
                                    <div className={twMerge(
                                        "flex items-center rounded-md shadow-sm ring-1 ring-inset",
                                        "ring-gray-300 focus-within:ring-2 focus-within:ring-inset pl-3"
                                    )}>
                                        <input 
                                            type="text" 
                                            name="height" 
                                            id="height" 
                                            autoComplete="height" 
                                            className={twMerge(
                                                "outline-none block flex-1 text-sm border-0 bg-transparent",
                                                "py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                                            )} 
                                            placeholder="65"
                                            maxLength={2}
                                        />
                                        <div className="mr-3 text-sm text-gray-400">
                                            in.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div>
                                <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-900">
                                    Weight
                                </label>
                                <div className="mt-2">
                                    <div className={twMerge(
                                        "flex items-center rounded-md shadow-sm ring-1 ring-inset", 
                                        "ring-gray-300 focus-within:ring-2 focus-within:ring-inset pl-3"
                                    )}>
                                        <input 
                                            type="text" 
                                            name="weight" 
                                            id="weight" 
                                            autoComplete="weight" 
                                            className={twMerge(
                                                "outline-none block flex-1 text-sm border-0 bg-transparent", 
                                                "py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                                            )} 
                                            placeholder="135"
                                            maxLength={3}
                                        />
                                        <div className="mr-3 text-sm text-gray-400">
                                            lbs
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-8 w-[36rem]">
                        <div className="w-full">
                            <div>
                                <label htmlFor="vertical" className="block text-sm font-medium leading-6 text-gray-900">
                                    Vertical
                                </label>
                                <div className="mt-2">
                                    <div className={twMerge(
                                        "flex items-center rounded-md shadow-sm ring-1 ring-inset",
                                        "ring-gray-300 focus-within:ring-2 focus-within:ring-inset pl-3"
                                    )}>
                                        <input 
                                            type="text" 
                                            name="vertical" 
                                            id="vertical" 
                                            autoComplete="vertical" 
                                            className={twMerge(
                                                "outline-none block flex-1 text-sm border-0 bg-transparent",
                                                "py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                                            )} 
                                            placeholder="24"
                                            maxLength={2}
                                        />
                                        <div className="mr-3 text-sm text-gray-400">
                                            in.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div>
                                <label htmlFor="wingspan" className="block text-sm font-medium leading-6 text-gray-900">
                                    Wingspan
                                </label>
                                <div className="mt-2">
                                    <div className={twMerge(
                                        "flex items-center rounded-md shadow-sm ring-1 ring-inset", 
                                        "ring-gray-300 focus-within:ring-2 focus-within:ring-inset pl-3"
                                    )}>
                                        <input 
                                            type="text" 
                                            name="wingspan" 
                                            id="wingspan" 
                                            autoComplete="wingspan" 
                                            className={twMerge(
                                                "outline-none block flex-1 text-sm border-0 bg-transparent", 
                                                "py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                                            )} 
                                            placeholder="70"
                                            maxLength={2}
                                        />
                                        <div className="mr-3 text-sm text-gray-400">
                                            in.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12">
                        <div className="pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Player Card
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                You can choose two different player cards to represent your player profile
                            </p>
                        </div>
                    </div>
                    <div className="flex border border-gray-900/10 rounded-lg py-6 bg-cyan-100/25">
                        <div className="flex justify-center w-full">
                            <div className="flex flex-col gap-4">
                                <span 
                                    onClick={() => setCardType("dynamic")}
                                    className={twMerge(
                                        "flex justify-center items-center w-full", 
                                        "text-lg font-semibold text-gray-700", 
                                        "hover:cursor-pointer border", 
                                        "border-gray-900/10 rounded-lg", 
                                        cardType == "dynamic" && "bg-blue-700 text-white",
                                        cardType != "dynamic" && "hover:bg-gray-100"
                                    )}
                                >
                                    Dynamic
                                </span>
                                <DynamicFaceCard
                                    teamImg="/trojans.png"
                                    playerFg="/cwill_fg.png"
                                    playerBg="/cwill_bg.png"
                                    number={13}
                                >
                                    Caleb Williams
                                </DynamicFaceCard>
                                <span className="flex justify-center items-center w-full text-xs text-gray-500">
                                    Hover over me!
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-center w-full">
                            <div className="flex flex-col gap-4">
                                <span 
                                    onClick={() => setCardType("static")}
                                    className={twMerge(
                                        "flex justify-center items-center w-full text-lg", 
                                        "font-semibold text-gray-700 hover:cursor-pointer", 
                                        "border border-gray-900/10 rounded-lg",
                                        cardType == "static" && "bg-blue-700 text-white",
                                        cardType != "static" && "hover:bg-gray-100"
                                    )}
                                >
                                    Static
                                </span>
                                <StaticFaceCard
                                    teamImg="/trojans.png"
                                    playerBg="/cwill_bg.png"
                                    number={13}
                                >
                                    Caleb Williams
                                </StaticFaceCard>
                            </div>
                        </div>
                    </div>
                    {cardType == "dynamic" && (
                    <>
                    <div className="mt-12">
                        <div>
                            <p className="mt-1 text-sm w-[36rem] leading-6 text-gray-600">
                                <span>
                                    To set a dynamic player card for your profile, 
                                    you will need to upload two images. 
                                    One image will be the normal image (which will be your background) 
                                    and the other image will be the same image, but with the background removed
                                    (which will be your foreground). 
                                    Here&apos;s a
                                </span>
                                <Link className="text-blue-700 hover:underline px-1" href="https://www.remove.bg/" target="_blank">
                                    tool
                                </Link> 
                                <span>to help with that</span>
                            </p>
                            
                        </div>
                    </div>
                    <div className="flex gap-6 mt-12 w-full">
                        <div className="w-full flex flex-col gap-6">
                            <span className="flex justify-center text-lg font-semibold text-gray-700">
                                Foreground
                            </span>
                            <div className={twMerge(
                                "flex border border-dashed border-gray-900/10 rounded-lg", 
                                "py-6 bg-cyan-100/25 justify-center items-center"
                            )}>
                                <div className="flex flex-col gap-4 justify-center items-center">
                                    <ImageUpload
                                        className="h-12 w-12 fill-gray-300"
                                    />
                                    <div className="relative flex flex-col justify-center items-center gap-1">
                                        <input 
                                            type="file" 
                                            name="fg_file" 
                                            id="fg_file" 
                                            accept="image/png,image/jpeg" 
                                            className="sr-only" 
                                            onChange={fileCaptureFg}
                                        />
                                        <label 
                                            htmlFor="fg_file" 
                                            className="text-sm font-semibold text-blue-700 hover:text-blue-500 hover:cursor-pointer"
                                        >
                                            {fgName ? fgName : "Upload"}
                                        </label>
                                        <p className="text-gray-700 text-xs">PNG or JPEG up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-6">
                            <span className="flex justify-center text-lg font-semibold text-gray-700">Background</span>
                            <div className={twMerge(
                                "flex border border-dashed border-gray-900/10 rounded-lg", 
                                "py-6 bg-cyan-100/25 justify-center items-center"
                            )}>
                                <div className="flex flex-col gap-4 justify-center items-center">
                                    <ImageUpload
                                        className="h-12 w-12 fill-gray-300"
                                    />
                                    <div className="relative flex flex-col justify-center items-center gap-1">
                                        <input 
                                            type="file" 
                                            name="bg_file" 
                                            id="bg_file" 
                                            accept="image/png,image/jpeg" 
                                            className="sr-only" 
                                            onChange={fileCaptureBg}
                                        />
                                        <label 
                                            htmlFor="bg_file" 
                                            className="text-sm font-semibold text-blue-700 hover:text-blue-500 hover:cursor-pointer"
                                        >
                                            {bgName ? bgName : "Upload"}
                                        </label>
                                        <p className="text-gray-700 text-xs">PNG or JPEG up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>)}
                    {cardType == "static" && (
                    <>
                    <div className="mt-12">
                        <div>
                            <p className="mt-1 text-sm w-[36rem] leading-6 text-gray-600">
                                To set a static player card for your profile, 
                                you just need to upload one image (which will be your background)
                            </p>
                            
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-6 mt-12 w-full">
                        <span className="flex justify-center text-lg font-semibold text-gray-700">
                            Background
                        </span>
                        <div className={twMerge(
                            "flex border border-dashed border-gray-900/10 rounded-lg", 
                            "py-6 bg-cyan-100/25 justify-center items-center"
                        )}>
                            <div className="flex flex-col gap-4 justify-center items-center">
                                <ImageUpload
                                    className="h-12 w-12 fill-gray-300"
                                />
                                <div className="relative flex flex-col justify-center items-center gap-1">
                                    <input 
                                        type="file" 
                                        name="bg_file" 
                                        id="bg_file" 
                                        accept="image/png,image/jpeg" 
                                        className="sr-only" 
                                        onChange={fileCaptureBg}
                                    />
                                    <label 
                                        htmlFor="bg_file" 
                                        className="text-sm font-semibold text-blue-700 hover:text-blue-500 hover:cursor-pointer"
                                    >
                                        {bgName ? bgName : "Upload"}
                                    </label>
                                    <p className="text-gray-700 text-xs">PNG or JPEG up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>)}
                    <div className="flex justify-end items-center gap-10 mt-12">
                        <Link href="/" className="flex justify-center items-center gap-3 hover:text-blue-700">
                            <LeftArrow className="w-3 h-3"/>
                            Back
                        </Link>
                        <input 
                            type="submit" 
                            className="bg-blue-700 text-white hover:cursor-pointer rounded-lg px-4 py-2" 
                            disabled={submittable}
                        />
                    </div>
                    {submittable && <div className="flex justify-end mt-4 text-xs text-red-500">One or more fields are missing/incorrect</div>}
                </form>
            </main>
        )
    }

    router.push("/")
}