import { useEffect, useRef, useState } from 'react';
import { useInViewport } from 'react-in-viewport';
import { observer } from "mobx-react-lite";

const Pages = ({ actions, config, episode, page, series, scrollTrigger }) => {
    const currentPageRef = useRef<any>(null);
    const [updateOnScroll, setUpdateOnScroll] = useState<boolean>(true);

    useEffect(() => {
        setUpdateOnScroll(false);
        executeScroll();
    }, [scrollTrigger]);

    const executeScroll = () => {
        let current: any = currentPageRef.current;
        if (current) {
            current.scrollIntoView();
        }
        setTimeout(() => {
            setUpdateOnScroll(true);
        }, 1000)
    }

    const PageTrigger = (({ index, pageIndex }: { index: number, pageIndex: number }) => {
        const pageRef = useRef(null);

        const { inViewport } = useInViewport(pageRef, {}, { disconnectOnLeave: false }, {});

        if (inViewport) {
            if (updateOnScroll) {
                actions.go.to(index, pageIndex, false);
            }
        }

        return (
            <div ref={pageRef}></div>
        )
    });

    const PageRenderer = observer(({ series }: { series: [{permlink?: string, image? : string[]}] }) => {
        if (series && series.length > 0) {
            let contentArray: any[] = [];

            for (let i = 0; i < series.length; i++) {
                let images = series[i]?.image;
                let permlink = series[i]?.permlink

                if (permlink) {
                    contentArray.push(
                        <div key={permlink} className={`flex flex-col items-center`}>
                            <h2 className={`${i > episode + 1 ? "opacity-0" : "opacity-100"} ${config.background === "white" ? "text-black" : "text-white"} my-6`}>Start of episode {i + 1}</h2>
                            {
                                images ?
                                    images.map((url: string, j: number) => {
                                        return (
                                            <div key={url} className="my-6">
                                                <PageTrigger index={i} pageIndex={j} />
                                                <img ref={episode === i && page === j ? currentPageRef : null} className={`${i > episode + 1 ? "opacity-0" : "opacity-100"} max-w-full max-h-full h-auto my-6`} src={url} alt="page" />
                                            </div>
                                        )
                                    })
                                    :
                                    <></>
                            }
                            <h2 className={`${i < episode - 1 || i > episode + 1 ? "hidden" : "block"} ${config.background === "white" ? "text-black" : "text-white"} my-6`}>End of episode {i + 1}</h2>
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
        <PageRenderer series={series} />
    )
}

export default Pages;
