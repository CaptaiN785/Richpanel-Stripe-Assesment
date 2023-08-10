import { useEffect, useState } from "react"
import "./Plans.css"
import axios from "axios";
import { Loader } from "../components/Loader";

export const Plans = ({setChoosePlan, setMakePayment, changePlan}) => {
    
    const [curPlan, setCurPlan] = useState();
    const [plans, setPlans] = useState(null);
    const [type, setType] = useState("Monthly");
    const [allPlan, setAllPlan] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [loading, setLoading] = useState(true);

    async function changeType(){
        setLoading(true);
        let data = [];
        allPlan.forEach(plan => {
            if(plan.billing === type){
                data.push(plan);
            }
        })
        setPlans(data);
        setCurPlan(data[0]);
        setLoading(false);
    }

    async function loadData() {
        setLoading(true);
        try{
            const res = await axios.get("https://richpanel.cyclic.app/plan")
            console.log(res);
            setAllPlan(res.data.data);
        }catch(err){
            console.log("Error while loading data, ", err);
        }
        setLoading(false);
    }

    useEffect(() => {
        if(!dataLoaded){
            loadData();
            setDataLoaded(true);
        }
    }, [])

    useEffect(() => {
        changeType();
    }, [type, allPlan])

    function changeTypeHandler(event){
        const {checked} = event.target;
        if(checked){
            setType("Yearly");
        }else{
            setType("Monthly");
        }
    }

    function submitHandler(event){
        event.preventDefault();
        console.log(curPlan);
        setChoosePlan(curPlan);
        changePlan(false);
        setMakePayment(true);
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
                        loading ? (<Loader/>) : plans?.map((plan,index)=> {
                            return (
                                <div key={index}>
                                    <input 
                                        className="plan-type-button" 
                                        type="radio" 
                                        name="plan"
                                        id={plan.type}
                                        checked={curPlan.type === plan.type}
                                        readOnly
                                    ></input>
                                    <label htmlFor={plan.type} className="plan-col">
                                        <div onClick={() => setCurPlan(plan)}>
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
            { 
                loading && <Loader/>
            }
        </div>
    )
}