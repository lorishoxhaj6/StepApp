import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
} from "recharts";
import { RowData } from "../cards/Dashboard";
import {  useEffect, useState } from "react"; // Importa useState
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'



interface props {
    data: RowData[];
}

interface SommeGiornaliere {
    [key: string]: { calorie: number; distanza: number; passi: number };
}

interface Grafico  {
	data : string,
	calorie: number,
	distanza: number,
	passi: number
}	


export default function StepsChart({ data }: props) {
    const [sommeGiornaliereArray, setSommeGiornaliereArray] = useState<Grafico[]>([]);
	const [dataFiltrata,setDataFiltrata] = useState<Grafico[]>([]);
	const [visualizzazione,setVisualizazzione]  = useState<string>();
	const [dataSelezionata, setDataSelezionata] = useState<Date>(); // O Date | null


    useEffect(() => {	
        const sommePerGiorno: SommeGiornaliere = {};
        data.forEach(item => {
            if (item.time) {
                // Assicurati che item.time sia un oggetto Date prima di formattarlo
                const dateObject = item.time instanceof Date ? item.time : new Date(parseInt(item.time as string, 10) * 1000);
                const dataFormattata = format(dateObject, 'yyyy-MM-dd', { locale: it });

				
				const calorie = item.calories
				const distanza = item.distance 
				const passi = item.steps 

				if (sommePerGiorno[dataFormattata]) {
					sommePerGiorno[dataFormattata].calorie += calorie!;
					sommePerGiorno[dataFormattata].distanza += distanza!;
					sommePerGiorno[dataFormattata].passi += passi!;
				} else {
					sommePerGiorno[dataFormattata] = { calorie: calorie!, distanza: distanza!, passi: passi! };
				}
			
           
            }
        });

        // Trasforma l'oggetto sommePerGiorno in un array per il grafico
        const arrayPerGrafico: Grafico[] = Object.keys(sommePerGiorno).map(dataKey => ({
            data: dataKey,
            calorie: sommePerGiorno[dataKey].calorie,
            distanza: sommePerGiorno[dataKey].distanza,
            passi: sommePerGiorno[dataKey].passi,
        }));

        setSommeGiornaliereArray(arrayPerGrafico);
    }, [data]); // Ricalcola quando 'data' cambia


	useEffect( () => {
		let filtered = [...sommeGiornaliereArray];
		const formattedSelectedDate = format(dataSelezionata!, 'yyyy-MM-dd');
		switch (visualizzazione) {
			case 'giorno':
				filtered = filtered.filter(item => item.data === formattedSelectedDate);
				break;
			case 'settimana':
				
				break;
			case 'mese':
				
				break;
			default:
				break;
			setDataFiltrata(filtered);
		}
		
	},[sommeGiornaliereArray, visualizzazione, dataSelezionata])

	function handleDataChange(date: Date | null| undefined): void {
		setDataSelezionata(date!);
	}

	
	
    return (
		
		<div>
			<div className="flex justify-center mb-4">
  				<div className="inline-flex bg-gray-100 rounded-full p-1 border border-gray-300">
    				{["giorno", "settimana", "mese"].map((val) => (
      				<button
						key={val}
						onClick={() => setVisualizazzione(val)}
						className={ ` px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200
						${visualizzazione === val
						? "bg-blue-600 text-white shadow"
						: "text-blue-600 hover:bg-blue-100"} ` }
						>
						{val === "giorno" ? "G" : val === "settimana" ? "S" : "M"}
					</button>
					))}
				</div>
			</div>
			{/*<TimeBar/>*/}
			<DatePicker 
				//selected={selectedDate}
				onChange={handleDataChange}
				dateFormat="dd/MM/yyyy"
				locale="it"
				className="bg-black"
			/>


			<ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={dataFiltrata}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="data"/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="calorie" fill="#8884d8" name="Calorie" />
                    <Bar dataKey="distanza" fill="#82ca9d" name="Distanza" />
                    <Bar dataKey="passi" fill="#ffc658" name="Passi" />
                </BarChart>
            </ResponsiveContainer>
		</div>

    );
}


