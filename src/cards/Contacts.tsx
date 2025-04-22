import GithubIcon from '../img/GithubIcon.png'
import Gmail from '../img/gmail.png'
import Card from '../components/ui/Card'
function Contacts() {

  return (
    
  <div className="flex-1 p-8 bg-gray-100">
    <h1 className="text-5xl font-bold text-gray-800">Contact us</h1>
      <div className="grid grid-cols-2 mt-10 gap-8">
            <Card
              image1={<img src={GithubIcon} alt="Github" className="w-1/3  object-contain" />}
              info1={<span className='text-4xl font-sans font-light text-gray-800'>Github/lorishoxhaj6</span>}
              image2={<img src={Gmail} alt="Gmail" className="w-1/3  object-contain" />}
              info2={<span className='text-4xl font-sans font-light text-gray-800'>lorishoxhaj6@gmail.com</span>}
            />

            <Card 
              image1={<img src={GithubIcon} alt="Github" className="w-1/3  object-contain" />}
              info1={<span className='text-4xl font-sans font-light text-gray-800'>Github/mattiadanese</span>}
              image2={<img src={Gmail} alt="Gmail" className="w-1/3  object-contain" />}
              info2={<span className='text-4xl font-sans font-light text-gray-800'>mattiadanese02@gmail.com</span>}
            />  
      </div>
  </div>
      
   
  )
}

export default Contacts
