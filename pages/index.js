import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
    var timer;
    var isPaused = false;
    var timeLeft = 1499;
    var currentRun = "pomodoro";

    function buttonFunction() {
        if(document.getElementById("timerButton").innerHTML == "Start") {
            startTimer();
        }
        else {
            stopTimer();
        }
    }

    function startTimer() {
        window.addEventListener('beforeunload', unloadEventFunction);

        document.getElementById("timerButton").innerHTML = "Stop";

        if(timer) {
            isPaused = false;
        }
        else {
            var element = document.createElement("button");
            element.onclick = resetTimer;
            element.innerHTML = "Reset";
            element.id = "resetButton";
            document.getElementById("buttonDiv").appendChild(element);

            timer = setInterval(setTime, 1000);

            function setTime() {
                if(!isPaused) {
                    var minutes = Math.floor(timeLeft / 60);
                    var seconds = Math.floor(timeLeft % 60);

                    if(getLength(minutes) == 1) {
                        minutes = "0" + minutes;
                    }

                    if(getLength(seconds) == 1) {
                        seconds = "0" + seconds;
                    }

                    document.getElementById("timer").innerHTML = minutes + ":" + seconds;

                    timeLeft--;

                    if(timeLeft < 0) {
                        resetTimer();
                    }
                }
            }
        }
    }

    function getLength(number) {
        return number.toString().length;
    }

    function stopTimer() {
        document.getElementById("timerButton").innerHTML = "Start";
        isPaused = true;
    }

    function resetTimer() {
        var element = document.getElementById("timer");
        if(currentRun == "pomodoro") {
            element.innerHTML = "25:00";
            timeLeft = 1499;
        }
        else if(currentRun == "shortBreak") {
            element.innerHTML = "05:00";
            timeLeft = 299;
        }
        else if(currentRun == "longBreak") {
            element.innerHTML = "10:00";
            timeLeft = 599;
        }
        resetToInitial();
    }

    function unloadEventFunction(event) {
        // Cancel the event as stated by the standard.
        event.preventDefault();
        // Older browsers supported custom message
        event.returnValue = '';
    }

    function resetToInitial(){
        clearInterval(timer);
        timer = null;
        isPaused = false;
        window.removeEventListener('beforeunload', unloadEventFunction);
        document.getElementById("timerButton").innerHTML = "Start";
        var element = document.getElementById("resetButton");
        if(element != null) {
            element.remove();
        }
    }

    function switchToPomodoro() {
        document.getElementById("timer").innerHTML = "25:00";
        timeLeft = 1499;
        currentRun = "pomodoro";
        resetToInitial();
    }

    function switchToShortBreak() {
        document.getElementById("timer").innerHTML = "05:00";
        timeLeft = 299;
        currentRun = "shortBreak";
        resetToInitial();
    }

    function switchToLongBreak() {
        document.getElementById("timer").innerHTML = "10:00";
        timeLeft = 599;
        currentRun = "longBreak";
        resetToInitial();
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Pomo-do-it</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="#">Pomo-do-it!</a>
                </h1>

                <p className={styles.description}>
                    Get started by editing{' '}
                    <code className={styles.code}>pages/index.js</code>
                </p>

                <div>
                    <div>
                        <button id="pomodoroButton" onClick={switchToPomodoro}>Pomodoro</button>
                        <button id="sbrButton" onClick={switchToShortBreak}>Short Break</button>
                        <button id="lbrButton" onClick={switchToLongBreak}>Long Break</button>
                    </div>
                    <p id="timer">25:00</p>
                    {/*<Link href="#">*/}
                    {/*    <a onClick={startTimer}>Start</a>*/}
                    {/*</Link>*/}
                    <div id="buttonDiv">
                        <button id="timerButton" onClick={buttonFunction}>Start</button>
                    </div>
                </div>

                <div className={styles.grid}>
                    <a href="https://nextjs.org/docs" className={styles.card}>
                        <h3>Documentation &rarr;</h3>
                        <p>Find in-depth information about Next.js features and API.</p>
                    </a>

                    <a href="https://nextjs.org/learn" className={styles.card}>
                        <h3>Learn &rarr;</h3>
                        <p>Learn about Next.js in an interactive course with quizzes!</p>
                    </a>

                    <a
                        href="https://github.com/vercel/next.js/tree/master/examples"
                        className={styles.card}
                    >
                        <h3>Examples &rarr;</h3>
                        <p>Discover and deploy boilerplate example Next.js projects.</p>
                    </a>

                    <a
                        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}
                    >
                        <h3>Deploy &rarr;</h3>
                        <p>
                            Instantly deploy your Next.js site to a public URL with Vercel.
                        </p>
                    </a>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo}/>
                </a>
            </footer>
        </div>
    )
}
