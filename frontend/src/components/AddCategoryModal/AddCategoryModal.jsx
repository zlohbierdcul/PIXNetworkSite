import { useState } from 'react';
import { Button, Modal, TextField, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import './AddCategoryModal.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: '#232323',
    border: '2px solid #000',
    boxShadow: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    p: 4,
    borderRadius: '1rem',
};

const AddCategoryModal = ({ show, setShow, addHandler }) => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);

    const handleClose = () => {
        setName('');
        setNameError(false);
        setShow(false);
    };

    const handleAdd = () => {
        if (name.length === 0) setNameError(true);

        if (name.length > 0) {
            handleClose();
            addHandler(name);
        }
    };

    return (
        <Modal
            open={show}
            onClose={handleClose}
        >
            <Box
                sx={style}
                className={'add-category-modal'}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                    }}
                >
                    <div className='addapptitle'>Add new category</div>
                    <IconButton
                        sx={{
                            float: 'right',

                            color: '#dd5151',
                        }}
                        onClick={() => setShow(false)}
                    >
                        <CloseIcon></CloseIcon>
                    </IconButton>
                </div>
                <TextField
                    label='Name'
                    value={name}
                    color='secondary'
                    sx={{
                        background: '#323232',
                        borderRadius: '5px',
                        color: '#af70cc',
                    }}
                    error={nameError}
                    onChange={(e) => setName(e.target.value)}
                />

                <div>
                    <Button
                        sx={{
                            background: '#454545',
                            '&:hover': { background: '#dd5151' },
                            color: '#121212',
                        }}
                        variant='contained'
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{
                            float: 'right',
                            color: '#121212',
                        }}
                        variant='contained'
                        color='secondary'
                        onClick={handleAdd}
                    >
                        Add
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

AddCategoryModal.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    addHandler: PropTypes.func.isRequired,
};

export default AddCategoryModal;
