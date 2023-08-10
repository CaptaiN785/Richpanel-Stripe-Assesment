import { useEffect, useState } from "react"
import "./Plans.css"
import { monthlyPlans, yearlyPlans } from "./planData";

export const Plans = () => {
    
    const [curPlan, setCurPlan] = useState("Mobile");
    const [plans, setPlans] = useState(monthlyPlans);
    const [type, setType] = useState("Monthly");

    function changeTypeHandler(event){
        const {checked} = event.target;
        
        if(checked){
            setPlans(yearlyPlans);
            setType("Yearly")
        }else{
            setPlans(monthlyPlans);
            setType("Monthly")
        }
    }

    function submitHandler(event){
        event.preventDefault();
        console.log(type, curPlan);
    }

    return (
        <div id="plans-page">
            <form className="plans-container" onSubmit={submitHandler}>
                <div className="plans-header">
                    <h3>Choose the right plan for you</h3>
                </div>

                <div className="plans-div" >
                    <div className="plan-col">
                        <div id="plan-selector">
                            <input 
                                type="checkbox" 
                                name="subType" 
                                id="subType"
                                checked = {type === "Yearly"}
                                onChange={changeTypeHandler}
                                ></input>
                            <label htmlFor="subType" className="plan-type">
                                <p>Monthly</p>
                                <p>Yearly</p>
                            </label>
                        </div>
                        <div>
                            <p>Monthly price</p>
                        </div>
                        <div>
                            <p>Video quality</p>
                        </div>
                        <div>
                            <p>Resolution</p>
                        </div>
                        <div>
                            <p>Devices you can use to watch</p>
                        </div>
                    </div>
                    {
                        plans.map((plan,index)=> {
                            return (
                                <div key={index}>
                                    <input 
                                        className="plan-type-button" 
                                        type="radio" 
                                        name="plan"
                                        id={plan.type}
                                        checked={curPlan === plan.type}
                                        readOnly
                                    ></input>
                                    <label htmlFor={plan.type} className="plan-col">
                                        <div onClick={() => setCurPlan(plan.type)}>
                                            <p>{plan.type}</p>
                                        </div>
                                        <div>
                                            <p>₹ {plan.price}</p>
                                        </div>
                                        <div>
                                            <p>{plan.quality}</p>
                                        </div>
                                        <div>
                                            <p>{plan.resolution}</p>
                                        </div>
                                        <div>
                                            <p></p>
                                            {
                                                plan.devices.map((device, devInd) => {
                                                    return (
                                                        <p key={devInd}>{device}</p>
                                                    )
                                                })
                                            }
                                        </div>
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="plans-footer">
                    <div className="input-control">
                        <div className="button-control">
                            <button type="submit">Next</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}