import { JSX } from "react";
import { motion } from "framer-motion";


type CardProps = {
	icon: JSX.Element;
	title1: string;
	isSelected?: boolean;
	onClick?: () => void;
};

const Card = ({ icon, title1, isSelected, onClick }: CardProps) => {
	return (
		<motion.div
			layout
			className={`
        relative rounded-3xl w-full max-w-sm mx-auto overflow-hidden cursor-pointer hover:scale-105 transition-all ease-in-out
        ${isSelected ? "border-2 border-blue-600" : ""}
      `}
			onClick={onClick}
			initial={{ opacity: 0, scale: 0.98 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			transition={{
				duration: 0.4,
				ease: [0.4, 0, 0.2, 0.6],
				delay: 0.4,
			}}
		>
			{/* Icona visibile e renderizzata in alto */}
			<div className="absolute inset-0 z-0 flex items-center justify-center">
				{icon}
			</div>

			{/* Overlay per l'effetto Apple blur */}
			<motion.div
				layout
				className="absolute inset-0 bg-black/30 backdrop-blur-[1.5px] z-10"
				transition={{ duration: 0.4 }}
			/>

			{/* Contenuto sopra */}
			<div className="relative z-20 text-white p-6 flex flex-col justify-start h-full">
				<h2 className="text-3xl font-semibold leading-tight">{title1}</h2>
				<div className="mt-14" />
			</div>
		</motion.div>
	);
};

export default Card;
