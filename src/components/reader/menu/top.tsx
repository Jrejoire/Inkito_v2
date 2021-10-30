import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

interface TopProps {
    props: {
        episode: number,
        page: number,
        seriesInfo: any,
    },
    showMenu: boolean,
    setShowMenu: (arg: boolean) => void,
}

const Top = ({ props, showMenu, setShowMenu }: TopProps) => {
    let { seriesInfo, episode, page } = props;

    const FollowerCount = observer(({ followers }: { followers: string[] }) => {
        if (followers && followers.length > 0) {
            return (
                <p className="text-xs text-gray-300">{`${followers.length} followers`}</p>
            )
        } else {
            return (
                <></>
            )
        }
    })


    return (
        <div
            className={
                `absolute top-0 w-screen z-10 select-none w-11/12 h-20 flex flex-row justify-center items-center transition duration-500 ease-in-out 
                ${showMenu ? "opacity-100" : "opacity-0 delay-1000"}`
            }
            onMouseOver={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
        >
            <div className="flex-1 z-10">
                <h1 className="text-white text-center uppercase">
                    <Link to="/">
                        Inkito
                    </Link>
                </h1>
            </div>


            <div className="w-full flex flex-1 flex-row w-auto justify-center items-center m-2 z-10 text-gray-300">
                <h3 className="uppercase whitespace-nowrap mx-4 text-white">{seriesInfo.title}</h3>

                <div className="flex-row text-gray-400 mx-4 hidden md:flex">
                    {
                        episode + page === 0 ?
                            <p className="mx-1">Cover</p> :
                            <>
                                <div className="flex flex-row">
                                    <p className="mx-1">Episode</p>
                                    <p>{parseInt(episode.toString()) + 1}</p>
                                </div>
                                <div className="flex flex-row">
                                    <p className="mx-1">Page</p>
                                    <p>{parseInt(page.toString()) + 1}</p>
                                </div>
                            </>
                    }
                </div>

            </div>
            <div className="flex flex-1 flex-row mx-4 text-white z-10 justify-center items-center">
                <img className="h-10 rounded-full" src={`https://images.hive.blog/u/${seriesInfo.author}/avatar`} alt="" />
                <div className="flex flex-col justify-center items-start mx-4">
                    <p className="uppercase">{seriesInfo.author}</p>
                    <FollowerCount followers={seriesInfo.followers} />
                </div>
            </div>

            <div className={`absolute w-full h-full bg-black opacity-80`} />
        </div>
    )
}

export default Top;