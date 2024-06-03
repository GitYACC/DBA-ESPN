import { TabGroup } from "@headlessui/react"
import AdminSidebar from "./AdminSidebar"
import AdminView from "./AdminView"
import { useState } from "react"

export default function AdminDashboard() {
    const [selectedTable, setSelectedTable] = useState("users")
    const [selectedYear, setSelectedYear] = useState("2024")
    
    return (
        <TabGroup className="flex divide-x w-full h-full overflow-hidden">
            <AdminSidebar 
                setTable={setSelectedTable}
                setYear={setSelectedYear}
            />
            <AdminView 
                year={selectedYear}
                table={selectedTable}
            />
        </TabGroup>
    )
}