import { motion } from "framer-motion";

const Animations = {
	initial: { opacity: 0, y: 20, scale: 0.98 },
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.4,
			ease: [0.4, 0, 0.2, 1], // Apple-style easing
		},
	},
	exit: {
		opacity: 0,
		y: -20,
		scale: 0.98,
		transition: {
			duration: 0.4,
			ease: [0.4, 0, 0.2, 1],
		},
	},
};

function AnimatedPage({ children }: { children: React.ReactNode }) {
	return (
		<motion.div
			variants={Animations}
			initial="initial"
			animate="animate"
			exit="exit"
			className="h-full w-full"
		>
			{children}
		</motion.div>
	);
}

export default AnimatedPage;
