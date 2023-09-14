import "./Card.css";

function CardRecipe({ data, onClick }) {
  return (
    <div className="card-container" onClick={onClick}>
      <div className="content-card">
        <div className="tittle-card">{data.name}</div>
        <div className="desc-card">{data.description}</div>
      </div>
      <div className="image-card">
        <img className="img-card" src={data.image} />
      </div>
    </div>
  );
}

export default CardRecipe;
