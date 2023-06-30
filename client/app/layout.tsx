import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:
    "Backend Developer Intern Assessment - Weather Data Display (MERN Stack)",
  description:
    "You are required to develop a web application using the MERN (MongoDB, Express.js, React.js, Node.js) stack that integrates with the OpenWeatherMap API to retrieve weather data and display it in a tabular format based on user input. The application should allow users to select or enter custom dates to view weather data for specific days.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
