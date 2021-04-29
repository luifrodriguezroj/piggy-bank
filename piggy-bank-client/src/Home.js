import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deposit, withdraw } from './actions';
import axios from 'axios';

function Home() {
  const balance = useSelector(state => state.balance);
  const id = useSelector(state => state.id);
  const dispatch = useDispatch();

  const [depositValue, setDepositValue] = useState(0);
  const [withdrawValue, setWithdrawValue] = useState(0);
  
  const dispatchDeposit = async () => {
    axios.put('http://localhost:5000/accounts/' + id, {
      balance: balance + depositValue
    }).then(res => {
      dispatch(deposit(depositValue));
      setDepositValue(0);
      document.getElementById('depositInput').value = '';
    }).catch(err => console.log(err));
  }

  const dispatchWithdraw = async () => {
    axios.put('http://localhost:5000/accounts/' + id, {
      balance: balance - withdrawValue
    }).then(res => {
      dispatch(withdraw(withdrawValue));
      setWithdrawValue(0);
      document.getElementById('withdrawInput').value = '';
    }).catch(err => console.log(err));
  }
  return (
    <div>
      <div className="boxes">
          <div className="box">
            <h1>Deposit Money</h1>
            <input id="depositInput" type="number" onChange={event => setDepositValue(parseInt(event.target.value))}></input>
            <button onClick={dispatchDeposit}>Deposit</button>
          </div>
          <div className="box">
            <h1>Withdraw Money</h1>
            <input id="withdrawInput" type="number" onChange={event => setWithdrawValue(parseInt(event.target.value))}></input>
            <button onClick={dispatchWithdraw}>Withdraw</button>
          </div>
        </div>
        <div className="balance">
          <div className="balance-box">
            <h1>Current Balance</h1>
            <h2>Id: {id}</h2>
            <h2>${balance}</h2>
          </div>
        </div>
    </div>
  )
}

export default Home
