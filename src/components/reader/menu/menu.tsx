import { useState } from "react";
import Bottom from "./bottom/bottom";
import Blog from "./blog";
import Controls from "./controls";
import Top from "./top";

const Menu = (props: any) => {
    let [showMenu, setShowMenu] = useState<boolean>(false);
    let [showComments, setShowComments] = useState<boolean>(false);

    const toggleComments = () => {
        setShowComments(!showComments);
    }

    return (
        <div id="reader-menu" className="fixed top-0 w-full h-full flex flex-col items-center justify-center z-10">
            <Controls go={props.go} config={props.config} />
            <Top props={props} showMenu={showMenu} setShowMenu={(e: boolean) => setShowMenu(e)} />
            {
                showComments ?
                    <Blog props={props} toggleComments={toggleComments} /> :
                    <></>
            }
            <Bottom props={props} showMenu={showMenu} setShowMenu={(e: boolean) => setShowMenu(e)} toggleComments={toggleComments} />
        </div>
    )
}

export default Menu;