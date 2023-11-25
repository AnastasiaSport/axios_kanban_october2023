import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText} from 'reactstrap';


function UpdateModal({task, statuses, priorities, updateTask}) {
    const [modal, setModal] = useState(false);
    const initialState = {
        _id: task._id,
        name: task.name,
        description: task.description,
        status: task.status,
        priority: task.priority
    }
    const [newTask, setNewTask] = useState(initialState)
    const toggle = () => {
        setModal(!modal)
        setNewTask(initialState)
    };

    const onUpdate = () => {
        updateTask(newTask)
        toggle()
    }


    return (
        <>
            <Button color="primary" onClick={toggle}>
                Update
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Update task</ModalHeader>
                <ModalBody>

                    <Form>
                        <FormGroup>

                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">
                                Task name
                            </Label>
                            <Input

                                placeholder="enter task name..."
                                value={newTask.name}
                                onChange={(e) => setNewTask({...newTask, name: e.target.value})}

                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">
                                Status
                            </Label>
                            <Input
                                type="select"
                                value={newTask.status}
                                onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                            >
                                {statuses.map((el) =>
                                    <option key={el._id}>
                                        {el.status}
                                    </option>
                                )}

                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleSelect">
                                Priority
                            </Label>
                            <Input
                                type="select"
                                value={newTask.priority}
                                onChange={(e) => setNewTask({...newTask, priority: +e.target.value})}
                            >
                                {priorities.map((el, index) =>
                                    <option key={index}>
                                        {el}
                                    </option>
                                )}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleText">
                                Description
                            </Label>
                            <Input
                                id="exampleText"
                                name="text"
                                type="textarea"
                                value={newTask.description}
                                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                            />
                        </FormGroup>


                    </Form>


                </ModalBody>
                <ModalFooter>
                    <Button color="danger"
                            onClick={onUpdate}
                    >
                        Update
                    </Button>{' '}
                    <Button color="success" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}


export default UpdateModal;