import { FormEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import StepsChart from "../components/StepsChart";


export interface RowData {
  time?: Date;
  steps?: number;
  distance?: number;
  calories?: number;
}

function Dashboard() {
  const [data, setData] = useState<RowData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const numberInputRef = useRef<HTMLInputElement>(null);
  const [isSelect, setSelect] = useState<boolean>(false);
  const [goal, setGoal] = useState<string | null>(localStorage.getItem("goal") || null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get('/data.csv', {
          responseType: 'text',
        });

        Papa.parse(response.data, {
          header: true,
          worker: true,
          skipEmptyLines: true,
          complete: (results) => {
            const processData:RowData[] = results.data.map((row:any) => {
                return {
                  ...row,
                  time : new Date(parseInt(row.time,10)*1000)
                  
                }
            })
            setData(ordineDate(processData));
            setLoading(false);
          },
          error: () => {
            setLoading(false);
          },
        });
      } catch (e: any) {
        setLoading(false);
      }
    };

    fetchData();
    setGoal(localStorage.getItem("goal"));
  }, []);

 
  if (loading) {
    return <div>Caricamento dati CSV...</div>;
  } 


  function ordineDate(data : RowData[]) : RowData[] {
    const dataOrdinata = [...data];


    dataOrdinata.sort( (a,b) => {

      const dateA = a.time;
      const dateB = b.time;
  
      // Gestisci i casi in cui 'time' è undefined
      if (!dateA && !dateB) {
        return 0; // Entrambi undefined, mantieni l'ordine
      }
      if (!dateA) {
        return -1; // a è undefined, viene prima (o dopo, a seconda della logica desiderata)
      }
      if (!dateB) {
        return 1; // b è undefined, viene dopo (o prima, a seconda della logica desiderata)
      }

      return dateA.getTime() - dateB.getTime();
  
    })

    return dataOrdinata;
  }

  function handlerSumit(e: FormEvent) {
    e.preventDefault();
    if (numberInputRef.current) {
      setSelect(false);
      localStorage.setItem("goal", numberInputRef.current.value);
      window.location.reload(); // Ricarica per aggiornare visivamente
    }
  }

  function handlerSelect() {
    setSelect(true);
  }

  return (
    
    <div className="min-h-screen bg-[#f5f5f7] p-8 flex flex-col items-left">
      <div className="w-full max-w-sm">
        
        {!localStorage.getItem("goal") || isSelect ? (
          <form
            onSubmit={handlerSumit}
            className="bg-white rounded-2xl shadow-sm p-6 space-y-6 border border-gray-200"
          >
            <div className="space-y-2">
              <label htmlFor="a" className="block text-sm font-medium text-gray-800">
                Obiettivo giornaliero
              </label>
              <input
                type="number"
                min="1"
                defaultValue={goal || ""}
                ref={numberInputRef}
                placeholder="Steps"
                className="w-full bg-[#f2f2f7] px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-black focus:outline-none transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white text-sm font-semibold py-3 rounded-xl hover:opacity-90 transition"
            >
              Salva obiettivo
            </button>
          </form>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-200 space-y-6">
            <p className="text-gray-800 text-lg">
              Il tuo obiettivo per oggi :
              <br />
              <span className="text-3xl font-semibold mt-2 block">{goal}</span>
            </p>
            <button
              onClick={handlerSelect}
              className="w-full bg-black text-white text-sm font-semibold py-3 rounded-xl hover:opacity-90 transition"
            >
              Cambia obiettivo
            </button>
          </div>
        )}
          
      </div>
      <StepsChart data={data}/>
    </div>
  );
}

export default Dashboard;