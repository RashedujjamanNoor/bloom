import { useDispatch, useSelector } from "react-redux";
import { add, deleteOne, remove } from "../feature/cartSlice";
import { MdDeleteForever } from "react-icons/md";

export const Checkout = () => {
  const cartData = useSelector((state) => state.cart);
  console.log(cartData);
  const dispatch = useDispatch();
  console.log(cartData);

  const handleDeleteOne = (item) => {
    dispatch(deleteOne(item));
  };

  const handleAdd = (item) => {
    dispatch(add(item));
  };

  const handleRemove = (item) => {
    dispatch(remove(item));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2   px-4 gap-4 mt-4">
      <div className="col-span-1  md:order-2">
        <div className="flex justify-center items-center gap-1">
          <h3 className="text-xl font-semibold">Product</h3>
          <p>({cartData.totalItem})</p>
        </div>
        <hr className="border-secondary" />
        <div>
          {cartData.cartItem.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center gap-2 w-full p-2"
            >
              <div className="flex items-center gap-2 w-full order-2">
                <div className="text-left w-full">
                  <p>{item.title}</p>
                  <p className="text-xs">Price: {item.price}</p>
                </div>
                <div className="mt-2">
                  <MdDeleteForever
                    className="text-2xl text-red-400 cursor-pointer hover:text-red-300"
                    onClick={() => handleRemove(item)}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <img
                  src={item.img}
                  alt="Cloth Image"
                  className="w-16 h-16 object-top object-cover rounded-xl"
                />
                <div className="bg-gray-700 flex justify-center items-center gap-4 text-[#8cc63f] px-2 rounded-full mt-2">
                  <button
                    onClick={() => handleDeleteOne(item)}
                    className="hover:text-green-100 cursor-pointer"
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    onClick={() => handleAdd(item)}
                    className="hover:text-green-100 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className="text-secondary my-3" />
        <div className="flex text-sm gap-4">
          <p>Total:</p>
          <p>{cartData.totalAmount}</p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <fieldset className="fieldset border-base-300 rounded-box  w-full   border p-4 ">
          <legend className="fieldset-legend">Delivery details</legend>

          <form className="flex flex-col">
            <label className="label">Name</label>
            <input
              type="text"
              className="input text-xs font-extralight w-full bg-transparent outline-none  focus:border-primary"
              placeholder="Enter Your Name"
            />

            <label className="label mt-4">Phone</label>
            <input
              type="number"
              className="input text-xs font-extralight w-full outline-none  focus:border-primary"
              placeholder="Enter Your Number "
            />

            <label className="label mt-4">Full Address</label>
            <input
              type="text"
              className="input text-xs font-extralight w-full outline-none  focus:border-primary"
              placeholder="Enter Your Address"
            />

            <div className="mt-4">
              <p>Payment</p>
              <div className="flex flex-col justify-start items-start my-2">
                <div className="flex justify-start items-center gap-3 w-full">
                  <input
                    type="radio"
                    id="cashOnDelivery"
                    value="Cash on Delivery"
                    name="payment"
                  />
                  <label htmlFor="cashOnDelivery">Cash on Delivery</label>
                </div>
                <br />
                <div className="flex justify-center items-center gap-3">
                  <input type="radio" id="pay" value="Pay" name="payment" />
                  <label htmlFor="pay">Pay</label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={`bg-primary hover:bg-secondary  py-3 px-6 mt-4 rounded-full cursor-pointer duration-200  active:scale-95`}
            >
              Complete Order
            </button>
          </form>
        </fieldset>
      </div>
    </div>
  );
};
