import CommentList from "./commentList";
import EditCommentBlock from "./editCommentBlock";
import { useEffect, useState } from "react";

interface CommentsProps {
    current: any
}

const Comments = ({ current }: CommentsProps) => {
    let [editComment, setEditComment] = useState<boolean>(false);
    let [isLoading, setIsLoading] = useState<boolean>(false);
    let [hasComment, setHasComment] = useState<boolean>(false);

    useEffect(() => {
        if (current && current.replies === undefined) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
            if (current.replies.length > 0) {
                setHasComment(true);
            } else if (current.replies && current.replies.length === 0) {
                setHasComment(false);
            }
        }
    }, [current, current.replies])

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
            if (current && current.body) {
                current.body = payload.body;
            }
        } else {
            if (current && current.replies) {
                current.replies.push(payload);
            }
        }
    }

    if (current) {
        return (
            <>
                <div className="flex flex-row justify-start font-bold mt-2">
                    <h2>
                        Comments
                    </h2>
                </div>
                <div className="horizontal-divider my-4" />
                <div className="flex flex-row justify-end mr-10">
                    {
                        !editComment ?
                            <button className="bg-transparent hover:bg-indigo-500 text-indigo-600 font-semibold 
                            hover:text-white px-2 border border-indigo-500 hover:border-transparent rounded"
                                onClick={toggleEditComment}
                            >
                                Reply
                            </button>
                            :
                            <></>
                    }
                </div>
                {
                    editComment ?
                        <div className="flex justify-center">
                            <div className="w-11/12">
                                <EditCommentBlock commentBody={""} cancelAction={toggleEditComment} parent={current} updateCb={updateComment} />
                            </div>
                        </div>
                        :
                        <></>
                }
                <div className="flex justify-center">
                    {
                        isLoading ?
                            <div className="w-full flex justify-start">
                                <p>Loading...</p>
                            </div>
                            :
                            hasComment ?
                                <div className="w-11/12">
                                    <CommentList replies={current.replies} />
                                </div>
                                :
                                <div className="w-full flex justify-start">
                                    <p>No comments...</p>
                                </div>
                    }
                </div>
            </>
        )
    } else {
        return (
            <p>Loading...</p>
        )
    }
}

export default Comments;