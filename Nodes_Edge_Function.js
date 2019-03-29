///////////////////////    NEW AND EDIT NODE     /////////////////////////////////////////
function newNode(coords) {
    var newData = {
        x: Math.round(coords[0]), // Takes the pixel number to convert to number
        y: Math.round(coords[1]),
        r: radiusNode
    };
    nodes.push(newData); // Push data to our array
    d3.select("#c_node")
        .selectAll("circle") // For new circle, go through the update process
        .data(nodes)
        .enter()
        .append("circle")
        .transition()
        .duration(800)
        .attr("cx",function(d) {
        return d.x;
    })
        .attr("cy",function(d) {
        return d.y;
    })
        .attr("r",function(d) {
        return d.r;
    })
        .attr("id", "nodo")
    d3.select("#c_node")
        .selectAll("circle")
        .on("click", function() {
            if (crea_archi == true) {
                let smallRad = d3.select(this).attr("r")
                d3.select(this)
                    .transition()
                    .duration(1000)
                    .attr("r", smallRad * 1.5)
                var puntoInizialeX = d3.select(this).attr("cx");
                var puntoInizialeY = d3.select(this).attr("cy");
                line = d3.select("#c_edge")
                    .append("line")
                    .attr("x1", puntoInizialeX)
                    .attr("y1", puntoInizialeY)
                    .attr("x2", puntoInizialeX)
                    .attr("y2", puntoInizialeY)
                    .attr("id", "edge")
                d3.select("#c_node").selectAll("circle").on("click", fineArco)

            }
        });
}
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////7
//////////////////////////    Archi     /////////////////////////////////////////////////

function fineArco() {
    var puntoFinaleX = d3.select(this).attr("cx");
    var puntoFinaleY = d3.select(this).attr("cy");
    let smallRad = d3.select(this).attr("r")
    d3.select(this)
        .transition()
        .duration(1000)
        .attr("r", smallRad * 1.5)
    line.attr("x2", puntoFinaleX)
        .attr("y2", puntoFinaleY);
    d3.select("#c_node").selectAll("circle")
        .transition()
        .duration(1000)
        .attr("r", 9)
    d3.select("#c_node").selectAll("circle").on("click", function() {
        if (crea_archi == true) {
            let smallRad = d3.select(this).attr("r")
            d3.select(this)
                .transition()
                .duration(1000)
                .attr("r", smallRad * 1.5)
            var puntoInizialeX = d3.select(this).attr("cx");
            var puntoInizialeY = d3.select(this).attr("cy");
            line = d3.select("#c_edge")
                .append("line")
                .attr("x1", puntoInizialeX)
                .attr("y1", puntoInizialeY)
                .attr("x2", puntoInizialeX)
                .attr("y2", puntoInizialeY)
                .attr("id", "edge")
            d3.select("#c_node").selectAll("circle").on("click", fineArco)
        }
    });
}

function restart() {
    d3.select("#c_node")
        .selectAll("circle")
        .transition()
        .duration(1000)
        .attr("r", 9)
    nodoCliccato = false;
}
/////////////////////////////////////////////////////////////////////////////////////////