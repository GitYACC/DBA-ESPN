"use client"

import { signIn, useSession } from "next-auth/react"
import { FormEvent, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Router from "next/router"
import axios from "axios"

import LeftArrow from "@/components/svg/LeftArrow"
import Loading from "@/components/Loading"
import { User } from "./api/db/users"
import { Player } from "./api/db/players"
import Link from "next/link"
import UserInfo from "@/components/UserInfo"
import CardInfo from "@/components/CardInfo"

interface StringIndex {
    [s: string]: any
}

function capitalize(s: string | null) {
    if (s)
        return s.charAt(0).toUpperCase() + s.slice(1);
    return s
}

async function authenticate(user: User, player: Player) {
    var result;
    try {
        result = await axios.post(
            "../api/db/users", 
            user
        )
    } catch (error: any) {
        Router.push(`/signup?error=${error.response.data.message}`)
        return
    }

    try {
        await axios.post(
            "../api/db/players",
            {
                ...player, 
                id: result.data.result.id, 
                name: user.name
            }
        )
    } catch (error: any) {
        await axios.delete(
            `../api/db/user?id=${result.data.result.id}`,
        )
        Router.push(`/signup?error=${error.response.data.message}`)
        return
    }

    await signIn("credentials", {
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
        team: 0,
        position: "",
        overall: 99,
        draft_round: 0,
        draft_pick: 0,
        bg_file: "null",
        fg_file: "null"
    } as StringIndex

    for(let item of formData.entries()) {
        switch (item[0]) {
            case "username":
            case "password":
            case "name":
                user[item[0]] = item[1]
                continue
            case "bg_file":
            case "fg_file":
                let string = Buffer
                    .from(await (item[1] as File).text(), "base64")
                    .toString("base64")
                if (string.length > 0)
                    player[item[0]] = item[1]
                else
                    player[item[0]] = Buffer
                        .from("null", "base64")
                        .toString("base64")
                continue
            default:
                player[item[0]] = parseInt(item[1] as string)
        }
    }

    return await authenticate(user as User, player as Player)
}

export default function SignUp() {
    const { data: session, status } = useSession()
    const router = useRouter()

    const url = useSearchParams()
    const [errorStack, setErrorStack] = useState({
        username: false,
        password: false,
        name: false,
        jersey: false,
        attributes: false
    })

    useEffect(() => {
        setErrorStack({
            username: false,
            password: false,
            name: false,
            jersey: false,
            attributes: false
        })
        switch (url.get("error")) {
            case "username is required":
            case "username already exists":
                return setErrorStack(prev => ({...prev, username: true}))
            case "password is required":
                return setErrorStack(prev => ({...prev, password: true}))
            case "name is required":
                return setErrorStack(prev => ({...prev, name: true}))
            case "missing one (or more) attributes":
                return setErrorStack(prev => ({...prev, attributes: true}))
            case "jersey number taken":
                return setErrorStack(prev => ({...prev, jersey: true}))
            default:
                setErrorStack({
                    username: false,
                    password: false,
                    name: false,
                    jersey: false,
                    attributes: false
                })
        }
    }, [url])

    if (status === "loading") {
        return <Loading />
    }
    
    if (!session) {
        return (
            <main className="flex gap-20 justify-center min-h-screen w-full bg-gray-100 overflow-scroll">
                <form 
                    className="flex flex-col rounded-lg border border-gray-900/10 bg-white my-12" 
                    onSubmit={onSubmit}
                >
                    <div className="flex gap-24 p-12">
                        <UserInfo error={errorStack}/>
                        <CardInfo />
                    </div>
                    <div className="flex flex-col items-end gap-4 mt-12 border-t p-6">
                        <div className="flex justify-end items-center gap-10">
                        <Link href="/" className="flex justify-center items-center gap-3 hover:text-blue-700">
                            <LeftArrow className="w-3 h-3"/>
                            Back
                        </Link>
                        <input 
                            type="submit" 
                            className="bg-blue-700 text-white hover:cursor-pointer rounded-lg px-4 py-2"
                        />
                        </div>
                        <div className="text-sm text-red-500">{capitalize(url.get("error"))}</div>
                    </div>
                </form>
            </main>
        )
    }

    router.push("/")
}