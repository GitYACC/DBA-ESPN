import Feed from "../feed/Feed";
import Game from "../league/Game";
import GameCast from "../league/GameCast";
import SortableList from "../league/SortableList";



export default function HomePage() {
    return (
        <div className="flex h-full justify-center items-center overflow-hidden">
            <div className="flex justify-center items-start h-full w-full">
                <div className="flex flex-col w-2/3 bg-white h-full border-x px-14 py-10 gap-10 overflow-scroll">
                    <div className="flex flex-col gap-10">
                        <div>
                            <div className="text-gray-900 font-semibold text-base">League Leaders</div>
                            <div className="text-gray-700 text-sm mt-2">League leaders are listed as <span className="font-semibold">Top 5</span> in their respective categories</div>
                        </div>
                        <SortableList />
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className="flex flex-col gap-4 mb-10">
                            <div className="text-gray-900 font-semibold text-base">Upcoming Games</div>
                            <Game 
                                team1={{
                                    name: "Cavaliers",
                                    logo: "/cavaliers.png",
                                    wins: 2,
                                    loss: 2
                                }}
                                team2={{
                                    name: "Warriors",
                                    logo: "/warriors.png",
                                    wins: 3,
                                    loss: 1
                                }}
                            />
                            <Game 
                                team1={{
                                    name: "Spurs",
                                    logo: "/spurs.png",
                                    wins: 2,
                                    loss: 2
                                }}
                                team2={{
                                    name: "Warriors",
                                    logo: "/warriors.png",
                                    wins: 3,
                                    loss: 1
                                }}
                            />
                            <Game 
                                team1={{
                                    name: "Cavaliers",
                                    logo: "/cavaliers.png",
                                    wins: 2,
                                    loss: 2
                                }}
                                team2={{
                                    name: "Celtics",
                                    logo: "/celtics.png",
                                    wins: 3,
                                    loss: 1
                                }}
                            />
                            <Game 
                                team1={{
                                    name: "Celtics",
                                    logo: "/celtics.png",
                                    wins: 2,
                                    loss: 2
                                }}
                                team2={{
                                    name: "Warriors",
                                    logo: "/warriors.png",
                                    wins: 3,
                                    loss: 1
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="text-gray-900 font-semibold text-base">Past Games</div>
                            <GameCast 
                                team1={{
                                    name: "Cavaliers",
                                    logo: "/cavaliers.png",
                                    wins: 2,
                                    loss: 2,
                                    score: 101
                                }}
                                team2={{
                                    name: "Warriors",
                                    logo: "/warriors.png",
                                    wins: 3,
                                    loss: 1,
                                    score: 105
                                }}
                            />
                            <GameCast 
                                team1={{
                                    name: "Spurs",
                                    logo: "/spurs.png",
                                    wins: 2,
                                    loss: 2,
                                    score: 105
                                }}
                                team2={{
                                    name: "Celtics",
                                    logo: "/celtics.png",
                                    wins: 3,
                                    loss: 1,
                                    score: 101
                                }}
                            />
                        </div>
                    </div>
                </div>
                <Feed />
            </div>
        </div>
    )
}