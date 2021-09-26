import { useContext, useEffect, useState } from 'react';
import { autorun } from "mobx";
import StoreContext from '../../../../../../stores/appStore';

interface VotingProps {
    props: {
        actions: {
            vote:() => void,
            toggleAutoVote: () => void
        },
        current: {
            active_votes: string[]
        },
        seriesInfo: {
            ranked: any[],
            voted: number
        },
        userData: any
    }
}

const VotingSection = ({ props }: VotingProps) => {
    let { actions, current, seriesInfo, userData } = props;
    let [voteIsPending, setVotePending] = useState<boolean>(false);
    const store = useContext(StoreContext) as any;

    useEffect(() => autorun(() => {
        if (store.voteState === "pending") {
            setVotePending(true);
        } else {
            setVotePending(false);
        }
    }), [store.voteState]);

    const RankBullets = ({ number, voted }) => {
        let bullets: any[] = [];
        for (let i: number = 0; i < number; i++) {
            if (i < voted) {
                bullets.push(
                    <div key={i} className="border border-gray-500 bg-purple-500 border-1 w-1.5 h-1.5 m-0.5" />
                )
            } else {
                bullets.push(
                    <div key={i} className="border border-gray-500 border-1 w-1.5 h-1.5 m-0.5" />
                )
            }
        }

        return (
            <>
                {bullets}
            </>
        )
    }

    return (
        <div className="flex flex-col flex-auto text-gray-500 z-10 uppercase order-first w-screen lg:order-none lg:flex-1 lg:w-auto justify-around items-center m-2 z-10 cursor-default">
            <div className="flex flex-row w-full justify-around items-center">

                <div className="flex-1 flex-col">
                    <p className="text-center text-sm cursor-default">
                        {
                            current && current.active_votes && current.active_votes.length >= 0 ?
                                current.active_votes.length === 1 ?
                                    `${current.active_votes.length} vote` :
                                    `${current.active_votes.length} votes` :
                                "loading..."
                        }
                    </p>
                </div>

                <div className="vertical-divider" />

                {
                    seriesInfo.ranked && seriesInfo.ranked.length > 0 ?
                        <div className="flex flex-wrap w-5 justify-center">
                            <RankBullets number={seriesInfo.ranked.length} voted={seriesInfo.voted} />
                            <p className="text-xs">{`${seriesInfo.voted}/${seriesInfo.ranked.length}`}</p>
                        </div>
                        :
                        <>
                        </>
                }

                <div className="flex flex-initial flex-row flex-row justify-center items-center">
                    {
                        seriesInfo.ranked && seriesInfo.ranked.length === 0 ?
                            <button className={`flex-1 z-20 text-gray-400 my-2 mx-2 py-1 px-6 rounded bg-gray-600 focus:outline-none cursor-default`} >
                                <p>
                                    VOTE
                                </p>
                            </button>
                            :
                            <>
                                {
                                    voteIsPending ?
                                        <button className={`w-24 h-10 flex-1 flex flex-row justify-center items-center z-20 text-gray-300 my-2 mx-2 rounded bg-purple-700 focus:outline-none cursor-default`}>
                                            <div className="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-6 w-6"></div>
                                        </button>
                                        :
                                        <button className={`w-24 h-10 flex-1 z-20 text-gray-300 my-2 mx-2 rounded 
                                            bg-purple-600 focus:outline-none hover:bg-purple-700 hover:shadow-lg`} 
                                            onClick={actions.vote}
                                        >
                                            <p>
                                                VOTE
                                            </p>
                                        </button>
                                }
                            </>
                    }
                    {/* <button className={`flex-initial bg-transparent hover:bg-gray-500 font-semibold hover:text-white border-2 
                        border-gray-500 hover:border-transparent rounded p-1 m-1 ${userData.autoVoteOn ? "bg-gray-500 text-white" : "text-gray-500"}`} 
                        onClick={actions.toggleAutoVote}
                    >
                    <p className="uppercase text-xs">
                        Auto
                    </p>
                </button> */}
                </div>
                <div className="vertical-divider" />

                <div className="flex flex-row flex-1 justify-center items-center text-sm text-center">
                    <div className="flex flex-col">
                        <p className="cursor-default">
                            Voting
                        </p>
                        <p className="cursor-default">
                            power:
                        </p>
                    </div>
                    <div className="flex flex-col items-center p-2 mx-2">
                        <div className="h-0.5 w-3 bg-white"></div>
                        <div className="h-6 w-4 border boder-2 boder-white rounded flex flex-col-reverse relative">
                            {
                                Math.round(userData.voting_power / 100) < 25 ?
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-3.5 text-white absolute top-0.5 left-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    :
                                    <></>
                            }
                            <div className="bg-purple-500" style={{ height: `${Math.round(userData.voting_power / 100)}%` }} />

                        </div>
                        <p className="text-xs">{Math.round(userData.voting_power / 100)}%</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default VotingSection;