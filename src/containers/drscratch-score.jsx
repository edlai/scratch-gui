import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import VM from 'scratch-vm';
import Box from '../components/box/box.jsx';

import {projectTitleInitialState} from '../reducers/project-title';
import downloadBlob from '../lib/download-blob';

import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/Wifi';
import AssistantPhotoSharp from '@material-ui/icons/AssistantPhotoSharp';

import {drScratchInitialState, setDrScratch} from '../reducers/drscratch';
import drscratch from './drscratch.jsx';

class DrScratchScore extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick'
        ]);
    }

    handleClick () {
        console.log("handle DrScratchScore...");
        setDrScratch();
    }

    render() {
        return (
            <span>
            分數: {this.props.drscratch.TotalScore}/21 &nbsp;|&nbsp;
            等級: {this.props.drscratch.Level}         &nbsp;|&nbsp;
            抽象化: {this.props.drscratch.Abstraction} &nbsp;|&nbsp; 
            平行化: {this.props.drscratch.Parallelization}  &nbsp;|&nbsp; 
            邏輯化: {this.props.drscratch.Logic}  &nbsp;|&nbsp;
            同步化: {this.props.drscratch.Synchronization}  &nbsp;|&nbsp;
            流程化: {this.props.drscratch.FlowControl}  &nbsp;|&nbsp;
            人性化: {this.props.drscratch.UserInteractivity}  &nbsp;|&nbsp;
            資料化: {this.props.drscratch.DataRepresentation}
            </span>
        );
    }
}


const getProjectFilename = (curTitle, defaultTitle) => {
    let filenameTitle = curTitle;
    if (!filenameTitle || filenameTitle.length === 0) {
        filenameTitle = defaultTitle;
    }
    console.log(`${filenameTitle.substring(0, 100)}.sb3`);
    return `${filenameTitle.substring(0, 100)}.sb3`;
};

DrScratchScore.propTypes = {
    className: PropTypes.string,
    vm: PropTypes.instanceOf(VM),
    wrapperClass: PropTypes.string,
    onSaveFinished: PropTypes.func,
    projectFilename: PropTypes.string,
    saveProjectSb3: PropTypes.func,
    setDrScratch: PropTypes.func
    //drscratch: PropTypes.instanceOf(drScratch),
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
    projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState),
    drscratch: state.scratchGui.drscratch
});

const mapDispatchToProps = dispatch => ({
    setDrScratch: () => dispatch(setDrScratch())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrScratchScore);
