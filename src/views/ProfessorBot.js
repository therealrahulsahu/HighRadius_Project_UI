import { Modal, Grid, Typography, Input}  from '@material-ui/core/';
import axios from 'axios';
import send from "../assets/send-24px.svg";
import CloseIcon from '@material-ui/icons/Close';
import MinimizeIcon from '@material-ui/icons/Minimize';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import BotIcon from '../assets/voiceIcon.svg';
import MeIcon from '../assets/avatar.svg';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { addMessage, removeAllMessage } from '../reducers';

const mapStateToProps = state => {
	return{
    messages: state.chatBotReducer.messages,
    messageCount: state.chatBotReducer.count
	}
}

const mapDispatchToProps = dispatch => {
	return {
	  addMessage : (data) => dispatch(addMessage(data)),
	  removeAllMessage: () => dispatch(removeAllMessage())
	}
}

const botMessage = (text, index) => {
  return(
    <ListItem alignItems="flex-start" key={index}>
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={BotIcon} />
      </ListItemAvatar>
      <ListItemText
        secondary={<Typography autoid="ai" style={{color:'white', fontSize:'2vh'}}>{text}</Typography>}
        
      />
    </ListItem>
  )
}

const userMessage = (text, index) => {
  return(
    <ListItem alignItems="flex-start" key={index}>
      <ListItemText
        secondary={<Typography autoid="human" style={{color:'white', fontSize:'2vh', textAlign:'right'}}>{text}</Typography>}
        style={{
          marginRight:'15px'
        }}
      />
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={MeIcon} />
      </ListItemAvatar>
    </ListItem>
  )
}

const commonMessage = (text, index) => {
  if(index%2 === 0){
    return botMessage(text, index);
  }else{
    return userMessage(text, index);
  }
}

export class ProfessorBot extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       open: false,
       message: ""
    }

    this.messagesEndRef = React.createRef();
  }
  
  executeUserMessage = () => {
    this.props.addMessage(this.state.message);
    if(this.state.message !== ""){
      axios({
        method: 'post',
        url: 'http://localhost:4000/chat',
        data: {
          message: this.state.message,        
        }
      })
      .then((response) => {
        this.props.addMessage(response.data.message);       
        this.setState({
          message:""
        })
      })
      .catch((error) => {
        console.log('error')
      })
    }
  }

  render() {
    return (
      <Modal
        open={this.state.open}
        hideBackdrop={true}
      > 
        <Grid container
          direction='column'
          justify='flex-start'
          alignItems='stretch'
          style={{
            border:'1px solid orange',
            backgroundColor:'#1B1F38',
            height:'93vh',
            width:'330px',
            position:"absolute",
            top: '7vh',
            right: '0'
          }}
        >
          <Grid container
            direction="row"
            justify="space-between"
            alignItems="center"
            style={{
              height:'7%',
              width:'100%',
              //border: '1px solid white'
            }}
          >
            <Typography 
              style={{
                color:'white', 
                marginRight:'100px', 
                marginLeft:'5px'
                }}>PROFESSOR</Typography>
            <MinimizeIcon 
              style={{
                color:'white', 
                marginLeft:'40px', 
                cursor:'pointer'}}
              onClick={this.handleMinimize}
              autoid="professor-minimize-button"
                />
            <CloseIcon 
              style={{
                color:'white', 
                marginRight:'5px', 
                cursor:'pointer'}}
              onClick={this.handleClose}  
              autoid="professor-close-button"
                />
            

          </Grid>
          <Grid
            style={{
              overflow:'auto',
              height:'83%',
              width:'100%',
              //border: '1px solid red'"
              scrollBottom:'1px'
            }}
          >
            
            <List style={{width:'100%'}}>
              {this.props.messages.map((text, index) => commonMessage(text, index))}
              <div ref={this.messagesEndRef} />
            </List> 
          </Grid>
          <Grid container
            style={{
              height:'9%',
              width:'100%',
              //border: '1px solid green'
            }}
          >
            <Grid container item 
              wrap="nowrap" 
              style={{
                border:'1px solid #33DCFF', 
                borderRadius:'50px', 
                height:'70%',
                marginLeft:'10px',
                marginRight:'10px'
                }}>
              <Input
                type="search"
                style={{ color: "white", fontSize: "2.5vh", marginLeft:'10px'}}
                disableUnderline
                fullWidth
                autoFocus
                placeholder="Type here..."
                value={this.state.message}
                onChange={this.handleMessageChange}
                onKeyPress ={this.onEnterPressed}
                autoid="professor-input-box"
              />
              <img src={send} alt="" 
                style={{
                  cursor:'pointer', 
                  width:"6vh", 
                  height:"auto",
                  backgroundColor:'#33DCFF',
                  borderRadius:'50px'
                  }}
                  onClick={this.executeUserMessage}
                  autoid="professor-send-button"
                  />
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    )
  }


  componentDidUpdate () {
    this.scrollToBottom()
  }
  
  scrollToBottom = () => {
    try{
      this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }catch{}
  }

  onEnterPressed = (event) => {
    var code = event.keyCode || event.which;
    if(code === 13) { 
      this.executeUserMessage();
    } 
  }

  handleMessageChange = (event) => {
    this.setState({
      message: event.target.value
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
    this.props.removeAllMessage();
  }

  handleMinimize = () => {
    this.setState({
      open: false
    })
  }

  handleOpen = () => {
    this.setState({
      open: true
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(ProfessorBot)
