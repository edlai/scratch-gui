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

import Tooltip from '@material-ui/core/Tooltip';
import styles from '../components/dr-scratch/dr-scratch.css';
import drScratcIcon from '../components/dr-scratch/drscratch-icon.svg';

class DrScratch extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleClick'
            ]);
        }

    handleClick() {
        console.log("handle DrScratchScore...")

        this.props.saveProjectSb3().then(content => {
            if (this.props.onSaveFinished) {
                this.props.onSaveFinished();
            }
            console.log(content);

            let post_uri = "http://" + window.location.hostname + ":8000/api/upload/"

            console.log("post uri:" + post_uri);

            const formData = new FormData();

            formData.append('file_uploaded', content, 'test.sb3');

            axios.post(post_uri, formData, { // receive two parameter endpoint url ,form data 
            }).then((response) => response.data)
                .then((result) => {
                    console.log('Success:', result);
                    let TotalScore = JSON.parse(result).Abstraction +
                        JSON.parse(result).Parallelization +
                        JSON.parse(result).Logic +
                        JSON.parse(result).Synchronization +
                        JSON.parse(result).FlowControl +
                        JSON.parse(result).UserInteractivity +
                        JSON.parse(result).DataRepresentation
                    let avg_score = Math.round(TotalScore / 3)
                    let Level = ''
                    if (avg_score >= 0 && avg_score <= 7) {
                        Level = '初學者'
                    } else if (avg_score > 7 && abg_score <= 14) {
                        Level = '開發者'
                    } else if (avg_score > 14 && abg_score <= 21) {
                        Level = '專家'
                    }
                    let score = {
                        Abstraction: JSON.parse(result).Abstraction,
                        Parallelization: JSON.parse(result).Parallelization,
                        Logic: JSON.parse(result).Logic,
                        Synchronization: JSON.parse(result).Synchronization,
                        FlowControl: JSON.parse(result).FlowControl,
                        UserInteractivity: JSON.parse(result).UserInteractivity,
                        DataRepresentation: JSON.parse(result).DataRepresentation,
                        TotalScore: TotalScore,
                        Level: Level
                    };
                    this.props.setDrScratchLevel(score);
                }).catch((error) => {
                    console.error('Error:', error);
                });
        });
    }

        render() {
            return (
                <div>
                <Tooltip title="選此透過 Dr.Scratch 進行專案即時評量" aria-label="add">
                <Button uppercase={false} type="button" onClick={this.handleClick}>
                <img src={drScratcIcon} style={{ width: "10%"}} /> &nbsp; Dr.Scratch &nbsp; 即時評量
                </Button>
                </Tooltip>
                </div>
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

DrScratch.propTypes = {
    //drscratch: PropTypes.instanceOf(drScratch),
    setDrScratchLevel: PropTypes.func
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
    projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState),
    drscratch: state.scratchGui.drscratch
});

const mapDispatchToProps = dispatch => ({
    setDrScratchLevel: (Level) => dispatch(setDrScratch(Level))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrScratch);
