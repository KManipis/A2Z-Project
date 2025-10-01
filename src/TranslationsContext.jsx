import React, { createContext, useContext, useState } from "react";

const TranslationsContext = createContext();

export const TranslationsProvider = ({ children }) => {
  const [translations, setTranslations] = useState([
    {
      id: 1,
      letter: "A",
      date: "2025-08-31 15:45",
      img: "https://imgs.search.brave.com/-dLcbhRaSpWqN3IQYNrSMd28oq3MqwiwgCBbo23yeR4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9hc2wt/aGFuZC1zaGFwZS1z/aWduLWxhbmd1YWdl/LXNpZ24tbGFuZ3Vh/Z2UtaGFuZC1zaGFw/ZS1sZXR0ZXItYXNs/LWJsYW5rLWJhY2tn/cm91bmQtMTg4NDEw/MzcwLmpwZw",
    },
    {
      id: 2,
      letter: "B-C-D",
      date: "2025-08-25 09:45 PM",
      img: "https://imgs.search.brave.com/0ZyP7HVJTd61XVRGrl6z6xndXOAns6so1FOcvVRDV08/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zaWdu/LWxhbmd1YWdlLWFs/cGhhYmV0LWxldHRl/ci1iLWhhbmQtZHJh/d24tNDMwNjMxNjMu/anBn",
    },
    {
      id: 3,
      letter: "Z",
      date: "2025-08-25 09:47 PM",
      img: "https://imgs.search.brave.com/RCE6fy8Vwu2EtVWj82tVgEj4PTPOI9qEwa7U5lkC4BE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9teS5l/bGVhcm5pbmdhcnQu/Y29tL2ltYWdlLnBo/cD9tZWRpYUlEPU1E/Y3hOamhtWldVelpH/WTFNR0l4JnR5cGU9/c2FtcGxlJnB1Ymxp/Yz0xJmZvbGRlcklE/PU5URTNabVZsTTJS/bU5UQmlNUT09JnNl/bz16LWNhdWNhc2lh/bi1hc2wtaGFuZC1z/aWduLXdpdGgtbGV0/dGVyLXo",
    },
  ]);

  const addTranslation = (item) => {
    setTranslations((prev) => [item, ...prev]);
  };

  const deleteTranslation = (id) => {
    setTranslations((prev) => prev.filter((t) => t.id !== id));
  };

  const clearTranslations = () => {
    setTranslations([]);
  };

  return (
    <TranslationsContext.Provider
      value={{ translations, addTranslation, deleteTranslation, clearTranslations }}
    >
      {children}
    </TranslationsContext.Provider>
  );
};

export const useTranslations = () => useContext(TranslationsContext);
