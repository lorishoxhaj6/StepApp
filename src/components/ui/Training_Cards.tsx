import { JSX, isValidElement } from "react";
import { motion } from 'framer-motion';

type CardProps = {
  icon: JSX.Element;
  title1: string;
  isSelected?: boolean;
  onClick?: () => void;
};

const Card = ({ icon, title1, isSelected, onClick }: CardProps) => {
  let bgImageUrl: string | undefined;

  if (isValidElement(icon) && icon.type === "img") {
    const props = icon.props as { src?: string };
    bgImageUrl = props.src;
  }

  return (
    <motion.div
      className={`relative rounded-3xl w-full max-w-sm mx-auto overflow-hidden cursor-pointer
        transform transition-transform duration-500 ease-in-out
        ${isSelected ? "scale-105 shadow-2xs border-2 border-blue-600" : "hover:scale-105 hover:shadow-xl"}
      `}
      onClick={onClick}
      style={{
        backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        willChange: "transform",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0}}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 0.6],
        delay: 0.4, // entra leggermente dopo la pagina
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1.5px] z-0 transition-all duration-500 ease-in-out" />

      {/* Contenuto */}
      <div className="relative z-10 text-white p-6 flex flex-col justify-start h-full">
        <h2 className="text-3xl font-semibold leading-tight">{title1}</h2>
        <div className="mt-14" />
      </div>
    </motion.div>
  );
};

export default Card;
