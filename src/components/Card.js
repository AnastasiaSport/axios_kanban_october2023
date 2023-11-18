import React from 'react';

const Card = ({task, statuses, priorities, changePriority}) => {


    return (
        <div className="card text-center" style={{marginBottom: '10px'}}>
            <div className="card-header">
                <button type="button" className="btn btn-outline-success"
                        disabled={task.status === statuses[0].status}
                >←
                </button>
                {task.status}
                <button type="button" className="btn btn-outline-success"
                        disabled={task.status === statuses[statuses.length - 1].status}
                >→
                </button>
            </div>
            <div className="card-body">
                <h5 className="card-title">{task.name}</h5>
                <p className="card-text">{task.description}</p>
                <button type="button" className="btn btn-danger">Delete</button>
                <button type="button" className="btn btn-primary">Update</button>

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