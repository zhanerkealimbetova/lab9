function scatterPlot () {
// Set Dimensions
const xSize = 500; 
const ySize = 500;
const margin = 40;
const xMax = xSize - margin*2;
const yMax = ySize - margin*2;

// Create Random Points
const numPoints = 100;
const data = [];
for (let i = 0; i < numPoints; i++) {
  data.push([Math.random() * xMax, Math.random() * yMax]);
}

// Append SVG Object to the Page
const svg = d3.select("body")
  .append("svg")
  .attr ("width", 500)
  .attr ("height", 500)
  .append ("g")
  .attr("transform","translate(" + margin + "," + margin + ")");

// X Axis
const x = d3.scaleLinear()
  .domain([0, 500])
  .range([0, xMax]);

svg.append("g")
  .attr("transform", "translate(0," + yMax + ")")
  .call(d3.axisBottom(x));

// Y Axis
const y = d3.scaleLinear()
  .domain([0, 500])
  .range([ yMax, 0]);

svg.append("g")
  .call(d3.axisLeft(y));

// Dots
svg.append('g')
  .selectAll("dot")
  .data(data).enter()
  .append("circle")
  .attr("cx", function (d) { return d[0] } )
  .attr("cy", function (d) { return d[1] } )
  .attr("r", 3)
  .style("fill", "Red");

  d3.csv('titanic.csv').then(data => {
      console.log (data [0].Age)
  });

}

  function pieChart (){
    var svg = d3.select("svg")
    width = svg.attr("width")
    height = svg.attr("height")
    radius = Math.min(width, height) / 2.5;
    
    var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scaleOrdinal([
        'gray', 'green', 'brown', 'orange', 'yellow', 'red', 'purple'
    ]);
    
    var pie = d3.pie().value(function(d) { 
        return d.Age; 
    });
    
    var path = d3.arc()
        .outerRadius(radius - 10).innerRadius(20);
    
    var label = d3.arc()
        .outerRadius(radius).innerRadius(radius - 80);
    d3.csv("titanic.csv").then (
          function (data){
          dataGroups = d3.group (data, d => parseInt(d.Age / 10))
          console.log (dataGroups)
          //{name:'0-10', Age:12}, {name:'10-20', Age:30}
          dataAll = [] 
          for ([key, value] of dataGroups) {
              console.log ("category is: " + key + " contains" + value.length + " entries" );
          dataAll.push ({name:key, Age: value.length})
          }
          
          
          arc = g.selectAll ('.arc')
                .data (pie (dataAll))
                .enter ().append ('g')
                .attr ('class','arc');
          arc.append ('path')
              .attr ('d',path)
              .attr ('fill', function(d) {console.log ("log:"+d.data.name);return color(d.data.name); });      

          arc.append("text").attr("transform", function(d) { 
            return "translate(" + label.centroid(d) + ")"; 
        })         
        .text(function(d) { return d.data.name; })
    });
    svg.append("g")
        .attr("transform", "translate(" + (width / 2 - 120) + "," + 30 + ")")
        .append("text").text("Titanic Ages")
        .attr("class", "title")
}

scatterPlot ();
  