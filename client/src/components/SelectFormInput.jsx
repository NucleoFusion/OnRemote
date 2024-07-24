import axios from "axios";
import React, { useEffect, useState } from "react";
import SelectOption from "./SelectOption";

function SelectFormInput(props){
    const [resultArr,setResultArr] = useState([]);
    useEffect(() => {
        const getData = async () => {
          await axios.get('http://localhost:3000/get/' + props.name)
          .then(
            response => setResultArr(response.data))
        }
        getData();
      }, [props.name]);    
    return( 
        <div>
            <select name={props.name} id={props.name} className="form-select" aria-label="Default select example">
                {resultArr.map( (obj)=> {
                    return ( 
                        <SelectOption key={obj.id} name={obj.name}/>
                     );
                })}
            </select>
        </div>
     );
}

export default SelectFormInput;