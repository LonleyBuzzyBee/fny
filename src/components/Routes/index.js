import React from 'react'
import { Switch } from 'react-router-dom';
import Route from './Route';
import LandingPage from '../LandingPage/Index';
import ItemList from '../Product/ListAllPage/Index';
import Signin from "../UserAuth/Signin";
import SignUp from "../UserAuth/SignUp";
import SignOut from "../UserAuth/SignOut";
import CreateItem from "../AdminOptions/CreateItem";
import ItemListBody from '../Product/ListBodyPage/Index';
import ItemListFace from '../Product/ListFacePage/Index';
import ItemListLips from '../Product/ListLipsPage/Index';
import Checkout from '../UserOptions/Checkout'
import ItemDetail from '../Product/ItemDetails';
import EditItem from '../AdminOptions/EditItem';

export default function Routes() {
  return (
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/All" component={ItemList}/>
        <Route exact path="/Body" component={ItemListBody}/>
        <Route exact path="/Face" component={ItemListFace}/>
        <Route exact path="/Lips" component={ItemListLips}/>
        <Route exact path="/item/:id/edit" component={EditItem}/>
        <Route exact path="/item/:id" component={ItemDetail}/>
        <Route exact path="/SignIn" component={Signin}/>
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/SignOut" component={SignOut} />
        <Route exact path="/Checkout" component={Checkout} />
        <Route exact path="/Create" component={CreateItem} isPrivate/>
      </Switch>
  );
}