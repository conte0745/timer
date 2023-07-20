import { useEffect, useState, useRef } from "react";
import "./App.css";
import bg from './zawa_back.jpg';

const init = {
  displayTime : "05:00",
  mins : 5,
  secs : 0
}
const title = "ゲーム終了まで...";

export default function App(props) {
  const [alpha, setAlpha] = useState(1.0);
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
    console.log(mins + ":" + secs)
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
      setAlpha(alpha => alpha - 6.00/600);
      console.log(alpha);
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
    setAlpha(1.0);
  };

  const timerSet = (event) => {
    if (!running){
      setMinutes(event.target.value);
      let m = event.target.value.toString().padStart(2, "0");
      let s = secs.toString().padStart(2, "0");
      setDisplayTime(`${m}:${s}`);
    }
  };

  return (
    <div className="App" style={{
      backgroundImage:`url(${bg})`,
    }}>
      <div className="content" style={{
        background: `rgba(0, 0, 0, ${alpha})`
      }}>
        <h1 className="title">{displayTitle}</h1>
        <div className="timer">{displayTime}</div>
        <div className="btnArea">
          <button onClick={onClickReset} disabled={btnDisabled.reset} className="btn_">リセット</button>
          <button onClick={onClickStop} disabled={btnDisabled.stop} className="btn_">ストップ</button>
          <button onClick={onClickStart} disabled={btnDisabled.start} className="btn_">スタート</button>
          <input type="number" value={mins} className="btn_" onChange={timerSet} min={0} max={59} disabled={btnDisabled.start}></input>
        </div>
      </div>
    </div>
  );
}; 