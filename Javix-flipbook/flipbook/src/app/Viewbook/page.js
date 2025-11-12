"use client";
import React, { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker";
import Header from "../Header";
import Footer from "../footer";
import { useSearchParams } from "next/navigation";

export default function FlipbookPage() {
  const searchParams = useSearchParams();
  const pdfURL = searchParams.get("pdf");
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flipbookKey, setFlipbookKey] = useState(0);

  useEffect(() => {
    if (!pdfURL) {
      alert("No PDF provided. Redirecting home.");
      window.location.href = "/home";
      return;
    }

    const loadPdf = async () => {
      setLoading(true);
      setPages([]);

      const pdf = await pdfjsLib.getDocument(pdfURL).promise;
      let tempPages = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.4 });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: ctx, viewport }).promise;
        tempPages.push(canvas.toDataURL());
      }

      setPages(tempPages);
      setLoading(false);
      setFlipbookKey(prev => prev + 1);
    };

    loadPdf();
  }, [pdfURL]);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center bg-gradient-to-br from-green-200 to-white min-h-screen py-10 px-5">
        <h1 className="text-2xl font-bold mb-5">Your Flipbook</h1>

        {loading ? (
          <div className="text-center text-lg font-semibold text-gray-700">
            Loading pages...
          </div>
        ) : (
          <div className="relative w-full flex justify-center">
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-transparent via-black/20 to-transparent opacity-40 blur-[6px] mix-blend-multiply pointer-events-none z-[200]" />
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/30 opacity-60 pointer-events-none z-[210]" />
            <HTMLFlipBook
              width={220}
              height={320}
              showCover={false}
              minWidth={280}
              maxWidth={400}
              minHeight={350}
              maxHeight={480}
              drawShadow={true}
              flippingTime={1200}
              usePortrait={false}
              maxShadowOpacity={0.5}
              mobileScrollSupport={true}
              className=" rounded-md"
            >

              <div className="bg-transparent"></div>
              {pages.map((img, i) => (
                <div key={i} className="bg-white flex justify-center items-center">
                  <img src={img} className="max-w-[80%] max-h-[90%] object-contain" />
                </div>
              ))}
            </HTMLFlipBook>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
