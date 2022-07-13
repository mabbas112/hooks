import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const dispatchEmailStateFn = (state, action) => {
  if (action.type === 'EMAIL_INPUT')
    return { value: action.val, isValid: action.val.includes('@') };
  else
    return { value: '', isValid: false }
}
const dispatchPasswordStateFn = (state, action) => {
  if (action.type === 'PASSWORD_INPUT')
    return { value: action.val, isValid: action.val.trim().length > 4 };
  else
    return { value: '', isValid: false }
}


const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);


  const [emailState, setEmailState] = useReducer(dispatchEmailStateFn, { value: '', isValid: false })
  const [passwordState, setPasswordState] = useReducer(dispatchPasswordStateFn, { value: '', isValid: false })

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);
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

  const emailChangeHandler = (event) => {
    setEmailState({ type: 'EMAIL_INPUT', val: event.target.value });

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    setPasswordState({ type: 'PASSWORD_INPUT', val: event.target.value });

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 4
    );
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
