
const Controls = ({ go, config }) => {
    return (
        <div id="reader-controls" className={`w-full h-full ${config.mode === "vertical" ? "hidden" : "flex"} flex-row justify-between items-center z-10`}>
            <div
                className="flex flex-col justify-center items-start w-1/3 h-full cursor-pointer left opacity-0 hover:opacity-100 transition duration-500 ease-in-out z-10"
                onClick={go.previous}
            >
                <svg className="w-16 ml-10 md:w-32" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={`${config.background === "white" ? "black" : "white"}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </div>
            <div className="w-1/3 h-full center"></div>
            <div
                className="flex flex-col justify-center items-end w-1/3 h-full cursor-pointer right opacity-0 hover:opacity-100 transition duration-500 ease-in-out z-10"
                onClick={go.next}
            >
                <svg className="w-16 mr-10 md:w-32" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={`${config.background === "white" ? "black" : "white"}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    )
}

export default Controls;
