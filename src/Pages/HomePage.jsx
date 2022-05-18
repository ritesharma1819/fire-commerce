import React from 'react'
import Layout from '../Component/Layout'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebase';

function HomePage() {
  const addData =async ()=>{
    try{
       await addDoc(collection(db,"user"), {
         name: 'jellu' , 
         age: '25'
        })
    }
    catch(error){
      console.log(error)
    }
  }
  

  return (
    <Layout>
      <h1>home</h1>

      <button onClick={addData}>add to firebase</button>
     
    </Layout>
  )
}

export default HomePage