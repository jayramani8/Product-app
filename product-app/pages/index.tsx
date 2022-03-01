import MainHeader from "../components/MainHeader"
import React, { useState } from "react";
import Image from "next/image";
import Header from "../components/Header";

export default function Home() {
  
  return (
    <div>
      <Header />
      <Image height="600" width="1550" className="home-img p-4"  alt="image" src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1645168508/Croma%20Assets/CMS/Homepage%20Banners/HP%20Rotating/2022/TGIF/HP%20Rotating%20Banners/HP_TGIF_SAT_SUN_16Feb2022_udsddu.jpg/mxw_2048,f_auto"/>
    </div>
  )
}