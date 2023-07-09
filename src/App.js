import { useEffect, useState } from "react";
import "./index.css";

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

  // ボタンをクリックした時の処理
  useEffect(() => {
    let timerInterval = undefined;
    // タイマーが動いている場合
    if (running) {
      timerInterval = setInterval(() => {
        if (secs > 0) {
          setSeconds(secs => secs - 1);
        }

        if (secs === 0) {
          if (mins === 0) {
            clearInterval(timerInterval);
            setRunning(false);
            setDisabled({start: true, stop: true, reset: false});
          }
          else {
            setMinutes(mins => mins - 1);
            setSeconds(59);
          }
        }
        console.log(mins, secs);
        let m = mins.toString().padStart(2, "0");
        let s = secs.toString().padStart(2, "0");

        setDisplayTime(`${m}:${s}`);
      }, 1000);
    }
    // クリーンアップ（タイマーをクリア）
    return () => {
      clearInterval(timerInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, secs]);

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
    setDisabled({start: false, stop: true, reset: true})
  };

  return (
    <div className="App">
      <h1 className="title">ゲーム終了まで...</h1>
      <div className="timer">{displayTime}</div>
      <div className="btnArea">
        <button onClick={onClickReset} disabled={btnDisabled.reset} className="btn">リセット</button>
        <button onClick={onClickStop} disabled={btnDisabled.stop} className="btn">ストップ</button>
        <button onClick={onClickStart} disabled={btnDisabled.start} className="btn">スタート</button>
      </div>
    </div>
  );
}; 