import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";

var prevPage = 0;
type PageProps = {
  episode: number,
  page: number,
  images: string[] | undefined,
  config: any
}

const Page = ({ episode, page, images, config }: PageProps) => {

  useEffect(() => {
    prevPage = page;
  })

  type RenderProps = {
    data: string[] | undefined
  }

  const ImageRender = observer(({ data }: RenderProps) => {
    if (data && data.length > 0) {
      return (
        <>
          {
            data.map((url, index) => {
              if ((page === 0 && episode === 0) && config.mode !== "vertical") {
                return <img key={url} className={`absolute h-screen w-auto ${page === index ? "opacity-100" : "opacity-0"} transition-opacity duration-700 ease-in-out`} src={url} alt="page" />
              } else if (config.mode === "spread") {
                return (
                  <div key={url} className="absolute w-screen h-screen top-0 flex flex-row justify-center items-center">
                    <img className={`max-w-1/2 w-auto max-h-full h-auto transition-opacity mx-2 ${page === index ? "opacity-100" : "opacity-0"} ${prevPage > page ? "duration-75" : "duration-700"} ease-in-out`} src={url} alt="page" />
                    {
                      data[index + 1] ?
                        <img className={`max-w-1/2 w-auto max-h-full h-auto transition-opacity mx-2 ${page + 1 === index + 1 ? "opacity-100" : "opacity-0"} ${prevPage < page ? "duration-75" : "duration-700"} ease-in-out`} src={data[index + 1]} alt="page" />
                        :
                        <></>
                    }
                  </div>
                )
              } else if (config.mode === "vertical") {
                return <img key={url} className={`max-w-full max-h-full h-auto opacity-100 mb-12`} src={url} alt="page" />
              } else {
                return <img key={url} className={`absolute max-h-full h-auto w-auto ${page === index ? "opacity-100" : "opacity-0"} transition-opacity duration-700 ease-in-out`} src={url} alt="page" />
              }
            })
          }
        </>
      )
    } else {
      return <></>
    }
  })

  return (
    <ImageRender data={images} />
  )
}

export default Page;
