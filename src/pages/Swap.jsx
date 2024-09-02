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

const Swap = () => {
  const [maxAmount, setMaxAmount] = useState(null);
  const [destAmount, setDestAmount] = useState(null);
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(false);

  const publickey = JSON.parse(localStorage.getItem("xdexPublickey"));
  const secret = JSON.parse(localStorage.getItem("xdexSecret"));
  const assetObj = JSON.parse(localStorage.getItem("xdexAsset"));
  const asset = new Asset(assetObj.code, assetObj.issuer);

  const handleSubmit = async () => {
    setLoading(true);
    const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org");
    const defiKeyPair = Keypair.fromSecret(secret);
    const defiAccount = await server.getAccount(publickey);

    const pathPaymentTransaction = new TransactionBuilder(defiAccount, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.changeTrust({
          asset: asset,
          source: publickey,
        })
      )
      .addOperation(
        Operation.pathPaymentStrictReceive({
          sendAsset: Asset.native(),
          sendMax: maxAmount,
          destination: publickey,
          destAsset: asset,
          destAmount: destAmount,
          source: publickey,
        })
      )
      .setTimeout(30)
      .build();

    pathPaymentTransaction.sign(defiKeyPair);
    try {
      const result = await server.sendTransaction(pathPaymentTransaction);
      console.log(
        "Swap Performed. Transaction URL:",
        `https://stellar.expert/explorer/testnet/tx/${result.hash}`
      );
      setLog(
        `Swap Performed. Transaction URL: https://stellar.expert/explorer/testnet/tx/${result.hash}`
      );
    } catch (error) {
      console.log(`Error performing swap: ${error}`);
      setLog(`Error performing swap: ${error}`);
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
              SWAP
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
                  htmlFor="TokenA"
                  className="block text-sm font-medium leading-6 text-[#FF846D]"
                >
                  MAX AMOUNT
                </label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="TokenA"
                    id="TokenA"
                    onChange={(e) => setMaxAmount(e.target.value)}
                    placeholder="Max Amount"
                    className="block w-full bg-white rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="TokenB"
                  className="block text-sm font-medium leading-6 text-[#FF846D]"
                >
                  DESTINATION AMOUNT
                </label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="TokenB"
                    id="TokenB"
                    onChange={(e) => setDestAmount(e.target.value)}
                    placeholder="Destination Amount"
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
                  "SWAP"
                )}
              </button>
            </form>
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

export default Swap;
