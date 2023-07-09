import { useEffect, useState, useRef } from "react";
import "./App.css";

const init = {
  displayTime : "10:00",
  mins : 10,
  secs : 0
}

export default function App(props) {
  const [displayTime, setDisplayTime] = useState(init.displayTime);
  const {startingMinutes = init.mins, startingSeconds = init.secs} = props
  const [mins, setMinutes] = useState(startingMinutes);
  const [secs, setSeconds] = useState(startingSeconds);
  const [running, setRunning] = useState(false);
  const [btnDisabled, setDisabled] = useState({start: false, stop: true, reset: true})
  const timerRef = useRef(null);

  // ボタンをクリックしたとき
  useEffect(() => {
    console.log("useEffect");
    let timerInterval = undefined;
    // タイマーが動いているとき
    if (running) {
      console.log("start timer");
      function tick() {
        timerRef.current();
      }
      timerInterval = setInterval(tick, 1000);
    }
    // タイマーをクリア・毎回呼ばれる
    return () => {
      console.log("clear")
      clearInterval(timerInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        console.log("fin");
        setRunning(false);
        setDisabled({start: true, stop: true, reset: false});
      }
      else {
        setMinutes(mins => mins - 1);
        setSeconds(59);
      }
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
    <div className="App">
      <h1 className="title">ゲーム終了まで...</h1>
      <div className="timer">{displayTime}</div>
      <div className="btnArea">
        <button onClick={onClickReset} disabled={btnDisabled.reset} className="btn">リセット</button>
        <button onClick={onClickStop} disabled={btnDisabled.stop} className="btn">ストップ</button>
        <button onClick={onClickStart} disabled={btnDisabled.start} className="btn">スタート</button>
        <input type="number" value={mins} className="btn" onChange={timerSet} min={0} max={59} disabled={btnDisabled.start}></input>
      </div>
    </div>
  );
}; 