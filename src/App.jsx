import React from "react";
import { Container, Typography, Box } from "@mui/material";
import LiquidityPoolForm from "./components/LiquidityPoolForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GenerateKeyPair from "./pages/GenerateKeyPair";
import FundAccount from "./pages/FundAccount";
import CreateLiquidityPool from "./pages/CreateLiquidityPool";
import Home from "./pages/Home";
import ProvideLiquidity from "./pages/ProvideLiquidity";
import Trade from "./pages/Trade";
import Swap from "./pages/Swap";
import WithDraw from "./pages/WithDraw";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/fund" element={<FundAccount />} />
        <Route path="/create-liquidity" element={<CreateLiquidityPool />} />
        <Route path="/provide-liquidity" element={<ProvideLiquidity />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/withdraw" element={<WithDraw />} />
        <Route path="/generate" element={<GenerateKeyPair />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
