import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "$#@&%![]{}~";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPassToClip = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numberAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-xl max-w-3xl mx-auto shadow-md rounded-2xl bg-slate-800 text-4xl p-10 my-20 text-white">
        <h1 className="text-5xl text-center text-white font-bold">
          Password Generator
        </h1>
        <div className="flex rounded-lg overflow-hidden justify-center p-5 my-5 ">
          <input
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            className="outline-none px-2 py-3 rounded-s-xl text-3xl text-orange-500 w-full"
            ref={passwordRef}
          />
          <button
            className="outline-none bg-orange-500 text-white px-3 py-1 shrink-0 rounded-e-xl text-3xl"
            onClick={copyPassToClip}
          >
            Copy
          </button>
        </div>
        <div className="flex text-xl justify-around gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={32}
              value={length}
              className="cursor-pointer accent-orange-500"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              className="cursor-pointer accent-orange-500"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="cursor-pointer">
              Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="charInput"
              className="cursor-pointer accent-orange-500"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput" className="cursor-pointer">
              Character
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
