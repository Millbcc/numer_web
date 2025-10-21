import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import axios from 'axios'
function LinearRegression() {
  const [data, setData] = useState([])
  const [size, setSize] = useState("")
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [gx, setGx] = useState([]);
  function addRow(size) {
    size = parseFloat(size);
    if (data.length < size) {
      for (let i = data.length; i < size; i++) {
        setData([...data, { x: "", y: "" }])
      }
    }
    else {
      for (let i = data.length; i > size; i--) {
        setData([...data.slice(0, -1)])
      }
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    const [temp_a1, temp_a2] = regression(data, size)
    setA1(temp_a1)
    setA2(temp_a2)

  }
  function handleGx() {
    const graph = [];
    let k = 0;
    for (let i = parseFloat(data[0].x); i <= parseFloat(data[size - 1].x); i++) {
      if (i === parseFloat(data[k].x)) {
        graph.push({ x: i, y: a1 + a2 * i, xdata: data[k].x, ydata: data[k].y });
        k++
      }
      else {
        graph.push({ x: i, y: a1 + a2 * i });
      }

    }
    setGx(graph);
    setY(a1 + a2 * x);
    console.log(graph);

  }
  function handleApi() {
    axios.get("http://localhost:3000/api/linear_regression")
      .then((res) => {
          setData(res.data);
          setSize(res.data.length);
          console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function regression(data, size) {
    size = parseFloat(size);
    const x = Array(2).fill(0);
    const y = Array(2).fill(0);
    for (let i = 0; i < 2; i++) {
      x[i] = Array(2).fill(0);
      for (let j = 0; j < 2; j++) {
        if (i === 0 && j === 0) {
          x[i][j] = size;
          for (let k = 0; k < size; k++) {
            y[i] += parseFloat(data[k].y)
          }
        }
        else {
          if (i === 0 || j === 0) {
            for (let k = 0; k < size; k++) {
              x[i][j] += parseFloat(data[k].x)
            }
          }
          else {
            for (let k = 0; k < size; k++) {
              x[i][j] += parseFloat(data[k].x) * parseFloat(data[k].x)
              y[i] += parseFloat(data[k].x) * parseFloat(data[k].y)
            }
          }

        }
      }
    }
    console.log(x);
    console.log(y);
    //cramer
    let a1, a2;
    let detA = x[0][0] * x[1][1] - x[0][1] * x[1][0];
    a1 = (y[0] * x[1][1] - y[1] * x[0][1]) / detA;
    a2 = (y[1] * x[0][0] - y[0] * x[1][0]) / detA
    console.log("detA:", detA);
    console.log("a1:", a1);
    console.log("a2:", a2);
    return [a1, a2];
  }
  return (
    <form onSubmit={handleSubmit}>
      <label style={{ margin: "5px" }}>n = </label>
      <input
        type="number"
        value={size}
        onChange={e => { setSize(e.target.value) }}
        style={{ width: "100px", margin: "5px" }}
      />
      {addRow(size)}
      {data.map((row, rowIndex) =>
        <div key={rowIndex}>
          <input
            type="number"
            value={row.x}
            placeholder={`x${rowIndex + 1}`}
            style={{ width: "100px", margin: "5px" }}
            onChange={e => {
              const newData = [...data];
              newData[rowIndex].x = e.target.value;
              setData(newData);
            }}
          />
          <input
            type="number"
            value={row.y}
            placeholder={`y${rowIndex + 1}`}
            style={{ width: "100px", margin: "5px" }}
            onChange={e => {
              const newData = [...data];
              newData[rowIndex].y = e.target.value;
              setData(newData);
            }}
          />
        </div>
      )}
      <button type="submit" style={{ width: "100px", margin: "5px" }}>Calculate</button>
      <button type="button" style={{ width: "100px", margin: "5px" }} onClick={(e) => handleApi()}>API</button>
      {a1 !== "" && (
        <div>
          <p>a1 :{a1}</p>
          <p>a2 :{a2}</p>
          <label>input x : </label>
          <input
            type="number"
            value={x}
            onChange={e => { setX(e.target.value) }}
          />
          <button type="button" onClick={(e) => handleGx()}>Find Y</button>
        </div>
      )}

      {y !== "" && (
        <div>
          <p>y aprroximately = <b>{y}</b></p>
          <div style={{ width: 500, height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={gx}>
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <Line dataKey="ydata" stroke='none' dot={{ r: 5, fill: "red" }} />
                <Line dataKey="y" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}


    </form>
  )
}

export default LinearRegression