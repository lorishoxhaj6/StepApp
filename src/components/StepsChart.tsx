import {
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
	Legend,
	ComposedChart,
	ReferenceLine,
} from "recharts";
import { RowData } from "../cards/Dashboard";
import { useEffect, useState } from "react";
import { format, isSameDay, isSameWeek, isSameMonth, parseISO } from "date-fns";
import { it } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface props {
	data: RowData[];
}

interface SommeGiornaliere {
	[key: string]: { calorie: number; distanza: number; passi: number };
}

interface Grafico {
	data: string;
	calorie: number;
	distanza: number;
	passi: number;
}

export default function StepsChart({ data }: props) {
	const [sommeGiornaliereArray, setSommeGiornaliereArray] = useState<Grafico[]>([]);
	const [dataFiltrata, setDataFiltrata] = useState<Grafico[]>([]);
	const [visualizzazione, setVisualizazzione] = useState<string>("mese");
	const [dataSelezionata, setDataSelezionata] = useState<Date>(new Date());

	useEffect(() => {
		const sommePerGiorno: SommeGiornaliere = {};
		data.forEach((item) => {
			if (item.time && item.calories && item.distance && item.steps) {
				const dateObject =item.time instanceof Date? item.time : new Date(parseInt(item.time as string, 10) * 1000);
				const dataFormattata = format(dateObject, "yyyy-MM-dd", { locale: it });

				const calorie = parseFloat(item.calories);
				const distanza = parseFloat(item.distance);
				const passi = parseFloat(item.steps);

				if (sommePerGiorno[dataFormattata]) {
					sommePerGiorno[dataFormattata].calorie += calorie;
					sommePerGiorno[dataFormattata].distanza += distanza;
					sommePerGiorno[dataFormattata].passi += passi;
				} else {
					sommePerGiorno[dataFormattata] = {
						calorie: calorie,
						distanza: distanza,
						passi: passi
					};
				}
			}
		});

		const arrayPerGrafico: Grafico[] = Object.keys(sommePerGiorno)
			.sort() // ordina le date in ordine crescente
			.map((dataKey) => ({
				data: dataKey,
				calorie: sommePerGiorno[dataKey].calorie,
				distanza: sommePerGiorno[dataKey].distanza,
				passi: sommePerGiorno[dataKey].passi,
			}));

		setSommeGiornaliereArray(arrayPerGrafico);
	}, [data]);

	useEffect(() => {
		if (!dataSelezionata || !visualizzazione) return;

		let filtered: Grafico[] = [];

		switch (visualizzazione) {
			case "giorno":
				filtered = sommeGiornaliereArray.filter((item) =>
					isSameDay(parseISO(item.data), dataSelezionata)
				);
				break;
			case "settimana":
				filtered = sommeGiornaliereArray.filter((item) =>
					isSameWeek(parseISO(item.data), dataSelezionata, { weekStartsOn: 1 })
				);
				break;
			case "mese":
				filtered = sommeGiornaliereArray.filter((item) =>
					isSameMonth(parseISO(item.data), dataSelezionata)
				);
				break;
			default:
				filtered = sommeGiornaliereArray;
		}
		setDataFiltrata(filtered);
	}, [sommeGiornaliereArray, visualizzazione, dataSelezionata]);

	function handleDataChange(date: Date | null | undefined): void {
		if (date) setDataSelezionata(date);
	}

	return (
		<>
			<div className="flex justify-center mb-4">
				<div className="inline-flex bg-gray-100 rounded-full p-1 border border-gray-300">
					{["giorno", "settimana", "mese"].map((val) => (
						<button
							key={val}
							onClick={() => setVisualizazzione(val)}
							className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200
							${
								visualizzazione === val
									? "bg-blue-600 text-white shadow"
									: "text-blue-600 hover:bg-blue-100"
							}`}
						>
							{val === "giorno" ? "G" : val === "settimana" ? "S" : "M"}
						</button>
					))}
				</div>
			</div>

			<div className="flex justify-center mb-6">
				<DatePicker
					selected={dataSelezionata}
					onChange={handleDataChange}
					dateFormat="dd/MM/yyyy"
					locale="it"
					className="border px-3 py-1 rounded"
				/>
			</div>

			{dataFiltrata.length === 0 ? (
				<p className="text-center text-gray-500">Nessun dato per la selezione attuale.</p>
			) : (
				<div>
					<ResponsiveContainer width="100%" height={750}>
                        <ComposedChart // Usa ComposedChart
                            data={dataFiltrata}
                            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="data"
                                tickFormatter={(tick) => format(parseISO(tick), "dd/MM", { locale: it })}
                                textAnchor="end"
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="calorie" fill="#8884d8" name="Calorie" />
                            <Bar dataKey="distanza" fill="#82ca9d" name="Distanza" />
                            <Bar dataKey="passi" fill="#ffc658" name="Passi" />
                            {localStorage.getItem("goal") && (
                                <ReferenceLine
								yAxisId={0} // Assicurati che corrisponda all'ID dell'asse Y dei passi
								y={localStorage.getItem("goal")!}
								stroke="#ffbb28"
								strokeWidth={2}
								label={{ value: 'Obiettivo', position: 'right', fill: '#ffbb28' }}
							/>
                            )}
                        </ComposedChart>
                    </ResponsiveContainer>
				</div>
			)}
		</>
	);
}
