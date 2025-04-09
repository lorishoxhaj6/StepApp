import { useState } from "react";
import Card from "../components/ui/Training_Cards";
import principiante from "../img/principiante.jpg"
import intermedio from "../img/intermedio.jpg"
import avanzato from "../img/avanzato.jpg"
import schiena from "../img/schiena.jpg"
import gambe from "../img/gambe.jpg"
import bicipite from "../img/bicipiti.jpg"
import spalle from "../img/spalle.jpg"
import petto from "../img/petto.jpg"

function Schede() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const handleLevelSelect = (value: string) => {
    setSelectedLevel(value);
  };

  const handleZoneSelect = (value: string) => {
    setSelectedZone(value);
  };

  const handleSubmit = () => {
    fetch("../../exercise.json")
      .then((response) => response.json())
      .then((data) => {
        if (selectedLevel === "Principiante") {
          if (selectedZone === "Petto") {
            const blob = new Blob([data.principiante.petto], {
              type: "text/plain",
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "scheda-petto.txt";
            link.click();
            URL.revokeObjectURL(url);
          }
        }
      })
      .catch((error) => console.error("Errore nel caricamento:", error));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center mt-5 text-gray-800">
      {/* Sezione per le difficoltà */}
      <div className="flex justify-center  mb-5 mt-8 w-full">
        <Card
          icon={<img src={principiante} alt="Principiante" />}
          title1="Principiante"
          isSelected={selectedLevel === "Principiante"}
          onClick={() => handleLevelSelect("Principiante")}
        />
        <Card
          icon={<img src={intermedio} alt="Intermedio" />}
          title1="Intermedio"
          isSelected={selectedLevel === "Intermedio"}
          onClick={() => handleLevelSelect("Intermedio")}
        />
        <Card
          icon={<img src={avanzato} alt="Avanzato" />}
          title1="Avanzato"
          isSelected={selectedLevel === "Avanzato"}
          onClick={() => handleLevelSelect("Avanzato")}
        />
      </div>

      {/* Sezione per le zone del corpo */}
      <div className="flex flex-wrap justify-center gap-10 mt-5 mb-5 ">
        <Card
          icon={<img src={schiena} alt="Schiena" />}
          title1="Schiena"
          isSelected={selectedZone === "Schiena"}
          onClick={() => handleZoneSelect("Schiena")}
        />
        <Card
          icon={<img src={petto} alt="Petto" />}
          title1="Petto"
          isSelected={selectedZone === "Petto"}
          onClick={() => handleZoneSelect("Petto")}
        />
        <Card
          icon={<img src={gambe} alt="Gambe" />}
          title1="Gambe"
          isSelected={selectedZone === "Gambe"}
          onClick={() => handleZoneSelect("Gambe")}
        />
        <Card
          icon={<img src={spalle} alt="Spalle" />}
          title1="Spalle"
          isSelected={selectedZone === "Spalle"}
          onClick={() => handleZoneSelect("Spalle")}
        />
        <Card
          icon={<img src={bicipite} alt="bicipite" />}
          title1="Braccia"
          isSelected={selectedZone === "Braccia"}
          onClick={() => handleZoneSelect("Braccia")}
        />
      </div>

      {/* Bottone per inviare la selezione */}
      <div className="flex justify-center items-center  mt-5 mb-5">
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-black text-white font-medium rounded-full shadow-xl hover:bg-gray-900 transition-all duration-300 hover:scale-105"
        >
          Conferma Selezione
        </button>
      </div>
    </div>
  );
}

export default Schede;
