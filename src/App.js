import { useEffect, useState, useRef } from "react";
import "./App.css";
import img from './zawa.png'

const init = {
  displayTime : "05:00",
  mins : 5,
  secs : 1
}
const title = "ゲーム終了まで...";

export default function App(props) {
  const [displayTime, setDisplayTime] = useState(init.displayTime);
  const [displayTitle, setDisplayTitle] = useState(title);
  const {startingMinutes = init.mins, startingSeconds = init.secs} = props
  const [mins, setMinutes] = useState(startingMinutes);
  const [secs, setSeconds] = useState(startingSeconds);
  const [running, setRunning] = useState(false);
  const [btnDisabled, setDisabled] = useState({start: false, stop: true, reset: true})
  const timerRef = useRef(null);

  // ボタンをクリックしたとき
  useEffect(() => {
    let timerInterval = undefined;

    // タイマーが動いているとき
    if (running) {
      function tick() {
        timerRef.current();
      }
      timerInterval = setInterval(tick, 1000);
    }

    if (btnDisabled.start === true && 
      btnDisabled.stop === true && 
      btnDisabled.reset === false) {
      setDisplayTime(`そこまで`);
      setDisplayTitle(`　　`);

    }

    // タイマーをクリア
    return () => {
      clearInterval(timerInterval);
    };
    // eslint-disable-next-line
  }, [running]);

  useEffect(() => {
    timerRef.current = callback;
  });

  const callback = (() => {
    if (secs > 0) {
      setSeconds(secs => secs - 1);
    }

    if (secs.toString() === "0") {
      if (mins.toString() === "0") {
        setRunning(false);
        setDisabled({start: true, stop: true, reset: false});
        console.log("finish");
      }
      else {
        setMinutes(mins => mins - 1);
        setSeconds(59);
      }
    }

    if (mins.toString() === "0") {
      if (secs <  10) {
        setImage(20000);
        setImage(30000);
        setImage(40000);
      }
      else if (secs < 5) {
        setImage(20000);
        setImage(30000);
        setImage(50000);
        setImage(60000);
        setImage(70000);
      }
      setImage(10000);
    }

    let m = mins.toString().padStart(2, "0");
    let s = secs.toString().padStart(2, "0");
    setDisplayTime(`${m}:${s}`);
  });

  // スタートボタンクリック（イベント）
  const onClickStart = () => {
    setRunning(true);
    setDisabled({start: true, stop: false, reset: false})
  };
  // ストップボタンクリック（イベント）
  const onClickStop = () => {
    setRunning(false);
    setDisabled({start: false, stop: true, reset: false})
  };

  // リセットボタンクリック（イベント）
  const onClickReset = () => {
    setRunning(false);
    setDisplayTime(init.displayTime);
    setMinutes(init.mins);
    setSeconds(init.secs);
    setDisabled({start: false, stop: true, reset: true});
    setDisplayTitle(title);
  };

  const timerSet = (event) => {
    if (!running){
      setMinutes(event.target.value);
      let m = event.target.value.toString().padStart(2, "0");
      let s = secs.toString().padStart(2, "0");
      setDisplayTime(`${m}:${s}`);
    }
  };

  function getRandomPlace() {
    const width = (Math.floor(Math.random() * window.innerWidth) - 100) + "px";
    const height = Math.floor(Math.random() * window.innerHeight) + "px";
    const scale = Math.random() * 1.3;
    return {"width" : width, "height" : height, "scale" : scale};
  }

  function setImage(t){
    let body = document.getElementById("body");
    let division = document.createElement("div");
    let image = document.createElement("img");
    let position = getRandomPlace();
    image.src = img;
    division.appendChild(image);
    division.style.padding = "1px";
    division.style.position = "absolute";
    division.style.top = position.height;
    division.style.left = position.width;
    division.style.zIndex = -1;
    division.style.transform = `scale(${position.scale, position.scale})`;
    body.appendChild(division);
    const anime = division.animate(
      {opacity : [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.55, 0.5, 0.4, 0.3, 0.2, 0.1, 0]},
      {duration : Number(t)}
    )
    anime.onfinish = () => {division.remove();};
  }

  return (
    <div className="App">
        <h1 className="title">{displayTitle}</h1>
        <div className="timer" id="timer">{displayTime}</div>
        <div className="btnArea">
          <button onClick={onClickReset} disabled={btnDisabled.reset} className="btn_">リセット</button>
          <button onClick={onClickStop} disabled={btnDisabled.stop} className="btn_">ストップ</button>
          <button onClick={onClickStart} disabled={btnDisabled.start} className="btn_">スタート</button>
          <input type="number" value={mins} className="btn_" onChange={timerSet} min={0} max={59} disabled={btnDisabled.start}></input>
        </div>
      </div>
    
  );
}; 