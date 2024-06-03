import AdminDashboard from "@/components/admin/AdminDashboard";
import Loading from "@/components/skeleton/Loading";
import Login from "@/components/skeleton/Login";
import Navigation from "@/components/navigation/Navigation";
import { useSession } from "next-auth/react";

export default function Admin() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <Loading />
    }

    if (session) {
        return (
            <main className="flex flex-col h-screen w-screen bg-gray-100/50">
                <Navigation session={session}></Navigation>
                <AdminDashboard />
            </main>
        )
    }

    return <Login />
}