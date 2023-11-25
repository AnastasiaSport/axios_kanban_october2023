import React from 'react';
import Card from "./Card";

const Column = ({status, tasks, statuses, priorities, changePriority, moveTask, updateTask, deleteTask}) => {

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
                    statuses={statuses}
                    priorities={priorities}
                    changePriority={changePriority}
                    moveTask={moveTask}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />
                )}

        </div>
    );
};

export default Column;