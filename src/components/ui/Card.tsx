import React from "react";

type CardProps = {
  info1: React.ReactElement;
  info2: React.ReactElement;
  image1: React.ReactElement;
  image2: React.ReactElement;
};

export default function Card({ info1, info2, image1, image2 }: CardProps) {
  return (
    <div className="w-full p-6 bg-white rounded-3xl shadow-xl">
      <div className="flex flex-col gap-6">
        {/* Riga 1 */}
        <div className="flex items-center gap-4">
          {image1}
          {info1}
        </div>
        {/* Riga 2 */}
        <div className="flex items-center gap-4">
          {image2}
          {info2}
        </div>
      </div>
    </div>
  );
}
