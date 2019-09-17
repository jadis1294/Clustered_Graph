/**
 * @function 
 */
function drawConsole(){
    var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("id","console")

    for(let item of log){
        d3.select("#console")
        .append("text")
        .attr("dy", ".35em")
        .text("Log N.: " + item[0] +"," + "text: " + item[1])
        .attr("y", 100* item[0]/4)
        .attr("id", "consoleText")
    }
}