import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component{
  constructor(){
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword:''
    }
  }
  handleSubmit = async event => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if ( password !== confirmPassword){
      alert('Passwords don\'t match');
      return;
    }

    try{ 

      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      await createUserProfileDocument(user, { displayName });
      this.setState({
        display: '',
        email: '',
        password: '',
        confirmPassword:''
      });
      document.querySelectorAll('input').forEach(cur=>{
        cur.removeAttribute('required');
      });
 
    } catch (error){
      console.log(error);
    }

  }

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({[name] : value});
  }
 
  render(){
    const { displayName, email, password, confirmPassword } = this.state;
    return(
      <div className='sign-up'>
        <h2 className='title'>I do not have an account</h2>
        <span>Sign up with your email and password</span>

        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput 
          name='displayName'
          type='text'
          value={displayName}
          label = 'Display Name'
          required
          handleChange={this.handleChange}
         />

          <FormInput 
          type='email'
          name='email'
          value={email}
          label = 'Email'
          required
          handleChange={this.handleChange}
         />
          <FormInput 
          type='password'
          name='password'
          value={password}
          label = 'Password'
          required
          handleChange={this.handleChange}
         />
          <FormInput 
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          label = 'Confirm password'
          required
          handleChange={this.handleChange}
         />
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </div>
    )
  }
}

export default SignUp;