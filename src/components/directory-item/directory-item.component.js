import { useNavigate } from "react-router-dom";
import "./DirectoryItem.scss";

function DirectoryItem({ category }) {
  const { imageUrl, title } = category;
  let navigate = useNavigate();

  const clickHandler = () => navigate(`/shop/${title}`);
  return (
    <div onClick={clickHandler} className="directory-item-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="body">
        <h2>{title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  );
}

export default DirectoryItem;
