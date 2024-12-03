import { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const Add = ({ token, setToken }) => {
  const [image, setImage] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  console.log(sizes);
  console.log(title);
  console.log(description);
  console.log(price);
  console.log("Category", category);
  console.log(subCategory);
  console.log("qwerty", bestSeller);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", sizes);
      formData.append("image", image);

      const response = await axios.post(
          "http://3.141.211.239:9000/api/v2/products/create",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response", response.error);
      if (response.data.success) {
        toast.success(response.data.message);
        setTitle("");
        setBestSeller(false);
        setDescription("");
        setPrice("");
        setSizes([]);
        setImage(false);
      } else {
        //toast.error(error.message);
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

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload image</p>
        <div className="flex gap-y-20">
          <label htmlFor="image">
            <img
              className="w-[100px] h-[100px]"
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              alt=""
            />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">
          <b>Product Title</b>
        </p>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="focus:outline-none w-full max-w-[500px] mt-2 px-3 py-2 "
          type="text"
          placeholder="Enter product name"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">
          <b>Product Description</b>
        </p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="focus:outline-none w-full max-w-[500px] mt-2 px-3 py-2 "
          type="text"
          placeholder="Write content here....."
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2 mt-3">
            <b>Product Category</b>
          </p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
            name=""
            id=""
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2 mt-3">
            <b>Sub Category</b>
          </p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
            name=""
            id=""
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2 mt-3">
            <b>Product Price</b>
          </p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="Number"
            placeholder="Enter Price here..."
          />
        </div>
      </div>
      <div>
        <p className="mb-2">
          <b>Product Sizes</b>
        </p>
        <div className="flex gap-3">
          {/* s M L */}
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <p
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
              className={`${
                sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={(e) => setBestSeller(e.target.checked)}
          checked={bestSeller}
          type="checkbox"
          id="bestSeller"
        />
        <label className="cursor-pointer " htmlFor="bestSeller">
          {" "}
          Add to Best Seller
        </label>
      </div>
      <button
        type="submit"
        className="round w-28 py-3 mt-4 bg-black text-white  hover:bg-red-400"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
