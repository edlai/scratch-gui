import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import VM from 'scratch-vm';
import Box from '../components/box/box.jsx';

import {projectTitleInitialState} from '../reducers/project-title';
import downloadBlob from '../lib/download-blob';

import axios from 'axios';

import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/Wifi';
import AssistantPhotoSharp from '@material-ui/icons/AssistantPhotoSharp';

import {drScratchInitialState, setDrScratch} from '../reducers/drscratch';
import drscratch from './drscratch.jsx';
import Paper from '@material-ui/core/Paper';

import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

import { makeStyles, withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';



const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});

const styles = {
    root: {
        flexGrow: 1,
      },
      paper: {
        height: 140,
        width: 100,
      }
  };

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
            <React.Fragment>
            <Rating size="small" name="read-only" value={this.props.drscratch.TotalScore} readOnly max={21} />
            <Typography>
            <Button container className={styles.root} spacing={10}> {this.props.drscratch.TotalScore}/21 </Button>
            </Typography>
            </React.Fragment>
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


{/* <Button container className={styles.root} spacing={10}>分數: {this.props.drscratch.TotalScore}/21 </Button>
<Button>等級: {this.props.drscratch.Level}   </Button>      
<Paper>抽象化: {this.props.drscratch.Abstraction}</Paper>
<Paper>平行化: {this.props.drscratch.Parallelization}  </Paper>
<Paper>邏輯化: {this.props.drscratch.Logic}  </Paper>
<Paper>同步化: {this.props.drscratch.Synchronization}  </Paper>
<Paper>流程化: {this.props.drscratch.FlowControl}  </Paper>
<Paper>人性化: {this.props.drscratch.UserInteractivity}  </Paper>
<Paper>資料化: {this.props.drscratch.DataRepresentation}</Paper> */}