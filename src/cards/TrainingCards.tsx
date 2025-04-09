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
import jsPDF from "jspdf";
import datiAllenamento from "../data/exercise.json";


type Esercizio = {
  esercizio: string;
  serie: number;
  ripetizioni: number;
};

type ZonaMuscolare = {
  petto: Esercizio[];
  gambe: Esercizio[];
  schiena: Esercizio[];
  spalle: Esercizio[];
  braccia: Esercizio[];
};

type Livelli = {
  principiante: ZonaMuscolare;
  intermedio: ZonaMuscolare;
  avanzato: ZonaMuscolare;
};

const dati: Livelli = datiAllenamento;

function Schede() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const handleLevelSelect = (value: string) => {
    setSelectedLevel(value.toLocaleLowerCase());
  };

  const handleZoneSelect = (value: string) => {
    setSelectedZone(value.toLocaleLowerCase());
  };

  const handleSubmit = () => {
    if (!selectedLevel || !selectedZone) {
      alert("Seleziona un livello e una zona muscolare!");
      return;
    }

    const exercise = dati[selectedLevel as keyof Livelli][selectedZone as keyof ZonaMuscolare];
    const doc = new jsPDF();

  
    doc.setFont("Roboto", "normal");

    // Titolo principale centrato
    doc.setFontSize(22);
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.text("Scheda di Allenamento Personalizzata", pageWidth / 2, 20, { align: "center" });

    // Divider sotto il titolo
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(15, 25, pageWidth - 15, 25);

    // Dettagli della scheda
    doc.setFontSize(14);
    doc.text(`Livello: ${selectedLevel}`, 15, 35);
    doc.text(`Gruppo Muscolare: ${selectedZone}`, 15, 45);

    // Divider tra informazioni generali e esercizi
    doc.setLineWidth(0.2);
    doc.line(15, 50, pageWidth - 15, 50);

    // Intestazione degli esercizi
    doc.setFontSize(16);
    doc.text("Esercizi", 15, 60);

    let y = 70; // Posizione iniziale verticale
    exercise.forEach((esercizio: { esercizio: string; serie: number; ripetizioni: number }) => {
      doc.setFontSize(12);

      // Nome dell'esercizio
      doc.text(`${esercizio.esercizio}`, 15, y);

      // Dettagli (serie e ripetizioni) a destra
      const details = `${esercizio.serie} serie x ${esercizio.ripetizioni} ripetizioni`;
      doc.text(details, pageWidth - 15, y, { align: "right" });

      y += 10; // Spazio tra gli esercizi

      if (y > 280) { // Gestione del salto pagina
        doc.addPage();
        y = 20;
      }
  });

  // Salva il PDF
  doc.save(`${selectedLevel}_${selectedZone}.pdf`);
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center  text-gray-800">
      <h1 className="font-bold font-sans text-gray-900 justify-center m-5 text-4xl">Genera Schede</h1>
      {/* Sezione per le difficoltà */}
      <div className="grid grid-cols-3 justify-center items-center mb-5 mt-5 gap-10 min-w-9/12">
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
