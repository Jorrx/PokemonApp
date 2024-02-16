import { useParams } from 'react-router-dom'
import PokemonItemInfo from '../components/PokemonItemInfo'



const PokimonItemPage = () => {
  const { name }: string = useParams()


  console.log(name)
  return (
    <div>

        <PokemonItemInfo name={name} />
    </div>
  )
}

export default PokimonItemPage
