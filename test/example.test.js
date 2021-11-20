process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();

chai.use(chaiHttp);

describe("POST transactions", () => {
  it("it should POST transaction with payer, points, and timestamp", (done) => {
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
        //res.body.should.be.a("object");
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
