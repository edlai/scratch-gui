import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import GreenFlag from '../green-flag/green-flag.jsx';
import StopAll from '../stop-all/stop-all.jsx';
import TurboMode from '../turbo-mode/turbo-mode.jsx';

import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

//import DrScratch from '../../containers/drscratch.jsx';

import styles from './controls.css';

const messages = defineMessages({
    goTitle: {
        id: 'gui.controls.go',
        defaultMessage: 'Go',
        description: 'Green flag button title'
    },
    stopTitle: {
        id: 'gui.controls.stop',
        defaultMessage: 'Stop',
        description: 'Stop button title'
    }
});

const Controls = function (props) {
    const {
        active,
        className,
        intl,
        onGreenFlagClick,
        onStopAllClick,
        turbo,
        ...componentProps
    } = props;

    let drscratch_tip;

    let curr_url = window.location.hostname;
    let substring = "502";

    if(curr_url.indexOf(substring) !== -1 || curr_url.indexOf("drscratch") !== -1){
        console.log("drscratch or c502");
        drscratch_tip = 1;
    }
    return (
        <div
            className={classNames(styles.controlsContainer, className)}
            {...componentProps}
        >

            <GreenFlag
                active={active}
                title={intl.formatMessage(messages.goTitle)}
                onClick={onGreenFlagClick}
            />
            <StopAll
                active={active}
                title={intl.formatMessage(messages.stopTitle)}
                onClick={onStopAllClick}
            />
            {turbo ? (
                <TurboMode />
            ) : null}

            { drscratch_tip ? (
                <Box component="span" m={1}><Typography component="div" variant="body1"><marquee>👈 當完成一個作品後，點選左邊綠旗就可以看到 Scratch 小老師 (Dr.Scratch) 給你的評分(若從電腦上傳作品，分數不會即時更新，須按下綠旗才會更新)&nbsp;&nbsp;(分數更新需耗費一點時間，分數若無即時更新，按下綠旗後請稍等一下)。</marquee></Typography></Box>
            ) : null}
        </div>
    );
};

Controls.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    intl: intlShape.isRequired,
    onGreenFlagClick: PropTypes.func.isRequired,
    onStopAllClick: PropTypes.func.isRequired,
    turbo: PropTypes.bool
};

Controls.defaultProps = {
    active: false,
    turbo: false
};

//  <DrScratch />

export default injectIntl(Controls);
