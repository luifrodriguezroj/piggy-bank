import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deposit, withdraw, change } from './actions';
import axios from 'axios';

function Nav() {
  const balance = useSelector(state => state.balance);
  const dispatch = useDispatch();

  const [idValue, setIdValue] = useState(0);

  const dispatchChange = async () => {
    axios.get('/accounts/' + idValue)
      .then(res => {
        if (res.data !== "") {
          dispatch(change(idValue));
          dispatch(withdraw(balance));
          dispatch(deposit(parseFloat(res.data.balance)));
        } else {
          axios.post('/accounts', {
            owner: idValue,
            balance: 0
          }).then(res => {
            dispatch(change(idValue));
            dispatch(withdraw(balance));
            dispatch(deposit(parseFloat(res.data.balance)));
          }).catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }
  return (
    <div className="header">
      <Link className="logo" to="/">Piggy Bank</Link>
      <div className="header-center">
        <input type="text" placeholder="Write your id here" onChange={event => setIdValue(parseInt(event.target.value))}></input>
        <button onClick={dispatchChange}>Check Account</button>
      </div>
      <div className="header-right">
        <Link className="active" to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
      </div>
    </div>
  )
}

export default Nav
