import { Player } from "@/pages/api/db/players"
import { User } from "@/pages/api/db/users"

interface ConfigProps {
    [s: string]: {
        repr?: (e: any) => string // if first key requires a different representation
        order: string[]
    }
}

export const config: ConfigProps = {
    "players": {
        order: [
            "id", 
            "team",
            "name", 
            "age", 
            "jersey",
            "position",
            "overall",
            "height",
            "weight",
            "wingspan",
            "vertical",
            "draft_round",
            "draft_pick",
            "bg_file",
            "fg_file"
        ]
    },
    "users": {
        order: [
            "id",
            "username",
            "password",
            "name",
            "admin"
        ]
    }
}