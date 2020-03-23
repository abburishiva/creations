import React from 'react';
import PropTypes from 'prop-types';
import Model from './Model';

const TodoModel = (props) => {
    const {
        closeModel,
        handleAddTodo,
        handleChange,
        title,
        dueDate,
        description,
        priority,
        loading,
        open

    } = props;
    const priorities = ["None", "Low", "Medium", "High"];
    return (
        <Model open={open} closeModel={closeModel}>
            <h4 className="text-center my-3">Add Todo</h4>
            <form className="p-4" onSubmit={handleAddTodo}>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <label>Title:</label>
                        <input value={title} onChange={handleChange} name='title' type="text" className="form-control" placeholder="Title" />
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label>Due Date:</label>
                        <input value={dueDate} onChange={handleChange} name='dueDate' type="date" className="form-control" />
                    </div>
                    <div className="col-lg-12 mb-3">
                        <label>Description:</label>
                        <textarea value={description} onChange={handleChange} name='description' className="form-control" rows='4' placeholder="Description"></textarea>
                    </div>
                    <div className="col-lg-12 mb-3">
                        <label>Priority:</label>
                        <br />
                        {priorities.map(pri => (
                            <div key={pri} className="custom-control custom-radio custom-control-inline">
                                <input
                                    onChange={handleChange}
                                    type="radio"
                                    className="custom-control-input"
                                    id={`${pri}`}
                                    name="priority"
                                    value={`${pri}`}
                                    checked={pri === priority}
                                />
                                <label className="custom-control-label" htmlFor={`${pri}`}>{pri}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="float-right">
                    <button type='reset' onClick={closeModel} className="btn btn-sm btn-danger mr-2">Cancel</button>
                    <button type='submit' disabled={loading} className="btn btn-sm btn-primary">
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </Model>
    )
}

TodoModel.defaultProps = {
    open: false,
    closeModel: () => { },
    handleAddTodo: () => { },
    handleChange: () => { },
    title: '',
    dueDate: '',
    description: '',
    priority: '',
    loading: false
}
TodoModel.propTypes = {
    open: PropTypes.bool,
    closeModel: PropTypes.func,
    handleAddTodo: PropTypes.func,
    handleChange: PropTypes.func,
    title: PropTypes.string,
    dueDate: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.string,
    loading: PropTypes.bool
}
export default TodoModel;