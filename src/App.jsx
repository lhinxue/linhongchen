import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Masonry from "./Masonry";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <Masonry />
        </div>
    );
}

export default App;
