import {BiCreditCardFront} from "react-icons/bi"
import "./Payment.css"
import { useState } from "react"
import { useStripe, useElements, CardElement} from "@stripe/react-stripe-js"
import axios from "axios"

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#6E6F6E",
			color: "#000",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#6E6F6E" },
		},
		invalid: {
			iconColor: "#f00",
			color: "#f00"
		}
	}
}

export const Payment = ({data}) => {
    
    const stripe = useStripe();
    const elements = useElements();

    async function paymentHandler(event){
        event.preventDefault();

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:"card",
            card:elements.getElement(CardElement)
        })

        if(!error){
            
            try{
                const {id} = paymentMethod;
                
                const response = await axios.post("http://localhost:4000/payment",{
                    amount: data.plan.price,
                    id
                })

                if(response.data.success){
                    // do something
                }

            }catch(err){
                console.log("Error, ", err);
            }   
        }else{
            console.log("error, ", error)
        }
    }

    return (
        
        <div id="payment-page">
            <div className="payment-container">
                <div className="input-details">
                    <div className="payment-header">
                        <h2>Complete Payment</h2>
                        <p>Enter your credit or debit card details below</p>
                    </div>
                    
                        <form className="payment-body">
                            <div className="input-body">
                                <CardElement className="card-element" options={CARD_OPTIONS}/>
                            </div>
                            <div className="payment-btn">
                                <button onClick={paymentHandler}>Confirm Payment</button>
                            </div>
                        </form>
                </div>
                <div className="payment-summary">
                    <div className="summary-header">
                        <h3>Order Summary</h3>
                    </div>
                    <div className="summary-body">
                        <div>
                            <p>Plan Name</p>
                            <p>{data.plan.type}</p>
                        </div>
                        <div>
                            <p>Billing Cycle</p>
                            <p>{data.type}</p>
                        </div>
                        <div>
                            <p>Plan price</p>
                            <p>₹ {data.plan.price}
                            {
                                data.type.toLowerCase() === "monthly" ? 
                                ("/mo")
                                :
                                ("/yr")
                            }</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    )
}