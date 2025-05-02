import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { format, parseISO } from "date-fns";
import { it } from "date-fns/locale";

interface Props {
  data: { data: string; distanza: number }[];
}

const DistanzaGrafico = ({ data }: Props) => {
  const distanzaKm = data.map((item) => ({
    ...item,
    distanza: item.distanza / 1000,
  }));

  return (
    <div className="w-full md:w-1/2 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Distanza Percorsa</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={distanzaKm}>
            <CartesianGrid strokeDasharray="4 4" stroke="#F2F2F2" />
            <XAxis
              dataKey="data"
              tickFormatter={(tick) => format(parseISO(tick), "dd/MM", { locale: it })}
              tick={{ fill: "#1C1C1E", fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: "#1C1C1E", fontSize: 12 }}
              unit=" km"
            />
            <Tooltip
              labelFormatter={(label) => format(parseISO(label), "dd MMM yyyy", { locale: it })}
              formatter={(value: number) => [`${value.toFixed(2)} km`, "Distanza"]}
              cursor={{ fill: "#E5E5EA", opacity: 0.3 }}
            />
            <Line
              type="monotone"
              dataKey="distanza"
              stroke="#34C759"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DistanzaGrafico;
