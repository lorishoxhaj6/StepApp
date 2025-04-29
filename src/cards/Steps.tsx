//import CaloriesChart from "../components/CaloriesChart"
//import CardCharts from '../components/ui/CardCharts'
import CaloriesChart from '@/components/CaloriesChart'
import Timebar from '../components/ui/TimeBar'


function Steps() {

  return (
    <div className="flex-1 p-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-black">Steps</h1>
        {/*<CardCharts {CaloriesChart,Timebar}/>*/}
        <Timebar/>
        <CaloriesChart/>
    </div>
    
  )
}

export default Steps