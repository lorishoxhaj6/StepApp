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
import DistanzaGrafico from "./DistanzaGrafico";
import CaloriesRingChart from "./CaloriesRing";
import CustomAlert from "./customAlert";

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

function calculateCurrentCalories(data: Grafico[]): number {
	return data.reduce((acc,item) => acc + item.calorie,0);
}

function calculateCaloriesGoalFromSteps(goal: string | null, data: Grafico[]): number {
	const goalSteps = parseInt(goal || "0", 10) * data.length;
	const caloriePerStep = 0.04;

	return goalSteps * caloriePerStep;
}

const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className="backdrop-blur-md bg-white/70 border border-gray-200 rounded-xl p-4 shadow-lg text-sm text-gray-900">
				<p className="font-semibold">
					{format(parseISO(label), "dd MMM yyyy", { locale: it })}
				</p>
				{payload.map((entry: any) => {
					let unit = "";
					let value = entry.value;

					if (entry.dataKey === "calorie") {
						unit = "kcal";
					} else if (entry.dataKey === "distanza") {
						unit = "km";
						value = value / 1000;
					} else if (entry.dataKey === "passi") {
						unit = "passi";
					}

					const formatted = value.toLocaleString("it-IT", {
						minimumFractionDigits: entry.dataKey === "distanza" ? 2 : 0,
						maximumFractionDigits: 2,
					});

					return (
						<p key={entry.dataKey} className="mt-1">
							<span style={{ color: entry.color }} className="font-medium">
								{entry.name}:
							</span>{" "}
							{formatted} {unit}
						</p>
					);
				})}
			</div>
		);
	}
	return null;
};

export default function StepsChart({ data }: props) {
	const [sommeGiornaliereArray, setSommeGiornaliereArray] = useState<Grafico[]>(
		[]
	);
	const [dataFiltrata, setDataFiltrata] = useState<Grafico[]>([]);
	const [visualizzazione, setVisualizazzione] = useState<string>("mese");
	const [dataSelezionata, setDataSelezionata] = useState<Date>(new Date());
	const [showAlert, setShowAlert] = useState(false);


	useEffect(() => {
		const sommePerGiorno: SommeGiornaliere = {};
		data.forEach((item) => {
			if (item.time && item.calories && item.distance && item.steps) {
				const dateObject =
					item.time instanceof Date
						? item.time
						: new Date(parseInt(item.time as string, 10) * 1000);
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
						passi: passi,
					};
				}
			}
		});

		const arrayPerGrafico: Grafico[] = Object.keys(sommePerGiorno)
			.sort()
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


	useEffect(() => {
        if (
			
            visualizzazione === "giorno" &&
            dataFiltrata.length > 0 &&
            dataFiltrata[0]?.passi !== undefined &&
            parseInt(localStorage.getItem("goal") || "0") > dataFiltrata[0].passi!
        ) {	
			setTimeout( () => {
				setShowAlert(true);
			},1000)
			


        } else {
			setShowAlert(false);
		}
    }, [visualizzazione, dataFiltrata]);

	function handleDataChange(date: Date | null | undefined): void {
		if (date) setDataSelezionata(date);
	}

	return (
		<>
			<div className="flex justify-center mb-4">
				<div className="inline-flex bg-white shadow-sm rounded-full p-1 border border-gray-200">
					{["giorno", "settimana", "mese"].map((val) => (
						<button
							key={val}
							onClick={() => setVisualizazzione(val)}
							className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ease-in-out
				${
					visualizzazione === val
						? "bg-black text-white shadow-md"
						: "text-gray-800 hover:bg-gray-100"
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
					className="border bg-white px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
				/>
			</div>

			{dataFiltrata.length === 0 ? (
				<p className="text-center text-gray-400 text-sm italic">
					Nessun dato per la selezione attuale.
				</p>
			) : (
				<div className="rounded-2xl p-4 overflow-hidden shadow-xl bg-white flex-col">
					<ResponsiveContainer width="100%" height={750}>
						<ComposedChart
							data={dataFiltrata}
							margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
							barCategoryGap="20%"
						>
							<CartesianGrid strokeDasharray="4 4" stroke="#F2F2F2" />
							<XAxis
								dataKey="data"
								tickFormatter={(tick) =>
									format(parseISO(tick), "dd/MM", { locale: it })
								}
								tick={{ fill: "#1C1C1E", fontSize: 12 }}
							/>
							<YAxis tick={{ fill: "#1C1C1E", fontSize: 12 }} />
							<Tooltip
								content={<CustomTooltip />}
								cursor={{ fill: "#E5E5EA", opacity: 0.3 }}
							/>
							<Legend wrapperStyle={{ paddingTop: 20 }} />
							<Bar
								dataKey="calorie"
								fill="#FF9500"
								name="Calorie"
								radius={[8, 8, 0, 0]}
								animationDuration={800}
							/>
							<Bar
								dataKey="distanza"
								fill="#34C759"
								name="Distanza"
								radius={[8, 8, 0, 0]}
								animationDuration={1000}
							/>
							<Bar
								dataKey="passi"
								fill="#007AFF"
								name="Passi"
								radius={[8, 8, 0, 0]}
								animationDuration={1200}
							/>
							{localStorage.getItem("goal") && (
								<ReferenceLine
									yAxisId={0}
									y={parseFloat(localStorage.getItem("goal")!)}
									stroke="#FF2D55"
									strokeDasharray="3 3"
									strokeWidth={2}
									label={{
										value: "Obiettivo",
										position: "left",
										fill: "#FF2D55",
										fontSize: 12,
									}}
								/>
							)}
						</ComposedChart>
					</ResponsiveContainer>
					{dataFiltrata.length > 0 && (
						<div className="flex items-center-safe">
							<div className="flex-1/3 p-4 m-5 justify-items-center"><CaloriesRingChart
								calories={calculateCurrentCalories(dataFiltrata)}
								caloriesGoal={calculateCaloriesGoalFromSteps(localStorage.getItem("goal"),dataFiltrata)}
							/></div>
							<div className="flex-2/3 p-4 justify-items-center"><DistanzaGrafico data={dataFiltrata} /></div>
						</div>
					)}
				</div>
			)}		
			{showAlert  && <CustomAlert message={`Ti mancano ${
                    parseInt(localStorage.getItem("goal") || "0") - dataFiltrata[0].passi!
                } passi.`} onClose={ () => {
					setShowAlert(false);
				}
					
				}/>}	
		</>
	);
}
