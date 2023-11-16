import React from 'react';
import Card from "./Card";

const Column = ({status, tasks}) => {

    return (
        <div className="col">
            <h2> {status.title} </h2>
            {tasks
                .filter(task =>
                    status.title === task.status
                )
                .map(task =>
                <Card
                    task={task}
                    key={task._id}
                />
                )}

        </div>
    );
};

export default Column;