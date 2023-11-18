import './App.css';
import axios from 'axios';
import {useEffect, useState} from "react";
import Column from "./components/Column";
import 'bootstrap/dist/css/bootstrap.css'
import Myloader from "./components/Myloader";
import CreateModal from "./components/CreateModal";

function App() {
    const [statuses, setStatuses] = useState([]);
    const [tasks, setTasks] = useState([])
    const priorities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [isloading, setIsloading] = useState(false)
    const [error, setError] = useState('')

    const getStatuses = () => {
        axios.get('https://expressjs-server.vercel.app/statuses')
            .then((res) => {
                setStatuses(res.data)
            })
            .catch(error => {
                setError('Server is temporary unavailable')
            })
            .finally(() => {
                setIsloading(false)
            })
    }

    const getTasks = () => {
        setIsloading(true)
        axios.get('https://expressjs-server.vercel.app/tasks')
            .then(res => {
                setTasks(res.data)
            })
            .catch(error => {
                setError('Server is temporary unavailable')
            })
            .finally(() => {
                setIsloading(false)
            })
    }


    const changePriority = (id, priority, direction) => {
        axios.patch(`https://expressjs-server.vercel.app/tasks/${id}`, {
            priority: +priority + (direction === 'up' ? 1 : -1)
        })
            .then(res =>
                getTasks()
            )
            .catch(error => {
                alert('Server unavailable')
            })
    }

    const createTask = (newTask) => {
        axios.post(`https://expressjs-server.vercel.app/tasks`, newTask)

            .then(res => getTasks())
            .catch(error =>
                alert('Server unavailable')
            )
    }

    useEffect(() => {
        getStatuses()
        getTasks()
        setIsloading(true)
    }, [])

    return (

        <div className="App">

            <h1> Kanban Board</h1>

            <CreateModal
                statuses={statuses}
                priorities={priorities}
                createTask={createTask}

            />

            <div className="container text-center">
                <div className="row align-items-start">

                    {isloading ?
                        <Myloader/>
                        : error ? <h2> {error} </h2>
                            :
                            <>
                                {statuses.map(status =>
                                    <Column
                                        status={status}
                                        key={status._id}
                                        tasks={tasks}
                                        statuses={statuses}
                                        priorities={priorities}
                                        changePriority={changePriority}
                                    />
                                )}
                            </>
                    }

                </div>
            </div>


        </div>
    );
}

export default App;
