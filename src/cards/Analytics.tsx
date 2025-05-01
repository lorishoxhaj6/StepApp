import { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";


interface RowData{
  calories?:string,
  distance?:string,
  end_time?:string,
  start_time?:string,
  steps?:string,
  type?:string
}

function Analytics() {
    const [data, setData] = useState<RowData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
  
        try {
          const response = await axios.get('/dataStorico.csv', {
            responseType: 'text', // Indica ad Axios di trattare la risposta come testo
          });
  
          Papa.parse<RowData>(response.data, {
            header: true,
            worker: true,
            skipEmptyLines: true,
            complete: (results) => {
              setData(results.data);
              console.log(results.data);
              setLoading(false);
            },
            error: () => {
              setLoading(false);
            },
          });
        } catch (e: any) {
  
          setLoading(false);
        }
      }
  
      fetchData();
    }, []);
  
    if (loading) {
      return <div>Caricamento dati CSV...</div>;
    }


  return (
    <div className="flex-1 p-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Analytics</h1>
    </div>
  );
}

export default Analytics;