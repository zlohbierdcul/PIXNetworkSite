import './AppCategory.css';

import PropTypes from 'prop-types';

function AppCategory({ title, children }) {
    return (
        <div className='category'>
            <div className='category-title'>{title}</div>
            <button onClick={() => {
                const appContainer = document.querySelector(".app-container");
                if (appContainer.classList.contains("hidden")) {
                    appContainer.classList.remove("hidden")
                } else {
                    appContainer.classList.add("hidden");
                }

            }} style={{float: "right"}}>Eyyyy</button>
            <div className='app-container'>
                {children}
            </div>
        </div>
    );
}

AppCategory.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default AppCategory;
