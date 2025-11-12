"use client";
import  { useEffect, useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker";

import Header from "./Header";
import { useRouter } from "next/navigation";
import Footer from "./footer";

export default function Home() {
  const router = useRouter();
  const [pdfURL, setPdfURL] = useState(null);
  const [pdfPages, setPdfPages] = useState([]);
  const [userUploaded, setUserUploaded] = useState(false);
  const fileInputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");



  const defaultPDF = "/Doc1.pdf";
  const handleButtonClick = () => {
    if (!isProcessing) fileInputRef.current.click();
  };

  const handlePDFUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setIsProcessing(true);
      setFileName(file.name);
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      setFileSize(`${sizeInMB} MB`);
    
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        setPdfURL(url);
        setIsProcessing(false);
        router.push(`/book?pdf=${encodeURIComponent(url)}`);
      }, 6000);
    }
  };

  useEffect(() => {
    const loadDefaultPdf = async () => {
      setPdfPages([]);

      const pdf = await pdfjsLib.getDocument(defaultPDF).promise;
      let tempPages = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.1 });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: ctx, viewport }).promise;
        tempPages.push(canvas.toDataURL());
      }

      setPdfPages(tempPages);
    };

    loadDefaultPdf();
    const timer = setTimeout(() => setIsOpen(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      <div className=" bg-gradient-to-br from-green-50 to-white flex flex-col lg:flex-row items-start justify-between px-6 md:px-10 gap-10 py-10">
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mt-10 text-gray-900">
            Flipbook Maker
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            PDF to flipbook free, no ads and highly customizable with different
            page flip effects. Share, download or embed them creating outstanding
            magazines, catalogs, brochures, reports, restaurant menus and more.
          </p>
          <div className="pr-30 pt-10">
            <div className="border-2 border-dashed border-green-400 bg-white/70 rounded-2xl p-5 text-center transition mx-auto max-w-md">
              {!isProcessing ? (
                <>
                  <p className="text-gray-600 mb-4">
                    Drag and drop the PDF to convert
                  </p>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handlePDFUpload}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={handleButtonClick}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-2 rounded-lg transition-all duration-200"
                  >
                    Upload
                  </button>
                </>
              ) : (
                <div className="relative">
                  <div className="flex flex-col items-center justify-center w-full">
                    <p className="text-green-600  text-ls self-start mb-1">{fileName}</p>
                    <div className="w-full flex justify-between items-center">
                      <p className="text-gray-700 font-bold mb-2">Processing...</p>
                      <p className="text-gray-600 text-sm mb-2">{fileSize}</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-green-500 h-2.5 rounded-full animate-[progress_3s_linear_forwards]"></div>
                    </div>
                  </div>
                </div>

              )}
            </div>

          
            <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>

          </div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0">

          {pdfPages.length > 0 && (
            <>
              <HTMLFlipBook
                width={200}
                height={300}
                size="stretch"
                minWidth={150}
                maxWidth={250}
                minHeight={250}
                maxHeight={350}
                maxShadowOpacity={0.5}
                showCover={true}
                flippingTime={1000}
                className="rounded-xl"
              >
                {pdfPages.map((src, idx) => (
                  <div
                    key={idx}
                    className="w-full h-full flex justify-center shadow-2xl items-center bg-white rounded-lg overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`Page ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </HTMLFlipBook>
              <button
                type="button"
                onClick={() =>
                  router.push(`/book?pdf=${encodeURIComponent(defaultPDF)}`)
                }
                className="absolute  top-1/2 transform -translate-y-1/2  bg-[rgba(255,255,255,0.9)]  text-gray-600 hover:bg-white font-bold w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300"
                title="Preview"
              >
                Preview
              </button>
            </>
          )}


        </div>
      </div>
      <Footer />
    </>
  );
}