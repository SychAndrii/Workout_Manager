import React from "react";
import Image from "next/image";

export default function index({ url }) {
  return (
    <div className="w-[350px] my-3 rounded-3xl shadow bg-gray-800 border-gray-700">
      {url.Video ? (
        <div className="w-full h-[250px]">
          <video controls loop muted autoPlay className="w-full h-full object-cover">
            <source src={url.Video} type="video/mp4" />
          </video>
        </div>
      ) : (
        <Image
          src={url.Image}
          width={400}
          height={250}
          style={{ height: 250 }}
          alt={url.name}
        />
      )}
      <div className="p-5 text-white">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
          {url.name}
        </h5>
        <p className="mb-3 font-normal text-xl">
          <strong>Targetted Muscle:&nbsp;</strong>
          {url.bodypart}
          <br></br>
          <strong>Calories Burnt per rep:&nbsp;</strong>
          {url.caloriesburnt}
          <br></br>
          <strong>Equipment:&nbsp;</strong>
          {url.equipment}
          <br></br>
        </p>
      </div>
    </div>
  );
}
