import { TabPanel, TabPanels } from "@headlessui/react";
import DatabaseSelect from "../admin-tabs/database/DatabaseSelect";
import RecordEntry from "../admin-tabs/record-entry/RecordEntry";

interface AdminViewProps {
    year: string
    table: string
    error: {
        message: string
        details: string
    }
}

export default function AdminView(props: AdminViewProps) {
    return (
        <TabPanels className="w-4/5 h-full">
            <TabPanel className="w-full h-full">
                <DatabaseSelect selected={props.table} />
            </TabPanel>
            <TabPanel className="w-full h-full">
                <RecordEntry 
                    selected={props.table} 
                    error={props.error} 
                />
            </TabPanel>
            <TabPanel className="w-full h-full">
                Game Entry {props.year}
            </TabPanel>
            <TabPanel className="w-full h-full">
                Player Statistic {props.year}
            </TabPanel>
        </TabPanels>
    )
}