import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface LinkProps {
    url?: string,
    className?: string,
    children: ReactNode
}

export default function Link(props: LinkProps) {
    return (
        <a href={props.url ? props.url : "#"}>
            <div className={twMerge(
                "font-semibold cursor-pointer hover:text-blue-600", 
                "transition ease-in-out text-gray-700",
                props.className
            )}>
                {props.children}
            </div>
        </a>
    )
}