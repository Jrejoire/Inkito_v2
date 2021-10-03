import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

interface ArchiveProps {
    props: {
        actions: any,
        series: { image: string[], permlink: string }[],
        episode: number,
        page: number
    },
    showMenu: boolean,
    hideArchive: () => void,
}

const Archive = ({ props, showMenu, hideArchive }: ArchiveProps) => {
    let { actions, series, episode, page } = props;
    let [archiveIndex, setArchiveIndex] = useState<number>(episode);
    let [indexLength, setIndexLength] = useState<number>(0);

    const indexRef = React.useRef<any>(null);
    const containerRef = React.useRef<any>(null);
    const timeoutRef = React.useRef<any>(null);

    useEffect(() => {
        actions.fetchAll();
        setTimeout(() => {
            if (indexRef && indexRef.current && containerRef && containerRef.current) {
                scrollToRef(indexRef, false);
            }
        })
    }, [actions])

    useEffect(() => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            if (!showMenu) {
                timeoutRef.current = null;
                hideArchive();
            }
        }, 1200)
    }, [hideArchive, showMenu])

    useEffect(() => {
        //Update archive index with current page
        let pageCount = 0;
        for (let i = 0; i <= episode; i++) {
            if (series[i] && series[i].image && series[i].image.length > 0) {
                for (let j = 0; j < series[i].image.length; j++) {
                    if (i < episode || j <= page) {
                        pageCount = pageCount + 1;
                    }
                }
            }
        }
        setArchiveIndex(pageCount - 1);
    }, [page, episode, series])

    type RenderProps = {
        series: { image: string[], permlink: string }[],
        archiveIndex: number
    }

    const PageRenderer = observer(({ archiveIndex, series }: RenderProps) => {
        if (series && series.length > 0) {
            let contentArray: any[] = [];
            for (let i = 0; i < series.length; i++) {
                if (series[i] && series[i].image && series[i].image.length > 0) {
                    for (let j = 0; j < series[i].image.length; j++) {
                        let index = contentArray.length;
                        contentArray.push(
                            <div ref={index === archiveIndex ? indexRef : null} key={series[i].permlink + j} className={`flex flex-col h-full w-3/12 mx-1 justify-between items-center cursor-pointer bg-cover`} onClick={() => archiveActions.set(i, j, index)}>
                                <div className="h-full w-auto flex justify-center items-center overflow-hidden mt-0.5">
                                    <img className="w-full h-auto" src={series[i].image[j]} alt="" />
                                </div>
                                <p className={`text-xs p-1 m-1 ${index === archiveIndex ? "bg-purple-600 rounded text-white" : ""}`}>E{i + 1}P{j + 1}</p>
                            </div>
                        )
                    }
                } else {
                    contentArray.push(
                        <div key={i} className="flex flex-col h-full w-3/12 items-center">
                            <div className="w-3/12 h-full bg-white" />
                        </div>
                    )
                }
            }
            if (contentArray && contentArray.length > 0) {
                setIndexLength(contentArray.length)
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

    let scroll: number | null = 0;
    const archiveActions = {
        next: () => {
            if (scroll === 0 || scroll !== containerRef.current.scrollLeft) {
                containerRef.current.scrollTo({
                    top: 0,
                    left: containerRef.current.scrollLeft + 1000,
                    behavior: 'smooth'
                })
                scroll = containerRef.current.scrollLeft;
            }
        },
        previous: () => {
            if (containerRef.current.scrollLeft > 0) {
                containerRef.current.scrollTo({
                    top: 0,
                    left: containerRef.current.scrollLeft - 1000,
                    behavior: 'smooth'
                })
                scroll = containerRef.current.scrollLeft;
            }
        },
        first: () => {
            archiveActions.set(0, 0, 0);
        },
        last: () => {
            let lastEpisode = series.length - 1;
            let lastPage = series[lastEpisode]?.image?.length ? series[lastEpisode]?.image?.length - 1 : 0;
            let lastIndex = indexLength - 1;
            archiveActions.set(lastEpisode, lastPage, lastIndex);
        },
        set: (episode: number, page: number, index: number) => {
            actions.go.to(episode, page, true);
            setArchiveIndex(index);
            setTimeout(() => {
                scrollToRef(indexRef, true);
            })
        }
    }

    const scrollToRef = (ref: any, smooth: boolean) => {
        containerRef.current.scrollTo({
            top: 0,
            left: ref.current.offsetLeft - (window.innerWidth / 2),
            behavior: smooth ? 'smooth' : 'auto'
        })
    }

    return (
        <div className={`w-full h-full relative flex flex-row bg-purple-600 justify-between items-center p-0 lg:p-3 lg:px-10`}>
            <svg xmlns="http://www.w3.org/2000/svg"
                className="w-8 text-white absolute top-2 right-2 cursor-pointer"
                fill="none" viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={hideArchive}
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-14 text-white ml-1 cursor-pointer"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={archiveActions.first}
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
            {
                indexLength > 26 ?
                    <svg
                        className="w-14 cursor-pointer" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        stroke={`white`}
                        onClick={archiveActions.previous}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg> :
                    <></>
            }
            <div ref={containerRef} className="bg-white w-full h-full z-30 flex flex-row overflow-hidden mx-2">
                <PageRenderer archiveIndex={archiveIndex} series={series} />
            </div>
            {
                indexLength > 26 ?
                    <svg
                        className="w-14 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke={`white`}
                        onClick={archiveActions.next}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg> :
                    <></>
            }
            <svg xmlns="http://www.w3.org/2000/svg" className="w-14 mr-1 text-white cursor-pointer" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" onClick={archiveActions.last} >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
        </div>
    )
}

export default Archive;