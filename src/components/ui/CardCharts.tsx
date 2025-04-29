import { ReactElement } from "react";

type CardProps = {
    chart: ReactElement
    navbar ?: ReactElement
}

function CardCharts({chart,navbar}:CardProps){
    return(
        <div className="flex flex-row w-full p-6 bg-white rounded-2xl shadow-xl">
            {navbar}
            <div className="flex flex-col items-center justify-center">
                {chart}
            </div>
        </div>
    );
}

export default CardCharts;