import { TabPanel, TabPanels } from "@headlessui/react";
import DatabaseSelect from "./DatabaseSelect";

interface AdminViewProps {
    year: string
    table: string
}

export default function AdminView(props: AdminViewProps) {
    return (
        <TabPanels className="w-4/5 h-full">
            <TabPanel className="w-full h-full">
                <DatabaseSelect selected={props.table} />
            </TabPanel>
            <TabPanel className="w-full h-full">
                Record Entry {props.table}
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