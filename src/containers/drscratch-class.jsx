import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {defineMessages, intlShape, injectIntl} from 'react-intl';
import VM from 'scratch-vm';

import AssetPanel from '../components/asset-panel/asset-panel.jsx';
import soundIcon from '../components/asset-panel/icon--sound.svg';
import soundIconRtl from '../components/asset-panel/icon--sound-rtl.svg';
import addSoundFromLibraryIcon from '../components/asset-panel/icon--add-sound-lib.svg';
import addSoundFromRecordingIcon from '../components/asset-panel/icon--add-sound-record.svg';
import fileUploadIcon from '../components/action-menu/icon--file-upload.svg';
import surpriseIcon from '../components/action-menu/icon--surprise.svg';
import searchIcon from '../components/action-menu/icon--search.svg';

import RecordModal from './record-modal.jsx';
import SoundEditor from './sound-editor.jsx';
import SoundLibrary from './sound-library.jsx';

import soundLibraryContent from '../lib/libraries/sounds.json';
import {handleFileUpload, soundUpload} from '../lib/file-uploader.js';
import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import DragConstants from '../lib/drag-constants';
import downloadBlob from '../lib/download-blob';


import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

import {connect} from 'react-redux';

import {
    closeSoundLibrary,
    openSoundLibrary,
    openSoundRecorder
} from '../reducers/modals';

import {
    activateTab,
    COSTUMES_TAB_INDEX
} from '../reducers/editor-tab';

import {setRestore} from '../reducers/restore-deletion';
import {showStandardAlert, closeAlertWithId} from '../reducers/alerts';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function DrScratchClass() {

  const [spacing, setSpacing] = React.useState(0);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lm">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
          <Grid container className={classes.root} spacing={1}>

            <Grid item xs={12}>
              <Grid container justify="center" spacing={spacing}>

                說明
                  <ol>
                  <li> <a href="static/drscratch-class/drscratch-class.pptx" target="_blank"> 小丑魚找朋友 (Power Point File) </a> </li>
                  <li> <a href="static/drscratch-class/drscratch-class.pdf" target="_blank">  小丑魚找朋友 (PDF)  </a> </li>
                </ol>

                  範例程式
                    <ol start="0">
                  <li><a href="static/drscratch-class/fish000.sb3" target="_blank">  一隻孤單的小丑魚  </a> </li>
                  <li><a href="static/drscratch-class/fish001.sb3" target="_blank">  勇敢踏出第 N 步! </a></li>
                  <li><a href="static/drscratch-class/fish000.sb3" target="_blank">  一隻孤單的小丑魚  </a> </li>



                  <li> <a href="static/drscratch-class/fish001.sb3" target="_blank">  勇敢踏出第 N 步!  </a> </li>
                  <li> <a href="static/drscratch-class/fish002.sb3" target="_blank">  有魚在嗎? </a> </li>
                  <li> <a href="static/drscratch-class/fish003.sb3" target="_blank">  綠旗  </a> </li>
                  <li> <a href="static/drscratch-class/fish004.sb3" target="_blank">  一直游 </a> </li>
                  <li> <a href="static/drscratch-class/fish005.sb3" target="_blank">  游太快!!  </a> </li>
                  <li> <a href="static/drscratch-class/fish006.sb3" target="_blank">  游多久了  </a> </li>
                  <li> <a href="static/drscratch-class/fish007.sb3" target="_blank">  兩個綠旗  </a></li>
                  <li> <a href="static/drscratch-class/fish008.sb3" target="_blank">  游來游去  </a></li>
                  <li> <a href="static/drscratch-class/fish009.sb3" target="_blank">  找到同伴  </a></li>
                  <li> <a href="static/drscratch-class/fish010.sb3" target="_blank">  多莉出現   </a> </li>
                  <li> <a href="static/drscratch-class/fish011.sb3" target="_blank">  誰是主角  </a> </li>
                  <li> <a href="static/drscratch-class/fish012.sb3" target="_blank">  玩遊戲  </a> </li>
                  <li> <a href="static/drscratch-class/fish013.sb3" target="_blank">  Game Over </a> </li>
                  <li> <a href="static/drscratch-class/fish014.sb3" target="_blank">  誰贏  </a> </li>
                  <li> <a href="static/drscratch-class/fish015.sb3" target="_blank">  猜不到 </a> </li>
                  <li> <a href="static/drscratch-class/fish016.sb3" target="_blank">  出現愛心 </a> </li>
                  <li> <a href="static/drscratch-class/fish017.sb3" target="_blank">  天荒地老 </a> </li>
                  <li> <a href="static/drscratch-class/fish018.sb3" target="_blank">  曾經擁有 </a> </li>
                  <li> <a href="static/drscratch-class/fish019.sb3" target="_blank">  歷史紀錄 </a> </li>
                  <li> <a href="static/drscratch-class/fish020.sb3" target="_blank">  或 </a> </li>
                  <li> <a href="static/drscratch-class/fish021.sb3" target="_blank">  視訊 </a> </li>
                </ol>

              </Grid>
            </Grid>

          </Grid>
        </Typography>
      </Container>

    </React.Fragment>
  );
}

// <img src="static/drscratch-class/fish000.png" alt="logo" style={{ width: '50%', height: 200 }}/>