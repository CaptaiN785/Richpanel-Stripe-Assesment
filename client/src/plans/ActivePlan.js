import "./ActivePlan.css"
import { yearlyPlans } from "./planData"

const data = {
    type: "Yearly",
    plan: yearlyPlans[1],
    startedOn: "Jul 11th, 2022",
    expiresOn: "Jul 12th, 2023",
    status: "active"
}

export const ActivePlan = () => {


    return (
        <div id="active-plan">
            <div className="plan-container">
                <div className="plan-header">
                    <div>
                        <h3>Current Plan Details</h3>
                        {
                            data.status === "active" ? 
                                (<span className="active">Active</span>):
                                (<span className="cancelled">Cancelled</span>)
                        }
                    </div>
                    {
                        data.status === "active" && (
                            <div>
                                <button type="button">Cancel</button>
                            </div>
                        )
                    }
                </div>

                <div className="plan-body">
                    <div>
                        <p>{data.plan.type}</p>
                        <p>{data.plan.devices.join("+")}</p>
                    </div>
                    <div>
                        <h2>₹ {data.plan.price}<span>/{data.type === "Monthly" ? "mo" : "yr"}</span></h2>
                    </div>
                    <div>
                        <button type="button">Change Plan</button>
                    </div>
                    <div>
                        <p>
                        {
                            data.status === "active" ? ("Your subscription has started on " 
                                    + data.startedOn 
                                    + " and will auto renew on " 
                                    + data.expiresOn+".") :
                                    (
                                        "Your subscription was cancelled and you will loose access to service on "
                                        + data.expiresOn + "."
                                    )
                        }
                        </p>
                    </div>
                </div>

            </div>
        </div>   
    )
}