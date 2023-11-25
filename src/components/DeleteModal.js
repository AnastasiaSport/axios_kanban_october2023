import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText} from 'reactstrap';


function DeleteModal({task, deleteTask}) {
    const [modal, setModal] = useState(false);

    const [inputTaskName, setInputTaskName] = useState('')
    const toggle = () => {
        setModal(!modal)
        setInputTaskName('')
    };

    const onDelete = () => {
        deleteTask(task._id)
        toggle()
    }


    return (
        <>
            <Button color="danger" onClick={toggle}>
                Delete
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Delete task</ModalHeader>
                <ModalBody>

                    <Form>
                        <FormGroup>

                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">
                                Enter Task name <strong style={{color: 'darkred'}}>{task.name} </strong> below to delete
                            </Label>
                            <Input
                                placeholder="enter task name..."
                                value={inputTaskName}
                                onChange={(e) => setInputTaskName(e.target.value)}
                            />
                        </FormGroup>

                    </Form>


                </ModalBody>
                <ModalFooter>
                    <Button color="danger"
                            onClick={onDelete}
                            disabled={task.name !== inputTaskName}
                    >
                        Delete
                    </Button>{' '}
                    <Button color="success" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}


export default DeleteModal;