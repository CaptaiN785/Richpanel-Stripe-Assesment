import { Elements } from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import {monthlyPlans} from "../plans/planData"
import { Payment } from "./Payment"

const PUBLIC_KEY = "pk_test_51NdIr4SGszO8BCvR7yLl5p77wSFwgmK5xBudrXhaa9phgHLHbNX4ynurTm2EY5s5J2D1pEAoRVOpUqquMagt18pI00HCungTQA"
const stripeTestPromise = loadStripe(PUBLIC_KEY)

const data = {
    type: "Monthly",
    plan: monthlyPlans[1],
}

export const PaymentContainer = () => {

    return (
        <Elements stripe={stripeTestPromise} >
            <Payment data={data}/>
        </Elements>    
    )

} 

 