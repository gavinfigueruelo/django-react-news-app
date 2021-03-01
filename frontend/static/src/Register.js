import React, {Component} from 'react'
import Cookies from 'js-cookie'

class Register extends Component {
  constructor (props){
        super(props);
        this.state = {
          isLoggedIn: !!Cookies.get('Authorization'),
          username: "",
          email: "",
          password1: "",
          password2: "",
        }
    this.handleInput = this.handleInput.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
      }

  handleInput(event){
        this.setState({[event.target.name]: event.target.value});
      }

  async handleRegistration(e, obj){
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(obj),
    };
    const handleError = (err) => console.warn(err);
    const response = await fetch('/rest-auth/registration/', options);
    const data = await response.json().catch(handleError);

    if(data.key) {
      Cookies.set('Authorization', `Token ${data.key}`);
    }
    this.setState({username: "", email: "", password1: "", password2: ""})
  }


      render(){

  const registerForm = (<form onSubmit={(e) => this.handleRegistration(e, this.state)}>
        <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.handleInput}/>
        <input type="email" placeholder="email" name="email" value={this.state.email} onChange={this.handleInput}/>
        <input type="password" placeholder="password" name="password1" value={this.state.password1} onChange={this.handleInput}/>
        <input type="password" placeholder="confirm pass" name="password2" value={this.state.password2} onChange={this.handleInput}/>
        <p><button className="btn-primary btn" type="submit">Register</button></p>
        </form>)

        return(
          <div>
          {registerForm}
          </div>
        );
      }
    }

    export default Register