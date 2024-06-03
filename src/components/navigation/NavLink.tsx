import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface LinkProps {
    url?: string,
    className?: string,
    children: ReactNode
}

export default function NavLink(props: LinkProps) {
    const url = usePathname()

    return (
        <a href={props.url ? props.url : "#"}>
            <div className={twMerge(
                "font-semibold cursor-pointer hover:text-blue-600", 
                "transition ease-in-out text-gray-700 py-5",
                props.className,
                url == `/${props.children?.toString().toLowerCase()}` && "border-b-2 border-b-blue-500"
            )}>
                {props.children}
            </div>
        </a>
    )
}