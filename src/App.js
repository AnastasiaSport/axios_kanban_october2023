import './App.css';
import axios from 'axios';
import {useEffect, useState} from "react";
import Column from "./components/Column";
import 'bootstrap/dist/css/bootstrap.css'

function App() {
    const [statuses, setStatuses] = useState([]);
    const [tasks, setTasks] = useState([])

    const getStatuses = () => {
        axios.get('https://expressjs-server.vercel.app/statuses')
            .then((res) => {
                setStatuses(res.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                console.log('Finish')
            })
    }

    const getTasks = () => {
        axios.get('https://expressjs-server.vercel.app/tasks')
            .then(res => {
                setTasks(res.data)
            })
            .catch(error => {
                alert('Server currently unavailable')
            })
            .finally(() => {
                console.log('Finish')
            })
    }

    useEffect(() => {
        getStatuses()
        getTasks()
    }, [])

    return (

        <div className="App">

            <h1> Kanban Board</h1>

            <div className="container text-center">
                <div className="row align-items-start">
                    {statuses.map(status =>
                        <Column
                            status={status}
                            key={status._id}
                            tasks={tasks}

                        />
                    )}

                </div>
            </div>
        </div>
    );
}

export default App;
