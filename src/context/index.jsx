import React, { createContext, useContext, useEffect, useState } from "react";

const XdexContext = React.createContext();
export const XdexProvider = ({ children }) => {
  const lp = JSON.parse(localStorage.getItem("xdexPublickey"));
  console.log(lp);
  const [publickey, setpublickey] = useState(lp);

  useEffect(() => {
    setpublickey(publickey);
  }, [publickey]);

  return (
    <XdexContext.Provider value={{ publickey, setpublickey }}>
      {children}
    </XdexContext.Provider>
  );
};
// make sure use
export const usexdexContext = () => {
  return useContext(XdexContext);
};
