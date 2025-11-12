import { PdfProvider } from "./context/pdfContext";
import "./globals.css";
import localFont from "next/font/local";

const FontRegular = localFont({
  src: "./Fonts/TT-Hoves/TTHoves-Regular.ttf",
  variable: "--font-Regular",
});

const FontMedium = localFont({
  src: "./Fonts/TT-Hoves/TTHoves-Medium.ttf",
  variable: "--font-Medium",
});

const FontBold = localFont({
  src: "./Fonts/TT-Hoves/TTHoves-Bold.ttf",
  variable: "--font-Bold",
});



export const metadata = {
  title: "Javix Tech",

};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en" className="scroll-smooth">
    <body className={`${FontRegular.variable} ${FontBold.variable} ${FontMedium.variable}`}
        style={{ fontFamily: "var(--font-Regular),var(--font-Medium),var(--font-Bold)" }}>
   <PdfProvider>
        {children}
        </PdfProvider>
         </body>
     
    </html>
  );
}
