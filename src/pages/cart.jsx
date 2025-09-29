import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { addToCart, getTotal, loadCart } from "../utils/cart"
import { BiTrash } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CartPage(){
    const [cart, setCart] = useState(loadCart());
  
    return(
  <div className="w-full h-calc([100vh-100px]) pt-[25px] bg-primary flex flex-col justify-center items-center">
          <div className="w-[600px] flex flex-col gap-4">
            {
                cart.map((item,index)=>{
                   return( 
                 <div key={index} className="w-full h-[120px] bg-white flex relative items-center"> 
                 <button  className="absolute font-bold text-red-800 right-[-40px] text-2xl rounded-full aspect-square hover:bg-red-500 hover:text-white p-[5px]" onClick={
                    ()=>{
                        addToCart(item, -item.quantity);
                    }
                 } ><BiTrash/></button>
 <img className="h-full aspect-square object-cover" src={item.image} />
          <div className=" w-[250px] h-full  flex flex-col pl-[5px] pt-[10px] ">
                     <h1 className="text-lg font-semibold w-full text-wrap">{item.name}</h1>
          <span className="text-secondary text-sm ">{item.productID}</span>
          
           </div>
           <div className="w-[100px] h-full   flex flex-col justify-center items-center">

            <CiCircleChevUp className="text-3xl" onClick={
                ()=>{
                    addToCart(item,1);
                    setCart(loadCart());
                }
            }/>
            <span className="font-semibold text-4xl">{item.quantity}</span>
            <CiCircleChevDown className="text-3xl"onClick={
                ()=>{
                    addToCart(item,-1);
                    setCart(loadCart());
                }}/>
           </div>

           <div className="w-[150px] h-full flex flex-col ">
             {
                item.labelledPrice>item.price&&
                <span className=" w-full text-secondary  text-lg text-right mt-[10px] line-through pr-[10px]">LKR {item.labelledPrice.toFixed(2)}</span>
             }
               <span className=" w-full text-accent text-2xl text-right mt-[10px] pr-[10px]">LKR {item.price.toFixed(2)}</span>

           </div>
                 </div>


                   )
                  })
            }
      <div  className="w-full h-[120px] bg-white flex justify-end items-center relative p-2  "> 
        <Link state={cart} to="/checkout" className=" min-w-[150px] h-[50px] absolute pt-[15px] px-6 py-3 font-bold text-white left-0 text-2xl bg-accent aspect-square hover:bg-accent/80  pb-[45px] justify-center items-center ">proceed to checkout</Link>

       
        <div className="  h-[50px] pr-[5px] ">
     <span className="text-accent text-2xl text-right">Total :LKR {getTotal().toFixed(2)}</span>
        </div>
      </div>
          </div>
  </div>
    )
}