import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

// const dispatchEmailStateFn = (state, action) => {
//   if (action.type === 'EMAIL_INPUT')
//     return { value: action.val, isValid: action.val.includes('@') };
//   else
//     return { value: '', isValid: false }
// }
// const dispatchPasswordStateFn = (state, action) => {
//   if (action.type === 'PASSWORD_INPUT')
//     return { value: action.val, isValid: action.val.trim().length > 4 };
//   else
//     return { value: '', isValid: false }
// }

const dispatchFormFieldsFn = (state, action) => {
  if (action.type === 'EMAIL') {
    return { ...state, email: action.val, emailIsValid: action.val.includes('@'), }
  }
  if (action.type === 'PASSWORD') {
    return { ...state, password: action.val, passwordIsValid: action.val.trim().length >= 4, }
  }
}


const Login = (props) => {
  // const [formIsValid, setFormIsValid] = useState(false);
  const [formFields, setFormFields] = useReducer(dispatchFormFieldsFn, {
    email: '',
    password: '',
    emailIsValid: false,
    passwordIsValid: false,
  })

  const ctx= useContext(AuthContext);
  //useReducer, useEffect, email password change handlers

  // const [emailState, setEmailState] = useReducer(dispatchEmailStateFn, { value: '', isValid: false })
  //const [passwordState, setPasswordState] = useReducer(dispatchPasswordStateFn, { value: '', isValid: false })


  // useEffect(() => {
  //   console.log('EFFECT RUNNING');

  //   return () => {
  //     console.log('EFFECT CLEANUP');
  //   };
  // }, []);
  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);



  // const emailChangeHandler = (event) => {
  //   setEmailState({ type: 'EMAIL_INPUT', val: event.target.value });

  //   setFormIsValid(
  //     event.target.value.includes('@') && passwordState.isValid
  //   );
  // };

  // const passwordChangeHandler = (event) => {
  //   setPasswordState({ type: 'PASSWORD_INPUT', val: event.target.value });

  //   setFormIsValid(
  //     emailState.isValid && event.target.value.trim().length > 4
  //   );
  // };


  const emailChangeHandler = (event) => {
    setFormFields({ type: 'EMAIL', val: event.target.value })
  };
  const passwordChangeHandler = (event) => {
    setFormFields({ type: 'PASSWORD', val: event.target.value });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(formFields.email, formFields.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${formFields.emailIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={formFields.email}
            onChange={emailChangeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${formFields.passwordIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formFields.password}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!(formFields.emailIsValid && formFields.passwordIsValid)}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
