import { FormEvent, useEffect, useRef, useState } from "react";

function Dashboard() {
  const numberInputRef = useRef<HTMLInputElement>(null);
  const [isSelect, setSelect] = useState<boolean>(false);
  const [goal, setGoal] = useState<string | null>(localStorage.getItem("goal") || null);

  useEffect(() => {
    setGoal(localStorage.getItem("goal"));
  }, []);

  function data(e: FormEvent) {
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
    <div className="flex min-h-screen bg-[#f5f5f7] p-8 flex flex-col items-left">

      <div className="w-full max-w-sm">
        {!localStorage.getItem("goal") || isSelect ? (
          <form
            onSubmit={data}
            className="bg-white rounded-2xl shadow-sm p-6 space-y-6 border border-gray-200"
          >
            <div className="space-y-2">
              <label htmlFor="a" className="block text-sm font-medium text-gray-800">
                Obiettivo giornaliero
              </label>
              <input
                type="number"
                id="a"
                name="a"
                defaultValue={goal || ""}
                ref={numberInputRef}
                placeholder="Es. 10000 passi"
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
    </div>
  );
}

export default Dashboard;