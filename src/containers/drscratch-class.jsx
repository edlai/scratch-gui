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

  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lm">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
          <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
              <Paper className={classes.control}>
                <Grid container>
                  <Grid item>
                    <FormLabel>小丑魚找朋友</FormLabel>
                    <RadioGroup
                      name="小丑魚找朋友 (製作中)"
                      aria-label="spacing"
                      value={spacing.toString()}
                      onChange={handleChange}
                      row
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((value) => (
                        <FormControlLabel
                          key={value}
                          value={value.toString()}
                          control={<Radio />}
                          label={value.toString()}
                        />
                      ))}
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={spacing}>                

<dl>
  <dt>說明</dt>
  <dd>- <div> <a href="static/samples/drscratch-class.pptx" target="_blank"> 小丑魚找朋友 (Power Point File) </a> </div></dd>
  <dd>- <div> <a href="static/samples/drscratch-class.pdf" target="_blank">  小丑魚找朋友 (PDF)  </a> </div></dd>
  <dt>範例程式</dt>
  <dd>- <div> <a href="static/samples/fish000.sb3" target="_blank">  海裡一隻孤單的小丑魚  </a> </div></dd>
  <dd>- <div> <a href="static/samples/fish001.sb3" target="_blank">  勇敢踏出第 N 步!  </a> </div></dd>
  <dd>- <div> <a href="static/samples/fish002.sb3" target="_blank">  有人在嗎?  </a> </div></dd>
  <dd>- <div> <a href="static/samples/fish003.sb3" target="_blank">  看旗號 (當綠旗被點擊)  </a> </div></dd>
</dl>

              </Grid>
            </Grid>

          </Grid>
        </Typography>
      </Container>

    </React.Fragment>
  );
}
