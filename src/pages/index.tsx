import HomePage from "@/components/skeleton/HomePage";
import Loading from "@/components/skeleton/Loading";
import Login from "@/components/skeleton/Login";
import Navigation from "@/components/navigation/Navigation";
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation";

export default function Home() {
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
                <HomePage></HomePage>
            </main>
        )
    }

    return <Login />
}
