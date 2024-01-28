import './AppButton.css';
import Tooltip from '@mui/material/Tooltip';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AppButton = ({ title, url, iconURL, category, color, isEdit, isUp, handleDelete, setShowEdit, setAppInfo }) => {
    const handleEditClick = () => {
        const info = {
            category: category,
            title: title,
            url: url,
            faviconURL: iconURL,
            color: color
        }
        setAppInfo(info)
        setShowEdit(true)
    }
    return (
        <div
            className='outter-app'
            style={{
                position: 'relative',
            }}
        >
            <Tooltip
                title={url}
                placement='top'
                followCursor
            >
                <div
                    className='app-btn'
                    style={{
                        position: 'relative',
                        borderColor: color
                            ? `rgb(${color[0]}, ${color[1]}, ${color[2]})`
                            : '#' +
                              (0x1000000 + Math.random() * 0xffffff)
                                  .toString(16)
                                  .substr(1, 6),
                    }}
                    href={url}
                    onClick={() => window.open(url, '_blank')}
                >
                    <div className='indicator' style={{background: isUp ? "#0F0" : "#F00"}}></div>
                    {iconURL.length > 0 ? (
                        <img
                            id={title + '-id'}
                            src={iconURL}
                            alt='Icon'
                        />
                    ) : (
                        <QuestionMarkIcon
                            sx={{ width: '55px', height: '55px' }}
                        ></QuestionMarkIcon>
                    )}
                    <span>{title}</span>
                </div>
            </Tooltip>
            <div
                className='edit-btn-container'
                style={{
                    pointerEvents: isEdit ? "auto" : "none",
                    backgroundColor: isEdit ? '#353535b7' : 'transparent',
                }}
            >
                <IconButton
                    variant='secondary'
                    size='small'
                    sx={{
                        scale: isEdit ? 1 : 0,
                        background: '#dd5151',

                        '&:hover': {
                            background: '#ff5151',
                            scale: '1.05',
                        },
                        color: '#121212',
                        transition: 'all 0.3s ease-in-out',
                    }}
                    onClick={handleDelete}
                >
                    <DeleteIcon />
                </IconButton>
                <IconButton
                    variant='secondary'
                    size='small'
                    sx={{
                        scale: isEdit ? 1 : 0,
                        background: '#505050',

                        '&:hover': {
                            background: '#5a5a5a',
                            scale: '1.05',
                        },
                        color: '#121212',
                        transition: 'all 0.3s ease-in-out',
                    }}
                    onClick={handleEditClick}
                >
                    <EditIcon />
                </IconButton>
            </div>
        </div>
    );
};

AppButton.propTypes = {
    title: PropTypes.node.isRequired,
    url: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    iconURL: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired,
    color: PropTypes.arrayOf(PropTypes.number),
    isEdit: PropTypes.bool,
    setShowEdit: PropTypes.func,
    setAppInfo: PropTypes.func,
};

export default AppButton;

