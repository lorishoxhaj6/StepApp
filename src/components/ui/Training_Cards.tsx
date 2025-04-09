import { JSX } from "react";

type CardProps = {
  icon: JSX.Element;
  title1: string;
  title2: string;
  isSelected?: boolean; // Indica se la card è selezionata
  onClick?: () => void; // Funzione al clic
};

const Card = ({ icon, title1, title2, isSelected, onClick }: CardProps) => {
  return (
    <div
      className={`bg-black/90 text-white p-6 rounded-3xl w-full max-w-sm mx-auto relative overflow-hidden transition-all duration-300 ease-in-out transform ${
        isSelected
          ? "bg-white text-black shadow-xl scale-105" // Quando la card è selezionata
          : "hover:bg-white hover:text-black hover:shadow-lg hover:scale-105"
      }`}
      onClick={onClick}
    >
      <div className="mb-4">
        <h2 className={`text-2xl font-bold leading-tight ${isSelected && "text-black"}`}>
          {title1},<br />{title2}
        </h2>
      </div>

      <div className="relative rounded-[30px] p-[2px]">
        <div className="bg-amber-300 rounded-[28px] overflow-hidden">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Card;
