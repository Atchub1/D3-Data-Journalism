// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select the scatter ID, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Load data from data.csv  
d3.csv("../../assets/data/data.csv")
  .then(function(riskData) {
    console.log(riskData[0]);    
    

    // Cast values to integers
    riskData.forEach(function(data) {
      data.age = +data.age;
      data.obesity = +data.obesity;

    });


    // Define the x and y scales
    var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(riskData, data => data.age))
    .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
    .domain(d3.extent(riskData, data => data.obesity))
    .range([chartHeight, 0]);

    
    // Create the chart's axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);


    // Append an SVG group element to the chartGroup, create the left axis inside of it
    chartGroup.append("g")
      .classed("axis", true)
      .call(leftAxis);

   // Add the text label for the y axis

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Obesity");  


    // Append an SVG group element to the chartGroup, create the bottom axis inside of it
    // Translate the bottom axis to the bottom of the page
    chartGroup.append("g")
      .classed("axis", true)
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);

    // Add the text label for the x axis
    svg.append("text")             
        .attr("transform",
              "translate(" + (chartWidth/2) + " ," + 
                  (chartHeight + margin.top + 45) + ")")
        .style("text-anchor", "middle")
        .text("Age");

      


    // append circles to data points
    var circlesGroup = chartGroup.selectAll("circle")
      .data(riskData)
      .enter()
      .append("circle")
      .attr('cx', data => xLinearScale(data.age))
      .attr('cy', data => yLinearScale(data.obesity))
      .attr("r", "8")
      .attr("fill", "red");

    // append text to the circles
    chartGroup.selectAll('text')
      .data(riskData)
      .enter()
      .append('text')
      .text(data => data.abbr)
      .attr('x', data => xLinearScale(data.age))
      .attr('y', data => yLinearScale(data.obesity))
      .attr('fill', 'black')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '15px');
     
  });