import React from "react";
import LogForm from "./LogForm"
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import ItemEntryForm from "./ItemEntryForm";
import LocnCustEntry from "./LocnCustEntry";

function App(){
    return (
    <div>
        <Router>
            <Routes>
                <Route path="/itemEntry" element={<ItemEntryForm />} />
                <Route path='/' element={<LogForm name="Login" />} />
                <Route path='/add/location' element={<LocnCustEntry entry='Location' />} />
                <Route path='/add/cust' element={<LocnCustEntry entry='Cust' />} />
            </Routes>
        </Router>
    </div>);
}

export default App;