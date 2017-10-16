var express = require('express');
var customerController = require('../../db/controllers/customers.js');
var customer = require('../../db/models/index.js').customer;


var customerRouter = express.Router();


// Create connected customer
customerRouter.route('/')
  .post(function(req, res, next) {
    var platform = req.customer;
    var customerInformation = {
      email: req.body.email,
      entity_type: req.body.entity_type,
      customer_type: req.body.customer_type,
      country: req.body.country || 'UAE'
    }
    
    platform.getConnectedcustomer({where: customerInformation}).then(customers => {
      if (customers[0]) {
        res.send({message: 'customer already connected'});
      } else if (customerInformation.customer_type === 'standard') {
        // sendConnectionInvite(customerInformation.email)
        res.send('connection invite sent')
      } else {
        customerController.create(customerInformation, newcustomer => {
          platform.addConnectedcustomer(newcustomer).then(() => {
            res.send('customer created successfully')
          })
        })
      }
    })
  });

// Get connected customer information
customerRouter.route('/:customerId')
  .get(function(req, res) {
    var platform = req.customer;
    var customerId = req.params.customerId;

    platform.getConnectedcustomer({where: {id: customerId}}).then(customers => {
      if (customers[0]){
        res.send(customers[0])
      } else {
        res.send('No connected customers found with that id');
      }
    })
  })
  

// Update connected customer
customerRouter.route('/:customerId')
  .post(function(req, res) {
    var platform = req.customer;
    var customerId = req.params.customerId;

    platform.getConnectedcustomer({where: {id: customerId}}).then(customers => {
      if (customers[0]) {
        if (customers[0].customer_type === 'custom') {
          customer.update(req.body, {where: {id: customerId}}).then(updatedcustomer => {
            res.send(updatedcustomer);
          })
        } else {
          res.send({error: {
            type: 'permission_error',
            message: 'You cannot update a standard connected customer. A standard customer can only be updated by the owner of the customer'
          }})
        }
      } else {
        res.send('No connected customers found with that id');
      }
    })
  });


// List all connected customers
customerRouter.route('/')
  .get((req, res) => {
    var queryLimit = parseInt(req.query.limit) || null
    var platform = req.customer;

    platform.getConnectedcustomer({limit: queryLimit}).then(customers => {
      res.send(customers)
    })
  });

module.exports = customerRouter;

