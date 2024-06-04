import AdminDashboard from "@/components/admin/AdminDashboard";
import Loading from "@/components/skeleton/Loading";
import Login from "@/components/skeleton/Login";
import Navigation from "@/components/navigation/Navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Admin() {
    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === "loading") {
        return <Loading />
    }

    if (session && (session as any).user.admin) {
        return (
            <main className="flex flex-col h-screen w-screen bg-gray-100/50">
                <Navigation session={session}></Navigation>
                <AdminDashboard />
            </main>
        )
    }

    router.push("/")
}