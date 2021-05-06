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
    let new_url = "http://" + window.location.hostname + ":8000";
    window.open(new_url, '_blank').focus();
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

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    },
}));

function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
}

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 300,
        fontSize: theme.typography.pxToRem(14),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

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
            level = <Tooltip title="我是超極巨化的超級妙蛙花!我是最強的!!"><img src={VenusaurMegaDream} style={{ width: "4%"}}/></Tooltip>;
        else if (this.props.drscratch.TotalScore >= 14 && this.props.drscratch.TotalScore < 21)
            level = <Tooltip title="我是妙蛙花，等級21以上我就會變成超級妙蛙花喔!"><img src={Venusaur} style={{ width: "4%"}}/></Tooltip>;
        else if (this.props.drscratch.TotalScore >= 7 && this.props.drscratch.TotalScore < 14)
            level = <Tooltip title="我是妙蛙草，等級14以上我就會變成妙蛙花喔!等級21以上我就會變成超級妙蛙花!"><img src={Ivysaur} style={{ width: "4%"}}/></Tooltip>;
        else
            level = <Tooltip title="我是妙蛙種子，等級7以上我就會變成妙蛙草喔!等級14以上我就會變成妙蛙花!等級21以上我就會變成超級妙蛙花!"><img src={Bulbasaur} style={{ width: "4%"}}/></Tooltip>;
        
        let level_define = <Tooltip title="妙蛙種子">等級: </Tooltip>;
        let drscratch_icon = <img src={drScratcIcon} style={{ width: "2%"}} />;

        let drscratch_logo = <Tooltip title="Scratch 小老師(Dr.Scratch)可以幫你的作品評分。按下滑鼠左鍵，就可以打開 Scratch 小老師 (Dr.Scratch) 網站。" arrow><Box component="span" m={1}><img alt="Dr.Scratch" draggable={false} src={drScratchLogo} onClick={onClickLogoDrScratch} /></Box></Tooltip>;
        
        let curr_url = window.location.hostname;
        let substring = "502";

        if(curr_url.indexOf(substring) !== -1 || curr_url.indexOf("drscratch") !== -1){
            console.log("drscratch or c502");
        return (
            <React.Fragment>
                {drscratch_logo}
                <Typography component="div" variant="body1">
                   <HtmlTooltip
                        title={
                            <React.Fragment>
                                <Typography color="inherit">✂️ 問題拆解與抽象化: 就像拿把剪刀一樣，透過觀察與思考把一個大問題分解成一個個小問題，把相同的小問題歸納在一起，然後一個一個小問題分頭處理。最後當所有的小問題解決的時候，大問題也一併解決了。</Typography>
                                <ol>
                                    <li>如果你能得到一顆星星⭐，代表你的作品有兩個以上的「角色」與「動作」。</li>
                                    <li>如果你能得到兩顆星星⭐⭐，代表你有用到「函式積木」的功能把相同的動作整理在一起。</li>
                                    <li>如果你能得到三顆星星⭐⭐⭐，代表你能善用「當分身產生」等相關功能。</li>
                                </ol>
                            </React.Fragment>
                        }
                    >
                    <Box component="span" m={1}>
                    ✂️ 抽象: <Rating size="small" name="read-only" value={this.props.drscratch.Abstraction} readOnly max={3} /></Box>
                    </HtmlTooltip>

                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                <Typography color="inherit">🐙平行處理: 電腦就像章魚一樣有很多手，一次可以同時進行很多件事!</Typography>
                                <ol>
                                    <li>如果你能得到一顆星星⭐的學習者，代表會用到當 「當綠旗被點擊時」可以同時觸發兩個腳本 。</li>
                                    <li>如果你能得到兩顆星星⭐⭐的學習者，代表會用到「事件」中的兩個當 「當角色被點擊時」的積木。</li>
                                    <li>如果你能得到三顆星星⭐⭐⭐的學習者。代表會用到「廣播訊息」與「當收到訊息」的積木。</li>
                                </ol>
                            </React.Fragment>
                        }
                    >
                    <Box component="span" m={1}>
                    🐙 平行: <Rating size="small" name="read-only" value={this.props.drscratch.Parallelization} readOnly max={3} /></Box>
                    </HtmlTooltip>
                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                <Typography color="inherit">🐶 邏輯判斷: 電腦可以像狗狗一樣精明，知道誰是好人，誰是壞人。</Typography>
                                <ol>
                                    <li>如果你能得到一顆星星⭐的學習者，代表你有用到 「如果」 的積木。</li>
                                    <li>如果你能得到兩顆星星⭐⭐的學習者，用到你有用到 「如果-否則」 的積木。</li>
                                    <li>如果你能得到三顆星星⭐⭐⭐的學習者，用到你有用到 「運算」「或」的積木。</li>
                                </ol>
                            </React.Fragment>
                        }
                    >
                    <Box component="span" m={1}>
                    🐶 邏輯: <Rating size="small" name="read-only" value={this.props.drscratch.Logic} readOnly max={3} /></Box>
                    </HtmlTooltip>
                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                <Typography color="inherit">🐢 同步處理:電腦跑得很快，我們來等一下</Typography>
                                <ol>
                                    <li>如果你能得到一顆星星⭐的學習者，代表你會用兩個循序動作的積木。</li>
                                    <li>如果你能得到兩顆星星⭐⭐的學習者，用到你有用到 「重複」或「重複無限次」等相關的積木。</li>
                                    <li>如果你能得到三顆星星⭐⭐⭐的學習者，用到你有用到 「重複直到」去組合一個「當某數大於某數」的積木。</li>
                                </ol>
                            </React.Fragment>
                        }
                    >
                    <Box component="span" m={1}>
                    🐢 同步: <Rating size="small" name="read-only" value={this.props.drscratch.Synchronization} readOnly max={3} /></Box>
                    </HtmlTooltip>
                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                <Typography color="inherit">🎠 流程控制(Flow Control):電腦可以像旋轉木馬一樣，把一個任務進行無限多次。</Typography>
                                <ol>
                                    <li>如果你能得到一顆星星⭐的學習者，代表你會用「等待」幾「秒」 的積木。</li>
                                    <li>如果你能得到兩顆星星⭐⭐的學習者，用到你有用到 「停止全部」等相關的積木。</li>
                                    <li>如果你能得到三顆星星⭐⭐⭐的學習者，用到你有用到 「重複直到」去組合一個「當某數大於某數」的積木。</li>
                                </ol>
                            </React.Fragment>
                        }
                    >
                    <Box component="span" m={1}>
                    🎠 流程: <Rating size="small" name="read-only" value={this.props.drscratch.FlowControl} readOnly max={3} /></Box>
                    </HtmlTooltip>
                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                <Typography color="inherit">💖 人性互動: 科技始終來自於人性!! </Typography>
                                <ol>
                                    <li>如果你能得到一顆星星⭐的學習者，代表會用到當 「當綠旗被點擊時」的程式積木。</li>
                                    <li>如果你能得到兩顆星星⭐⭐的學習者，代表會能使用到當按鍵被按下、角色被點擊、詢問並等待單相關積木。</li>
                                    <li>如果你能得到三顆星星⭐⭐⭐的學習者，代表會用到當某個條件成立的判斷式。</li>
                                </ol>
                            </React.Fragment>
                        }
                    >
                    <Box component="span" m={1}>
                    💖 人性: <Rating size="small" name="read-only" value={this.props.drscratch.UserInteractivity} readOnly max={3} /></Box>
                    </HtmlTooltip>

                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                <Typography color="inherit">📋 資料呈現: 可以用電腦設定、記住或操作任何資料!</Typography>
                                <ol>
                                    <li>如果會更改角色的設定的話，可以得到可以得到一顆星⭐。</li>
                                    <li>如果會設定與更改變數內容的話可以得到兩顆星⭐⭐。</li>
                                    <li>使用會使用清單(多個變數的組合)的話，可以得到三顆星⭐⭐⭐。</li>
                                </ol>
                            </React.Fragment>
                        }
                    >
                    <Box component="span" m={1}>
                    📋 資料: <Rating size="small" name="read-only" value={this.props.drscratch.DataRepresentation} readOnly max={3} /></Box>
                    </HtmlTooltip>
                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                <Typography color="inherit">這是你目前的的積分!!</Typography>
                                積分越高，右邊的圖案也會隨著你棒不棒而換成不同的圖案。
                                <ol>
                                    <li>剛開始的等級是妙蛙種子。</li>
                                    <li>等級 7 以上是成妙蛙草。</li>
                                    <li>等級 14 以上會變成妙蛙花。</li>
                                    <li>等級 21 會變成超級妙蛙花。</li>
                                </ol>
                            </React.Fragment>
                        }
                    >
                    <Box component="span" m={1} color="warning.main">
                    {drscratch_icon}等級: {this.props.drscratch.TotalScore} / 21 {drscratch_icon}
                    </Box>
                    </HtmlTooltip>
                </Typography>

                {level}
            </React.Fragment>
        );
        }else{
            console.log("501");
            return (            
                <React.Fragment>
                  {drscratch_logo} <Box component="span" m={1} bgcolor="info.main"><Typography component="div" variant="body1"><marquee>👈 當完成一個作品後，就把你的作品存檔，並上傳到 Scratch小老師(Dr.Scratch)網站。讓我們看看你棒不棒。</marquee></Typography></Box>
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

