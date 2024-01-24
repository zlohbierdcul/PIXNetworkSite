import { useState, useEffect } from 'react';
import { Button, Modal, TextField, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import CasinoIcon from '@mui/icons-material/Casino';
import PropTypes from 'prop-types';

const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

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

const EditAppModal = ({ show, setShow, appInfo, editHandler }) => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [url, setUrl] = useState('');
    const [faviconURL, setFaviconURL] = useState('');
    const [urlError, setUrlError] = useState(false);
    const [colorR, setColorR] = useState(255);
    const [colorG, setColorG] = useState(255);
    const [colorB, setColorB] = useState(255);

    const handleClose = () => {
        setName('');
        setUrl('');
        setFaviconURL('');
        setNameError(false);
        setUrlError(false);
        setColorR(255);
        setColorG(255);
        setColorB(255);
        setShow(false);
    };

    useEffect(() => {
        if (Object.entries(appInfo).length === 0) return;

        setName(appInfo.title);
        setUrl(appInfo.url);
        setFaviconURL(appInfo.faviconURL)
        setNameError(false);
        setUrlError(false);
        setColorR(appInfo.color[0]);
        setColorG(appInfo.color[1]);
        setColorB(appInfo.color[2]);
    }, [appInfo]);

    const handleAdd = () => {
        if (name.length === 0) setNameError(true);
        if (url.length === 0) setUrlError(true);

        if (!urlRegex.test(url)) {
            return setUrlError(true);
        }
        if (name.length > 0 && url.length > 0) {
            if (name !== appInfo.title) {
                editHandler(
                    appInfo.category,
                    name,
                    url,
                    faviconURL,
                    [colorR, colorG, colorB],
                    appInfo.title
                );
            } else {
                editHandler(appInfo.category, name, url, faviconURL, [
                    colorR,
                    colorG,
                    colorB,
                ]);
            }
            handleClose();
        }
    };

    return (
        <Modal
            open={show}
            onClose={handleClose}
        >
            <Box
                sx={style}
                className={'addapp-modal'}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                    }}
                >
                    <div className='addapptitle'>Edit app</div>
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
                <TextField
                    label='URL'
                    value={url}
                    color='secondary'
                    sx={{ background: '#323232', borderRadius: '5px' }}
                    error={urlError}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <TextField
                    label='Icon URL'
                    value={faviconURL}
                    color='secondary'
                    sx={{ background: '#323232', borderRadius: '5px' }}
                    onChange={(e) => setFaviconURL(e.target.value)}
                />
                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        flexWrap: 'wrap',
                        minWidth: 0,
                        minHeight: 0,
                    }}
                >
                    <TextField
                        label='R'
                        type='number'
                        inputProps={{ min: 0, max: 255 }}
                        value={colorR}
                        color='secondary'
                        sx={{
                            background: '#323232',
                            borderRadius: '5px',
                            minWidth: '50px',
                            maxWidth: '90px',
                            flexGrow: 2,
                        }}
                        onChange={(e) =>
                            setColorR(Number.parseInt(e.target.value))
                        }
                    />
                    <TextField
                        label='G'
                        type='number'
                        inputProps={{ min: 0, max: 255 }}
                        value={colorG}
                        color='secondary'
                        sx={{
                            background: '#323232',
                            borderRadius: '5px',
                            minWidth: '50px',
                            maxWidth: '90px',
                            flexGrow: 2,
                        }}
                        onChange={(e) =>
                            setColorG(Number.parseInt(e.target.value))
                        }
                    />
                    <TextField
                        label='B'
                        type='number'
                        inputProps={{ min: 0, max: 255 }}
                        value={colorB}
                        color='secondary'
                        sx={{
                            background: '#323232',
                            borderRadius: '5px',
                            minWidth: '50px',
                            maxWidth: '90px',
                            flexGrow: 2,
                        }}
                        onChange={(e) =>
                            setColorB(Number.parseInt(e.target.value))
                        }
                    />
                    <div
                        style={{
                            height: '56px',
                            borderRadius: '5px',
                            minWidth: '50px',
                            flexGrow: 3,
                            background: `rgb(${colorR}, ${colorG}, ${colorB})`,
                        }}
                    ></div>
                    <Button
                        size='large'
                        sx={{
                            background: '#9c27b0',
                            '&:hover': { background: '#7b1fa2' },
                            flexGrow: 1,
                        }}
                        variant='primary'
                        onClick={() => {
                            setColorR(Math.floor(Math.random() * 256));
                            setColorG(Math.floor(Math.random() * 256));
                            setColorB(Math.floor(Math.random() * 256));
                        }}
                    >
                        <CasinoIcon />
                    </Button>
                </div>
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
                        Update
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

EditAppModal.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    appInfo: PropTypes.object.isRequired,
    editHandler: PropTypes.func.isRequired,
};

export default EditAppModal;
