import { twMerge } from "tailwind-merge";
import ImageUpload from "../svg/ImageUpload";

interface SelectProps {
    bgName: string
    fileCaptureBg: (e: any) => void
}

export default function StaticCardSelect(props: SelectProps) {
    return (
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
        </>
    )
}