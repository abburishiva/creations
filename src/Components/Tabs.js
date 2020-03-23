import React from 'react';
import PropTypes from 'prop-types';

const Tabs = ({ tab, setTab, length }) => {
    return (
        <div className="col-lg-12 text-center my-5">
            <span className={`custom_tabs ${tab === 'All tasks' && 'border_info'}`} onClick={setTab}>
                All tasks
            </span>
            <span className={`custom_tabs ${tab === 'Completed' && 'border_success'}`} onClick={setTab}>
                Completed
            </span>
            <span className={`custom_tabs ${tab === 'Pending' && 'border_dan'}`} onClick={setTab}>
                Pending
            </span>
        </div>
    )
}

Tabs.defaultProps = {
    tab: 'All tasks',
    setTab: () => { }
}

Tabs.propTypes = {
    tab: PropTypes.string,
    setTab: PropTypes.func
}

export default Tabs;
