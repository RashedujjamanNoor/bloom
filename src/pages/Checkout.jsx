import React from "react";

export const Checkout = () => {
  return (
    <div className="grid grid-cols-2   px-4 gap-4">
      <div className="flex justify-center items-center ">
        <fieldset className="fieldset border-base-300 rounded-box  w-full   border p-4 ">
          <legend className="fieldset-legend">Delivery details</legend>

          <form className="flex flex-col">
            <label className="label">Name</label>
            <input
              type="text"
              className="input text-xs font-extralight w-full bg-transparent"
              placeholder="Enter Your Name"
            />

            <label className="label mt-4">Phone</label>
            <input
              type="number"
              className="input text-xs font-extralight w-full"
              placeholder="Enter Your Number "
            />

            <label className="label mt-4">Full Address</label>
            <input
              type="text"
              className="input text-xs font-extralight w-full"
              placeholder="Enter Your Address"
            />
            <button
              type="submit"
              className="bg-[#8cc63f] py-3 px-6 mt-4 rounded-full"
            >
              Complete Order
            </button>
          </form>
        </fieldset>
      </div>
      <div className="col-span-1 bg-yellow-300">Product</div>
    </div>
  );
};
