import React from 'react';

const AddTodoButton = ({ openModel }) => {
    return (
        <button className="add_button_postion btn btn-primary shadow" onClick={openModel}>
            <i className="fa fa-plus"></i>
        </button>
    )
}
export default AddTodoButton;