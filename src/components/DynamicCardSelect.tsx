import { twMerge } from "tailwind-merge";
import ImageUpload from "./svg/ImageUpload";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface SelectProps {
    bgName: string
    fgName: string
    fileCaptureBg: (e: any) => void
    fileCaptureFg: (e: any) => void
}

export default function DynamicCardSelect(props: SelectProps) {
    return (
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
                                    onChange={props.fileCaptureFg}
                                />
                                <label 
                                    htmlFor="fg_file" 
                                    className="text-sm font-semibold text-blue-700 hover:text-blue-500 hover:cursor-pointer"
                                >
                                    {props.fgName ? props.fgName : "Upload"}
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
                                    onChange={props.fileCaptureBg}
                                />
                                <label 
                                    htmlFor="bg_file" 
                                    className="text-sm font-semibold text-blue-700 hover:text-blue-500 hover:cursor-pointer"
                                >
                                    {props.bgName ? props.bgName : "Upload"}
                                </label>
                                <p className="text-gray-700 text-xs">PNG or JPEG up to 10MB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}