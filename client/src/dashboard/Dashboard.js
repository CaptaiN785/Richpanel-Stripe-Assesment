import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ActivePlan} from "../plans/ActivePlan";
import { Plans} from "../plans/Plans";
import { useEffect } from "react";
import { useState } from "react";
import {PaymentContainer} from "../payment/PaymentContainer"


export const Dashboard = () => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [makePayment, setMakePayment] = useState(false);
    const [choosenPlan, setChoosePlan] = useState(null);
    const [changePlan, setChangePlan] = useState(false);
    
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        console.log(loggedInUser);
        if(!loggedInUser){
            toast.error("Please login first");
            navigate("/login");
        }
        setUser(loggedInUser);
    },[makePayment])

    function logout(){
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    }

    return (
        <div>
            <div className="logout">
                <button onClick={logout} type="button">Logout</button>
            </div>
            {   
                makePayment ? ((<PaymentContainer plan={choosenPlan} setMakePayment={setMakePayment}/>)) :
                ((changePlan ||(user && !user.plan)) ? (<Plans
                        changePlan={setChangePlan}
                        setMakePayment={setMakePayment}
                        setChoosePlan={setChoosePlan}
                />) : user && user.plan && <ActivePlan user={user} setUser={setUser} changePlan={setChangePlan}/>)
            }
        </div>    
    )
}