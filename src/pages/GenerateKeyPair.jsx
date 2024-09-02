import { Keypair, SorobanRpc } from "@stellar/stellar-sdk";
import React, { useEffect, useState } from "react";
import { usexdexContext } from "../context";
import { Link } from "react-router-dom";

const GenerateKeyPair = () => {
  const { publickey, setpublickey } = usexdexContext();
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(false);
  const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org");
  async function fundAccountWithFriendbot(address) {
    const friendbotUrl = `https://friendbot.stellar.org?addr=${address}`;
    setLoading(true);
    try {
      let response = await fetch(friendbotUrl);
      if (response.ok) {
        console.log(`Account ${address} successfully funded.`);
        setLog(`Account ${address} successfully funded.`);
        return true;
      } else {
        console.log(`Something went wrong funding account: ${address}.`);
        setLog(`Something went wrong funding account: ${address}.`);
        return false;
      }
    } catch (error) {
      console.error(`Error funding account ${address}:`, error);
      setLog(`Error funding account ${address}:`);
      return false;
    }
  }
  const handleFunding = async () => {
    await fundAccountWithFriendbot(publickey);
    setLoading(false);
  };

  const handleKeyPair = () => {
    const defiKeypair = Keypair.random();
    setpublickey(defiKeypair.publicKey());
    localStorage.setItem(
      "xdexPublickey",
      JSON.stringify(defiKeypair.publicKey())
    );
    localStorage.setItem("xdexSecret", JSON.stringify(defiKeypair.secret()));
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
        <div className="grid gap-y-8 border-2 border-[#FF846D] p-10">
          <h1 className="text-5xl font-bold text-[#FF846D] text-center">
            GENERATE & FUND
          </h1>
          <div className="grid gap-y-6">
            <button
              onClick={handleKeyPair}
              className="bg-[#FF846D] px-6 py-3 text-white hover:bg-white hover:text-[#FF846D]"
            >
              <h3 className="text-2xl font-semibold text-center">
                GENERATE KEYPAIR
              </h3>
            </button>
            <button
              onClick={handleFunding}
              className="bg-[#FF846D] px-6 py-3 text-white hover:bg-white hover:text-[#FF846D]"
            >
              {loading ? (
                <span className="loading loading-dots loading-lg text-white"></span>
              ) : (
                <h3 className="text-2xl font-semibold text-center">
                  FUND ACCOUNT
                </h3>
              )}
            </button>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-red-500 text-center underline mb-3">
              Logs
            </h3>
            {publickey ? (
              <p className="text-red-500">
                Your current publickey is {publickey}
              </p>
            ) : (
              <p>No logs yet.</p>
            )}
            {log && <p className="text-green-400">{log}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateKeyPair;
