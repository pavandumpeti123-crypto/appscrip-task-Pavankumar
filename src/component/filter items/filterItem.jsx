import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { productDataAction } from "../../store/store";
import "./filterItem.css";
import arrowLeft from "../../assets/arrow-left.png";

export default function FilterItem({ item }) {
    const dispatch = useDispatch();
    const [isArrowDown, setIsArrowDown] = useState(true);
    const [selectItems, setSelectItems] = useState([
        { name: 'Men', selected: false },
        { name: 'Women', selected: false },
        { name: 'Baby & Kids', selected: false }
    ]);

    useEffect(() => {
        // Fetch data based on the current selection
        const selectedCategories = selectItems.filter(i => i.selected).map(i => i.name.toLowerCase());

        if (selectedCategories.length > 0) {
            fetchAndUpdateData(selectedCategories);
        } else {
            fetchAllCategories();
        }
    }, [selectItems]);

    const fetchAllCategories = async () => {
        try {
            const { data } = await axios.get("https://fakestoreapi.com/products");
            dispatch(productDataAction.updateData(data));
        } catch (error) {
            console.error('Error fetching all categories:', error);
        }
    };

    const fetchAndUpdateData = async (categories) => {
        try {
            const requests = categories.map(category => 
                axios.get(`https://fakestoreapi.com/products/category/${category}`)
            );
            const responses = await Promise.all(requests);
            const newProductData = responses.flatMap(response => response.data);

            dispatch(productDataAction.updateData(newProductData));
        } catch (error) {
            console.error('Error fetching selected categories data:', error);
        }
    };

    const handleCheckboxChange = (index) => {
        setSelectItems(prevItems => {
            const newItems = [...prevItems];
            newItems[index] = { ...newItems[index], selected: !newItems[index].selected };
            return newItems;
        });
    };

    const toggleArrow = () => {
        setIsArrowDown(prev => !prev);
    };

    const handleUnselectAll = () => {
        setSelectItems(prevItems => prevItems.map(item => ({ ...item, selected: false })));
        fetchAllCategories();
    };

    return (
        <div className="row">
            <div className="row-top">
                <span>{item.toUpperCase()}</span>
                <img
                    className={isArrowDown ? "arrow-down" : "arrow-up"}
                    src={arrowLeft}
                    alt="Toggle"
                    onClick={toggleArrow}
                />
            </div>
            {!isArrowDown && (
                <div className="row-bottom">
                    <span>All</span>
                    <div className="row-select">
                        <span onClick={handleUnselectAll}>Unselect all</span>
                        {selectItems.map((item, idx) => (
                            <div className="checkbox" key={idx}>
                                <input
                                    type="checkbox"
                                    checked={item.selected}
                                    onChange={() => handleCheckboxChange(idx)}
                                />
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}