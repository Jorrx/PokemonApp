
const PokemonItemImg = ({url , ...props}) => {
    return (
        <div className="pokemon__Item__Image" {...props}>
            <img src={url} alt="Pokimon Img" />
        </div>
    );
};

export default PokemonItemImg;
