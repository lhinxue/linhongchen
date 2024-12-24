import useAppConfig from "./stores/appConfig";

import "./App.css";

function App() {
    const darkTheme = useAppConfig((state) => state.dark);
    const toggleDarkTheme = useAppConfig((state) => state.toggleDarkTheme);

    return (
        <main className={`${darkTheme}`}>
            {darkTheme}
            <button onClick={() => toggleDarkTheme()}>toggle</button>
        </main>
    );
}

export default App;
