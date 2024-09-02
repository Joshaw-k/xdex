import React from "react";
import { Link } from "react-router-dom";

const Trade = () => {
  return (
    <div className="bg-[#010101]">
      <div className="w-full flex justify-center">
        <Link to={"/"} className="text-[#FF846D] text-xl w-fit mx-auto mt-3">
          {"<< "}Back Home
        </Link>
      </div>
      <div className="w-full h-[100vh] flex items-center justify-center">
        <div className="grid gap-y-8 border-2 border-[#FF846D] p-10">
          <h1 className="text-5xl font-bold text-[#FF846D] text-center">
            TRADE
          </h1>
          <div className="grid gap-y-6">
            <Link
              to={"/swap"}
              className="bg-[#FF846D] px-6 py-3 text-white hover:bg-white hover:text-[#FF846D]"
            >
              <h3 className="text-2xl font-semibold text-center">SWAP</h3>
            </Link>
            <Link
              to={"/withdraw"}
              className="bg-[#FF846D] px-6 py-3 text-white hover:bg-white hover:text-[#FF846D]"
            >
              <h3 className="text-2xl font-semibold text-center">WITHDRAW</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trade;
