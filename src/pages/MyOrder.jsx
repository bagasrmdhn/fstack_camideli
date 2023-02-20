import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";

const MyOrder = () => {
  const [transactions, setTransactions] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ` http://localhost:3000/api/v1/member/history/${id}`
        );
        const data = response.data.order;
        console.log(data);
        setTransactions(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
                    <td>{transaction.invoice}</td>
                    <td>
                      {transaction.orderDate.toLocaleString().substr(0, 9)}
                    </td>
                    <td>{transaction.total}</td>
                    <td>{transaction.payments.status}</td>
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
