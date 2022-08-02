import Navbar from './navbar';
import Footer from "./footer";
import React from "react";
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Kurshjälparen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}