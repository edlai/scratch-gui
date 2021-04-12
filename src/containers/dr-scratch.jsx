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

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

class DrScratchScore extends React.Component {
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
            DataRepresentation: 0,
	    TotalScore: 0,
	    Level: ''};
    }

    handleClick () {
        console.log("handle DrScratchScore...")
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

	    let post_uri = "http://" + window.location.hostname + ":8000/api/upload/"
	
            console.log ("post uri:" + post_uri);
	
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
		    let avg_score = Math.round(TotalScore/3)
		    let Level = ''
		    if (avg_score >= 0 && avg_score <= 7) {
			Level = '初學者'
		    } else if (avg_score >7 && abg_score <= 14) {
			Level = '開發者'
		    } else if (avg_score >14 && abg_score <= 21) {
			Level = '專家'
                    }
                    this.setState({
                        Abstraction: JSON.parse(result).Abstraction,
                        Parallelization: JSON.parse(result).Parallelization, 
                        Logic: JSON.parse(result).Logic, 
                        Synchronization: JSON.parse(result).Synchronization, 
                        FlowControl: JSON.parse(result).FlowControl, 
                        UserInteractivity: JSON.parse(result).UserInteractivity, 
                        DataRepresentation: JSON.parse(result).DataRepresentation,
			TotalScore: TotalScore,
			Level: Level
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
                <Button onClick={this.handleClick}>即時診斷</Button> |
                <span>等級: {this.state.Level} |
                總分: {this.state.TotalScore} |
                抽象化: {this.state.Abstraction} |
                平行化: {this.state.Parallelization} |
                邏輯化: {this.state.Logic} |
                同步化: {this.state.Synchronization} |
                流程化: {this.state.FlowControl} |
                人性化: {this.state.UserInteractivity} | 
                資料化: {this.state.DataRepresentation}
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

DrScratchScore.propTypes = {
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
)(DrScratchScore);
