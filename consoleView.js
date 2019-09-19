/**
 * @function
 * @returns {void} 
 * @description create the console and the text of the last operation in the editor
 */
function drawConsole()
{
    var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("id","console")
    d3.select("#console")
    .append("line")
    .attr("x1",w/2)
    .attr("x2",w/2)
    .attr("y1",0)
    .attr("y2",h)
    .attr("id", "line")


        d3.select("#console")
        .selectAll("text")
        .data(Array.from(log))
        .enter()
        .append("text")
        .attr("dy", ".35em")
        .text(function(d){
            return "Time: " + d[1].time
          +"----->" + "Text: " + d[1].text})
        .attr("y", function(d){ return 20* d[0];})
        .attr("x", 20)
        .attr("id", "consoleText")

}