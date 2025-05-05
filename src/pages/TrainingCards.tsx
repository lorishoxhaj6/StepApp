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
import corsa from "../img/CorsaPersona.jpg"
import jsPDF from "jspdf";
import datiAllenamento from "../data/exercise.json";


type Esercizio = {
  esercizio: string;
  serie: number;
  ripetizioni: number;
  recupero : number
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
    exercise.forEach((esercizio: { esercizio: string; serie: number; ripetizioni: number; recupero : number}) => {
      doc.setFontSize(12);

      // Nome dell'esercizio
      doc.text(`${esercizio.esercizio}`, 15, y);

      // Dettagli (serie e ripetizioni) a destra
      let details = ""
      if(selectedZone === 'cardio')
        details = `${esercizio.serie} serie x ${esercizio.ripetizioni} minuti con ${esercizio.recupero} secondi di recupero` ;
      else 
        details = `${esercizio.serie} serie x ${esercizio.ripetizioni} ripetizioni con ${esercizio.recupero} secondi di recupero` ;
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
      <h1 className="font-bold font-serif text-gray-900 justify-center mb-10 text-5xl">Generatore di Schede</h1>
      {/* Sezione per le difficoltà */}
      <div className="flex justify-around w-full m-5">
        <Card
          icon={<img src={principiante} alt="Principiante" loading="lazy" />}
          title1="Principiante"
          isSelected={selectedLevel === "principiante"}
          onClick={() => handleLevelSelect("principiante")}
        />
        <Card
          icon={<img src={intermedio} alt="Intermedio" loading="lazy" />}
          title1="Intermedio"
          isSelected={selectedLevel === "intermedio"}
          onClick={() => handleLevelSelect("intermedio")}
        />
        <Card
          icon={<img src={avanzato} alt="Avanzato" loading="lazy"/>}
          title1="Avanzato"
          isSelected={selectedLevel === "avanzato"}
          onClick={() => handleLevelSelect("avanzato")}
        />
      </div>

      {/* Sezione per le zone del corpo */}
      <div className="flex justify-arownd w-full m-5">
        <Card
          icon={<img src={schiena} alt="Schiena" loading="lazy"/>}
          title1="Schiena"
          isSelected={selectedZone === "schiena"}
          onClick={() => handleZoneSelect("Schiena")}
        />
        <Card
          icon={<img src={petto} alt="Petto" loading="lazy"/>}
          title1="Petto"
          isSelected={selectedZone === "petto"}
          onClick={() => handleZoneSelect("petto")}
        />
        <Card
          icon={<img src={gambe} alt="Gambe" loading="lazy" />}
          title1="Gambe"
          isSelected={selectedZone === "gambe"}
          onClick={() => handleZoneSelect("gambe")}
        />
      </div>
      <div className="flex justify-arownd w-full m-5">
        <Card
          icon={<img src={spalle} alt="Spalle" loading="lazy" />}
          title1="Spalle"
          isSelected={selectedZone === "spalle"}
          onClick={() => handleZoneSelect("spalle")}
        />
        <Card
          icon={<img src={bicipite} alt="bicipite" loading="lazy"/>}
          title1="Braccia"
          isSelected={selectedZone === "braccia"}
          onClick={() => handleZoneSelect("braccia")}
        />
        <Card
          icon={<img src={corsa} alt="corsa" loading="lazy"/>}
          title1="Cardio"
          isSelected={selectedZone === "cardio"}
          onClick={() => handleZoneSelect("cardio")}
        />
      </div>

      {/* Bottone per inviare la selezione */}
      <div className="grid grid-cols-1 justify-center items-center  mt-5 mb-5 min-w-2.5">
        <button
          onClick={handleSubmit}
          className="px-10 py-3 bg-black text-white font-medium rounded-full shadow-xl hover:bg-gray-950 transition-all duration-300 scale-105 hover:scale-110"
        >
          Conferma Selezione
        </button>
      </div>
    </div>
  );
}

export default Schede;
