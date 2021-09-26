import { useState } from "react";
import Comments from "../../comments/comments";
import { imgify } from "../../../middlewares/imgify";
import { Remarkable } from "remarkable";
import { timeAgo } from "../../../middlewares/format";

const Blog = ({ props, toggleComments }: any) => {
    let { current } = props;
    let [body, setBody] = useState<string>("");
    let [showAll, setShowAll] = useState<boolean>(false);

    const md = new Remarkable({ html: true }).use(imgify);
    let imgRegex = /<p>(https?:\/\/.*\.(?:png|jpg))<\/p>/g;
    let content = body.replace(/(^--.*-$|^\*\*.*\*$|^__.*_$|<hr\/>)/m, '').replace(/<center>\[!\[inkito-banner.png\].*\n*<\/center>$/gm, '').replace(imgRegex, "<img src='$1' alt='blog-page'/>").trim();
    let summary = `${content.slice(0, 1000)}...`;

    const toggleShowAll = () => {
        setShowAll(!showAll);
    }

    if (current) {
        if (current.body !== body) {
            setBody(current.body);
        }
        return (
            <div className="blog flex flex-col absolute w-11/12 h-11/12 p-6 bg-white z-30">
                <div className="flex justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="blog-btnClose w-8 lg:w-10 text-black text-right cursor-pointer z-40"
                        fill="none" viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={toggleComments}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className="blog-mainContent w-auto h-full overflow-y-auto m-3 p-3">
                    <div className="w-11/12 flex flex-row items-center">
                        <h2 className="mr-6 font-bold">{current.title}</h2>
                        <p className="mr-6">published {timeAgo(current.created.slice(0, 10))}</p>
                        <p className="mr-1">by</p>
                        <p className="capitalize">{current.author}</p>
                    </div>
                    <div className="horizontal-divider my-4" />
                    <div className="blog-body" dangerouslySetInnerHTML={{ __html: md.render(showAll ? content : summary) }} />
                    <div className="flex justify-end mr-6">
                        <button className="font-bold text-gray-600 px-2" onClick={toggleShowAll}>
                            {
                                showAll ?
                                    "Show less..."
                                    :
                                    "Show more..."
                            }
                        </button>
                    </div>
                    <Comments current={current} />
                </div>
            </div>
        )
    } else {
        return (
            <div className="blog flex absolute w-screen h-screen bg-black justify-center items-center">
                <div className="loader ease-linear rounded-full border-2 border-t-2 border-gray-400 h-14 w-14"></div>
            </div >
        )
    }
}

export default Blog;