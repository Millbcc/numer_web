import { useState } from "react"
import { evaluate } from "mathjs"
import { LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer } from 'recharts'
import axios from "axios"

function Bisection() {
    const [equation,setEquation] = useState("");
    const [xl,setXl] = useState("");
    const [xr,setXr] = useState("");
    const [epsilon,setEpsilon] = useState("");
    const [data,setData] = useState(null);
    function handleSubmit(equation,xl,xr,epsilon) {
        const data = []
        xl = parseFloat(xl)
        xr = parseFloat(xr)
        epsilon = parseFloat(epsilon)
        let xm,xmold,error;
        xm = (xl+xr)/2
        do{
            xmold = xm;
            const fxm = evaluate(equation,{x:xm})
            const fxr = evaluate(equation,{x:xr})
            if(fxr*fxm>0){
                xr = xm;
            }
            else{
                xl = xm;
            }
            xm = (xl+xr)/2
            error = Math.abs((xm-xmold)/xm);
            data.push({
                xm:xm,
                fxm: Math.abs(fxm)
            })

            {console.log(data);}
        }
        while(error>epsilon)
        return data;
    }
    function handleApi() {
        axios.get("http://localhost:3000/api/bisection")
            .then((res) => {
                setEquation(res.data.equation);
                setXl(res.data.xl);
                setXr(res.data.xr);
                setEpsilon(res.data.epsilon);
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return(
        <div>
            <input
                placeholder="equation"
                type="text"
                value={equation}
                style={{width:"100px", margin:"5px"}}
                onChange={(e)=>{
                    setEquation(e.target.value)
                }}
            />
            <input
                placeholder="xl"
                type="number"
                value={xl}
                style={{width:"100px", margin:"5px"}}
                onChange={(e)=>{
                    setXl(e.target.value)
                }}
            />
            <input
                placeholder="xr"
                type="number"
                value={xr}
                style={{width:"100px", margin:"5px"}}
                onChange={(e)=>{
                    setXr(e.target.value)
                }}
            />
            <input
                placeholder="epsilon"
                type="number"
                value={epsilon}
                style={{width:"100px", margin:"5px"}}
                onChange={(e)=>{
                    setEpsilon(e.target.value)
                }}
            />
            <div>
                <button type="button" onClick={(e)=>setData(handleSubmit(equation,xl,xr,epsilon))} style={{width:"100px", margin:"5px"}}>calulate</button>
                <button type="button" onClick={(e)=>handleApi()} style={{width:"100px", margin:"5px"}}>API</button>
            </div>
            {data !== null &&(
            <div style={{ width: 500, height: 300 }}>               
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <XAxis dataKey="xm" />
                        <YAxis />
                        <Tooltip />
                        <Line dataKey="xm" stroke='none' dot={{ r: 5, fill: "red" }} />
                        <Line dataKey="fxm" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            )}

        </div>
    )
}
export default Bisection