import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import PropTypes from 'prop-types';
import "./DialButton.css"
import EditOffIcon from '@mui/icons-material/EditOff';

function DialButton({ handleAdd, handleEdit, isEdit, blink }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const actions = blink ? [
        { icon: <AddIcon />, name: 'Add category', handler: handleAdd },
    ] : [
        { icon: <AddIcon />, name: 'Add category', handler: handleAdd },
        { icon: isEdit ? <EditOffIcon/> : <EditIcon />, name: isEdit ? 'Disable edit' : 'Enable edit', handler: handleEdit },
    ];

    return (
        <Box
            sx={{
                transform: 'translateZ(0px)',
                flexGrow: 1,
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 999,
            }}
        >
            <SpeedDial
                className={blink ? "blink dial" : "dial"}
                ariaLabel='SpeedDial controlled open example'
                icon={<MoreVertIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                FabProps={{
                    sx: {
                        bgcolor: 'secondary.main',
                        '&:hover': {
                            bgcolor: 'secondary.main',
                        },
                    },
                }}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => {
                            handleClose()
                            action.handler()
                        }}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}

DialButton.propTypes = {
    handleAdd: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    isEdit: PropTypes.bool,
    blink: PropTypes.bool,
};

export default DialButton;

