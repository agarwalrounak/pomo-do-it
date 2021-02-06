import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
    var timer;
    var isPaused = false;

    function buttonFunction() {
        if(document.getElementById("timerButton").innerHTML == "Start") {
            startTimer();
        }
        else {
            stopTimer();
        }
    }

    // function resetTimer() {
    //     var elem = document.getElementById("timerButton");
    //     elem.innerHTML = "Start";
    //     console.log(timer);
    //     clearInterval(timer);
    //     timer = null;
    // }

    function stopTimer() {
        document.getElementById("timerButton").innerHTML = "Start";
        isPaused = true;
    }

    function startTimer() {
        document.getElementById("timerButton").innerHTML = "Stop";

        if(timer) {
            isPaused = false;
        }
        else {
            var timeLeft = 1499;

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
                        clearInterval(timer);
                        timer = null;
                        document.getElementById("timer").innerHTML = "Done";
                    }
                }
            }
        }
    }

    function getLength(number) {
        return number.toString().length;
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
                    <p id="timer">25:00</p>
                    {/*<Link href="#">*/}
                    {/*    <a onClick={startTimer}>Start</a>*/}
                    {/*</Link>*/}
                    <button id="timerButton" onClick={buttonFunction}>Start</button>
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
