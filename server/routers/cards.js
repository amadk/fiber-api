var express = require('express');
var cardController = require('../../db/controllers/cards.js');
var Card = require('../../db/models/index.js').Card;

var cardRouter = express.Router();


// Create card
cardRouter.route('/')
  .post((req, res) => {
    var platform = req.account;
    // var cardData = generateTokenAndUploadtoVault(req.body);
    var cardData = Object.assign(req.body);

    Card.create(cardData).then(card => {
      platform.addCard(card).then(account => {
        if (!platform.default_payment_source) {
          platform.update({default_payment_source: card.id}).then(account => {
            res.send(card)            
          })  
        } else {
          res.send(card)
        }
      })
    })

  });

// Get cards
cardRouter.route('/')
  .get((req, res) => {
    var platform = req.account;
    var queryLimit = parseInt(req.query.limit) || 10

    platform.getCards({limit: queryLimit}).then(cards => {
      res.send(cards)
    })
  });


// Get card with cardId
cardRouter.route('/:cardId')
  .get((req, res) => {
    var platform = req.account;
    var cardId = req.params.cardId

    platform.getCards({where: {id: cardId}}).then(cards => {
      res.send(cards[0])
    })
  });

// Update card
cardRouter.route('/:cardId')
  .post((req, res) => {
    var platform = req.account;
    // var cardData = generateTokenAndUploadtoVault(req.body);
    var cardId = req.params.cardId;

    platform.getCards({where: {id: cardId}}).then(cards => {
      var card = cards[0]
      if (card) {
        card.update(req.body).then(card => {
          res.send(card)          
        })
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



module.exports = cardRouter;