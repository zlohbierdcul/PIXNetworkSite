import './AppButton.css';

import PropTypes from 'prop-types';

const AppButton = ({ url }) => {
    return (
        <div
            className='app-btn'
            style={{
                borderColor:
                    '#' +
                    (0x1000000 + Math.random() * 0xffffff)
                        .toString(16)
                        .substr(1, 6),
            }}
            onClick={() => (window.location.href = url)}
        >
            <img
                src='/assets/figma.png'
                alt='Icon'
            />
            <span>Figma</span>
        </div>
    );
};

AppButton.propTypes = {
    url: PropTypes.string.isRequired,
};

export default AppButton;
