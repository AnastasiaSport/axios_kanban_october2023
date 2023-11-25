import React from 'react';
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";

const Card = ({task, statuses, priorities, changePriority, moveTask, updateTask, deleteTask}) => {


    return (
        <div className="card text-center" style={{marginBottom: '10px'}}>
            <div className="card-header">
                <button type="button" className="btn btn-outline-success"
                        onClick={() => moveTask(task._id, task.status, 'left')}
                        disabled={task.status === statuses[0].status}
                >←
                </button>
                {task.status}
                <button type="button" className="btn btn-outline-success"
                        onClick={() => moveTask(task._id, task.status, 'right')}
                        disabled={task.status === statuses[statuses.length - 1].status}
                >→
                </button>
            </div>
            <div className="card-body">
                <h5 className="card-title">{task.name}</h5>
                <p className="card-text">{task.description}</p>

                <DeleteModal
                    task={task}
                    deleteTask={deleteTask}
                />

                <UpdateModal
                task={task}
                statuses={statuses}
                priorities={priorities}
                updateTask={updateTask}
                />


            </div>
            <div className="card-footer text-body-secondary">
                <button
                    onClick={() => changePriority(task._id, task.priority, 'down')}
                    type="button" className="btn btn-outline-warning"
                        disabled={task.priority == priorities[0]}

                >↓
                </button>
                Priority: {task.priority}
                <button
                    onClick={() => changePriority(task._id, task.priority, 'up')}
                    type="button" className="btn btn-outline-warning"
                disabled={task.priority == priorities[priorities.length -1]}
                >↑</button>
            </div>
        </div>
    );
};

export default Card;