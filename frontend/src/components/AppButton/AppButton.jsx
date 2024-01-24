
import './AppButton.css';
import Tooltip from '@mui/material/Tooltip';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PropTypes from 'prop-types';

const AppButton = ({ url, iconURL, color, children }) => {
    return (
        <Tooltip
            title={url}
            placement='top'
            followCursor
        >
            <div
                className='app-btn'
                style={{
                    borderColor: color
                        ? color
                        : '#' +
                          (0x1000000 + Math.random() * 0xffffff)
                              .toString(16)
                              .substr(1, 6),
                }}
                href={url}
                onClick={() => window.open(url, '_blank')}
            >
                {iconURL.length > 0 ?
                <img
                    id={children + '-id'}
                    src={iconURL}
                    alt='Icon'
                />
                :
                <QuestionMarkIcon sx={{width: "55px", height: "55px"}}></QuestionMarkIcon>
                
            }
                <span>{children}</span>
            </div>
        </Tooltip>
    );
};

AppButton.propTypes = {
    url: PropTypes.string.isRequired,
    iconURL: PropTypes.string.isRequired,
    color: PropTypes.array,
    children: PropTypes.node.isRequired,
};

export default AppButton;
