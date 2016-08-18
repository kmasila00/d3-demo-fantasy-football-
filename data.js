//Quarter backs stats
var DB = [{"name": "Drew Brees","week": "13","yards": "282"}, {"name": "Drew Brees","week": "14","yards": "312"}, {"name": "Drew Brees","week": "15","yards": "341"}, {"name": "Drew Brees","week": "16","yards": "412"}, {"name": "Drew Brees","week": "17","yards": "323"}];
var PR = [{"name": "Philip Rivers","week": "13","yards": "202"}, {"name": "Philip Rivers","week": "14","yards": "263"}, {"name": "Philip Rivers","week": "15","yards": "311"}, {"name": "Philip Rivers","week": "16","yards": "277"}, {"name": "Philip Rivers","week": "17","yards": "228"}];
var TB = [{"name": "Tom Brady","week": "13","yards": "312"}, {"name": "Tom Brady","week": "14","yards": "226"}, {"name": "Tom Brady","week": "15","yards": "267"}, {"name": "Tom Brady","week": "16","yards": "231"}, {"name": "Tom Brady","week": "17","yards": "134"}];

//running backs stats
var AP = [{"name": "Adrian Peterson","week": "13","yards": "18"}, {"name": "Adrian Peterson","week": "14","yards": "69"}, {"name": "Adrian Peterson","week": "15","yards": "63"}, {"name": "Adrian Peterson","week": "16","yards": "104"}, {"name": "Adrian Peterson","week": "17","yards": "67"}];
var DM = [{"name": "Doug Martin","week": "13","yards": "95"}, {"name": "Doug Martin","week": "14","yards": "81"}, {"name": "Doug Martin","week": "15","yards": "91"}, {"name": "Doug Martin","week": "16","yards": "49"}, {"name": "Doug Martin","week": "17","yards": "48"}];
var TG = [{"name": "Todd Gurley","week": "13","yards": "41"}, {"name": "Todd Gurley","week": "14","yards": "140"}, {"name": "Todd Gurley","week": "15","yards": "48"}, {"name": "Todd Gurley","week": "16","yards": "83"}, {"name": "Todd Gurley","week": "17","yards": "0"}];

//wide receivers stats
var JJ = [{"name": "Julio Jones","week": "13","yards": "93"}, {"name": "Julio Jones","week": "14","yards": "88"}, {"name": "Julio Jones","week": "15","yards": "118"}, {"name": "Julio Jones","week": "16","yards": "178"}, {"name": "Julio Jones","week": "17","yards": "149"}];
var AB = [{"name": "Antonio Brown","week": "13","yards": "118"}, {"name": "Antonio Brown","week": "14","yards": "87"}, {"name": "Antonio Brown","week": "15","yards": "189"}, {"name": "Antonio Brown","week": "16","yards": "61"}, {"name": "Antonio Brown","week": "17","yards": "187"}];
var DH = [{"name": "Deandre Hopkins","week": "13","yards": "88"}, {"name": "Deandre Hopkins","week": "14","yards": "52"}, {"name": "Deandre Hopkins","week": "15","yards": "94"}, {"name": "Deandre Hopkins","week": "16","yards": "117"}, {"name": "Deandre Hopkins","week": "17","yards": "89"}];


//Draws the axes
function drawChart(type, num){

    //Setting dimensions for the chart
    var WIDTH = 1000,
        HEIGHT = 500,
        MARGINS = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        },

        //Setting the axes units
        xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([13, 17]),
        yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, num]),

        //defining the axes
        xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom"),
        yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

    //drawing the X axis
    type.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis);

    //drawing the y axis
    type.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);

}

//charts the dots and connects them with a line
function lineDot(type, player, color, num){

    //need to redefine dimensions to plot points and draw lines
    var WIDTH = 1000,
        HEIGHT = 500,
        MARGINS = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        },
        xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([13, 17]),
        yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, num]),

        //defining tooltip - used to create box when hovering over points
        tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    //generate the line
    var lineGen = d3.svg.line()
            .x(function(d) {
                return xScale(d.week);
            })
            .y(function(d) {
                return yScale(d.yards);
            });

    //draw line
    type.append('svg:path')
        .attr('d', lineGen(player))
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .attr('fill', 'none');

    //draw dot
    type.selectAll("dot")
        .data(player)
      .enter().append("circle")
        .attr("r", 6)
        .attr("cx", function(d) { return xScale(d.week); })
        .attr("cy", function(d) { return yScale(d.yards); })
        //defining hover functionality
        .on("mouseover", function(d) {
            tooltip.transition()
               .duration(200)
               .style("opacity", .9);
            tooltip.html(d["name"] + "<br/> Week: " + d.week 
            + "<br/> Yards: " + d.yards)
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
            })
        .on("mouseout", function(d) {
            tooltip.transition()
               .duration(500)
               .style("opacity", 0);
        });

}