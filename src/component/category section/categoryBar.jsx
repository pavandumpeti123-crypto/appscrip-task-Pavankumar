import "./categoryBar.css";
import arrowLeft from "../../assets/arrow-left.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { productDataAction } from "../../store/store";

export default function CategoryBar({ setShowSidebar }) {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("RECOMMENDED");

  const dispatch = useDispatch();

  const categories = [
    "RECOMMENDED",
    "NEWEST FIRST",
    "POPULAR",
    "PRICE : HIGH TO LOW",
    "PRICE : LOW TO HIGH"
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsSelectVisible(false);

    switch (category) {
      case 'PRICE : LOW TO HIGH':
        dispatch(productDataAction.lowToHigh());
        break;
      case 'PRICE : HIGH TO LOW':
        dispatch(productDataAction.highToLow());
        break;
      default:
        dispatch(productDataAction.rearrange());
        break;
    }
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(prev => !prev);
    setShowSidebar(prev => !prev);
  };

  const toggleSelectVisibility = () => {
    setIsSelectVisible(prev => !prev);
  };

  return (
    <section className="categoryBar">
      <span className="itemCount">3425 Items</span>
      <button className={`filterToggle ${isFilterVisible ? 'hide' : 'show'}`} onClick={toggleFilterVisibility}>
        <img src={arrowLeft} alt="Toggle Filter" />
        <span>{isFilterVisible ? 'HIDE FILTER' : 'SHOW FILTER'}</span>
      </button>
      <div className="selectContainer">
        <div className="selectHeader" onClick={toggleSelectVisibility}>
          <span className="selectedCategory">{selectedCategory}</span>
          <img src={arrowLeft} alt="Toggle Select" className={isSelectVisible ? 'rotated' : ''} />
        </div>
        {isSelectVisible && (
          <div className="selectDropdown">
            {categories.map((category, idx) => (
              <button
                key={idx}
                className={`categoryOption ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}