import { useState } from "react"
import Searchbar from "./Searchbar";
import "./Searchbar.css";

const MainSearchBar = () => {

    const [results, setResults] = useState([]);

    const handleSearch = async (searchParams) => {
        const { city, area, type } = searchParams;
        try {
            const response = await fetch(
                `http://localhost:8088/api/property/search?city=${city}&area=${area}&type=${type}`
            );

            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    return (
      
            <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                <div className="search-bar-container">
                <Searchbar onSearch={handleSearch} />
                </div>
                <div>
                    <h3>Results:</h3>
                    <ul>
                        {results.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
            </div>
        </div>
    );

};

export default MainSearchBar;