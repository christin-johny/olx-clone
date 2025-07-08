import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Login from '../Modal/Login';
import Sell from '../Modal/Sell';
import Card from '../Card/Card';
import { ItemsContext } from '../Context/Item';
import { fetchFromFireStore } from '../Firebase/Firebase';



const Home = () => {
    const [openModal,setModal] = useState(false);
    

    const toggleModal = ()=>{
        setModal(!openModal);
    }

    const itemCtx = ItemsContext();

    useEffect(()=>{
      const getItems = async () => {
        const datas = await fetchFromFireStore();
        itemCtx?.setItems(datas);
      }
      getItems();
    },[])

    useEffect(()=>{
      console.log('Updated Items: ',itemCtx.items);
    },[])





  return (
    <div>
      <Navbar toggleModal={toggleModal}/>
      <Login toggleModal = {toggleModal}  status = {openModal} />
      <Card items={itemCtx.items || []} />
    </div>
  )
}

export default Home
