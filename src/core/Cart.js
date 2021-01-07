import React,{useState,useEffect} from 'react'
import {Form,Button,Alert} from 'react-bootstrap'
import Base from "./Base"

export default function Cart() {

    const [CartProducts, setCartProducts] = useState([])


    const ProductsInCart=()=>{
        if(typeof window!== undefined){
            if (localStorage.getItem("cart")) {
                return JSON.parse(localStorage.getItem("cart"));
              }
            }
    }

    useEffect(() => {
        let cart = ProductsInCart();
        setCartProducts(cart)
    }, [])
    
    const removeItemFromCart = (productId) => {
        let cart = []
        if (typeof window !== undefined) {
            if (localStorage.getItem("cart")) {
              cart = JSON.parse(localStorage.getItem("cart"));
            }
            cart.map((product,index) => {
            if(cart[index].p_id === productId){
                cart.splice(index,1)
            }
        });
        localStorage.setItem("cart",JSON.stringify(cart));
        }
        let cartprod = ProductsInCart();
        setCartProducts(cartprod)
    }

    const Price = () => {
        let cart = ProductsInCart();
        let n = cart.length;
        let amt=0
        for(let i=0;i<n;i++){
            amt = amt + (cart[i].unit_price * cart[i].count)
        }
        return amt
    }



    return (
       <Base title="Cart" description="Happy Shopping">
           <div className="row d-flex justify-content-around">
               <div className="col-xs-12 col-md-6">
                   {CartProducts && CartProducts.map((product,index)=>{
                       return(
                              <div key={index}>
                              <div className="row mb-4">
                                  <div className="col-md-5 col-lg-3 col-xl-3">
                                    <div className="rounded mb-3 mb-md-0">
                                      <img className="img-fluid w-100" src={product.image} alt="Sample"></img>
                                    </div>
                                  </div>
                                  <div className="col-md-7 col-lg-9 col-xl-9">
                                    <div>
                                      <div className="d-flex justify-content-between">
                                        <div>
                                          <h5>{product.p_name}</h5>
                                          <p className="mb-3 text-muted text-uppercase small">{product.p_name}</p>
                                          <p className="mb-2 text-muted text-uppercase small">Description: {product.description}</p>
                                        </div>
                                        <div>
                                          <div className="mb-0 w-100">
                                            <input className="quantity" min="1" name="quantity" value={product.count} type="number"></input>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                          <button type="btn btn-light" onClick={()=>{
                                              removeItemFromCart(product.p_id)
                                          }}><i className="fa fa-trash mr-1"></i> Remove item </button>
                                        </div>
                                        <p className="mb-0"><span><strong id="summary">₨ {product.unit_price}</strong></span></p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                          </div>
                       )
                   })}
                   
               </div>
               
               <div className="col-md-4 h-25 jumbotron">
                        <h2>Total Amount: ₨{Price()}</h2>
                       <Form>
                        <Form.Group isRequired>
                                <Form.Label>Enter Address</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Button variant="success" type="submit">Check out</Button>
                        </Form>
                       
                </div>
           </div>

       </Base>
    )
}