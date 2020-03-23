import React from 'react';
import Model from './Model';
const DeleteModel = ({ data, open, closeModel, deleteTodo }) => {
    return (
        <Model open={open} closeModel={closeModel}>
            <h4 className="text-center my-3">Todo Details</h4>
            <div className="p-4">
                <p><strong>Title:</strong> &nbsp; {data.title}</p>
                <p><strong>Description:</strong> &nbsp; {data.description}</p>
                <p><strong>Created At:</strong> &nbsp; {data.createdAt}</p>
                <p><strong>Due Date:</strong> &nbsp; {data.dueDate}</p>
                <p><strong>Priority:</strong> &nbsp; {data.priority}</p>
                <p><strong>Status:</strong> &nbsp;
                    <span className={`badge ${data.currentState ? 'badge-danger' : 'badge-success'}`}>
                        {data.currentState ? "Open" : "Completed"}
                    </span>
                </p>
                <hr />
                <div className="mt-2">
                    <small className="text-danger float-left">
                        <i className="fa fa-exclamation-triangle"></i> Do you want to delete ?
                    </small>
                    <button className="btn btn-sm btn-danger ml-2 float-right" onClick={() => deleteTodo(data.id)}>Yes</button>
                    <button className="btn btn-sm btn-primary float-right" onClick={closeModel}>No</button>
                </div>
            </div>
        </Model>
    )
};

export default DeleteModel;