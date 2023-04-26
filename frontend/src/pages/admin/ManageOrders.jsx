import React, { useState, useEffect } from "react";
import { readAllOrders } from "../../api/orders";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await readAllOrders();
      setOrders(data);
      console.log(data);
    };
    fetchOrders();
  }, []);

  return <div>ManageOrders</div>;
};

export default ManageOrders;
