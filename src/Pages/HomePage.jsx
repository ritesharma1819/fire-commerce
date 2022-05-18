import React,{useEffect, useState} from 'react'
import Layout from '../Component/Layout'
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../firebase';

function HomePage() {

  const [product, setProduct]=useState([])
  useEffect(()=>{
    getProduct()
  },[])

 

  const getProduct=async()=>{
    try{
      const user= await getDocs(collection(db,'products'));
      const productArray=[];
      user.forEach((doc)=>{
        const obj ={
          id: doc.id,
          ...doc.data(),
        };
        productArray.push(obj);
      })
      setProduct(productArray)
    }
    catch(error){
      console.log(error)
    }
  }
  

  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          {product.map((product,i)=>{
            return (
              <div key={i} className='col-md-4 text-center '>
                <div className='m-2 p-1 product'>
                  <p>{product.name}</p> 
                  <img className='product_img' src={product.imageUrl} alt='' />
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </Layout>
  )
}

export default HomePage