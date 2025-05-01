import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
	Rectangle,
	Legend
} from "recharts";
import { RowData } from "../cards/Dashboard";

interface props {
	data: RowData[];
}

export default function StepsChart({ data }: props) {
	return (
		<>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					width={500}
					height={300}
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey=""/>
					<YAxis />
					<Tooltip />
					<Legend />
					{data.map((el,index) => (
						<Bar
						key={index}
						dataKey={el.steps!}
						fill="#8884d8"
						activeBar={<Rectangle fill="pink" stroke="blue" />}
					/>
					))}
				</BarChart>
			</ResponsiveContainer>
		</>
	);
}

