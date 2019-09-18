/**
 * @function 
 */
function drawConsole()
{
    var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("id","console")

        d3.select("#console")
        .selectAll("text")
        .data(Array.from(log))
        .enter()
        .append("text")
        .attr("dy", ".35em")
        .text(function(d){
            return "Time: " + d[1].time
          +"----->" + "Text: " + d[1].text})
        .attr("y", function(d){ return 30* d[0];})
        .attr("id", "consoleText")
}