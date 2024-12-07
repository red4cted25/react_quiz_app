function Home() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            {/* Logo */}
            <div className="flex justify-center items-center">
                <img src="/safe-logo.png" alt="Safe Logo" className="m-0 w-20 h-20"/>
                <h1 className="m-0 font-Coiny text-white text-7xl ml-4">CrackIt!</h1>
            </div>
            {/* Start Button */}
            
            <a className="rounded-xl bg-gunmetal-grey py-4 w-[30%] mt-[4rem] text-center" href="/quiz"><button className="text-lg font-bold">Start Quiz!</button></a>
        </div>
    );
}

export default Home;
