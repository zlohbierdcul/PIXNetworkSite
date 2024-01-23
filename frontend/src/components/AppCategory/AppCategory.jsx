import './AppCategory.css';
import IconButton from '@mui/material/IconButton';

import PropTypes from 'prop-types';
import { useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function AppCategory({ title, children }) {
    const [expanded, setExpanded] = useState(true);

    return (
        <div
            className='category'
        >
            <div className='category-title'>{title}</div>
            <IconButton
                style={{
                    right: 0,
                    top: 0,
                    margin: '1rem',
                    marginRight: "1rem",
                    color: '#5b5b5b',
                    background: '#343434',
                    position: 'absolute',
                    transform: expanded ? "" : "rotate(-180deg)",
                    transition: "all 0.3s ease-in-out"
                }}
                
                onClick={() => {
                    setExpanded(!expanded);
                }}
            >
                <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
            </IconButton>
            <div className='app-container' style={expanded ? null : { maxHeight: 0, paddingTop: 0, paddingBottom: 0 }}>{children}</div>
        </div>
    );
}

AppCategory.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default AppCategory;
