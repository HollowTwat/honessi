import './App.css';
import {
    Route,
    Routes
} from "react-router-dom";
import Categories from "./pages/Categories/Categories";
import Shoes from "./pages/Shoes/Shoes";
import Clothes from "./pages/Clothes/Clothes";
import Underwear from "./pages/Underwear/Underwear";
import Perfume from "./pages/Perfume/Perfume";
import AddOrEditShoes from "./pages/Shoes/AddOrEditShoes";
import AddOrEditPerfume from "./pages/Perfume/AddOrEditPerfume";
import AddOrEditUnderwear from "./pages/Underwear/AddOrEditUnderwear";
import AddOrEditClothes from "./pages/Clothes/AddOrEditClothes";
import OrderComplete from "./pages/OrderComplete/OrderComplete";
import OrderError from "./pages/OrderComplete/OrderError";
import Ad from "./pages/Ad";


function App() {
    return ( <
        div className = "App" >
        <
        Routes >
        <
        Route index element = { < Categories / >
        }/> 
        <Route path = {
            'shoes'
        }
        element = { < Shoes / >
        }
        /> 
        <Route path = {
            'shoes/addOrEditShoes/:editId?'
        }
        element = { < AddOrEditShoes / >}/> 
        < Route path = {
            'clothes'
        }
        element = { < Clothes / >
        }/> 
        <Route path = {
            'clothes/addOrEditClothes/:editId?'
        }
        element = { < AddOrEditClothes / >
        }/> 
        <Route path = {
            'underwear'
        }
        element = { < Underwear / >
        }/> 
        <Route path = {
            'underwear/addOrEditUnderwear/:editId?'
        }
        element = { < AddOrEditUnderwear / >
        }/> 
        <Route path = {
            'perfume'
        }
        element = { < Perfume / >
        }/> 
        <Route path = {
            'perfume/addOrEditPerfume/:editId?'
        }
        element = { < AddOrEditPerfume / >
        }/> 
        <Route path = {
            'orderComplete'
        }
        element = { < OrderComplete / >
        }/> 
        <Route path = {
            'orderError'
        }
        element = { < OrderError / >
        }/> 
        <Route path = {
            'ad'
        }
        element = { < Ad / >
        }/> 
        </Routes> 
        </div>
    );
}

export default App;