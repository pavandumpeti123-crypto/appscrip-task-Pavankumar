import { useState } from "react";
import "./sideBar.css";
import FilterItem from "../filter items/filterItem";

export default function SideBar() {
    const filterItems = [
        { label: 'IDEAL FOR', value: 'idealFor' },
        { label: 'Occasion', value: 'occasion' },
        { label: 'Work', value: 'work' },
        { label: 'Fabric', value: 'fabric' },
        { label: 'Segment', value: 'segment' },
        { label: 'Suitable For', value: 'suitableFor' },
        { label: 'Raw Materials', value: 'rawMaterials' },
        { label: 'Pattern', value: 'pattern' },
    ];

    const [customizable, setCustomizable] = useState(false);

    const handleCheckboxChange = () => {
        setCustomizable(!customizable);
    };

    return (
        <aside className="sidebar">
            <div className="customize">
                <input
                    type="checkbox"
                    checked={customizable}
                    onChange={handleCheckboxChange}
                />
                <span>Customizable</span>
            </div>
            <div className="filterItems">
                {filterItems.map((item) => (
                    <FilterItem item={item.label} key={item.value} />
                ))}
            </div>
        </aside>
    );
}