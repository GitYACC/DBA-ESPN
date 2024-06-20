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
    },
    "stats": {
        order: [
            "id",
            "year",
            "game",
            "points",
            "rebounds",
            "assists",
            "blocks",
            "steals",
            "fgm",
            "fga",
            "ftm",
            "fta",
            "stats_id"
        ]
    },
    "teams": {
        order: [
            "team_id",
            "name",
            "players",
            "wins",
            "loss",
            "overall",
            "gm",
            "coach"
        ]
    },
    "overalls": {
        order: [
            "id",
            "defending",
            "finishing",
            "iq",
            "passing",
            "speed",
            "rebounding",
            "shooting",
            "handling"
        ]
    },
    "games": {
        order: [
            "game_id",
            "game",
            "year",
            "winner",
            "loser",
            "win_score",
            "loss_score"
        ]
    }
}