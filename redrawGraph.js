/**
 * @function
 * @description Redraw the graph everytime it changes 
 */
function redraw(){
    let clus=Array.from(clusteredGraph.tree.clusters.values());
    
    d3.select("#c_cluster")
    .selectAll("circle")
    .data(clus)
    .remove()

    d3.select("#c_cluster")
    .selectAll("circle")
    .data(clus)
    .enter()
    .append("circle")
    .attr("r", function(d){ return d.r;})
    .attr("id","cluster")
    .attr("cx", function(d){ return d.x;})
    .attr("cy", function(d){return d.y})
    .attr("fill", function(d){return d.fill})
    .attr("key", function(d){return d.key});
    let clustersLevelOne=new Set();
    for (let item of clusteredGraph.tree.clusters){
        if(item[1].level==1) {
            clustersLevelOne.add(item[1])
        } 

    }
    force(clustersLevelOne);
}
function redrawNodes(){
    let nodes=Array.from(clusteredGraph.graph.nodes.values());
    console.log(nodes)
    d3.select("#c_node")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .transition()
    .duration(800)
    .attr("r",radiusNode)
    .attr("id", "nodo")
    .attr("cx", function(d){ return d.x;})
    .attr("cy", function(d){return d.y})
    .attr("key", function(d){return d.key});
    //nodesForce(nodes)
}

function nodesForce(){
    
}

/**
 * @function
 * @description funcion for start the collision and attraction force everytime the graph changes 
 */
function force(clustersLevelX){
    simulationIntraClusters = d3.forceSimulation(Array.from(clustersLevelX.values()))
    .force("collide", d3.forceCollide().radius(function(d) {return d.r;}).iterations(20))
    .on("tick", function(){
        d3.select("#c_cluster")
        .selectAll("circle")
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        })
    });
    for (let item of clustersLevelX){
            let x1=item.x;
            let y1=item.y;
        if(item.cildren.size!=0){
            let itemcildren=new Set()
            for (let figlioid of item.cildren) {
                if(clusteredGraph.tree.clusters.get(figlioid).level==item.level+1)
                itemcildren.add(clusteredGraph.tree.clusters.get(figlioid))
            }
            console.log(item.x)
                  simulationIntraClusters = d3.forceSimulation(Array.from(itemcildren))
                    //.force("center",d3.forceCenter([item.x, item.y]))
                    .force("collide", d3.forceCollide().radius(function(d) {return d.r;}).iterations(20))
                    .on("tick", function(){
                    d3.select("#c_cluster")
                    .selectAll("circle")
                    .attr("cx", function(d) {
                        return d.x;
                    })
                    .attr("cy", function(d) {
                        return d.y;
                    })
                });

                // let figlio=clusteredGraph.tree.clusters.get(figlioid)
                // itemcildren.add(figlio)
                // let xfiglio= figlio.x;
                // let yfiglio= figlio.y;
                // let xIndexFiglio=x1-xfiglio;
                // let yIndexFiglio= y1-yfiglio;
                // let dPadreFiglio=Math.sqrt(Math.pow(xIndexFiglio,2)+Math.pow(yIndexFiglio,2));
                // if(dPadreFiglio>=item.r+ figlio.r){
                //     let difference=item.r+figlio.r-dPadreFiglio;
                //     figlio.x-=difference/2;
                //     figlio.y-=difference/2;
                // }
            }
        }
        
    }


