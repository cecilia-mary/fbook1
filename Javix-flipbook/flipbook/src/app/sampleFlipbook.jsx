"use client";
import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker";

export default function SampleFlipbooks() {
    const [samplePages, setSamplePages] = useState([]);
    const [visibleSamples, setVisibleSamples] = useState([]);

    useEffect(() => {
        const samples = [
            "/Doc1.pdf",
            "/Doc2.pdf",
            "/Doc3.pdf",
            "/Doc1.pdf",
        ];
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setVisibleSamples(samples.slice(0,2)); 
            } else {
                setVisibleSamples(samples); 
            }
        };

        handleResize(); 
        window.addEventListener("resize", handleResize);

        const loadSamplePreviews = async () => {
            const previews = [];

            for (const pdfPath of samples) {
                try {
                    const pdf = await pdfjsLib.getDocument(pdfPath).promise;
                    const page = await pdf.getPage(1);
                    const viewport = page.getViewport({ scale: 0.3 });
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    await page.render({ canvasContext: ctx, viewport }).promise;

                    previews.push({
                        pdfPath,
                        preview: canvas.toDataURL(),
                    });
                } catch (err) {
                    console.error("Error loading sample:", err);
                }
            }

            setSamplePages(previews);
        };

        loadSamplePreviews();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleClick = (pdfPath) => {
        const newURL = `/flipbook?pdf=${encodeURIComponent(pdfPath)}`;
        window.history.pushState({}, "", newURL);
        const event = new Event("popstate");
        window.dispatchEvent(event);
    };

    return (
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
  {samplePages.length === 0 ? (
    <p className="text-gray-500 text-sm">Loading previews...</p>
  ) : (
    samplePages
      .filter(sample => visibleSamples.includes(sample.pdfPath))
      .map((sample, idx) => (
        <div
          key={idx}
          onClick={() => handleClick(sample.pdfPath)}
          className="w-24 h-32 rounded-lg overflow-hidden shadow-md hover:shadow-2xl hover:scale-105 cursor-pointer transition-transform bg-white"
        >
          <img
            src={sample.preview}
            alt={`Sample ${idx + 1}`}
            className="w-full h-full object-contain"
          />
        </div>
    ))
            )
}
        </div >
    );
}
