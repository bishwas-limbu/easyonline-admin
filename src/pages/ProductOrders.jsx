import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";
import {currency} from '../App';

const ProductOrders = ({ token }) => {
  const [allOrders, setAllOrders] = useState([]);

  const getAllOrders = async () => {
    try {
      // const response = await axios.get(
      //   import.meta.env.VITE_BACKEND_URL + 'orders/list',
      //   {header: {authorization : `Bearer ${token}`}}
      // );
      //http://localhost:8000/api/v2/orders/list
      if (!token) {
        return null;
      }
      //"http://3.136.201.176:9000/api/v2/orders/list");
      const response = await axios.get(
        "http://3.141.211.239:9000/api/v2/orders/list",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response.data.data);

      if (response.data.success) {
        setAllOrders(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  const handleStatus = async (e, orderId) => {
    try{
      const response = await axios.put(
        import.meta.env.VITE_BACKEND_URL + "orders/status",
        {
          orderId,
          status: e.target.value

        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
        console.log(response.data.data);

        if(response.data.success){
          await getAllOrders();
        }
    }catch(error){
      toast.error(error.message);
    }
  }
  useEffect(() => {
    getAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {allOrders.map((order, index) => (
          //  console.log(order)
          <div 
            className="grid grid-cols sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-m text-gray-700" 
            key={index}>
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  console.log("length", order.items.length);
                  console.log("index : ", index);
                  if (index === order.items.length - 1) {
                    //console.log("first")
                    return (
                      <p key={index}  className="py-0.5">
                        {item.title} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p key={index} className="py-0.5">
                        {item.title} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
              <p className="mt-3">Method : {order.paymentMethod}</p>
              <p>Payment : {order.isPayment? 'Done':'Pending'}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">{currency} {order.amount}</p>
            <select 
              value = {order.status}
              onChange = {(e) => handleStatus(e, order._id)}
              className="p-2 font-semibold focus:outline-none"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>

            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductOrders;
