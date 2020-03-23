import React from 'react';
import PropTypes from 'prop-types';

const TodoModel = (props) => {
    const {
        open,
        closeModel,
        children

    } = props;
    return (
        <React.Fragment>
            {open && <div onClick={closeModel} className="todo_model_backdrop"></div>}
            <div className="todo_model_content"
                style={{
                    transform: open ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: open ? "1" : "0"
                }}
            >
                {children}
            </div>
        </React.Fragment>
    )
}

TodoModel.defaultProps = {
    open: false,
    closeModel: () => { }
}
TodoModel.propTypes = {
    open: PropTypes.bool,
    closeModel: PropTypes.func
}
export default TodoModel;