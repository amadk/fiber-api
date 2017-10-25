var chai = require('chai');  
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);
var forEachAsync = require('forEachAsync').forEachAsync;
var cmd = require('node-cmd');

var curlBuilder = function(route, info) {
  var curlCommand = 'curl http://127.0.0.1:3000/'+route
  var keys = Object.keys(info);
  keys.forEach(key => {
    curlCommand += (' -d ' + key + '=' + info[key])
  })
  return curlCommand;
}

describe('Balances', function() {
  it('should return balances', function(done) {
    var command = 'curl http://127.0.0.1:3000/balances'
    cmd.get(command, (err, data) => {
      var data = JSON.parse(data)
      expect(data[0].available_amount).to.equal(1000000000)
      done();
    })
  });
});

describe('Recipients', function() {
  it('should create recipients', function(done) {
    var expectedResponse = {
      business_name: 'store',
      country: 'UAE',
      email: 'recipient@example.com',
      entity_type: 'business',
      account_type: 'custom'
    }

    var command = curlBuilder('/recipients', expectedResponse)
    cmd.get(command, (err, data) => {
      var data = JSON.parse(data)
      ids.recipientId = data.id;
      expect(data).to.include(expectedResponse)
      done();
    })
  });

  it('should list recipients', function(done) {
    var command = 'curl http://127.0.0.1:3000/recipients?limit=3'
    cmd.get(command, (err, data) => {
      data = JSON.parse(data)
      id = data[0].id
      expect(data[0].email).to.equal('other@gmail.com')
      expect(data[1].email).to.equal('recipient@example.com')
      done();
    })
  });

  it('should get recipient with id' + id, function(done) {
    var command = 'curl http://127.0.0.1:3000/recipients/4'
    cmd.get(command, (err, data) => {
      data = JSON.parse(data)
      expect(data.id).to.equal(id1)
      done();
    });
  });

  it('should update recipient with id 4', function(done) {
    var command = 'curl http://127.0.0.1:3000/recipients/4 -d email=recipient@test.com'
    cmd.get(command, (err, data) => {
      var data = JSON.parse(data)
      expect(data.email).to.equal('recipient@test.com')
      done();
    })
  });
});

describe('Customers', function() {
 it('should create customers', function(done) {
   var expectedResponse = {
     country: 'UAE',
     email: 'customer@example.com',
     entity_type: 'individual',
     account_type: 'custom'
   }

   var command = curlBuilder('/customers', expectedResponse)
   cmd.get(command, (err, data) => {
     var data = JSON.parse(data)
     expect(data).to.include(expectedResponse)
     done();
   })
 });

 it('should list customers', function(done) {
   var command = 'curl http://127.0.0.1:3000/customers?limit=3'
   cmd.get(command, (err, data) => {
     data = JSON.parse(data)
     expect(data[0].email).to.equal('customer@example.com')
     done();
   })
 });

 it('should get customers with id 5', function(done) {
   var command = 'curl http://127.0.0.1:3000/customers/5'
   cmd.get(command, (err, data) => {
     data = JSON.parse(data)
     expect(data.id).to.equal(5)
     done();
   });
 });

 it('should update customers with id 5', function(done) {
   var command = 'curl http://127.0.0.1:3000/customers/5 -d email=customer@test.com'
   cmd.get(command, (err, data) => {
     var data = JSON.parse(data)
     expect(data.email).to.equal('customer@test.com')
     done();
   })
 });
});

describe('Cards', function() {
 it('should create cards', function(done) {
   var expectedResponse = {
     brand: 'Visa',
     country: 'UAE',
     exp_month: '7',
     exp_year: '2019',
     number: '4242424242424242',
     cvc: '444',
     last4: '4242'
   }

   var command = curlBuilder('/cards', expectedResponse)
   cmd.get(command, (err, data) => {
     var data = JSON.parse(data)
     expect(data).to.include(expectedResponse)
     done();
   })
 });

 it('should list cards', function(done) {
   var command = 'curl http://127.0.0.1:3000/cards?limit=3'
   cmd.get(command, (err, data) => {
     data = JSON.parse(data)
     expect(data[0].last4).to.equal('4242')
     done();
   })
 });

 it('should get card with id 1', function(done) {
   var command = 'curl http://127.0.0.1:3000/cards/1'
   cmd.get(command, (err, data) => {
     data = JSON.parse(data)
     expect(data.id).to.equal(1)
     done();
   })
 });

 it('should update card with id 1', function(done) {
   var command = 'curl http://127.0.0.1:3000/cards/1 -d exp_year=2020'
   cmd.get(command, (err, data) => {
     data = JSON.parse(data)
     expect(data.exp_year).to.equal('2020')
     done();
   })
 });
});

var bankAccount;

