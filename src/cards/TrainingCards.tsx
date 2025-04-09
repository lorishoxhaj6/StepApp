import { useState } from "react";
import Card from "../components/ui/Training_Cards";
import bicipite from "../img/bicipite.jpg";
import braccia from "../img/braccia.png";
import schiena from "../img/schiena.jpg";
import flessioni from "../img/push-up.png";
import tricipite from "../img/tricipite.jpg";
import pushup from "../img/push-up.png";
import gambe from "../img/gambe.jpg";

function Schede() {
  // Stato per gestire la selezione della card
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  // Funzioni per aggiornare lo stato in base alla selezione
  const handleLevelSelect = (value: string) => {
    setSelectedLevel(value);
  };

  const handleZoneSelect = (value: string) => {
    setSelectedZone(value);
  };

  // Funzione per il bottone
  const handleSubmit = () => {
    fetch("../../exercise.json")
      .then((response) => response.json()) // Converte il file in un oggetto JavaScript
      .then((data) => {
        if (selectedLevel === "Principiante") {
          if (selectedZone === "Petto") {
            console.log(data.principiante.petto);

            const blob = new Blob([data.principiante.petto], {
              type: "text/plain",
            }); // Crea un Blob con il contenuto
            const url = URL.createObjectURL(blob); // Crea un URL temporaneo
            const link = document.createElement("a"); // Crea un elemento <a>
            link.href = url;
            link.download = "file.txt"; // Nome del file scaricato
            link.click(); // Simula il click sul link
            URL.revokeObjectURL(url); // Libera la memoria
          }
        }
      })
      .catch((error) => console.error("Errore nel caricamento:", error));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Sezione per le difficoltà */}
      <div className="grid grid-cols-3 gap-10 mb-20">
        <Card
          icon={<img src={flessioni} alt="Flessioni" />}
          title1="Principiante"
          title2="Allenamento base"
          isSelected={selectedLevel === "Principiante"}
          onClick={() => handleLevelSelect("Principiante")}
        />
        <Card
          icon={<img src={tricipite} alt="Tricipite" />}
          title1="Intermedio"
          title2="Allenamento intermedio"
          isSelected={selectedLevel === "Intermedio"}
          onClick={() => handleLevelSelect("Intermedio")}
        />
        <Card
          icon={<img src={bicipite} alt="Bicipite" />}
          title1="Avanzato"
          title2="Allenamento avanzato"
          isSelected={selectedLevel === "Avanzato"}
          onClick={() => handleLevelSelect("Avanzato")}
        />
      </div>

      {/* Sezione per le zone del corpo */}
      <div className="flex flex-col items-center gap-6">
        {/* Prima riga con 3 card */}
        <div className="flex gap-10">
          <Card
            icon={<img src={schiena} alt="Schiena" />}
            title1="Schiena"
            title2="Schiena forte"
            isSelected={selectedZone === "Schiena"}
            onClick={() => handleZoneSelect("Schiena")}
          />
          <Card
            icon={<img src={pushup} alt="Petto" />}
            title1="Petto"
            title2="Spingi forte"
            isSelected={selectedZone === "Petto"}
            onClick={() => handleZoneSelect("Petto")}
          />
          <Card
            icon={<img src={gambe} alt="Gambe" />}
            title1="Gambe"
            title2="Power legs"
            isSelected={selectedZone === "Gambe"}
            onClick={() => handleZoneSelect("Gambe")}
          />
        </div>

        {/* Seconda riga con 2 card */}
        <div className="flex gap-10 mt-4">
          <Card
            icon={<img src={schiena} alt="Spalle" />}
            title1="Spalle"
            title2="Spalle forti"
            isSelected={selectedZone === "Spalle"}
            onClick={() => handleZoneSelect("Spalle")}
          />
          <Card
            icon={<img src={braccia} alt="Braccia" />}
            title1="Braccia"
            title2="Focus Braccia"
            isSelected={selectedZone === "Braccia"}
            onClick={() => handleZoneSelect("Braccia")}
          />
        </div>
      </div>

      {/* Bottone per inviare la selezione */}
      <button
        onClick={handleSubmit}
        className="mt-10 px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
      >
        Conferma Selezione
      </button>
    </div>
  );
}

export default Schede;
