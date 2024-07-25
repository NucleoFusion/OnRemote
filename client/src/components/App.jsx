import React from "react";
import LogForm from "./LogForm"
import {BrowserRouter as Router,Routes,Route, useParams, Navigate} from 'react-router-dom';
import ItemEntryForm from "./ItemEntryForm";
import LocnCustEntry from "./LocnCustEntry";
import ProdEntry from './ProdEntry';
import ShowDataPage from "./ShowDataPage";

function PassDataToShowData(){
    let {name} = useParams();

    if(name !== 'locations' && name !== 'products' && name !== 'cust'){
        return <Navigate to='/' />;
    }
    return (
        <>
            <ShowDataPage name={name} />
        </>
    );
}

function App(){
    return (
    <div>
        <Router>
            <Routes>
                <Route path="/itemEntry" element={<ItemEntryForm />} />
                <Route path='/' element={<LogForm name="Login" />} />
                <Route path='/add/location' element={<LocnCustEntry entry='Location' />} />
                <Route path='/add/cust' element={<LocnCustEntry entry='Cust' />} />
                <Route path='/add/product' element={<ProdEntry />} />
                <Route path='/show/:name' element={<PassDataToShowData />} />
            </Routes>
        </Router>
    </div>);
}

export default App;