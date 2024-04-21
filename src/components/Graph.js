import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Graph = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [chartInstances, setChartInstances] = useState([]);
  const [rowCount, setRowCount] = useState(1); 
  const graphRefs = useRef([]);

  const addGraph = () => {
    if (type && description) {
      const newData = [...data, { type, description, prices: [10, 20, 30, 40, 50] }];
      setData(newData);
      setType('');
      setDescription('');

      const ctx = graphRefs.current[data.length]?.getContext('2d');
      const labels = ['January', 'February', 'March', 'April', 'May'];
      const datasets = newData.map((item) => ({
        label: item.type,
        data: item.prices,
        borderColor: getRandomColor(),
        fill: false,
      }));

      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Price',
              },
            },
          },
        },
      });

      setChartInstances([...chartInstances, newChartInstance]);
    }
  };

  const deleteGraph = (index) => {
    setData(data.filter((_, i) => i !== index));
    const updatedChartInstances = chartInstances.filter((_, i) => i !== index);
    setChartInstances(updatedChartInstances);
  };

  const updatePrice = (index, priceIndex, value) => {

    console.log("index 64",index);
    console.log("priceIndex 65",priceIndex);
    console.log("value 66",value);

    const newData = [...data];
    newData[index].prices[priceIndex] = value;
    setData(newData);
    updateChartInstance(index);
  };

  const updateChartInstance = (index) => {
    const ctx = graphRefs.current[index]?.getContext('2d');
    const labels = ['January', 'February', 'March', 'April', 'May'];
    const datasets = data.map((item) => ({
      label: item.type,
      data: item.prices,
      borderColor: getRandomColor(),
      fill: false,
    }));

    const newChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Price',
            },
          },
        },
      },
    });

    const updatedChartInstances = [...chartInstances];
    updatedChartInstances[index] = newChartInstance;
    setChartInstances(updatedChartInstances);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const newChartInstances = data.map((_, index) => {
      const canvas = graphRefs?.current[index];
      if (!canvas) return null; 
      
      const ctx = canvas?.getContext('2d');
      const labels = ['January', 'February', 'March', 'April', 'May'];
      const datasets = data.map((item) => ({
        label: item.type,
        data: item.prices,
        borderColor: getRandomColor(),
        fill: false,
      }));

  

      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Price',
              },
            },
          },
        },
      });

      return newChartInstance;
    }).filter(chart => chart !== null); 

    setChartInstances(newChartInstances);

    return () => {
      newChartInstances.forEach((chart) => chart?.destroy());
    };
  }, [data]);

  const addRow = () => {
    setRowCount(rowCount + 1);
  };

  return (
    <div className='MainContainer'>
        <h2>Enter the title 'About Oil' and a description to create the graph</h2>
      <div className='inputContainer'>
      
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addGraph}>Add</button>
        {/* <button onClick={addRow}>Add Row</button>  */}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.map((graph, index) => (
          <span key={index} style={{ marginRight: '20px', marginBottom: '20px', flex: '0 0 50%' }}>
            <div>
              <span>{graph.type}</span>
              <span>{graph.description}</span>
              <button onClick={() => deleteGraph(index)}>Delete</button>
              {/* <div>
                {graph.prices?.map((price, priceIndex) => (
                  <input
                    key={priceIndex}
                    type="number"
                    value={price}
                    onChange={(e) => updatePrice(index, priceIndex, parseInt(e.target.value))}
                  />
                ))}
              </div> */}
            </div>
            <canvas ref={(el) => (graphRefs.current[index] = el)} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Graph;
