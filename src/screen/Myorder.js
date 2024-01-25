import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { universalurl } from '../helper';

export default function MyOrder() {
  const [orderData, setOrderData] = useState({ _id: '', email: '', order_data: [], __v: 0 });

  const fetchMyOrder = async () => {
    try {
      const response = await fetch(`${universalurl}/api/myorderdata`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail'),
        }),
      });
      
      if (response.ok) {
        const responseData = await response.json();
        // console.log('Fetched order data:', responseData);
        setOrderData(responseData);
      } else {
        console.error("Failed to fetch order data");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row'>
          {orderData.order_data && orderData.order_data.length > 0 ? (
            orderData.order_data.map((order, orderIndex) => (
              <div key={orderIndex} className='order-details'>
                <h3>Order ID: {order._id}</h3>
                <h4>Email: {order.email}</h4>
                {order.order_data.map((nestedOrderData, nestedOrderIndex) => (
                  <div key={nestedOrderIndex}>
                    {nestedOrderData.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <p>Name: {item.name}</p>
                        <p>Quantity: {item.qty}</p>
                        {/* Add more details as needed */}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>No orders available</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
