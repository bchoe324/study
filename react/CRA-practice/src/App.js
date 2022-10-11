import styles from "./App.module.css";
import { useState, useEffect } from "react";

function Hello() {
  useEffect(() => {
    console.log("Created");
    return () => console.log("Destroyed");
    // Cleanup 함수
  }, []);
  return <h2>Hello</h2>;
}

function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [showing, setShowing] = useState(false);
  const onClickBtn = () => setShowing((prev) => !prev);
  const onClick = () => setCounter((prev) => prev + 1);
  const onChange = (event) => {
    setKeyword(event.target.value);
  };
  useEffect(() => {
    console.log("I run only once.");
  }, []);
  // []: dependency
  // 빈 array([])는 처음 한번만 코드 실행
  useEffect(() => {
    console.log("I run when 'keyword' changes.");
  }, [keyword]);
  // [keyword]가 변할 때, 코드 실행
  useEffect(() => {
    console.log("I run when 'counter' changes.");
  }, [counter]);
  useEffect(() => {
    console.log("I run when 'keyword & counter' changes.");
  }, [keyword, counter]);
  return (
    <div>
      <h1 className={styles.title}>{counter}</h1>
      <button onClick={onClick}>Click me</button>
      <input
        type="text"
        placeholder="Search here..."
        onChange={onChange}
        value={keyword}
      ></input>
      {showing ? <Hello /> : null}
      <button onClick={onClickBtn}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App;
