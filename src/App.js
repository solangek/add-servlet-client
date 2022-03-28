import OperandForm from "./components/OperandForm";
import {useState} from "react";


function App() {

    const [result, setResult] = useState("");

    function receiveResultFromServer(result) {
        setResult(result);
    }

    return (
        <div className="App">
            <OperandForm url={"add"} receiveResult={receiveResultFromServer}/>
            {result ? <div className="border p-3">Result is {result}</div> : ""}

        </div>
    );
}

export default App;