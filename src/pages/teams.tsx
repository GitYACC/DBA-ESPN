import Loading from "@/components/skeleton/Loading";
import Login from "@/components/skeleton/Login";
import Navigation from "@/components/navigation/Navigation";
import Teams from "@/components/teams/Teams";
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation";

export default function League() {
    const query = useSearchParams()
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <Loading />
    }

    if (status == "unauthenticated" && query.get("error")) {
        return <Login unauthenticated />
    }
    
    if (session) {
        return (
            <main className="flex flex-col h-screen w-screen bg-gray-100/50">
                <Navigation session={session}></Navigation>
                <Teams></Teams>
            </main>
        )
    }

    return <Login />
}