import './AppCategory.css';
import IconButton from '@mui/material/IconButton';

import PropTypes from 'prop-types';
import { useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import AddAppModal from '../AddAppModal/AddAppModal';
import DeleteIcon from '@mui/icons-material/Delete';

function AppCategory({ title, handleAdd, handleDelete, isEdit, children }) {
    const [expanded, setExpanded] = useState(true);
    const [showAddApp, setShowAddApp] = useState(false);

    const addAppHandler = (name, url, color) => {
        handleAdd(name, url, color, title);
    };

    return (
        <div className='category'>
            <AddAppModal
                show={showAddApp}
                setShow={setShowAddApp}
                addHandler={addAppHandler}
            ></AddAppModal>
            <div className='category-title'>{title}</div>
            <div className='button-container'>
                <IconButton
                    size='small'
                    style={{
                        margin: '0.4065rem',
                        marginRight: '0.5rem',
                        marginLeft: '1rem',
                        color: '#9c27b0',
                        background: '#343434',
                    }}
                    onClick={() => {
                        setShowAddApp(true);
                    }}
                >
                    <AddIcon></AddIcon>
                </IconButton>
                {isEdit && (
                    <IconButton
                        variant='secondary'
                        size='small'
                        sx={{
                            marginX: '.5rem',
                            background: '#343434',
                            '&:hover': {
                                background: '#3a3a3a',
                                scale: '1.05',
                            },
                            color: '#dd5151',
                            transition: 'all 0.5s ease-in-out',
                        }}
                        onClick={() => handleDelete(title)}
                    >
                        <DeleteIcon />
                    </IconButton>
                )}
                <IconButton
                    size='small'
                    style={{
                        margin: '0.4065rem',
                        marginRight: '1rem',
                        color: '#5b5b5b',
                        background: '#343434',
                        transform: expanded ? '' : 'rotate(-180deg)',
                        transition: 'all 0.5s ease',
                    }}
                    onClick={() => {
                        setExpanded(!expanded);
                    }}
                >
                    <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
                </IconButton>
            </div>
            <div
                className='app-container'
                style={
                    expanded
                        ? null
                        : { maxHeight: 0, paddingTop: 0, paddingBottom: 0 }
                }
            >
                {children}
            </div>
        </div>
    );
}

AppCategory.propTypes = {
    title: PropTypes.string.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    isEdit: PropTypes.bool.isRequired,
    children: PropTypes.node,
};

export default AppCategory;
