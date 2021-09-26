interface SettingsProps {
    props: {
        actions: any,
        config: any,
    },
    showArchive: () => void
}

const SettingsSection = ({ props, showArchive }: SettingsProps) => {
    let { actions, config } = props;

    return (
        <div className="flex flex-row flex-1 justify-around items-center text-gray-500 uppercase">
            <span className="flex-col justify-center items-center m-2 cursor-pointer hidden sm:flex group z-10" onClick={actions.toggleBgColor}>
                <svg className="w-10 z-10 stroke-current text-gray-400 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <p className="group-hover:text-white">Color</p>
            </span>
            <div className="vertical-divider hidden sm:block" />
            <span className="flex flex-col justify-center items-center m-2 cursor-pointer group z-10" onClick={() => actions.toggleMode("page")}>
                <svg className={`group-hover:text-white w-10 z-10 stroke-current ${config.mode === "page" ? "text-white" : "text-gray-400"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p className={`group-hover:text-white ${config.mode === "page" ? "text-white" : "text-gray-400"}`}>Page</p>
            </span>
            <span className="flex flex-col justify-center items-center m-2 cursor-pointer group z-10" onClick={() => actions.toggleMode("spread")}>
                <svg className={`group-hover:text-white w-10 z-10 stroke-current ${config.mode === "spread" ? "text-white" : "text-gray-400"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className={`group-hover:text-white ${config.mode === "spread" ? "text-white" : "text-gray-400"}`}>Spread</p>
            </span>
            <span className="flex flex-col justify-center items-center m-2 cursor-pointer group z-10" onClick={() => actions.toggleMode("vertical")}>
                <svg className={`group-hover:text-white w-10 z-10 stroke-current ${config.mode === "vertical" ? "text-white" : "text-gray-400"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className={`group-hover:text-white ${config.mode === "vertical" ? "text-white" : "text-gray-400"}`}>Vertical</p>
            </span>
            <div className="vertical-divider hidden sm:block" />
            <span className="flex flex-col justify-center items-center m-2 cursor-pointer group z-10" onClick={showArchive}>
                <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:text-white w-10 z-10 stroke-current text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <p className="group-hover:text-white">Archives</p>
            </span>
        </div>
    )
}

export default SettingsSection;