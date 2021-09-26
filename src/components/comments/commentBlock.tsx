import CommentList from "./commentList";
import EditCommentBlock from "./editCommentBlock";
import { imgify } from "../../middlewares/imgify";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Remarkable } from "remarkable";
import StoreContext from '../../stores/appStore';
import { timeAgo } from "../../middlewares/format";
import { useContext, useState } from "react";
import { toJS } from "mobx";

interface CommentBlockProps {
    comment: {
        active_votes: { voter: string }[],
        author: string,
        body: string
        created: string,
        pending_payout_value: string,
        permlink: string,
        profile_image: string,
        replies: any[],
        total_payout_value: string
    }
}

const CommentBlock = ({ comment }: CommentBlockProps) => {
    let payout = comment.pending_payout_value === "0.000 HBD" ? comment.total_payout_value : comment.pending_payout_value;
    let reward = payout.replace("HBD", "");
    const store = useContext(StoreContext) as any;
    let [activeComment, setActiveComment] = useState<string>("");
    let [editComment, setEditComment] = useState<boolean>(false);
    let [votedComment, setVotedComment] = useState<string>("");

    const md = new Remarkable({ html: true }).use(imgify);

    const toggleActiveComment = (permlink: string) => {
        if (activeComment === permlink) {
            setActiveComment("");
        } else {
            setActiveComment(permlink);
        }
    }

    const toggleEditComment = () => {
        setEditComment(!editComment);
    }

    interface UpdateProps {
        parentAuthor: string,
        parentPermlink: string,
        author: string,
        permlink: string,
        title: string,
        body: string,
        jsonMetadata: string,
        pending_payout_value: string,
        total_payout_value: string,
        created: string,
        active_votes: []
    }

    const updateComment = (payload: UpdateProps, updateSelf: boolean) => {
        if (updateSelf) {
            if (comment && comment.body) {
                comment.body = payload.body;
            }
        } else {
            if (comment && comment.replies) {
                comment.replies.push(payload);
            }
        }
    }

    const handleVote = async (author: string, permlink: string) => {
        setVotedComment(permlink);
        let weight = 10000;
        let voter = store.userDetail.name;
        
        let response = await store.vote(voter, author, permlink, weight, undefined);
        if (response === "done") {
            if (comment && comment.active_votes) {
                let payload = {
                    voter: voter
                }
                comment.active_votes.push(payload);
            }
            setVotedComment("");
        }
    }

    const CommentBody = observer(({ comment }: CommentBlockProps) => {
        return (
            <div className="border border-4 p-4 my-2">
                <div dangerouslySetInnerHTML={{ __html: md.render(comment.body) }} />
            </div>
        )
    })

    return (
        <li className="w-full flex flex-row">
            <Link to={`/@${comment.author}`}>
                <img className="h-16 rounded-full mt-9 mr-4" src={`https://images.hive.blog/u/${comment.author}/avatar` || comment.profile_image} alt={`${comment.author}-avatar`} />
            </Link>
            <div className="flex flex-1 flex-col mx-2 my-6">
                <div className="flex flex-row justify-start mx-2">
                    <p className="capitalize mr-4">
                        <Link to={`/@${comment.author}`}>
                            {comment.author}
                        </Link>
                    </p>
                    <p className="mr-4">{timeAgo(comment.created.slice(0, 10))}</p>
                    {
                        comment.author === store.userDetail.name && !editComment ?
                            <button className="bg-transparent hover:bg-gray-400 text-gray-500 font-semibold 
                            hover:text-white px-2 border border-gray-300 hover:border-transparent rounded"
                                onClick={toggleEditComment}
                            >
                                Edit
                            </button>
                            :
                            <></>
                    }
                </div>

                {
                    !editComment ?
                        <>
                            <CommentBody comment={comment} />
                            <div className="flex flex-row justify-between mx-2 my-1">
                                <div className="flex flex-row justify-start">
                                    <div className="flex justify-center w-12 mr-4">
                                        {
                                            comment.active_votes && comment.active_votes.some(vote => vote.voter === store.userDetail.name) ?
                                                <button className="text-white px-2 rounded bg-purple-600 border border-purple-600 
                                                    focus:outline-none hover:bg-purple-700 hover:shadow-lg"
                                                >   
                                                    Voted
                                                </button>
                                                :
                                                //Should check if voted here.
                                                votedComment === "" ?
                                                    <button className="bg-transparent hover:bg-purple-600 text-purple-700 font-semibold 
                                                    hover:text-white px-2 border border-purple-500 hover:border-transparent rounded"
                                                        onClick={() => { handleVote(comment.author, comment.permlink) }}
                                                    >
                                                        Vote
                                                    </button>
                                                    :
                                                    <div className="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-6 w-6"></div>

                                        }
                                    </div>
                                    <div className="mr-4">
                                        <p>{reward} HBD</p>
                                    </div>

                                    <div className="vote-block flex reset mr-4">
                                        <p>{comment.active_votes.length} votes</p>
                                    </div>
                                </div>
                                {
                                    activeComment !== comment.permlink ?
                                        <button className="bg-transparent hover:bg-indigo-500 text-indigo-600 font-semibold 
                                        hover:text-white px-2 border border-indigo-500 hover:border-transparent rounded"
                                            onClick={() => toggleActiveComment(comment.permlink)}
                                        >
                                            Reply
                                        </button>
                                        :
                                        <></>
                                }
                            </div>
                        </>
                        :
                        <EditCommentBlock commentBody={comment.body} cancelAction={toggleEditComment} parent={comment} updateCb={updateComment} />
                }

                {
                    activeComment === comment.permlink ?
                        <EditCommentBlock commentBody={""} cancelAction={() => toggleActiveComment(comment.permlink)} parent={comment} updateCb={updateComment} />
                        :
                        <></>
                }
                {
                    comment.replies ?
                        <CommentList replies={comment.replies} />
                        :
                        <></>
                }
            </div>
        </li >
    )
}

export default CommentBlock;