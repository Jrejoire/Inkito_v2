import React, { useState } from 'react';

import {
    EmailShareButton,
    FacebookShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    PinterestIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    WhatsappIcon
} from "react-share";

const Share = ({ image, toggleSharing }: { image: string, toggleSharing: any }) => {
    return (
        <div className="absolute bottom-0 h-60 md:h-52 lg:h-44 xl:h-32 flex flex-wrap w-full justify-end pr-28 space-x-2 z-20 bg-white">
            <EmailShareButton url={window.location.href} subject={"Check this out."} body={"Here is a great story I found on Inkito.io"}>
                <EmailIcon size={44} round={true} />
            </EmailShareButton>

            <FacebookShareButton url={window.location.href} quote={"Check this out."} hashtag={"#inkito"}>
                <FacebookIcon size={44} round={true} />
            </FacebookShareButton>

            <TwitterShareButton url={window.location.href} title={"Check this out."} hashtags={["inkito"]} via={"inkito_io"}>
                <TwitterIcon size={44} round={true} />
            </TwitterShareButton>

            <TumblrShareButton url={window.location.href} title={"Check this out."} tags={["inkito"]} caption={"Here is a great story I found on Inkito.io"}>
                <TumblrIcon size={44} round={true} />
            </TumblrShareButton>

            <PinterestShareButton url={window.location.href} media={image} description={"Here is a great story I found on Inkito.io"}>
                <PinterestIcon size={44} round={true} />
            </PinterestShareButton>

            <TelegramShareButton url={window.location.href} title={"Check this out."}>
                <TelegramIcon size={44} round={true} />
            </TelegramShareButton>

            <RedditShareButton url={window.location.href} title={"Check this out."}>
                <RedditIcon size={44} round={true} />
            </RedditShareButton>

            <WhatsappShareButton url={window.location.href} title={"Check this out."}>
                <WhatsappIcon size={44} round={true} />
            </WhatsappShareButton>
            <svg xmlns="http://www.w3.org/2000/svg"
                className="w-10 text-black absolute top-4 right-4 cursor-pointer"
                fill="none" viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={toggleSharing}
            >
                <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
    )
}

export default Share;