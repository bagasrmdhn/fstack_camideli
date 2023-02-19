import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
const history = "";
const MyOrder = () => {
  const [transactions, setTransactions] = useState([]);

  return (
    <Helmet title="My Order">
      <CommonSection title="My Order" />
      <section>
        <Container>
          <div className="container">
            <h1>Transaction History</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td>
                      <button
                        className="btn btn-link"
                        onClick={() =>
                          history.push(`/transactions/${transaction._id}`)
                        }
                      >
                        {transaction._id}
                      </button>
                    </td>
                    <td>{transaction.date}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </Helmet>
  );
};

export default MyOrder;
