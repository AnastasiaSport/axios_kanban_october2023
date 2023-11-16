import React from 'react';

const Card = ({task}) => {
    return (
        <div className="card text-center" style={{marginBottom: '10px'}}>
            <div className="card-header">
                <button type="button" className="btn btn-outline-success">←</button>
                {task.status}
                <button type="button" className="btn btn-outline-success">→</button>
            </div>
            <div className="card-body">
                <h5 className="card-title">{task.name}</h5>
                <p className="card-text">{task.description}</p>
                <button type="button" className="btn btn-danger">Delete</button>
                <button type="button" className="btn btn-primary">Update</button>

            </div>
            <div className="card-footer text-body-secondary">
                <button type="button" className="btn btn-outline-warning">←</button>
                Priority: {task.priority}
                <button type="button" className="btn btn-outline-warning">→</button>
            </div>
        </div>
    );
};

export default Card;