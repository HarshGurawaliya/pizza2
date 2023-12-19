import { NextUIProvider } from "@nextui-org/react";
import MainWrapper from "./components/MainWrapper";
import './styles/App.css';

function App() {
    return (
        <NextUIProvider>
            <MainWrapper />
        </NextUIProvider>
    );
}

export default App;
