import Card from "../models/Card";
import "./CardImage.css";

type CardImageProps = {
  card: Card;
  width: string | number;
  isHidden?: boolean;
};

const CardImage = ({ card, width, isHidden = false }: CardImageProps) => {
  const src = isHidden
    ? "/cards/back_blue2.svg"
    : `/cards/${card.filename}.svg`;

  return (
    <div className="card-image">
      <img src={src} alt={card.nameCapitalized} style={{ width }} />
      <div className="card-image-selection" />
    </div>
  );
};

export default CardImage;
