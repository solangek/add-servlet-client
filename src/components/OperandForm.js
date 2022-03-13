import {useState} from "react";


export default function OperandForm(props) {

    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);

    function handleLeftChanged(event) {
        setLeft(parseInt(event.target.value));
    }

    function handleRightChanged(event) {
        setRight(parseInt(event.target.value));
    }

    function handleResponse(response) {
        if (!response.ok) {
            throw new Error(`Status not OK: ${response.status} ${response.statusText}`);
        }
        return response.json();
    }

    function handleJson(jsonObj) {
        props.receiveResult(jsonObj.result);
    }

    function handleError(error) {
        alert(error.toString());
    }

    function handleFormSubmission(event) {
        event.preventDefault();
        fetch(`${props.url}?left=${left}&right=${right}`)
            .then(handleResponse)
            .then(handleJson)
            .catch(handleError);
    }

    return (
        <form className="border p-3" onSubmit={handleFormSubmission}>
            <div className="mb-3 col">
                <label htmlFor="leftInput" className="form-label">Left operand:</label>
                <input type="number" className="form-control" id="leftInput" value={left} onChange={handleLeftChanged}/>
            </div>
            <div className="mb-3 col">
                <label htmlFor="rightInput" className="form-label">Right operand:</label>
                <input type="number" className="form-control" id="rightInput" value={right}
                       onChange={handleRightChanged} />
            </div>
            <button type="submit" className="btn btn-primary">Compute</button>
        </form>
    );
}