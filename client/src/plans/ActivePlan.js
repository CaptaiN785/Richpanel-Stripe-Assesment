import { toast } from "react-toastify";
import "./ActivePlan.css"
import axios from "axios";
import { useState } from "react";
import { Loader } from "../components/Loader";

export const ActivePlan = ({user, changePlan,setUser}) => {

    const [loading, setLoading] = useState(false);

    function changePlanHandler(){
        changePlan(true);
    }

    async function cancelPlan(){
        setLoading(true);
        const response = await axios.post("https://richpanel.cyclic.app/plan/cancel", {
            id: user._id
        });

        if(response.status === 200){
            toast.success("Plan cancelled successfully");
            setUser(response.data.user);
            localStorage.setItem("item", JSON.stringify(response.data.user));
        }else{
            toast.error("Unabel to cancel")
        }
        setLoading(false);
    }

    return (
        <div id="active-plan">
            <div className="plan-container">
                <div className="plan-header">
                    <div>
                        <h3>Current Plan Details</h3>
                        {
                            user.planstatus? 
                                (<span className="active">Active</span>):
                                (<span className="cancelled">Cancelled</span>)
                        }
                    </div>
                    {
                        user.planstatus && (
                            <div>
                                <button onClick={cancelPlan} type="button">Cancel</button>
                            </div>
                        )
                    }
                </div>

                <div className="plan-body">
                    <div>
                        <p>{user.plan.type}</p>
                        <p>{user.plan.devices.join("+")}</p>
                    </div>
                    <div>
                        <h2>₹ {user.plan.price}<span>/{user.plan.billing === "Monthly" ? "mo" : "yr"}</span></h2>
                    </div>
                    <div>
                        <button onClick={changePlanHandler} type="button">Change Plan</button>
                    </div>
                    <div>
                        <p>
                        {
                            user.planstatus ? ("Your subscription has started on " 
                                    + user.startedon
                                    + " and will auto renew on " 
                                    + user.expireson+".") :
                                    (
                                        "Your subscription was cancelled and you will loose access to service on "
                                        + user.expireson + "."
                                    )
                        }
                        </p>
                    </div>
                </div>

            </div>
            {
                loading && <Loader/>
            }
        </div>   
    )
}