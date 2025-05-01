//import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";
import useFetch from "./hooks/useFetch";


export default function CaloriePieChart() {
	const [data, setData] = useState<any[]>([]);
	const { fetchCsvData } = useFetch();

	useEffect(() => {
		fetchCsvData("/data.csv", setData);
	}, []);

	console.log(data)
	return (
		<></>
	);
};