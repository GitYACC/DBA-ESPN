import { Session } from "next-auth";
import NavLink from "./NavLink";
import Logo from "../svg/Logo";
import { signOut } from "next-auth/react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface NavigationProps {
    session: Session
}

export default function Navigation(props: NavigationProps) {
    return (
        <div className="flex border-b-gray-200 border-b justify-between bg-white">
            <div className="flex px-4 items-center gap-8 w-full">
                <Link href="/" className={twMerge(
                    "flex items-center justify-center", 
                    "px-4 py-1 rounded-md gap-3", 
                    "group transition ease-in-out", 
                    "hover:bg-[#008ff519] hover:cursor-pointer"
                )}>
                    <div className="text-xl font-bold transition ease-in-out text-blue-600">DBA</div>
                    <Logo className="transition ease-in-out w-6 h-6 fill-blue-600"/>
                </Link>
                <NavLink url="/teams">Teams</NavLink>
                <NavLink url="/league">League</NavLink>
                <NavLink url="/season">Season</NavLink>
                {(props.session.user! as any).admin && <NavLink url="/admin">Admin</NavLink>}
            </div>
            <div className="flex flex-row-reverse px-4 w-full items-center gap-8">
                <button onClick={() => signOut()} className="font-bold text-red-500 text-sm py-2 px-2 border-[1px] border-red-100 rounded-md bg-red-100/25 hover:border-red-200 hover:bg-red-100/50">Sign Out</button>
                <div className="text-sm font-bold text-gray-700">{props.session.user?.name}</div>
            </div>
        </div>
    )
}