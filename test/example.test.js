process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();

chai.use(chaiHttp);

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

describe("POST /transaction", () => {
  it("it should POST transaction with payer, points, and timestamp being property names", (done) => {
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
  it("it should NOT send transaction without the fields payer, points, and timestamp being specified ", (done) => {
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
        done();
      });
  });
});