import React, { useEffect, useRef } from 'react';
import handleViewport from 'react-in-viewport';
import { observer } from "mobx-react-lite";

const Pages = ({ config, episode, page, series, toggleRender, setPage, setEpisode }) => {
    const pageRef = useRef(null)
    var leavingPage = false;

    useEffect(() => {
        executeScroll();
    },[episode, page, config.mode])

    const executeScroll = () => {
        let current: any = pageRef.current;
        if (current) {
            current.scrollIntoView()
        }
    }

    const PageTrigger = handleViewport((props: { inViewport: boolean, forwardedRef: any, index: number, pageIndex: number, url: string }) => {
        const { inViewport, forwardedRef, index, pageIndex, url } = props;

        if (inViewport && leavingPage) {
            setEpisode(index);
            setPage(pageIndex);
            leavingPage = false;
        }
        return (
            <div ref={episode === index && page === pageIndex ? pageRef : null}>
                <img ref={forwardedRef} key={url} className={`${index > episode + 1 ? "hidden" : "block"} max-w-full max-h-full h-auto mb-12`} src={url} alt="page" />
            </div>
        )
    });

    const EndTrigger = handleViewport((props: { inViewport: boolean, forwardedRef: any, index: number }) => {
        const { inViewport, forwardedRef, index } = props;

        if (inViewport) {
            setEpisode(index);
        }
        return (
            <h2 ref={forwardedRef} className={`${index < episode - 1 || index > episode + 1 ? "hidden" : "block"} ${config.background === "white" ? "text-black" : "text-white"} mb-12`}>End of episode {index + 1}</h2>
        )
    });


    type RenderProps = {
        toggleRender: boolean
    }

    const PageRenderer = observer(({ toggleRender }: RenderProps) => {
        if (toggleRender && series && series.length > 0) {
            let contentArray: any[] = [];
            for (let i = 0; i < series.length; i++) {
                let images = series[i]?.image;
                let permlink = series[i]?.permlink

                if (series[i]) {
                    contentArray.push(
                        <div key={permlink} className={`flex flex-col items-center`}>
                            <h2 className={`${i > episode + 1 ? "opacity-0" : "opacity-100"} ${config.background === "white" ? "text-black" : "text-white"} mb-12`}>Start of episode {i + 1}</h2>
                            {
                                images ?
                                    images.map((url: string, j: number) => {
                                        return (
                                            <PageTrigger key={url} url={url} index={i} pageIndex={j} onLeaveViewport={() => { leavingPage = true }} />
                                        )
                                    })
                                    :
                                    <></>
                            }
                            <EndTrigger index={i} />
                        </div>
                    )
                }
            }
            if (contentArray && contentArray.length > 0) {
                return (
                    <>
                        {
                            contentArray
                        }
                    </>
                )
            } else {
                return <></>
            }
        } else {
            return <></>
        }
    })


    return (
        <PageRenderer toggleRender={toggleRender} />
    )
}

export default Pages;
