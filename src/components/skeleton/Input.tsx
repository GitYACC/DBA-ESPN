import { InputHTMLAttributes, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface Dependency {
    [s: string]: boolean
}

interface InputProps {    
    id: string
    inline?: string | ReactNode
    icon?: string | ReactNode
    deps?: Dependency
    className?: string
    children: ReactNode
}

export default function Input(props: InputProps & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div>
            <label htmlFor={props.id} className="block text-sm font-medium leading-6 text-gray-900">
                {props.children}
            </label>
            <div className="mt-2">
                <div className={twMerge(
                    "flex items-center rounded-md shadow-sm ring-1 ring-inset",
                    "ring-gray-300 focus-within:ring-2 focus-within:ring-inset pl-3",
                    props.className,
                    ...Object.keys((props.deps ? props.deps : {}) as Object)
                    .map((dep) => props.deps![dep] && dep)
                    
                )}>
                    {props.inline && 
                        <div className="flex items-center pr-1 text-sm text-gray-500">
                            {props.inline}
                        </div>
                    }
                    <input 
                        type={props.type ? props.type : "text"}
                        name={props.id} 
                        id={props.id} 
                        autoComplete={props.id} 
                        className={twMerge(
                            "outline-none block flex-1 text-sm border-0 bg-transparent",
                            "py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 w-full"
                        )} 
                        placeholder={props.placeholder}
                        maxLength={props.maxLength}
                        onChange={props.onChange}
                    />
                    {props.icon && 
                        <div className="mx-3 text-sm text-gray-500">
                            {props.icon}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}