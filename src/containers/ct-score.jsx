import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import VM from 'scratch-vm';
import Box from '../components/box/box.jsx';
import greenFlag from '../components/green-flag/icon--green-flag.svg';

import {projectTitleInitialState} from '../reducers/project-title';
import downloadBlob from '../lib/download-blob';

import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/Wifi';
import AssistantPhotoSharp from '@material-ui/icons/AssistantPhotoSharp';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

class ComputerThinkingScore extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick'
        ]);
        this.state = {
            Abstraction: 0,
            Parallelization: 0,
            Logic: 0,
            Synchronization: 0,
            FlowControl: 0,
            UserInteractivity: 0,
            DataRepresentation: 0};
    }

    handleClick () {
        console.log("ComputerThinkingScore")
        // this.setState(state => ({
        //   logic: state.logic + 1
        // }));
        this.props.saveProjectSb3().then(content => {
            if (this.props.onSaveFinished) {
                this.props.onSaveFinished();
            }
            //console.log(content);
            //console.log(content.prototype);

            // fetch('https://httpbin.org/ip',).then(function (response) {
            //     console.log(response);
            //     return response.json();
            // }).then(function (data) {
            //     console.log(data);
            // }).catch(function (err) {
            //     console.log(err);
            // });

            // fetch('http://172.17.2.205:8000/api/upload/', {
            //     method: 'POST',
            //     mode: 'no-cors',
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'Cache-Control': 'no-cache'
            //     },
            //     body: content
            // }).then(
            //     response => response.json() // if the response is a JSON object
            // );
            console.log(content);

            const formData = new FormData();
    
            formData.append('file_uploaded', content, 'test.sb3');
        
            axios.post("http://172.17.2.205:8000/api/upload/", formData, { // receive two parameter endpoint url ,form data 
            }).then((response) => response.data)
                .then((result) => {
                    console.log('Success:', result);
                    this.setState({
                        Abstraction: JSON.parse(result).Abstraction,
                        Parallelization: JSON.parse(result).Parallelization, 
                        Logic: JSON.parse(result).Logic, 
                        Synchronization: JSON.parse(result).Synchronization, 
                        FlowControl: JSON.parse(result).FlowControl, 
                        UserInteractivity: JSON.parse(result).UserInteractivity, 
                        DataRepresentation: JSON.parse(result).DataRepresentation
                      });
                }).catch((error) => {
                    console.error('Error:', error);
                });
            // downloadBlob(this.props.projectFilename, content);
        });
    }

    render() {
        return (
            <div>
                <span onClick={this.handleClick}>[ 評量 ]</span>
                <span >[ 等級: 專家 ]</span>
                <span> [ 分數: {this.state.Abstraction +
                    this.state.Parallelization +
                    this.state.Logic +
                    this.state.Synchronization +
                    this.state.FlowControl +
                    this.state.UserInteractivity +
                    this.state.DataRepresentation} / 21 ]
                    <IconButton aria-label="cart">
                        <StyledBadge badgeContent={this.state.Abstraction} color="secondary">
                            <ShoppingCartIcon />
                        </StyledBadge>
                        <StyledBadge badgeContent={this.state.Parallelization} color="secondary">
                            <AssistantPhotoSharp />
                        </StyledBadge>
                        <StyledBadge badgeContent={this.state.Logic} color="secondary">
                            <ShoppingCartIcon />
                        </StyledBadge>
                        <StyledBadge badgeContent={this.state.Synchronization} color="secondary">
                            <ShoppingCartIcon />
                        </StyledBadge>
                        <StyledBadge badgeContent={this.state.FlowControl} color="secondary">
                            <ShoppingCartIcon />
                        </StyledBadge>
                        <StyledBadge badgeContent={this.state.UserInteractivity} color="secondary">
                            <ShoppingCartIcon />
                        </StyledBadge>
                        <StyledBadge badgeContent={this.state.DataRepresentation} color="secondary">
                            <ShoppingCartIcon />
                        </StyledBadge>
                    </IconButton>
                </span>
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

ComputerThinkingScore.propTypes = {
    className: PropTypes.string,
    vm: PropTypes.instanceOf(VM),
    wrapperClass: PropTypes.string,
    onSaveFinished: PropTypes.func,
    projectFilename: PropTypes.string,
    saveProjectSb3: PropTypes.func
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
    projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState)
});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComputerThinkingScore);
