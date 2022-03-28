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
        // exercise: replace this error message with message inside the page:
        // create a div with bootstrap class "text-danger" to display the message
        // how will you define this message? prop or state?
    }

    /**
     * sending the form using fetch / GET
     * @param event
     */
    function handleFormSubmissionGet(event) {
        event.preventDefault();
        let params = {
            left: left,
            right: right
        };
        fetch(`${props.url}?left=${left}&right=${right}`)
            .then(handleResponse)
            .then(handleJson)
            .catch(handleError);
    }

    /**
     * same fetch using POST. note that we need to send content-type header
     * as JSON due to some Servlet implementation of request parsing.
     * If you want to test this function, replace the onSubmit field of the form
     * at line 78 with "handleFormSubmissionPost".
     * @param event
     */
    function handleFormSubmissionPost(event) {
        event.preventDefault();
        let params = {
            left: left,
            right: right
        };
        fetch(props.url,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'datatype': 'json'
            },
            body: new URLSearchParams(params).toString()
        })
            .then(handleResponse)
            .then(handleJson)
            .catch(handleError);
    }

    return (
        <form className="border p-3" onSubmit={handleFormSubmissionGet}>
            <div className="mb-3 col">
                <label htmlFor="leftInput" className="form-label">Left operand:</label>
                <input type="number" className="form-control" id="leftInput" onChange={handleLeftChanged}/>
            </div>
            <div className="mb-3 col">
                <label htmlFor="rightInput" className="form-label">Right operand:</label>
                <input type="number" className="form-control" id="rightInput" onChange={handleRightChanged} />
            </div>
            <button type="submit" className="btn btn-primary">Compute</button>
        </form>
    );
}