describe('Bank Accounts', function() {
  it('should create bank accounts', function(done) {
    var expectedResponse = {
      account_number: '1234'
    }

    var command = curlBuilder('/bank_accounts', expectedResponse)
    cmd.get(command, (err, data) => {
      var data = JSON.parse(data)
      bankAccount = data.id;
      expect(data).to.include(expectedResponse)
      done();
    })
  });

  it('should list bank accounts', function(done) {
    var command = 'curl http://127.0.0.1:3000/bank_accounts?limit=3'
    cmd.get(command, (err, data) => {
      data = JSON.parse(data)
      expect(data[0].account_number).to.equal('1234')
      done();
    })
  });

  it('should list bank account with id '+bankAccount, function(done) {
    var command = 'curl http://127.0.0.1:3000/bank_accounts/'+bankAccount
    cmd.get(command, (err, data) => {
      data = JSON.parse(data)
      expect(data.account_number).to.equal('1234')
      done();
    })
  });

  it('should update bank account with id '+bankAccount, function(done) {
    var command = 'curl http://127.0.0.1:3000/bank_accounts/'+bankAccount+' -d account_holder_name=John'
    cmd.get(command, (err, data) => {
      data = JSON.parse(data)
      expect(data.account_number).to.equal('1234')
      done();
    })
  });
});

describe('Charges', function() {
  it('should create charges', function(done) {
    var expectedResponse = {
      amount: '1000',
      source: '1'
    }

    var command = curlBuilder('/charges', expectedResponse)
    cmd.get(command, (err, data) => {
      var data = JSON.parse(data)
      expect(data).to.include(expectedResponse)
      done();
    })
  });

  it('should list charges', function(done) {
    var command = 'curl http://127.0.0.1:3000/charges?limit=3';

    cmd.get(command, (err, data) => {
      var data = JSON.parse(data)
      expect(data[0].amount).to.equal('1000')
      done();
    })
  });

  it('should get charge with id 1', function(done) {
    var command = 'curl http://127.0.0.1:3000/charges/1';
    
    cmd.get(command, (err, data) => {
      var data = JSON.parse(data)
      expect(data.amount).to.equal('1000')
      done();
    })
  });

  it('should update charge with id 1', function(done) {
    var command = 'curl http://127.0.0.1:3000/charges/1 -d description="Charge for customer 1"';
    
    cmd.get(command, (err, data) => {
      var data = JSON.parse(data)
      expect(data.description).to.equal("Charge for customer 1")
      done();
    })
  });
});


describe('Transfers', function() {
  it('should create transfers', function(done) {
    var expectedResponse = {
      receiver_id: 3,
      amount: '1000',
      currency: "aed"
    }

    var command = curlBuilder('/transfers', expectedResponse)
    cmd.get(command, (err, data) => {
      var data = JSON.parse(data)
      expect(data).to.include(expectedResponse)
      done();
    })
  });

  it('should list transfers', function(done) {
    var command = 'curl http://127.0.0.1:3000/transfers?limit=3';

    cmd.get(command, (err, data) => {
      var data = JSON.parse(data)
      expect(data[0].amount).to.equal('1000')
      done();
    })
  });

  it('should get transfer with id 1', function(done) {
    var command = 'curl http://127.0.0.1:3000/transfers/1';
    
    cmd.get(command, (err, data) => {
      var data = JSON.parse(data)
      expect(data.amount).to.equal('1000')
      done();
    })
  });

  it('should update transfer with id 1', function(done) {
    var command = 'curl http://127.0.0.1:3000/transfers/1 -d description="Transfer for recipient 3"';
    
    cmd.get(command, (err, data) => {
      var data = JSON.parse(data)
      expect(data.description).to.equal("Transfer for recipient 3")
      done();
    })
  });
});


describe('Payouts', function() {
  it('should create payouts', function(done) {
    var expectedResponse = {
      amount: '1000',
      currency: 'aed',
      // destination: bankAccount
    }

    var command = curlBuilder('/payouts', expectedResponse)
    cmd.get(command, (err, data) => {
      var data = JSON.parse(data)
      expect(data.amount).to.equal('1000')
      done();
    })
  });

  it('should list payouts', function(done) {
    var command = 'curl http://127.0.0.1:3000/payouts?limit=3';

    cmd.get(command, (err, data) => {
      var data = JSON.parse(data)
      expect(data[0].amount).to.equal('1000')
      done();
    })
  });

  it('should get payout with id 1', function(done) {
    var command = 'curl http://127.0.0.1:3000/payouts/1';
    
    cmd.get(command, (err, data) => {
      var data = JSON.parse(data)
      expect(data.amount).to.equal('1000')
      done();
    })
  });

  it('should update payout with id 1', function(done) {
    var command = 'curl http://127.0.0.1:3000/payouts/1 -d description="Payout for recipient 3"';
    
    cmd.get(command, (err, data) => {
      var data = JSON.parse(data)
      expect(data.description).to.equal("Payout for recipient 3")
      done();
    })
  });
});



































