import "./Payment.css"
import { useStripe, useElements, CardElement} from "@stripe/react-stripe-js"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useState } from "react"
import { Loader } from "../components/Loader"

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

export const Payment = ({data, setMakePayment}) => {
    
    const [loading, setLoading] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    async function paymentHandler(event){
        event.preventDefault();
        setLoading(true);
        const userid = JSON.parse(localStorage.getItem("user"))._id;

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:"card",
            card:elements.getElement(CardElement)
        })

        if(!error){
            
            try{
                const {id} = paymentMethod;
                
                const response = await axios.post("https://richpanel.cyclic.app/plan/subscribe",{
                    plan:data._id,
                    id,
                    userid
                })
                console.log(response)
                if(response.status === 200){
                    toast.success(response.data.message)
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    setMakePayment(false);
                }else{
                    toast.error(response.data.message)    
                    navigate("/dashboard")
                }
            }catch(err){
                console.log("Error, ", err);
                toast.error("Internal server error")
            }   
        }else{
            console.log("error, ", error)
            toast.error("Unable to make payment")
        }
        setLoading(false);
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
                            <p>{data.type}</p>
                        </div>
                        <div>
                            <p>Billing Cycle</p>
                            <p>{data.billing}</p>
                        </div>
                        <div>
                            <p>Plan price</p>
                            <p>₹ {data.price}
                            {
                                data.billing.toLowerCase() === "monthly" ? 
                                ("/mo")
                                :
                                ("/yr")
                            }</p>
                        </div>
                    </div>
                </div>
            </div>
            {
                loading && <Loader/>
            }
        </div>    
    )
}