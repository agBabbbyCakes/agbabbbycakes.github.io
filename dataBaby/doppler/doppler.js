const data = [
  { x: 0, y: 0 },
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 1 },
  { x: 4, y: 0 },
  { x: 5, y: 1 },
];

const margin = { top: 10, right: 30, bottom: 30, left: 60 };
const width = 460 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3
  .select("#graph")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const x = d3.scaleLinear().domain([0, 5]).range([0, width]);
const y = d3.scaleLinear().domain([0, 3]).range([height, 0]);

svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

svg.append("g").call(d3.axisLeft(y));

const line = d3
  .line()
  .x((d) => x(d.x))
  .y((d) => y(d.y));

svg
  .append("path")
  .datum(data)
  .attr("class", "line")
  .attr("d", line);


  function updateGraph() {
	// Generate new data
	const newData = data.map((d) => ({ x: d.x, y: Math.random() * 3 }));
  
	// Bind the new data to the line
	const path = svg.selectAll(".line").data([newData]);
  
	// Enter + Update
	path
	  .enter()
	  .append("path")
	  .attr("class", "line")
	  .merge(path)
	  .transition()
	  .duration(1000)
	  .attr("d", line)
	  .style("opacity", 1);
  
	// Exit
	path
	  .exit()
	  .transition()
	  .duration(1000)
	  .style("opacity", 0)
	  .remove();
  }
  
  // Update the graph every 5 seconds
  setInterval(updateGraph, 2500);