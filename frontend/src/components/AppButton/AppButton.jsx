import './AppButton.css';
import Tooltip from '@mui/material/Tooltip';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const AppButton = ({ url, iconURL, color, isEdit, children }) => {
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
                    {iconURL.length > 0 ? (
                        <img
                            id={children + '-id'}
                            src={iconURL}
                            alt='Icon'
                        />
                    ) : (
                        <QuestionMarkIcon
                            sx={{ width: '55px', height: '55px' }}
                        ></QuestionMarkIcon>
                    )}
                    <span>{children}</span>
                </div>
            </Tooltip>
            {true && (
                <IconButton
                    variant='secondary'
                    size='small'
                    sx={{
                        scale: isEdit ? 1 : 0,
                        position: 'absolute',
                        top: -15,
                        right: -15,
                        background: '#dd5151',
                        '&:hover': {
                            background: '#ff5151',
                            scale: '1.05',
                        },
                        color: '#121212',
                        transition: 'all 0.3s ease-in-out',
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            )}
        </div>
    );
};

AppButton.propTypes = {
    url: PropTypes.string.isRequired,
    iconURL: PropTypes.string.isRequired,
    color: PropTypes.array,
    isEdit: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

export default AppButton;
