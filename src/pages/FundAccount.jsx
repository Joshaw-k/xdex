import React, { useState } from "react";
import { usexdexContext } from "../context";
import { Link } from "react-router-dom";

const FundAccount = () => {
  const [log, setLog] = useState(null);
  const publickey = JSON.parse(localStorage.getItem("xdexPublickey"));
  async function fundAccountWithFriendbot(address) {
    const friendbotUrl = `https://friendbot.stellar.org?addr=${address}`;
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
  };
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div>
        <div>
          {/* actions */}
          <button
            onClick={handleFunding}
            className="bg-blue-400 px-5 py-2 text-white text-2xl"
          >
            Fund Account
          </button>
          {/* logs */}
          <div>
            <p>Latest Logs</p>

            <div>{log}</div>
          </div>
        </div>
        <Link to={"/create-liquidity"}>Next Page</Link>
      </div>
    </div>
  );
};

export default FundAccount;
