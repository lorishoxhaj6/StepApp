import { useState } from "react";
import Card from "../components/ui/Training_Cards";
import bicipite from "../img/bicipite.jpg";
import braccia from "../img/braccia.png";
import schiena from "../img/schiena.jpg";
import flessioni from "../img/push-up.png";
import tricipite from "../img/tricipite.jpg";
import pushup from "../img/push-up.png";
import gambe from "../img/gambe.jpg";
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
  // Stato per gestire la selezione della card
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  // Funzioni per aggiornare lo stato in base alla selezione
  const handleLevelSelect = (value: string) => {
    setSelectedLevel(value.toLocaleLowerCase());
  };

  const handleZoneSelect = (value: string) => {
    setSelectedZone(value.toLocaleLowerCase());
  };

  // Funzione per il bottone
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
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Sezione per le difficoltà */}
      <div className="grid grid-cols-3 gap-10 mb-20">
        <Card
          icon={<img src={flessioni} alt="Flessioni" />}
          title1="Principiante"
          title2="Allenamento base"
          isSelected={selectedLevel === "principiante"}
          onClick={() => handleLevelSelect("principiante")}
        />
        <Card
          icon={<img src={tricipite} alt="Tricipite" />}
          title1="Intermedio"
          title2="Allenamento intermedio"
          isSelected={selectedLevel === "intermedio"}
          onClick={() => handleLevelSelect("intermedio")}
        />
        <Card
          icon={<img src={bicipite} alt="Bicipite" />}
          title1="Avanzato"
          title2="Allenamento avanzato"
          isSelected={selectedLevel === "avanzato"}
          onClick={() => handleLevelSelect("avanzato")}
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
            isSelected={selectedZone === "schiena"}
            onClick={() => handleZoneSelect("schiena")}
          />
          <Card
            icon={<img src={pushup} alt="Petto" />}
            title1="Petto"
            title2="Spingi forte"
            isSelected={selectedZone === "petto"}
            onClick={() => handleZoneSelect("petto")}
          />
          <Card
            icon={<img src={gambe} alt="Gambe" />}
            title1="Gambe"
            title2="Power legs"
            isSelected={selectedZone === "gambe"}
            onClick={() => handleZoneSelect("gambe")}
          />
        </div>

        {/* Seconda riga con 2 card */}
        <div className="flex gap-10 mt-4">
          <Card
            icon={<img src={schiena} alt="Spalle" />}
            title1="Spalle"
            title2="Spalle forti"
            isSelected={selectedZone === "spalle"}
            onClick={() => handleZoneSelect("spalle")}
          />
          <Card
            icon={<img src={braccia} alt="Braccia" />}
            title1="Braccia"
            title2="Focus Braccia"
            isSelected={selectedZone === "braccia"}
            onClick={() => handleZoneSelect("braccia")}
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
