var chai = require('chai');  
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);



describe('Balances', function() {
  it('should return balances', function(done) {
    chai.request('http://127.0.0.1:3000')
    .get('/balances')
    .end(function(err, res) {
      console.log(res.body)
      expect(res).to.have.status(200);
      expect(res.body[0].available_amount).to.equal(0);
      done();
    });
  }) ;
});