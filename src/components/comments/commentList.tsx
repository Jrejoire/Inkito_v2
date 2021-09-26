import CommentBlock from "./commentBlock";
import { observer } from "mobx-react-lite";

interface repliesInterface {
    active_votes: [],
    author: string,
    body: string
    created: string,
    pending_payout_value: string,
    permlink: string,
    profile_image: string,
    replies: any[],
    total_payout_value: string
}

const CommentList = ({ replies }: { replies: repliesInterface[] }) => {

    const List = observer(({ replies }: any) => {
        let comments: any[] = [];

        if (replies && replies.length > 0) {
            replies.forEach((comment: repliesInterface) => {
                comments.push(<CommentBlock key={comment.permlink} comment={comment} />)
            })
        }

        return (
            <ul className="w-full flex flex-col items-end">
                {comments}
            </ul>
        )
    })

    return (
        <List replies={replies} />
    )
}

export default CommentList;