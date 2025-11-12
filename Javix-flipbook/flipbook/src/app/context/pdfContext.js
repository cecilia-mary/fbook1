"use client";
import React, { createContext, useContext, useState } from "react";

const PdfContext = createContext();

export const PdfProvider = ({ children }) => {
  const [uploadedPDF, setUploadedPDF] = useState(null); 
  return (
    <PdfContext.Provider value={{ uploadedPDF, setUploadedPDF }}>
      {children}
    </PdfContext.Provider>
  );
};

export const usePdf = () => useContext(PdfContext);
