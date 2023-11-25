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

    const moveTask = (id, status, direction) => {
        const stringArrayStatuses = statuses.map(el => el.status)
        const oldStatusIndex = stringArrayStatuses.indexOf(status)
        const newStausIndex = oldStatusIndex + (direction === 'left' ? -1 : 1)
        axios.patch(`https://expressjs-server.vercel.app/tasks/${id}`, {
            status: stringArrayStatuses[newStausIndex]
        })
            .then(res => getTasks())
            .catch(error =>
                alert('Server unavailable/cannot move task')
            )
    }

    const updateTask = (newTask) => {
        axios.patch(`https://expressjs-server.vercel.app/tasks/${newTask._id}`, newTask)
            .then(res => getTasks())
            .catch(error =>
                alert('Server unavailable/cannot update task')
            )
    }

    const deleteTask = (id) => {
        axios.delete(`https://expressjs-server.vercel.app/tasks/${id}`)
            .then(res => getTasks())
            .catch(error =>
                alert('Server unavailable/cannot delete task')
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

                        <div className='loader'>  <Myloader/> </div>

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
                                        moveTask={moveTask}
                                        updateTask={updateTask}
                                        deleteTask={deleteTask}
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
