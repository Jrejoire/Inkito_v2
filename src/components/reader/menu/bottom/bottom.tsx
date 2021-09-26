import Archive from "./archive";
import InteractSection from "./sections/interactSection/interactSection";
import SettingsSection from './sections/settingsSection/settingsSection';
import Share from './share';
import { useEffect, useRef, useState } from 'react';
import VotingSection from './sections/votingSection/votingSection';

const Bottom = ({ props, showMenu, setShowMenu, toggleComments }: any) => {
    let { seriesInfo } = props;

    let [showArchive, setShowArchive] = useState<boolean>(false);
    let [isSharing, setIsSharing] = useState<boolean>(false);

    const timeoutRef = useRef<any>(null);

    useEffect(() => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            if (!showMenu) {
                timeoutRef.current = null;
                setIsSharing(false);
            }
        }, 1200)

    }, [showMenu])




    const toggleSharing = () => {
        setIsSharing(!isSharing);
    }

    return (
        <>
            <div className={`absolute w-full bottom-0 z-20 select-none h-60 md:h-52 lg:h-44 xl:h-32 transition duration-500 ease-in-out text-gray-500 uppercase
            ${showMenu ? "opacity-100" : "opacity-0 delay-1000"}`}
                onMouseOver={() => setShowMenu(true)}
                onMouseLeave={() => { setShowMenu(false) }}
            >
                {
                    isSharing ?
                        <Share image={"https://steemitimages.com/DQmS1EUee1rJFL2EHr3yJVKChJBtkccf2dGDJsAAAn1qBE2/jrej_00.png"} toggleSharing={toggleSharing} /> :
                        <></>
                }
                {
                    showArchive ?
                        <Archive props={props} showMenu={showMenu} hideArchive={() => setShowArchive(false)} />
                        :
                        <div className="w-full h-full flex flex-row flex-wrap justify-around items-center p-0 lg:p-3">
                            <SettingsSection props={props} showArchive={() => setShowArchive(true)} />

                            <div className="vertical-divider hidden lg:block" />

                            <VotingSection props={props} />

                            <div className="vertical-divider hidden lg:block" />

                            <InteractSection seriesInfo={seriesInfo} toggleComments={toggleComments} toggleSharing={toggleSharing} />
                            <div className={`absolute w-full h-full bg-black opacity-80`} />
                        </div>
                }
            </div>
        </>
    )
}

export default Bottom;