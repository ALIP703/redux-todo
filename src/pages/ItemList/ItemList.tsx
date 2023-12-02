import Header from "../../component/Header/Header";
import List from "../../component/List/List";
import "./ItemList.css";
function ItemList() {
  return (
    <div className="container">
      <div className="list-container">
        <Header />
        <List />
      </div>
    </div>
  );
}

export default ItemList;
