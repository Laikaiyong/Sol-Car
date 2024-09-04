import Link from "next/link";
import { Inter } from "next/font/google";
import "./global.css";

import PrelineScript from "./components/PrelineScript";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";
import { WalletProviders } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SolCar",
  description: "Revolutioning the way you PAY on road",
  openGraph: {
		title: "SolCar",
		description: "Revolutioning the way you PAY on road",
		images: ["/logo.png"],
	},
	twitter: {
		card: "summary",
		site: "SolCar",
		title: "SolCar",
		description: "Revolutioning the way you PAY on road",
		images: ["/logo.png"],
	},
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
<WalletProviders>

      <body className={inter.className}>
      <Toaster position="bottom-center" />
        {children}
      </body>
</WalletProviders>

      <PrelineScript />
    </html>
  );
}
