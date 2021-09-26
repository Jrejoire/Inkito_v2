import { useContext } from "react";
import SubscribeButton from "./buttons/subscribeButton";
import StoreContext from '../../../../../../stores/appStore';
import { toJS } from 'mobx';

interface InteractProps {
    seriesInfo: {
        followers: string[]
    },
    toggleComments: () => void,
    toggleSharing: () => void
}

const InteractSection = ({seriesInfo, toggleComments, toggleSharing}: InteractProps) => {
    const store = useContext(StoreContext) as any;

    return (
        <div className="flex flex-row flex-1 justify-around items-center text-gray-500 z-10 uppercase">
            <span className="flex flex-col justify-center items-center m-2 cursor-pointer hover:text-white group" onClick={toggleComments}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 z-10 stroke-current text-gray-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p className="group-hover:text-white">Comment</p>
            </span>
            <span className=" relative flex flex-col justify-center items-center m-2 cursor-pointer hover:text-white group" onClick={toggleSharing}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 z-10 stroke-current text-gray-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                <p className="group-hover:text-white">Share</p>
            </span>
            <SubscribeButton followers={seriesInfo.followers} username={toJS(store.userDetail) ? store.userDetail.name : ""} />
        </div>
    )
}

export default InteractSection;