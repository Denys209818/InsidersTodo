import React from 'react';
import { Root } from './Root';
import { useAppDispatch } from './hooks';
import { userActions } from './redux/reducers/userSlice';

const App = () => {
  const dispatch = useAppDispatch();


  const authJSON = localStorage.getItem('user');
  const authData = authJSON ? JSON.parse(localStorage.getItem('user') || '') : '';

  if (authData) {
    dispatch(userActions.setUser(authData));
  }

  return (<Root />);
}

export default App;
