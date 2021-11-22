/*Test file utilizing Mocha, Mocha-HTTP, and Babel
Created: 20 November 2021
Sources: https://mochajs.org/
          https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai
*/

process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();

chai.use(chaiHttp);
//Without transactions
describe("Without transactions: POST /spend ", () => {
  it("it should not spend points if there are no transactions ", (done) => {
    const spendPoints = {
      points: 3000,
    };
    chai
      .request(app)
      .post("/spend")
      .send(spendPoints)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("errorMessage");
        res.body.should.have
          .property("errorMessage")
          .eql(
            `No transactions have been added. Please use '/transaction/' route to add payer, points, and timestamp.`
          );
        done();
      });
  });
});

describe("Without Transactions: GET /balances", () => {
  it("should return error message when there are no transactions", (done) => {
    chai
      .request(app)
      .get("/balances")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("errorMessage");
        res.body.should.have
          .property("errorMessage")
          .eql(
            `No transactions have been added. Please use '/transaction/' route to add payer, points, and timestamp.`
          );
        done();
      });
  });
});
//With Transactions being added
describe("POST /transaction", () => {
  it("it should POST transaction with 'payer', 'points', and 'timestamp' being property names and the properties have the correct type", (done) => {
    const transaction = {
      payer: "Brewers",
      points: 5000,
      timestamp: "2020-11-01T14:00:00Z",
    };
    chai
      .request(app)
      .post("/transaction")
      .send(transaction)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("transactionAdded");

        done();
      });
  });
});

describe("", () => {
  it("it should NOT send transaction without all three of the fields payer, points, and timestamp", (done) => {
    const transaction = {
      payer: "Brewers",
      points: 5000,
    };
    chai
      .request(app)
      .post("/transaction")
      .send(transaction)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("errorMessage");
        res.body.should.have
          .property("errorMessage")
          .eql(
            "ERROR: Please enter payer, points, and timestamp as parameters"
          );
        done();
      });
  });
});

describe("", () => {
  it("it should NOT send transaction without the name of the fields payer, points, and timestamp being correctly spelt ", (done) => {
    const transaction = {
      payr: "Brewers",
      points: 5000,
      timestamp: "2020-11-01T14:00:00Z",
    };
    chai
      .request(app)
      .post("/transaction")
      .send(transaction)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("errorMessage");
        res.body.should.have
          .property("errorMessage")
          .eql(
            "ERROR: Please enter payer, points, and timestamp as parameters"
          );
        done();
      });
  });
});

describe("", () => {
  it("it should NOT send transaction without the types of the fields payer, points, and timestamp being correct ", (done) => {
    const transaction = {
      payer: "Brewers",
      points: "5000",
      timestamp: "2020-11-01T14:00:00Z",
    };
    chai
      .request(app)
      .post("/transaction")
      .send(transaction)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("errorHandling");
        done();
      });
  });
});

describe("", () => {
  it("it should NOT send transaction with more than the three fields payer, points, and timestamp", (done) => {
    const transaction = {
      payer: "Brewers",
      points: 5000,
      timestamp: "2020-11-01T14:00:00Z",
      rank: "First",
    };
    chai
      .request(app)
      .post("/transaction")
      .send(transaction)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("errorHandling");
        done();
      });
  });
});

describe("POST /spend", () => {
  it("it should spend points if there are enough points from transactions ", (done) => {
    const spendPoints = {
      points: 3000,
    };
    chai
      .request(app)
      .post("/spend")
      .send(spendPoints)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("pointsSpentList");
        done();
      });
  });
});

describe("", () => {
  it("it should not allow a user to enter a field name other than 'points' ", (done) => {
    const spendPoints = {
      pit: 3000,
    };
    chai
      .request(app)
      .post("/spend")
      .send(spendPoints)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("errorMessage");
        res.body.should.have
          .property("errorMessage")
          .eql(
            "ERROR: Please use {'points': INTEGER } as the format to send data"
          );
        done();
      });
  });
});

describe("", () => {
  it("it should not allow a user to enter anything other than an integer for points ", (done) => {
    const spendString = {
      points: "3000",
    };
    chai
      .request(app)
      .post("/spend")
      .send(spendString)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("errorMessage");
        res.body.should.have
          .property("errorMessage")
          .eql(
            "ERROR: Please use {'points': INTEGER } as the format to send data"
          );
      });
    const spendBoolean = {
      points: true,
    };
    chai
      .request(app)
      .post("/spend")
      .send(spendBoolean)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("errorMessage");
        res.body.should.have
          .property("errorMessage")
          .eql(
            "ERROR: Please use {'points': INTEGER } as the format to send data"
          );
        done();
      });
  });
});

describe("", () => {
  it("it should not allow a user to enter a negative integer ", (done) => {
    const spendPoints = {
      points: -3000,
    };
    chai
      .request(app)
      .post("/spend")
      .send(spendPoints)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("errorMessage");
        res.body.should.have
          .property("errorMessage")
          .eql(
            "ERROR: Cannot spend negative points. Please provide an integer greater than 0"
          );
        done();
      });
  });
});

describe("", () => {
  it("it should not allow more points to be spent than the total amount of points from payers ", (done) => {
    const spendPoints = {
      points: 30000,
    };
    chai
      .request(app)
      .post("/spend")
      .send(spendPoints)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("errorMessage");
        res.body.should.have
          .property("errorMessage")
          .eql(
            `Insufficient funds. Cannot redeem points because there is not enough points from payers to cover.`
          );
        done();
      });
  });
});

describe("GET /balances", () => {
  it("returns balances list of each payer", (done) => {
    chai
      .request(app)
      .get("/balances")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.above(0);
        done();
      });
  });
});
