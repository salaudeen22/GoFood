import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Cousrl from "../components/Cousrl";
export default function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Cousrl></Cousrl>
      </div>

      <div className="m-5">
       <Card/>
       <Card/>
       <Card/>
       <Card/>
       <Card/>
      </div>
      <div>
       <Footer></Footer>
      </div>
    </div>
  );
}
