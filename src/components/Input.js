import React from 'react';
import {
  withStyles
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from "prop-types";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarProvider, useSnackbar } from 'notistack';

const styles = (theme) => ({
  ...theme.pallete,
  card: {
    backgroundColor: theme.palette.bg.main,
  },
  inp: {
    color: '#ffffff'
  }
})

class Input extends React.Component {
  state = {
    checked: true,
    code: '',
    botName: '',
    open: false,
  }

  updateText = name => event => {
    this.setState({ [name]: event.target.value });
  }

  checkHandleTrue = () => {
    this.setState({ checked: true });
  }

  checkHandleFalse = () => {
    this.setState({ checked: false });
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  sendBots = () => {
    let rec = this.state.checked ? "y" : "n";
    Axios.post(`https://kahootV2api.combusken.repl.co/bots`, {
      name: this.state.botName,
      code: this.state.code,
      rec
    })
      .then(res => {
        this.setState({ open: true });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const { classes } = this.props;
    return(
      <SnackbarProvider maxSnack={3}>
      <div className="mainDiv">
        <Card className={classes.card}>
        <CardContent>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" column="true">
              <Box m={1}>
                <TextField onChange={this.updateText("code")} type="number" width="100%" placeholder="000000" className="inp" id="outlined-basic" label="Kahoot Code" variant="outlined" color="primary"/>
              </Box>
              <Box m={1}>
                <TextField onChange={this.updateText("botName")} placeholder="Jeffrey" className="inp" id="outlined-basic" label="Bot Names" variant="outlined" color="primary"/>
              </Box>
              <Box mx="auto">
             <FormControlLabel
                control={<Checkbox color="primary" onChange={this.state.checked === true ? this.checkHandleFalse : this.checkHandleTrue }/>}
                label="Recursive(?): "
                labelPlacement="start"
                className="inp"
              />
              </Box>
              <Button onClick={this.sendBots} variant="contained" color="primary">Submit</Button>
            </FormGroup>
          </FormControl>
          </CardContent>
        </Card>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message="Sent Bots"
        />
      </div>
      </SnackbarProvider>
    )
  }
}

Input.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Input);