"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import Basketball from "./svg/Basketball"
import Lock from "./svg/Lock"
import { twMerge } from "tailwind-merge"


async function authenticate(user: string, password: string, clear?: boolean) {
    if (clear) {
        window.history.replaceState(null, "", window.location.pathname)
    }

    const result = await signIn("credentials", {
        user,
        password
    })

    if(result?.error) {
        console.error("Sign in failed", result.error)
    } else {
        console.log("Sign in successfull, redirect...")
    }
}

interface LoginProps {
    unauthenticated?: boolean
}

export default function Login(props: LoginProps) {
    const [passwordType, setPasswordType] = useState("password")
    const [close, setClose] = useState(true)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    

    return (
        <div 
            className="w-full h-screen flex items-center justify-center bg-gray-100"
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    authenticate(username, password)
                }
            }}
        >
            <div className="flex flex-col gap-10">
            <div className="flex flex-col border rounded-lg shadow-md bg-white">
                <div className="flex flex-col gap-2 px-10 pt-6 pb-3 items-center">
                    <Basketball className="w-10 h-10" fill="fill-blue-400" />
                    <div className="flex gap-2 items-center justify-center">
                        <div className="h-[1px] bg-gray-500 w-12"></div>
                        <span className="font-black px-2 bg-white text-gray-800">DBA</span>
                        <div className="h-[1px] bg-gray-500 w-12"></div>
                    </div>
                </div>
                <div className="flex flex-col px-10 pt-6 pb-3">
                    <span className="text-md text-gray-600 mb-2">Username</span>
                    <input 
                        className={twMerge(
                            "border rounded-md p-1 pl-3 w-80 text-gray-800",
                            props.unauthenticated && "border-red-500"
                        )}
                        onChange={(e) => setUsername(e.target.value)}
                    ></input>
                </div>
                <div className="flex flex-col px-10 pt-3 pb-6">
                    <div className="flex flex-row justify-center items-center text-md text-gray-600 mb-2 w-full">
                        <span className="w-full">Password</span>
                        <a 
                            href="#" 
                            className="flex justify-end text-xs w-full hover:text-blue-400 font-bold"
                            onClick={() => setClose(!close)}
                        >Forgot password?</a>
                    </div>
                    <div className="flex">
                        <input
                            type={passwordType} 
                            className={twMerge(
                                "border-y border-l rounded-l-md p-1 pl-3 text-gray-800 w-full",
                                props.unauthenticated && "border-red-500"
                            )}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <div 
                            onClick={() => {
                                passwordType == "password"
                                ? setPasswordType("text")
                                : setPasswordType("password")
                            }}
                            className={twMerge(
                                "group flex justify-center items-center w-[16%]", 
                                "border rounded-r-md hover:bg-gray-200",
                                props.unauthenticated && "border-red-500"
                            )}>
                            <Lock className="w-5 h-5 fill-gray-400 group-hover:fill-gray-600" />
                        </div>
                    </div>
                </div>
                {props.unauthenticated && <div className="flex px-10">
                    <span className="text-red-500 text-xs">Incorrect username or password</span>
                </div>}
                <div className="flex flex-col px-10 pt-6 pb-10 gap-4">
                    <button 
                        className="bg-blue-600 text-white p-2 rounded-md hover:bg-green-600"
                        onClick={() => authenticate(username, password, props.unauthenticated)}
                    >Sign In</button>
                    <div className="flex text-xs text-gray-600 gap-2">
                        <span>Need an account?</span>
                        <a href="/signup" className="text-indigo-600 hover:text-indigo-400">Register</a>
                    </div>
                </div>
            </div>
            <div className={twMerge(
                "flex text-sm text-gray-600 border rounded-lg bg-white", 
                "shadow-md py-6 font-bold justify-center items-center", 
                close ? "invisible" : ""
            )}>
                lmao i haven&apos;t implemented it yet
            </div>
            
            </div>
        </div>
    )
}