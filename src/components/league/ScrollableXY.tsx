import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ScrollableXYProps {
    headers: string[]
    children: ReactNode
}

export default function ScrollableXY(props: ScrollableXYProps) {
    return (
        <div className="text-sm w-full h-full overflow-scroll no-scrollbar">
            <table className="divide-y divide-gray-300 border-spacing-0 w-full overflow-scroll">
                <thead>
                    <tr className="font-semibold">
                        <td className={twMerge(
                            "text-gray-900 pl-8 py-[0.875rem]", 
                            "text-left sticky top-0 left-0 z-10 bg-gray-200"
                        )}>{props.headers[0]}</td>
                        {props.headers.slice(1).map((header) => (
                            <td 
                                key={header}
                                className={twMerge(
                                    "sticky top-0 bg-gray-100 px-12 transition-all", 
                                    "text-center"
                                )}
                            >
                                {header}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {props.children}
                </tbody>
            </table>
        </div>
    )
}