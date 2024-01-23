import { useLayoutEffect, useState } from 'react';
import './AppButton.css';
import getAverageColor from 'get-average-color';

import PropTypes from 'prop-types';

const AppButton = ({ url, iconURL, children }) => {
    const [color, setColor] = useState(
        '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    );

    useLayoutEffect(() => {
        try {
            getAverageColor(iconURL).then((d) => setColor(d));
        } catch (e) {
            console.log('Cannot load avg color');
        }
    }, []);

    return (
        <div
            className='app-btn'
            style={{
                borderColor: color,
            }}
            href={url}
            onClick={() => window.open(url, '_blank')}
        >
            <img
                id={children + '-id'}
                src={iconURL}
                alt='Icon'
            />
            <span>{children}</span>
        </div>
    );
};

AppButton.propTypes = {
    url: PropTypes.string.isRequired,
    iconURL: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default AppButton;
