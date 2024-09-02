import {
  Asset,
  BASE_FEE,
  getLiquidityPoolId,
  Keypair,
  LiquidityPoolAsset,
  Networks,
  Operation,
  SorobanRpc,
  TransactionBuilder,
} from "@stellar/stellar-sdk";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CreateLiquidityPool = () => {
  const [assetName, setAssetName] = useState(null);
  const [amountA, setAmountA] = useState(null);
  const [amountB, setAmountB] = useState(null);
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(false);

  const publickey = JSON.parse(localStorage.getItem("xdexPublickey"));
  const secret = JSON.parse(localStorage.getItem("xdexSecret"));

  const handleSubmit = async () => {
    setLoading(true);
    const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org");
    const defiKeyPair = Keypair.fromSecret(secret);
    const defiAccount = await server.getAccount(publickey);
    const asset = new Asset(assetName, publickey);
    const lpAsset = new LiquidityPoolAsset(Asset.native(), asset, 30);
    const liquidityPoolId = getLiquidityPoolId(
      "constant_product",
      lpAsset
    ).toString("hex");
    console.log("Custom Asset:", asset);
    console.log("Liquidity Pool Asset:", lpAsset);
    console.log("Liquidity Pool ID:", liquidityPoolId);
    localStorage.setItem(
      "xdexAsset",
      JSON.stringify({ code: assetName, issuer: publickey })
    );
    localStorage.setItem(
      "xdexLiquidityPoolId",
      JSON.stringify(liquidityPoolId)
    );

    const lpDepositTransaction = new TransactionBuilder(defiAccount, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.changeTrust({
          asset: lpAsset,
        })
      )
      .addOperation(
        Operation.liquidityPoolDeposit({
          liquidityPoolId: liquidityPoolId,
          maxAmountA: amountA,
          maxAmountB: amountB,
          minPrice: { n: 1, d: 1 },
          maxPrice: { n: 1, d: 1 },
        })
      )
      .setTimeout(30)
      .build();
    lpDepositTransaction.sign(defiKeyPair);
    try {
      const result = await server.sendTransaction(lpDepositTransaction);
      console.log(
        "Liquidity Pool Created. Transaction URL:",
        `https://stellar.expert/explorer/testnet/tx/${result.hash}`
      );
      setLog(
        `Liquidity Pool Created. Transaction URL: https://stellar.expert/explorer/testnet/tx/${result.hash}`
      );
    } catch (error) {
      console.log(`Error creating Liquidity Pool: ${error}`);
      setLog(`Error creating Liquidity Pool: ${error}`);
      return;
    }
  };
  useEffect(() => {}, [loading, log]);
  return (
    <div className="bg-[#010101]">
      <div className="w-full flex justify-center">
        <Link to={"/"} className="text-[#FF846D] text-xl w-fit mx-auto mt-3">
          {"<< "}Back Home
        </Link>
      </div>
      <div className="w-full h-[100vh] flex items-center justify-center">
        <div className="border-2 border-[#FF846D] p-10">
          <div className="grid gap-y-8 ">
            <h1 className="text-3xl font-bold text-[#FF846D] text-center">
              CREATE LIQUIDITY POOL
            </h1>
            {/* actions */}
            <form
              action=""
              onSubmit={async (e) => {
                e.preventDefault();
                await handleSubmit();
                setLoading(false);
              }}
              className="grid gap-y-6"
            >
              <div>
                <label
                  htmlFor="AssetName"
                  className="block text-sm font-medium leading-6 text-[#FF846D]"
                >
                  ASSET NAME
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="AssetName"
                    id="AssetName"
                    onChange={(e) => setAssetName(e.target.value)}
                    placeholder="Asset Name"
                    className="block w-full bg-white rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="TokenA"
                  className="block text-sm font-medium leading-6 text-[#FF846D]"
                >
                  TOKEN A AMOUNT (XLM)
                </label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="TokenA"
                    id="TokenA"
                    onChange={(e) => setAmountA(e.target.value)}
                    placeholder="Token A Amount"
                    className="block w-full bg-white rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="TokenB"
                  className="block text-sm font-medium leading-6 text-[#FF846D]"
                >
                  TOKEN B AMOUNT (CUSTOM ASSET)
                </label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="TokenB"
                    id="TokenB"
                    onChange={(e) => setAmountB(e.target.value)}
                    placeholder="Token B Amount"
                    className="block w-full bg-white rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></input>
                </div>
              </div>
              <button
                className="bg-[#FF846D] px-5 py-2 text-white text-2xl font-medium mt-4"
                type="submit"
              >
                {loading ? (
                  <span className="loading loading-dots loading-lg text-white"></span>
                ) : (
                  "Create liquidity pool"
                )}
              </button>
            </form>
            {/* logs */}
            <div>
              <h3 className="text-3xl font-bold text-red-500 text-center underline mb-3">
                Logs
              </h3>
              {log && <p className="text-green-400">{log}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLiquidityPool;
