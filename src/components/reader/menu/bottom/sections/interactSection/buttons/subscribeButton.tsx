import { useContext } from "react";
import { observer } from "mobx-react-lite";
import StoreContext from '../../../../../../../stores/appStore';

const SubscribeButton = observer(({ followers, username }: { followers: string[], username: any }) => {
    const store = useContext(StoreContext) as any;

    const handleFollow = () => {
        //store.follow(store.userDetail.name, store.seriesInfo.author);
    }

    const handleUnfollow = () => {
        //store.unfollow(store.userDetail.name, store.seriesInfo.author);
    }
  
    if (store.seriesInfo.author === username) {
        return (
            <button className={`font-semibold border-2 border-gray-500 rounded p-2 m-2 uppercase text-gray-500 bg-transparent cursor-not-allowed`} >
                <span className="flex flex-row justify-center items-center">
                    <p>Edit content</p>
                </span>
            </button>
        )
    } else if (followers) {
        if (followers.includes(username)) {
            return (
                <button className={`hover:bg-gray-500 font-semibold hover:text-white border-2 border-gray-500 hover:border-transparent rounded p-2 m-2 uppercase text-white bg-gray-500`} onClick={handleFollow}>
                    <span className="flex flex-row justify-center items-center cursor-pointer hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 z-10 stroke-current text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        <p>Subscribed</p>
                    </span>
                </button>
            )
        } else {
            return (
                <button className={`hover:bg-gray-500 font-semibold hover:text-white border-2 border-gray-500 hover:border-transparent rounded p-2 m-2 uppercase text-gray-500 bg-transparent`} onClick={handleUnfollow}>
                    <span className="flex flex-row justify-center items-center cursor-pointer hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 z-10 stroke-current text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        <p>Subscribe</p>
                    </span>
                </button>
            )
        }
    } else {
        return (
            <button className={`hover:bg-gray-500 font-semibold hover:text-white border-2 border-gray-500 hover:border-transparent rounded p-2 m-2 uppercase text-gray-500 bg-transparent`} >
                <span className="flex flex-row justify-center items-center cursor-pointer hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 z-10 stroke-current text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <p>Loading</p>
                </span>
            </button>
        )
    }
})

export default SubscribeButton;