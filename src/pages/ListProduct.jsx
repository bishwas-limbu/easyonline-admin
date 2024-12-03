import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { currency } from "../App";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const ListProduct = ({ token }) => {
  const [productsList, setProductsList] = useState([]);

  const getProductList = async () => {
    try {
      const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "products/"
      );

      console.log(response.data.data.productList);

      if (response.data.success) {
        setProductsList(response.data.data.productList);
        // toast.success('Product fetched successfully');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        // Check if the error response exists
        if (error.response) {
          // Log the status code and response data
          console.error("Error status:", error.response.status);
          console.log("Error data:", error.response.data.message);
          toast.error(error.response.data.message);
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const delProduct = async (id) => {
    try {
      console.log("delete Product : ", id);
      const response = await axios.delete(
       `http://3.141.211.239:9000/api/v2/products/del/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getProductList();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateProduct = async (id) => {
    try {
      //const response = await axios.delete(`http://localhost:8000/api/v2/products/del/${id}`);
      console.log("update product :", id);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <>
      <p className="mb-2">
        <b>ALL PRODUCTS LIST</b>
      </p>
      <div className="flex flex-col gap-2">
        {/* List Table Title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Title</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* Displaying Products */}
        {productsList.map((product, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            {/* <span>{product._id}</span> */}
            <img className="w-12 h-12" src={product.image[0]} alt="" />
            <p>{product.title}</p>
            <p>{product.category}</p>
            <p>
              {currency}
              {product.price}
            </p>
            <div className="flex justify-between">
              <p
                onClick={() => updateProduct(product._id)}
                className="text-right md:text-center cursor-pointer text-[20px]"
              >
                <FaRegEdit />
              </p>
              <p
                onClick={() => delProduct(product._id)}
                className="mr-1 text-right md:text-center cursor-pointer text-[22px]"
              >
                <MdDeleteOutline />
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListProduct;
