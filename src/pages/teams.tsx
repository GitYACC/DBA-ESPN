import Loading from "@/components/Loading";
import Login from "@/components/Login";
import Navigation from "@/components/Navigation";
import Teams from "@/components/Teams";
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
            <main className="flex flex-col h-screen w-screen">
                <Navigation session={session}></Navigation>
                <Teams></Teams>
            </main>
        )
    }

    return <Login />
}