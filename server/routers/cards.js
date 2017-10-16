var express = require('express');
var cardController = require('../../db/controllers/cards.js');
var Card = require('../../db/models/index.js').Card;

var cardRouter = express.Router();


// Create card
cardRouter.route('/')
  .post((req, res) => {
    var platform = req.account;
    // var cardData = generateTokenAndUploadtoVault(req.body);
    var cardData = req.body;
    cardController.create(cardData, card => {
      res.send(card);  
    })
  });

// Update card
cardRouter.route('/:cardId')
  .post((req, res) => {
    var platform = req.account;
    // var cardData = generateTokenAndUploadtoVault(req.body);
    var cardId = req.params.cardId;

    account.getCards({where: {id: cardId}}).then(cards => {
      var card = cards[0]
      if (card) {
        res.send[card]
      } else {
        res.send({
          error: {
            type: 'not_found_error',
            message: 'No card found'
          }
        })
      }
    })
  });

// Get cards
cardRouter.route('/')
  .get((req, res) => {
    var platform = req.account;

    cardController.findAll({where: {account_id: platform.id}}, card => {
      res.send(card);
    })
  });


// Get card with cardId
cardRouter.route('/:cardId')
  .get((req, res) => {
    var platform = req.account;
    var cardId = req.params.cardId

    cardController.find({where: {id: cardId}}, card => {
      res.send(card);
    })
  });



module.exports = cardRouter;