import { useState } from "react"

const players = [
    {player: "Samarth S.", points: 30.8, rebounds: 5.3, assists: 4.2, steals: 1.1, blocks: 2.3},
    {player: "Kaif J.", points: 10.7, rebounds: 12.3, assists: 2.3, steals: 0.1, blocks: 0.3},
    {player: "Bhardwaj T.", points: 32.8, rebounds: 4.1, assists: 5.1, steals: 1.1, blocks: 0.9},
    {player: "Jayanth J.", points: 28.7, rebounds: 10.1, assists: 10.3, steals: 0.1, blocks: 1.9},
    {player: "Rohil K.", points: 18.5, rebounds: 3.3, assists: 3.2, steals: 1.5, blocks: 0.1},
    {player: "Harun M.", points: 5.6, rebounds: 5.5, assists: 0.1, steals: 0.2, blocks: 1.5},
]

players.sort((a, b) => b.points - a.points)

function sortByFilter(header: string) {
    switch(header) {
        case "Points": 
            players.sort((a, b) => (b.points - a.points))
            break
        case "Rebounds": 
            players.sort((a, b) => (b.rebounds - a.rebounds))
            break
        case "Assists": 
            players.sort((a, b) => (b.assists - a.assists))
            break
        case "Steals": 
            players.sort((a, b) => (b.steals - a.steals))
            break
        case "Blocks": 
            players.sort((a, b) => (b.blocks - a.blocks))
            break
    }
}

export default function SortableList() {
    const [filter, setFilter] = useState("Points")
    
    return (
        <div className="flex rounded-lg text-sm ring-1 ring-gray-300 w-full h-full overflow-scroll no-scrollbar">
            <table className="divide-y divide-gray-300 border-separate border-spacing-0 w-full h-fit">
                <thead className="font-semibold sticky top-0 bg-white">
                    <tr>
                        <td className="border-b-[1px] border-b-gray-300 text-gray-900 text-left pl-6 pr-12 py-[0.875rem]">Player</td>
                        {["Points", "Rebounds", "Assists", "Steals", "Blocks"].map((header) => (
                            <td 
                                key={header}
                                className={`border-b-[1px] border-b-gray-300 text-left pl-6 pr-3 py-[0.875rem] transition-all hover:text-blue-600 hover:cursor-pointer ${filter == header ? "text-blue-600" : "text-gray-900"}`}
                                onClick={(e) => {
                                    setFilter(header)
                                    sortByFilter(header)
                                }}
                            >
                                {header}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {players.map((player, index) => index == players.length - 1 ? (
                        <tr key={index}>
                            {Object.keys(player).map((item) => (
                                <td key={item} className="text-gray-700 pl-6 pr-3 py-[0.875rem] text-left">{player[item]}</td>
                            ))}
                        </tr>
                    ) : (
                        <tr key={index}>
                            {Object.keys(player).map((item) => (
                                <td key={item} className="border-b-[1px] border-b-gray-300 text-gray-700 pl-6 pr-3 py-[0.875rem] text-left">{player[item]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}