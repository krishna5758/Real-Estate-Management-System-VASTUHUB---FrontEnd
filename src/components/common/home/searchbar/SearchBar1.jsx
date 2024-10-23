import { GrLocation } from "react-icons/gr";

const SearchBar1 = ()=>{

    return(
        <div className="cardDiv grid">
            <div className="destinationInput">
                <label htmlFor="city"> Search your destination:</label>
                <div className="input flex">
                    <input type="text" placeholder="Enter city here"/>
                    <GrLocation className="icon"/>
                </div>
            </div>

        </div>
    );

};

export default SearchBar1;