//import React from "react";
import workout from "../img/workout.png";
import contacts from "../img/contact-us.png";
import analtyics from "../img/pie-chart.png";
import dashboard from "../img/dashboard.png";
import NavIcon from "./NavIcon";

export const NavbarData = [
	{
		title: "Dashboard",
		icon: <NavIcon src={dashboard} alt="Dashboard" />,
		link: "/",
	},
	{
		title: "Training",
		icon: <NavIcon src={workout} alt="training-cards" />,
		link: "/training-cards",
	},
	{
		title: "Analytics",
		icon: <NavIcon src={analtyics} alt="Analytics" />,
		link: "/analytics",
	},
	{
		title: "Contact Us",
		icon: <NavIcon src={contacts} alt="contact-us" />,
		link: "/contact-us",
	},
];
