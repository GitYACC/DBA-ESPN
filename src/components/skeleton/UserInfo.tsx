import { useState } from "react"

import Input from "./Input"
import Lock from "../svg/Lock"

interface ErrorStack {
    username: boolean
    password: boolean
    name: boolean
    jersey: boolean
    attributes: boolean
}

interface UserInfoProps {
    error: ErrorStack
}

export default function UserInfo(props: UserInfoProps) {
    const [passwordType, setPasswordType] = useState("password")

    return (
        <div className="flex flex-col">
            <div className="space-y-12">
                <div className="pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed on your player profile
                    </p>
                </div>
            </div>
            <div className="flex gap-8 w-[36rem]">
                <div className="w-full">
                    <Input 
                        id="username"
                        placeholder="Username"
                        deps={{
                            "ring-red-500": props.error.username
                        }}
                    >
                        Username
                    </Input>
                </div>
                <div className="w-full">
                    <Input 
                        id="password"
                        type={passwordType}
                        placeholder="Password"
                        icon={
                            <div className="group hover:cursor-pointer" onClick={() => {
                                passwordType == "password"
                                ? setPasswordType("text")
                                : setPasswordType("password")
                            }}>
                                <Lock 
                                    className="w-4 h-4 fill-gray-400 group-hover:fill-gray-600" 
                                />
                            </div>
                        }
                        deps={{
                            "ring-red-500": props.error.password
                        }}
                    >
                        Password
                    </Input>
                </div>
            </div>
            <div className="flex gap-8 mt-10">
                <div className="w-full">
                    <Input 
                        id="name"
                        placeholder="Full Name"
                        deps={{
                            "ring-red-500": props.error.name
                        }}
                    >
                        Full Name
                    </Input>
                </div>
                <div className="flex w-full gap-8">
                    <div className="w-1/3">
                        <Input 
                            id="age"
                            type="number"
                            placeholder="1"
                            maxLength={3}
                            deps={{
                                "ring-red-500": props.error.attributes
                            }}
                        >
                            Age
                        </Input>
                    </div>
                    <div className="w-1/3">
                        <Input 
                            id="jersey"
                            type="number"
                            inline="#"
                            placeholder="1"
                            maxLength={2}
                            deps={{
                                "ring-red-500": props.error.jersey
                            }}
                        >
                            Jersey
                        </Input>
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <div className="pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Physical Stats</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This will be stored on your player profile
                    </p>
                </div>
            </div>
            <div className="flex gap-8 w-[36rem] mb-12">
                <div className="w-full">
                    <Input 
                        id="height" 
                        type="number" 
                        icon="in." 
                        placeholder="65" 
                        maxLength={2}
                        deps={{
                            "ring-red-500": props.error.attributes
                        }}
                    >
                        Height
                    </Input>
                </div>
                <div className="w-full">
                    <Input 
                        id="weight" 
                        type="number"
                        icon="lbs" 
                        placeholder="135" 
                        maxLength={3}
                        deps={{
                            "ring-red-500": props.error.attributes
                        }}
                    >
                        Weight
                    </Input>
                </div>
            </div>
            <div className="flex gap-8 w-[36rem]">
                <div className="w-full">
                    <Input 
                        id="vertical" 
                        type="number"
                        icon="in." 
                        placeholder="24" 
                        maxLength={2}
                        deps={{
                            "ring-red-500": props.error.attributes
                        }}
                    >
                        Vertical
                    </Input>
                </div>
                <div className="w-full">
                    <Input 
                        id="wingspan" 
                        type="number"
                        icon="in." 
                        placeholder="70" 
                        maxLength={2}
                        deps={{
                            "ring-red-500": props.error.attributes
                        }}
                    >
                        Wingspan
                    </Input>
                </div>
            </div>
        </div>
    )
}