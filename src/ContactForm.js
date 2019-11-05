import React,{Component} from "react";
import { exportDefaultSpecifier } from "@babel/types";
import Axios from "axios";

export default class ContactForm extends Component {

    constructor(props){
     super(props)
     console.log("Constructor called");
     this.state={
         email:'',
         password:'',
         emailError:'',
         passwordError:'',
         disabled:true,
         successmsg:''
     }
    }

    handleButtonClick =()=>{
      console.log(this.state);
      if(!this.validateEmail(this.state.email)){
         this.setState({
             emailError:"Email is invalid"
         })
      }else if(this.validatePassword(this.state.password)){
         this.setState({
             passwordError:"Password is not strong"
         })
      }else{
          this.setState({
              emailError:'',
              passwordError:''
          })

         Axios.post("https://buvvas-login-server.herokuapp.com/login",{
             email:this.state.email,
             password:this.state.password
         }).then((result)=>{
              this.setState({
                  successmsg:"Login Successful"
              })
         }).catch(err=>{
             console.log("error occured")
             console.log(err)
         })
          
      }
    }
    
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validatePassword(password){
        console.log(password);
       return password.length<=6?true:false
    }
    handleEmailChange =(event)=>{
        
        this.setState({
            email:event.target.value
        })
    }

    handlePasswordChange =(event)=>{
        this.setState({
            password:event.target.value
        })
    }
    
   
    render(){
        return(
            <div className="contact-form">
                <h3>Login</h3>
                <input type="email" name="email" onChange={this.handleEmailChange}  className="input-text" placeholder="Email" />
                <div className="error">{this.state.emailError}</div>
                <input type="password" name="password" onChange={this.handlePasswordChange} className="input-text" placeholder="Password" />
                 <div className="error">{this.state.passwordError}</div>
                <div className="btns">

                <button className="btn"  type="button" onClick={this.handleButtonClick}>Submit</button>
                <button className="btn" type="reset">Reset</button>
                <div className="successMsg">{this.state.successmsg}</div>
                </div>
            </div>
        )
    }
}