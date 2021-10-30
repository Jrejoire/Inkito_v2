import { useEffect, useRef } from 'react';
import { observer } from "mobx-react-lite";

const Pages = ({ actions, config, episode, page, series, scrollTrigger }) => {
    const currentPageRef = useRef<any>(null);
    let updateState = useRef<boolean>(true);

    const isElementInViewport = (el: HTMLElement) => {
        var rect = el.getBoundingClientRect();

        return (
            (
                rect.top >= 0 &&
                rect.top < (window.innerHeight || document.documentElement.clientHeight)
            )
            ||
            (
                rect.top <= 0 &&
                rect.bottom >= 0
            )
        );
    }

    useEffect(() => {
        const firstPageInViewport = () => {
            let inViewPort: any[] = [];
            let elements: HTMLCollection = document.getElementsByClassName("pages-content");
            let elementsArray: HTMLElement[] = [].slice.call(elements);
            for (let element of elementsArray) {
                let isInView: boolean = isElementInViewport(element);
                if (isInView) {
                    inViewPort.push(element);
                }
            }

            return inViewPort[0];
        }

        const onScroll = () => {
            console.log(updateState.current);
            if (updateState.current) {
                console.log("SCROLLING TRIGGER")
                updateState.current = false;
                let topInView = firstPageInViewport();
                if (topInView) {
                    let topClassName = topInView.className;
                    let regex = /episode-(\d+).*page-(\d+)/
                    let matches = topClassName.match(regex);
                    let currentEpisode = matches[1]
                    let currentPage = matches[2]

                    actions.go.to(currentEpisode, currentPage, false);
                }
                setTimeout(() => {
                    updateState.current = true;
                }, 500)
            }
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [actions.go]);

    useEffect(() => {
        console.log("SCROLL");
        updateState.current = false;
        executeScroll();
        setTimeout(() => {
            updateState.current = true;
        }, 500)
    }, [scrollTrigger]);

    const executeScroll = () => {
        let current: any = currentPageRef.current;
        if (current) {
            current.scrollIntoView();
        }
    }

    const PageRenderer = observer(({ series }: { series: [{ permlink?: string, image?: string[] }] }) => {
        if (series && series.length > 0) {
            let contentArray: any[] = [];

            for (let i = 0; i < series.length; i++) {
                let images = series[i]?.image;
                let permlink = series[i]?.permlink

                if (permlink) {
                    contentArray.push(
                        <div id={`episode${i}`} key={permlink} className={`episode-block flex flex-col items-center`}>
                            <h2 className={`${i > episode + 1 ? "opacity-0" : "opacity-100"} ${config.background === "white" ? "text-black" : "text-white"} my-6`}>Start of episode {i + 1}</h2>
                            <div className="flex flex-col items-center">
                                {
                                    images ?
                                        images.map((url: string, j: number) => {
                                            return (
                                                <img key={url + i + j} ref={episode === i && page === j ? currentPageRef : null} className={`pages-content episode-${i} page-${j} ${i > episode + 1 ? "opacity-0" : "opacity-100"} max-w-full max-h-full h-auto my-6`} src={url} alt="page" />
                                            )
                                        })
                                        :
                                        <></>
                                }
                            </div>
                            <h2 className={`${i < episode - 1 || i > episode + 1 ? "opacity-0" : "opacity-100"} ${config.background === "white" ? "text-black" : "text-white"} my-6`}>End of episode {i + 1}</h2>
                        </div>
                    )
                }
            }

            if (contentArray && contentArray.length > 0) {
                return (
                    <div id="pages-container">
                        {
                            contentArray
                        }
                    </div>
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
