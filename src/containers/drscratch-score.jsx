import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import VM from 'scratch-vm';

import Box from '@material-ui/core/Box';

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
import CircularProgress from '@material-ui/core/CircularProgress';
import CircularProgressWithLabel from './drscratch-process.jsx';

import { makeStyles, withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import Bulbasaur from '../components/dr-scratch/300px-001Bulbasaur.png';
import Ivysaur from '../components/dr-scratch/300px-002Ivysaur.png';
import Venusaur from '../components/dr-scratch/300px-003Venusaur.png';
import VenusaurMegaDream from '../components/dr-scratch/300px-003Venusaur-Mega_Dream.png';
import drScratcIcon from '../components/dr-scratch/drscratch-icon.svg';

import drScratchLogo from '../components/dr-scratch/drscratch-logo.svg';

const onClickLogoDrScratch = () => {
    window.location = "http://" + window.location.hostname + ":8000"
};

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
        let level;
        if (this.props.drscratch.TotalScore >=21)
            level = <Tooltip title="我是超級妙蛙花。我已經是是超極巨化了!"><img src={VenusaurMegaDream} style={{ width: "4%"}}/></Tooltip>;
        else if (this.props.drscratch.TotalScore >= 14 && this.props.drscratch.TotalScore < 21)
            level = <Tooltip title="我是妙蛙花，等21以上我就會變成超級妙蛙花喔!"><img src={Venusaur} style={{ width: "4%"}}/></Tooltip>;
        else if (this.props.drscratch.TotalScore >= 7 && this.props.drscratch.TotalScore < 14)
            level = <Tooltip title="妙蛙草，等14以上我就會變成妙蛙花喔!"><img src={Ivysaur} style={{ width: "4%"}}/></Tooltip>;
        else
            level = <Tooltip title="我是妙蛙種子，等級7以上我就會變成妙蛙草喔!"><img src={Bulbasaur} style={{ width: "4%"}}/></Tooltip>;
        
        let level_define = <Tooltip title="妙蛙種子">等級: </Tooltip>;
        let drscratch_icon = <img src={drScratcIcon} style={{ width: "2%"}} />;

        let drscratch_logo = <Tooltip title="打開 Dr.Scratch 網站"><Box component="span" m={1}><img alt="Dr.Scratch" draggable={false} src={drScratchLogo} onClick={onClickLogoDrScratch} /></Box></Tooltip>;
        
        let curr_url = window.location.hostname;
        let substring = "502";

        if(curr_url.indexOf(substring) !== -1 || curr_url.indexOf("drscratch") !== -1){
            console.log("drscratch or c502");
        return (
            <React.Fragment>
                {drscratch_logo}
                <Typography component="div" variant="body1">
                    <Tooltip title="用放大鏡將一個問題分解成一個個小問題。我們也可以用函式積木把相同的動作整理在一起。也可以善用分身的功能，把人物同時複製多份。"><Box component="span" m={1} bgcolor="info.main">
                    🔍 抽象: <Rating size="small" name="read-only" value={this.props.drscratch.Abstraction} readOnly max={3} /></Box></Tooltip>
                    <Tooltip title="電腦就像章魚一樣有很多手，一次可以同時進行很多件事!">
                    <Box component="span" m={1} bgcolor="info.main">
                    🐙 平行: <Rating size="small" name="read-only" value={this.props.drscratch.Parallelization} readOnly max={3} /></Box></Tooltip>
                    <Tooltip title="電腦可以像狗狗一樣明辨是非，知道誰是好人，誰是壞人!">
                    <Box component="span" m={1} bgcolor="info.main">
                    🐶 邏輯: <Rating size="small" name="read-only" value={this.props.drscratch.Logic} readOnly max={3} /></Box></Tooltip>
                    <Tooltip title="電腦跑得很快，我們可以讓電腦像烏龜一樣，暫停一下!">
                    <Box component="span" m={1} bgcolor="info.main">
                    🐢 同步: <Rating size="small" name="read-only" value={this.props.drscratch.Synchronization} readOnly max={3} /></Box></Tooltip>
                    <Tooltip title="電腦可以像旋轉木馬一樣，把一個任務進行無限多次，你也可以設定你所需要的進行的次數!">
                    <Box component="span" m={1} bgcolor="info.main">
                    🎠 流程: <Rating size="small" name="read-only" value={this.props.drscratch.FlowControl} readOnly max={3} /></Box></Tooltip>
                    <Tooltip title="讓電腦充滿人性化，讓使用者的操作更加便利!">
                    <Box component="span" m={1} bgcolor="info.main">
                    💖 人性: <Rating size="small" name="read-only" value={this.props.drscratch.UserInteractivity} readOnly max={3} /></Box></Tooltip>
                    <Tooltip title="電腦可以記住使用者目前的得分!">
                    <Box component="span" m={1} bgcolor="info.main">
                    📋 資料: <Rating size="small" name="read-only" value={this.props.drscratch.DataRepresentation} readOnly max={3} /></Box></Tooltip>
                    <Tooltip title="這是你目前的的得分!">
                    <Box component="span" m={1} bgcolor="info.main" color="secondary.main">{drscratch_icon}
                    等級: {this.props.drscratch.TotalScore} / 21</Box></Tooltip>
                </Typography>
                {level}
            </React.Fragment>
        );
        }else{
            console.log("501");
            return (            
                <React.Fragment>
                  {drscratch_logo}
                </React.Fragment>
        );
        }
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
    setDrScratch: PropTypes.func,
    onClickLogoDrScratch: PropTypes.func,
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
