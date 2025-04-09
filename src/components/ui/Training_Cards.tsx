import { JSX, isValidElement } from "react";

type CardProps = {
  icon: JSX.Element; // immagine JSX
  title1: string;
  isSelected?: boolean;
  onClick?: () => void;
};

const Card = ({ icon, title1, isSelected, onClick }: CardProps) => {
  // Estrai lo src se l'elemento icon è <img>
  let bgImageUrl: string | undefined;

  if (isValidElement(icon) && icon.type === "img") {
    const props = icon.props as { src?: string };
    bgImageUrl = props.src;
  }

  return (
    
    
    <div
      className={`relative rounded-3xl w-full max-w-sm mx-auto overflow-hidden transition-all duration-350 ease-in-out  ${
        isSelected ? "scale-105 shadow-xs border-2 border-blue-600" : "hover:scale-105 hover:shadow-2xl"
      }`}
      onClick={onClick}
      style={{
        backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay stile  */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] z-0" />

      {/* Contenuto sopra */}
      <div className="relative z-10 text-white p-6 flex flex-col justify-start h-full"> {/* Allinea in alto */}
        <h2 className="text-3xl font-bold leading-tight">{title1}</h2>
        <div className="mt-14"/>
      </div>
    </div>

  );
};

export default Card;
