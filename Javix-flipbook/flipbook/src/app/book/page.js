"use client";
import { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker";
import SampleFlipbooks from "../sampleFlipbook";
import { useSearchParams } from "next/navigation";
import Header from "../Header";
import Footer from "../footer";
import Link from "next/link";

export default function PdfFlipbook() {
    const searchParams = useSearchParams();
    const pdfURL = searchParams.get("pdf");
    const [page, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [flipbookKey, setFlipbookKey] = useState(0);
    const [toastMsg, setToastMsg] = useState("");
    const [showToast, setShowToast] = useState(false);

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [pageEffect, setPageEffect] = useState("Magazine");


    const Toast = (message) => {
        setToastMsg(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    useEffect(() => {
        if (!pdfURL) {
            Toast("No PDF provided. Redirecting home...");
            setTimeout(() => {
                window.location.href = "/home";
            }, 1500);
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
            <div className="bg-white flex flex-col px-4 md:px-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <h1 className="text-2xl font-bold pl-5">Your Flipbook</h1>
                    <div className="hidden lg:block flex-shrink-0 pt-5 pr-10">
                        <SampleFlipbooks />
                    </div>
                </div>
                <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    <div className="pl-5">
                        <Link
                            href="/home"
                            className="inline-flex items-center gap-1 text-green-600 font-semibold mb-4 hover:text-green-800 transition-colors"
                        >
                            ← Back
                        </Link>

                        <div className="space-y-8">
                            <h2 className="text-lg font-semibold">Titles (Optional)</h2>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-green-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Subtitle"
                                    value={subtitle}
                                    onChange={(e) => setSubtitle(e.target.value)}
                                    className="w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-lg  font-semibold mb-5">
                                    Page effect
                                </label>
                                <select
                                    value={pageEffect}
                                    onChange={(e) => setPageEffect(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-green-500"
                                >
                                    <option>Magazine</option>
                                    <option>Book</option>
                                    <option>Flip</option>
                                </select>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <button className="flex-1 border border-green-500 text-green-600 rounded-md py-2 hover:bg-green-50">
                                    Customize
                                </button>
                                <button className="flex-1 border border-green-500 text-green-600 rounded-md py-2 hover:bg-green-50">
                                    Share flipbook
                                </button>
                            </div>



                            <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700">
                                Sign Up
                            </button>
                            <div className="block lg:hidden mt-8">
                                <SampleFlipbooks />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-xl">
                        {loading ? (
                            <div className="text-center text-lg font-semibold text-gray-700">

                            </div>
                        ) : (
                            <HTMLFlipBook

                                size="stretch"
                                width={200}
                                height={300}
                                minWidth={150}
                                maxWidth={250}
                                minHeight={250}
                                maxHeight={350}
                                maxShadowOpacity={0.5}
                                showCover={true}
                                className="rounded-xl "
                            >
                                {page.map((src, idx) => (
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

                        )}
                    </div>
                </div>

                {showToast && (
                    <div className="fixed top-5  bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-fade-in-out">
                        {toastMsg}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

