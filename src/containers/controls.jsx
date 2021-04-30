import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import {connect} from 'react-redux';

import ControlsComponent from '../components/controls/controls.jsx';

import axios from 'axios';

import {drScratchInitialState, setDrScratch} from '../reducers/drscratch';
class Controls extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleGreenFlagClick',
            'handleStopAllClick'
        ]);
    }
    handleGreenFlagClick (e) {
        e.preventDefault();
        if (e.shiftKey) {
            this.props.vm.setTurboMode(!this.props.turbo);
        } else {
            if (!this.props.isStarted) {
                this.props.vm.start();
            }
            this.props.vm.greenFlag();
        }

        this.props.vm.saveProjectSb3().then(content => {
            if (this.props.vm.onSaveFinished) {
                this.props.vm.onSaveFinished();
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
    handleStopAllClick (e) {
        e.preventDefault();
        this.props.vm.stopAll();
    }
    render () {
        const {
            vm, // eslint-disable-line no-unused-vars
            isStarted, // eslint-disable-line no-unused-vars
            projectRunning,
            turbo,
            ...props
        } = this.props;
        return (
            <ControlsComponent
                {...props}
                active={projectRunning}
                turbo={turbo}
                onGreenFlagClick={this.handleGreenFlagClick}
                onStopAllClick={this.handleStopAllClick}
            />
        );
    }
}

Controls.propTypes = {
    isStarted: PropTypes.bool.isRequired,
    projectRunning: PropTypes.bool.isRequired,
    turbo: PropTypes.bool.isRequired,
    vm: PropTypes.instanceOf(VM),
    setDrScratchLevel: PropTypes.func
};

const mapStateToProps = state => ({
    isStarted: state.scratchGui.vmStatus.running,
    projectRunning: state.scratchGui.vmStatus.running,
    turbo: state.scratchGui.vmStatus.turbo
});
// no-op function to prevent dispatch prop being passed to component
const mapDispatchToProps = dispatch => ({
    setDrScratchLevel: (Level) => dispatch(setDrScratch(Level))
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
