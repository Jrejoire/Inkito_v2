import React, { useEffect, useState } from 'react';
import StoreContext from '../stores/appStore';
import { getUrlVars } from '../middlewares/url';
import { seriesIdGenerator, isContentRanked } from '../middlewares/format';
import Page from '../components/reader/page';
import Pages from '../components/reader/pages';
import Menu from '../components/reader/menu/menu';
import { autorun } from "mobx";

type ReaderProps = { type: string };
type ConfigProps = { mode: string, sort: string, background: string, transition: boolean };
type seriesProps = { image?: string[], permlink?: string };
type userDataProps = { isSubscribed: boolean, autoVoteOn: boolean, disableVote: boolean, voting_power: number };

const Reader = ({ type }: ReaderProps) => {
  const store = React.useContext(StoreContext) as any;
  var props = getUrlVars("reader/");

  let [seriesInfo, setSeriesInfo] = useState<any>({});
  let [ranked, setRanked] = useState<any[]>([]);
  //let [voted, setVoted] = useState<number>(0);
  let [permlinks, setPermlinks] = useState<string[]>([]);
  let [series, setSeries] = useState<seriesProps[]>([]);
  let [episode, setEpisode] = useState<number>(0);
  let [config, setConfig] = useState<ConfigProps>({ mode: "vertical", sort: "rightToLeft", background: "black", transition: true });
  let [page, setPage] = useState(0);
  let [userData, setUserData] = useState<userDataProps>({ isSubscribed: false, autoVoteOn: false, disableVote: false, voting_power: 0 });
  let [scrollTrigger, setScrollTrigger] = useState<boolean>(false);

  const getUserInfo = async (username: string) => {
    let info = await store.getUserInfo(username);
    if (info && info.length > 0) {
      //voting power shows 0 when at 100%.
      userData.voting_power = info[0].voting_power !== 0 ? info[0].voting_power : 10000;
    }
  }

  const processPermlinks = async (author: string, seriesTitle: string) => {
    let permlinks = await store.fetchPermlinks(author, seriesTitle);
    if (permlinks) {
      setPermlinks(permlinks);
      addEpisodes();

      let emptySeries: {}[] = [];
      emptySeries.length = permlinks.length;
      setSeries(emptySeries);

      let ranked: any[] = await getRankedNumber(props.author, permlinks);
      setRanked(ranked);
    }
  }

  const processSeriesInfo = async (seriesId: string) => {
    let infos = await store.fetchSeriesInfo(seriesId);
    if (infos) {
      setSeriesInfo(infos);
      if (infos && infos.config) {
        if (infos.config.background) {
          setConfig({ ...config, background: infos.config.background })
        }
      }
    }
  }

  useEffect(() => {
    if (props.author && props.seriesTitle) {
      processPermlinks(props.author, props.seriesTitle);
    }
    let seriesId = seriesIdGenerator(props.author, props.seriesTitle);
    processSeriesInfo(seriesId);

    if (true || store.userDetail.name) {
      let username: string = store.userDetail.name || "jrej";
      getUserInfo(username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.author, props.seriesTitle, store.userDetail.name])

  useEffect(() => {
    if (permlinks && permlinks.length > 0) {
      addEpisodes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode, permlinks])

  useEffect(() => autorun(() => {
    if (store.seriesInfo.followers && seriesInfo.followers === undefined) {
      setSeriesInfo({ ...seriesInfo, followers: store.seriesInfo.followers });
    }
  }), [seriesInfo, store.seriesInfo.followers]);

  const getRankedNumber = (author: string, permlinks: string[]) => new Promise<any[]>(async (resolve) => {
    let ranked: any[] = [];
    // let votedCount: number = 0;
    for (let i = permlinks.length - 1; i >= 0; i--) {
      let content: any = await fetchEpisode(author, permlinks[i], i);
      if (content) {
        let isRanked = isContentRanked(content.created);
        if (isRanked) {
          ranked.push(content);
          // if (content.active_votes && content.active_votes.length > 0) {
          //   if (content.active_votes.some((vote: any) => vote.voter === store.userDetail.name)) {
          //     votedCount = votedCount + 1;
          //   }
          // }
        } else {
          resolve(ranked);
          break;
        }
      }
    }
  })

  const addEpisodes = async () => {
    if (!series[episode]) {
      await fetchEpisode(props.author, permlinks[episode], episode)
    }
    if (!series[episode + 1] && episode < permlinks.length) {
      await fetchEpisode(props.author, permlinks[episode + 1], episode + 1);
    }
    if (!series[episode - 1] && episode > 0) {
      await fetchEpisode(props.author, permlinks[episode - 1], episode - 1);
    }
  }

  const addAllEpisodes = async () => {
    if (permlinks.length > 0) {
      for (let i = episode; i < permlinks.length; i++) {
        if (!series[i] && episode < permlinks.length) {
          await fetchEpisode(props.author, permlinks[i], i);
        }
      }
      for (let i = episode; i >= 0; i--) {
        if (!series[i]) {
          await fetchEpisode(props.author, permlinks[i], i);
        }
      }
    }
  }

  const fetchEpisode = (author: string, permlink: string, episodeNumber: number) => new Promise(async (resolve) => {
    if (permlink) {
      if (!series[episodeNumber]) {
        let content = await store.fetchSeriesDetail(author, permlink, episodeNumber);
        let tempSeries = series;
        if (content) {
          //remove blacklist images 
          const blackListImages = [
            "https://images.hive.blog/DQmXcA3xhDNEaesBeRzy3eq3Jw1zyGQEjzHY1DPc84P7peA/inkito-banner.png"
          ];
          const regexBlackList = [/http:\/\/eurobeast\.dk\/.*450\.jpg/g]

          content.image = content.image.filter((image: string) => !blackListImages.includes(image) && !regexBlackList.some(regex => image.match(regex)));
          tempSeries[episodeNumber] = content;
          setSeries(tempSeries);
          if (content.image.length === 1 && config.mode === "spread") {
            setConfig({ ...config, mode: "page" })
            //disable spread button;
          }
          resolve(content);
        } else {
          resolve(undefined);
        }
      }
    }
    resolve(undefined);
  })

  const actions = {
    toggleBgColor: () => {
      if (config.background === "white") {
        setConfig({ ...config, background: "black" });
      } else {
        setConfig({ ...config, background: "white" });
      }
    },
    toggleMode: (string: string) => {
      setConfig({ ...config, mode: string });
    },
    toggleAutoVote: () => {
      setUserData({ ...userData, autoVoteOn: !userData.autoVoteOn });
    },
    vote: () => {
      if (/*ranked && ranked.length > 0*/true) {
        let content = ranked[0];
        let author = content?.author;
        let permlink = content?.permlink;
        let weight = 10000;
        let voter = store.userDetail.name;
        store.vote(voter, author, permlink, weight, undefined);
      }
    },
    fetchAll: () => {
      addAllEpisodes();
    },
    go: {
      next: () => {
        let currentLength = series[episode]?.image?.length || 0
        if (config.mode === "spread") {
          if (page === 0 && episode === 0) {
            setPage(page + 1);
          } else if (page < currentLength - 2) {
            //next page
            setPage(page + 2);
          } else {
            if (page < currentLength - 1 && ((episode > 0 && currentLength % 2 > 0) || (episode === 0 && currentLength % 2 === 0))) {
              setPage(page + 1);
            } else {
              //next episode, first page
              if (episode < permlinks.length - 1) {
                setEpisode(episode + 1)
                setPage(0);
              }
            }
          }
        } else if (config.mode === "vertical") {
          if (episode < permlinks.length - 1) {
            setEpisode(episode + 1)
          }
        } else {
          if (page < currentLength - 1) {
            //next page
            setPage(page + 1);
          } else {
            //next episode, first page
            if (episode < permlinks.length - 1) {
              setEpisode(episode + 1)
              setPage(0);
            }
          }
        }

      },
      previous: () => {
        let currentLength = series[episode]?.image?.length || 0
        let previousLength = series[episode - 1]?.image?.length || 0
        if (config.mode === "spread") {
          if (page === 1) {
            setPage(page - 1);
          } else if (page > 1) {
            if (page === currentLength - 1) {
              if (previousLength % 2 > 0) {
                setPage(page - 1);
              } else {
                setPage(page - 2);
              }
            } else {
              setPage(page - 2);
            }
          } else {
            if (episode > 0) {
              if (((episode > 1 && previousLength % 2 > 0) || (episode === 1 && previousLength % 2 === 0))) {
                setEpisode(episode - 1);
                setPage(previousLength - 1);
              } else {
                setEpisode(episode - 1);
                setPage(previousLength - 2);
              }
            }
          }
        } else if (config.mode === "vertical") {
          if (episode > 0) {
            setEpisode(episode - 1)
          }
        } else {
          if (episode > 0) {
            setEpisode(episode - 1)
            setPage(previousLength - 1);
          } else if (page > 0) {
            setPage(page - 1);
          }
        }
      },
      to: (episode: number, page: number, shouldScroll: boolean) => {
        setEpisode(episode);
        if (page) {
          setPage(page);
        } else {
          setPage(0);
        }
        if (shouldScroll && config.mode === "vertical") {
          setScrollTrigger(!scrollTrigger);
        }
      }
    }
  }

  return (
    <div className={`w-screen relative bg-${config.background} ${config.mode === "vertical" ? "overflow-x-hidden" : "overflow-hidden h-screen"}`} >
      <Menu actions={actions} config={config} series={series} seriesInfo={{ ...seriesInfo, ranked: ranked/*, voted: voted*/ }} episode={episode} page={page} userData={userData} />
      <div id="vertical-body" className={`flex flex-col ${config.mode === "vertical" ? "justify-start items-center px-0 md:px-20 lg:px-30 xl:px-96" : "hidden"} z-0`}>
        <Pages actions={actions} config={config} episode={episode} page={page} series={series} scrollTrigger={scrollTrigger} />
      </div>
      <div id="page-body" className={`flex flex-col ${config.mode === "vertical" ? "hidden" : "w-screen absolute top-0 h-screen justify-center items-center"} z-0`}>
        <Page episode={episode} page={page} images={series[episode] && series[episode].image} config={config} />
      </div>
    </div>
  );

}

export default Reader;
