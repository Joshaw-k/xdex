import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-[#010101] w-full h-[100vh] flex items-center justify-center">
      <div className="grid gap-y-8 border-2 border-[#FF846D] p-10">
        <h1 className="text-5xl font-bold text-[#FF846D] text-center">XDEX</h1>
        <div className="grid gap-y-6">
          <Link
            to={"/create-liquidity"}
            className="bg-[#FF846D] px-6 py-3 text-white hover:bg-white hover:text-[#FF846D]"
          >
            <h3 className="text-2xl font-semibold text-center">ADMIN</h3>
          </Link>
          <Link
            to={"/provide-liquidity"}
            className="bg-[#FF846D] px-6 py-3 text-white hover:bg-white hover:text-[#FF846D]"
          >
            <h3 className="text-2xl font-semibold text-center">
              LIQUIDITY PROVIDER
            </h3>
          </Link>
          <Link
            to={"/trade"}
            className="bg-[#FF846D] px-6 py-3 text-white hover:bg-white hover:text-[#FF846D]"
          >
            <h3 className="text-2xl font-semibold text-center">TRADER</h3>
          </Link>
          <Link
            to={"/generate"}
            className="bg-[#FF846D] px-6 py-3 text-white hover:bg-white hover:text-[#FF846D]"
          >
            <h3 className="text-2xl font-semibold text-center">
              GENERATE KEYPAIR
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
