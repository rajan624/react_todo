import { useEffect, useState } from "react";
import "./MainPage.css"
import { json } from "react-router-dom";
function MainPage() {
    const [todoArray, setToDoArray] = useState([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setToDoArray(json);
            });
    }, [])
    return (
        <div className="App">
            <div className="container">
                <div className="headingDiv">

                <h1>ToDo List</h1>  <button className="buttonGreen">Add</button>
                </div>
                <table className="rwd-table">
                    <tbody>
                        <tr>
                            <th>Sno</th>
                            <th>User Id</th>
                            <th>Title</th>
                            <th>Completed</th>
                            <th>Action</th>
                        </tr>
                        {todoArray.map((data, index) => {
                            return (
                                <tr  key={index} >
                                    <td data-th="Sno">
                                        {data.id}
                                    </td>
                                    <td data-th="User Id" >
                                        {data.userId}
                                    </td>
                                    <td data-th="Title">
                                        {data.title}
                                    </td>
                                    <td data-th="Completed" >
                                        {data.completed}
                                    </td>
                                    <td data-th="Action">
                                        <button className="button" >Edit</button>
                                        <button className="buttonRed">Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MainPage;
