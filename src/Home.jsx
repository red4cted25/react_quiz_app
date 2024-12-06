function Home() {
    return (
        <div>
            {/* Logo */}
            <div className="flex mx-auto">
                <img src="/public/safe-logo.png" alt="Safe Logo" className="m-0"/>
                <h1 className="m-0 font-Coiny text-white">CrackIt!</h1>
            </div>
            {/* Start Button */}
            <button className=""><a href="/quiz">Start Quiz!</a></button>
        </div>
    );
}

export default Home;
