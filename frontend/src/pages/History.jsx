import { useState, useEffect } from "react";
import { readMyOrders } from "../api/orders";

const History = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await readMyOrders();
      setOrders(data);
      console.log(data);
    };
    fetchOrders();
  }, []);

  return <div>History</div>;
};

export default History;
