import {
    fromUnixTime, 
    intervalToDuration,
    formatDuration,
  } from "date-fns";

  
  interface attivitaProps {
    calories: string;
    distance: string;
    end_time: string;
    start_time: string;
    steps: string;
    type: string;
  }
  
  interface data {
    historical_data: attivitaProps[];
  }
  
  function Duration(start: string, end: string) {
    // Converto i Timestamps Unix in oggetti Date
    let startDate = fromUnixTime(parseInt(start));
    let endDate = fromUnixTime(parseInt(end));
  
    // Calcolo la durata tra i due timestamp
    let duration = intervalToDuration({ start: startDate, end: endDate });
  
    // Format della durata (ore e minuti)
    let durationFormatted = formatDuration(duration, {
      format: ["hours", "minutes"],
      delimiter: ":", // Usa ':' come separatore tra ore e minuti
      zero: true, // Se la durata è inferiore a 1 ora, mostra solo i minuti
    });
  
    return durationFormatted;
  }
  
  export default function StoricoAttivita({ historical_data }: data) {
    return (
      <div className="space-y-4 mt-6 px-4">
        {historical_data.map((item: attivitaProps, index: number) => (
          <div
            key={index}
            className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl p-6 flex items-center justify-between transition-all hover:scale-[1.02] border border-white/30"
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl drop-shadow-md">
                {/* Aggiungi qui l'icona per il tipo di attività */}
                {item.type === "walking" ? "🚶‍♂️" : item.type === "running" ? "🏃‍♂️" : "🚴‍♂️"}
              </div>
              <div>
                <h3 className="text-xl font-semibold capitalize text-gray-800">{item.type}</h3>
                {/* Mostra la durata formattata in stile Apple */}
                <p className="text-sm text-gray-500">
                  Durata: {Duration(item.start_time, item.end_time)}
                </p>
              </div>
            </div>
            <div className="text-right text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-medium">🥾</span> {item.steps} passi
              </p>
              <p>
                <span className="font-medium">🔥</span> {Math.round(Number(item.calories))} kcal
              </p>
              <p>
                <span className="font-medium">📏</span> {parseFloat(item.distance).toFixed(2)} km
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  