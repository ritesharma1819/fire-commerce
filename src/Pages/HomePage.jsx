import React from 'react'
import Layout from '../Component/Layout'
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../firebase';

function HomePage() {
  const getProduct=async()=>{
    try{
      const user= await getDocs(collection(db,'products'));
      const productArray=[];
      user.forEach((doc)=>{
        const obj ={
          id: doc.id,
          ...doc.data(),
        };
        productArray.push(obj)
        console.log(productArray)
      })
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <Layout>
      <h1>home</h1>

      <button onClick={getProduct}>get from firebase</button>
     
    </Layout>
  )
}

export default HomePage