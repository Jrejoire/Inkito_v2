import { useContext, useState } from "react";
import Editor from "rich-markdown-editor";
import { safeJSON } from "../../middlewares/json";
import StoreContext from '../../stores/appStore';

const EditCommentBlock = ({ commentBody, cancelAction, updateCb, parent }) => {
    const [editorState, setEditorState] = useState<any>("");
    let [isLoading, setIsLoading] = useState<any>(false);

    const store = useContext(StoreContext) as any;

    const sendAction = async (editorState: string) => {
        if (editorState) {    
            let author = store.userDetail.name;
            let body = editorState;
            let parentAuthor = parent.author;
            let parentPermlink = parent.permlink;
            let tags = safeJSON.parse(parent.json_metadata).tags;
            let jsonMetadata = safeJSON.stringify({ tags, app: 'Inkito' });
            let permlink = "re-" + parent.permlink + "-" + Date.now();
            let title = "";
    
            let payload: any = { parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata }
    
            setIsLoading(true);
            let response = await store.comment(payload);
            
            if (response) {
                setIsLoading(false);
                if (response.status === "success") {
                    cancelAction();
                    payload.json_metadata = payload.jsonMetadata;
                    payload.pending_payout_value = "0.000 HBD";
                    payload.total_payout_value = "0.000 HBD";
                    payload.created = new Date().toISOString();
                    payload.active_votes = [];
                    payload.replies = [];
                    
                    let updateSelf : boolean;
                    if (commentBody) {
                        updateSelf = true;
                        updateCb(payload, updateSelf);
                    } else {
                        updateSelf = false;
                        updateCb(payload, updateSelf);
                    }
                } else {
                    console.log("Something went wrong.")
                }
            }
        }
    };

    return (
        <div className="w-full h-auto mt-6">
            <div className="border border-2 border-indigo-300 px-7 py-2">
                <Editor
                    defaultValue={commentBody}
                    placeholder="Write something nice..."
                    onChange={(e) => { setEditorState(e()) }}
                />
            </div>
            <div className="flex flex-row justify-end my-4">
                <button className="bg-transparent hover:bg-indigo-400 text-indigo-500 font-semibold 
                                        hover:text-white px-2 border border-indigo-400 hover:border-transparent rounded mr-4"
                    onClick={cancelAction}
                >
                    Cancel
                </button>
                {   
                    !isLoading ?
                    <button className={`                  
                    text-white px-4 rounded bg-indigo-500 border border-indigo-500 
                    ${editorState ? "hover:bg-indigo-500 hover:shadow-lg focus:outline-none" : "opacity-50 cursor-not-allowed"}`}
                        onClick={() => sendAction(editorState)}
                    >
                        Send
                    </button>
                    :
                    <p className="text-purple-600">Sending...</p>
                }
            </div>
        </div>
    )
}

export default EditCommentBlock;