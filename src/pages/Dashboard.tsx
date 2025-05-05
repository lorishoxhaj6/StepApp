import { FormEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import StepsChart from "../components/StepsChart";
import { motion } from "framer-motion";

export interface RowData {
  time?: Date;
  steps?: string;
  distance?: string;
  calories?: string;
}

function Dashboard() {
  const [data, setData] = useState<RowData[]>([]);
  //const [loading, setLoading] = useState<boolean>(true);
  const numberInputRef = useRef<HTMLInputElement>(null);
  const [isSelect, setSelect] = useState<boolean>(false);
  const [goal, setGoal] = useState<string | null>(localStorage.getItem("goal") || null);

  useEffect(() => {
    const fetchData = async () => {
      //setLoading(true);

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
            //setLoading(false);
          },
          error: () => {
            //setLoading(false);
          },
        });
      } catch (e: any) {
        //setLoading(false);
      }
    };

    fetchData();
    setGoal(localStorage.getItem("goal"));
  }, []);

  

  function ordineDate(data : RowData[]) : RowData[] {
    const dataOrdinata = [...data];
    dataOrdinata.sort((a, b) => {
      const dateA = a.time;
      const dateB = b.time;

      if (!dateA && !dateB) {
        return 0;
      }
      if (!dateA) {
        return -1;
      }
      if (!dateB) {
        return 1;
      }

      return dateA.getTime() - dateB.getTime();
    });

    return dataOrdinata;
  }

  function handlerSumit(e: FormEvent) {
    e.preventDefault();
    if (numberInputRef.current) {
      setSelect(false);
      localStorage.setItem("goal", numberInputRef.current.value);
      window.location.reload();
    }
  }

  function handlerSelect() {
    setSelect(true);
  }

  return (
    <motion.div
      className="min-h-screen bg-[#f5f5f7] p-8 flex flex-col items-left"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <div className="w-xl max-w-sm">
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
              Il tuo obiettivo di passi per oggi :
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
      <StepsChart data={data} />
    </motion.div>
  );
}

export default Dashboard;
