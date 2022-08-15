import Category from "../category/category.component";
import "./Directory.scss";

function Directory({ categories }) {
  return (
    <div className="directory-container">
      {categories.map((category) => {
        return <Category key={category.id} category={category} />;
      })}
    </div>
  );
}
export default Directory;
