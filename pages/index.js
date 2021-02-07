import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
    var timer;
    var isPaused = false;
    var timeLeft = 1499;
    var currentRun = "pomodoro";

    function buttonFunction() {
        if(document.getElementById("timerButton").innerHTML == "START") {
            startTimer();
        }
        else {
            stopTimer();
        }
    }

    function startTimer() {
        window.addEventListener('beforeunload', unloadEventFunction);

        var element = document.getElementById("timerButton");
        element.innerHTML = "STOP";
        element.classList.remove(styles.startButton);
        element.className += " " + styles.stopButton;

        if(timer) {
            isPaused = false;
        }
        else {
            element = document.createElement("button");
            element.onclick = resetTimer;
            element.innerHTML = "RESET";
            element.id = "resetButton";
            element.className = styles.switchButton;
            element.className += " " + styles.resetButton;
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
        var element = document.getElementById("timerButton");
        element.innerHTML = "START";
        element.classList.remove(styles.stopButton);
        element.className += " " + styles.startButton;
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
        var element = document.getElementById("timerButton");
        element.innerHTML = "START";
        element.classList.remove(styles.stopButton);
        element.className += " " + styles.startButton;
        element = document.getElementById("resetButton");
        if(element != null) {
            element.remove();
        }
    }

    function switchToPomodoro() {
        document.getElementById("timer").innerHTML = "25:00";
        document.getElementById("lbrButton").classList.remove(styles.switchButtonActive);
        document.getElementById("sbrButton").classList.remove(styles.switchButtonActive);
        document.getElementById("pomodoroButton").className += " " + styles.switchButtonActive;
        timeLeft = 1499;
        currentRun = "pomodoro";
        resetToInitial();
    }

    function switchToShortBreak() {
        document.getElementById("timer").innerHTML = "05:00";
        document.getElementById("lbrButton").classList.remove(styles.switchButtonActive);
        document.getElementById("pomodoroButton").classList.remove(styles.switchButtonActive);
        document.getElementById("sbrButton").className += " " + styles.switchButtonActive;
        timeLeft = 299;
        currentRun = "shortBreak";
        resetToInitial();
    }

    function switchToLongBreak() {
        document.getElementById("timer").innerHTML = "10:00";
        document.getElementById("sbrButton").classList.remove(styles.switchButtonActive);
        document.getElementById("pomodoroButton").classList.remove(styles.switchButtonActive);
        document.getElementById("lbrButton").className += " " + styles.switchButtonActive;
        timeLeft = 599;
        currentRun = "longBreak";
        resetToInitial();
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Pomo-do-it</title>
                <link rel="icon" href="/icon.svg"/>
            </Head>

            <div className={styles.header}>
                <p className={styles.headerText}>
                    Pomo-do-it
                </p>
            </div>

            <hr className={styles.hr}/>

            <main className={styles.main}>
                <div className={styles.timerGrid}>
                    <div className={styles.switchGrid}>
                        <button id="pomodoroButton" className={styles.switchButton + ' ' + styles.switchButtonActive} onClick={switchToPomodoro}>Pomodoro</button>
                        <button id="sbrButton" className={styles.switchButton} onClick={switchToShortBreak}>Short Break</button>
                        <button id="lbrButton" className={styles.switchButton} onClick={switchToLongBreak}>Long Break</button>
                    </div>
                    <p id="timer" className={styles.time}>25:00</p>
                    {/*<Link href="#">*/}
                    {/*    <a onClick={startTimer}>Start</a>*/}
                    {/*</Link>*/}
                    <div id="buttonDiv">
                        <button id="timerButton" className={styles.switchButton + ' ' + styles.startButton} onClick={buttonFunction}>START</button>
                    </div>
                </div>
            </main>

            <hr className={styles.hr}/>

            <footer className={styles.footer}>
                Built with ❤️ and ☕ by{' '}
                <a
                    href="https://github.com/agarwalrounak"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Rounak{' '}
                </a>
                |{' '}
                Powered by{' '}
                <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Vercel
                </a>
            </footer>
        </div>
    )
}
