const Account = require('../models/accountModel');

exports.create = (req, res) => {
  const newAccount = new Account({ owner: req.body.owner, balance: req.body.balance });

  newAccount.save()
    .then(account => res.status(201).send(account))
    .catch(err => res.status(400).send(err));
};

exports.list = (req, res) => {
  Account.find()
    .then(accounts => res.send(accounts))
    .catch(err => res.status(400).send(err));
};

exports.find = (req, res) => {
  Account.findOne({ 'owner': req.params.id })
    .then(account => res.send(account))
    .catch(err => res.status(400).send(err));
};

exports.update = (req, res) => {
  Account.updateOne({ 'owner': req.params.id }, { $set: { 'balance': req.body.balance } })
    .then(account => res.send(account))
    .catch(err => res.status(400).send(err));
};

exports.delete = (req, res) => {
  Account.deleteOne({ 'owner': req.params.id })
    .then(account => res.send(account))
    .catch(err => res.status(400).send(err));
};