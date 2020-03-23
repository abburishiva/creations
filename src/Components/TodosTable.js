import React from 'react';
import PropTypes from 'prop-types';

const TodosTable = ({ data, deleteModelStart, editTodoStart, toggleCurrentStatus, searchTerm, sortData }) => {
    const getHighlight = (text, higlight) => {
        const parts = text.split(new RegExp(`(${higlight})`, 'gi'));
        return <span>
            {
                parts.map((part, index) => part.toLowerCase() === higlight.toLowerCase() ? <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span> : part)
            }
        </span>;
    }
    return (
        <React.Fragment>
            <div className="col-lg-10 m-auto">
                <div className="card card-body shadow">
                    {data.length === 0 ? <p className="text-center text-danger my-5">No todos found ...</p>
                        :
                        (
                            <table className="table table-bordered m-0">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th onClick={() => sortData('title')}>Title</th>
                                        <th>Description</th>
                                        <th onClick={() => sortData('createdAt')}>Created on</th>
                                        <th onClick={() => sortData('dueDate')}>Due date</th>
                                        <th onClick={() => sortData('priority')}>Priority</th>
                                        <th onClick={() => sortData('currentState')} className="text-center">Status</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data.map((val, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input type="checkbox" />
                                            </td>
                                            <td>
                                                {/* {val.title} */}
                                                {getHighlight(val.title, searchTerm)}
                                            </td>
                                            <td>
                                                {getHighlight(val.description, searchTerm)}
                                                {/* {val.description} */}
                                            </td>
                                            <td>{val.createdAt}</td>
                                            <td>{val.dueDate}</td>
                                            <td>{val.priority}</td>
                                            <td className="text-center">
                                                <span className={`badge ${val.currentState ? 'badge-danger' : 'badge-success'}`}>{val.currentState ? "Open" : "Completed"}</span>
                                            </td>
                                            <td className="text-center">
                                                <button onClick={() => editTodoStart(val)} className="btn btn-sm btn-info mr-2">
                                                    <i className="fa fa-pencil"></i>
                                                </button>
                                                <button onClick={() => deleteModelStart(val)} className="btn btn-sm btn-danger mr-2">
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                                <button onClick={() => toggleCurrentStatus(val.id)} className={`btn btn-sm btn-${val.currentState ? 'warning' : 'primary'}`}>
                                                    <i className={`fa fa-${val.currentState ? 'times-circle-o' : 'check'}`}></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

TodosTable.defaultProps = {
    data: []
}

TodosTable.propTypes = {
    data: PropTypes.array
}

export default TodosTable;