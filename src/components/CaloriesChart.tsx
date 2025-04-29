import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { calories: 360 },
];

const COLORS = ['#2874A2'];

export default function CaloriePieChart() {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
		  innerRadius={40}
          dataKey="calories"
        >
         <Cell fill={COLORS[0]}/>
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
