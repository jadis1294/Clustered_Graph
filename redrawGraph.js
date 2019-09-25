/**
 * @function
 * @returns {void}
 * @description redrawClusters the graph everytime it changes 
 */


function redraw() {
    console.log("sono entrato in redraw")
    let clus = Array.from(clusteredGraph.tree.clusters.values()),
        nodes = Array.from(clusteredGraph.graph.nodes.values()),
        edges = Array.from(clusteredGraph.graph.edges.values());

    d3.select("#c_cluster")
        .selectAll("circle")
        .data(clus)
        .remove()

    d3.select("#c_cluster")
        .selectAll("circle")
        .data(nodes)
        .remove()

    d3.select("#c_edge")
        .selectAll("path")
        .data(edges)
        .remove()

        d3.select("#c_text")
        .selectAll("text")
        .remove()


        d3.select("#c_cluster")
        .selectAll("circle")
        .data(clus)
        .enter()
        .append("circle")
        .attr("r", function(d) {
            return d.r;
        })
        .attr("id", "cluster")
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        })
        .attr("fill", function(d) {
            return d.fill;
        })
        .attr("key", function(d) {
            return d.key
        });
    d3.select("#c_node")
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", radiusNode)
        .attr("id", "nodo")
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        })
        .attr("key", function(d) {
            return d.key
        });

          // adds the links between the nodes
    d3.select("#c_edge").selectAll(".edge")
          .data( edges)
          .enter().append("path")
          .attr("class", "edge")
          .attr("d", function(d) {
             return "M" + clusteredGraph.graph.nodes.get(d.source).x + "," 
                + clusteredGraph.graph.nodes.get(d.source).y 
                + "C" + clusteredGraph.graph.nodes.get(d.source).x  + "," 
                + (clusteredGraph.graph.nodes.get(d.source).y 
                + clusteredGraph.graph.nodes.get(d.target).y ) /1.7
                + " " + clusteredGraph.graph.nodes.get(d.target).x  + "," 
                +  (clusteredGraph.graph.nodes.get(d.source).y  
                + clusteredGraph.graph.nodes.get(d.target).y ) / 1.7
                + " " + clusteredGraph.graph.nodes.get(d.target).x  + "," 
                + clusteredGraph.graph.nodes.get(d.target).y ;
             })
             .attr("key", function(d) {
                return d.id;
            })
            .attr("id", "edge");

    d3.select("#c_text")
      .selectAll("circle")
      .data(clus)
      .enter()
      .append("text")
      .attr("dy", ".35em")
      .text(function(d){
          return d.text;
      })
      .attr("y", function(d){
          return d.y+d.r-15;
        })
      .attr("x", function(d){
          return d.x;
      })
      .attr("id", "clusterText")




    let clustersLevelOne = new Set();
    for (let item of clusteredGraph.tree.clusters) {
        if (item[1].level == 1) {
            clustersLevelOne.add(item[1])
        }

    }
    let nodeClusters = new Set();
    for (let cluster of clusteredGraph.tree.clusters) {
        for (let nodo of clusteredGraph.graph.nodes) {
            for (let figlio of cluster[1].cildren) {
                if (!clusteredGraph.tree.clusters.get(figlio).nodes.has(nodo[0])) {
                    nodeClusters.add(figlio)
                    nodeClusters.add(nodo)
                }
            }
        }

    }

        for (let cluster of clusteredGraph.tree.clusters){
            let nodesInClusters=new Set()
            for(let item of cluster[1].nodes){
                nodesInClusters.add(clusteredGraph.graph.nodes.get(item))
            }
            forceNodes(nodesInClusters)
        }


    forceClusters(clustersLevelOne);
}


function forceNodes(nodesInClusters){
    simulationIntraNodes = d3.forceSimulation(Array.from(nodesInClusters.values()))
    .force("collide", d3.forceCollide().radius(function(d) {
        return d.r;
    }).iterations(20))
    .on("tick", function() {
        d3.select("#c_node")
            .selectAll("circle")
            .attr("cx", function(d) {
                return d.x;
            })
            .attr("cy", function(d) {
                return d.y;
            })
    });

}

/**
 * @function
 * @returns{void}
 * @description function for start the collision and attraction force everytime the graph changes 
 */
function forceClusters(clustersLevelX) {
    simulationIntraClusters = d3.forceSimulation(Array.from(clustersLevelX.values()))
        .force("collide", d3.forceCollide().radius(function(d) {
            return d.r;
        }).iterations(20))
        .on("tick", function() {
            d3.select("#c_cluster")
                .selectAll("circle")
                .attr("cx", function(d) {
                    return d.x;
                })
                .attr("cy", function(d) {
                    return d.y;
                })
        });
    for (let item of clustersLevelX) {
        if (item.cildren.size != 0) {
            let itemcildren = new Set()
            for (let figlioid of item.cildren) {
                if (clusteredGraph.tree.clusters.get(figlioid).level == item.level + 1)
                    itemcildren.add(clusteredGraph.tree.clusters.get(figlioid))
            }
            //console.log(item.x)
            simulationIntraClusters = d3.forceSimulation(Array.from(itemcildren))
                .force('center', d3.forceCenter(item.x, item.y))
                .force("charge", d3.forceManyBody().strength(0.4)) // Nodes are attracted one each other of value is > 0
                .force("collide", d3.forceCollide().radius(function(d) {
                    return d.r;
                }).iterations(20))
                .on("tick", function() {
                    d3.select("#c_cluster")
                        .selectAll("circle")
                        .attr("cx", function(d) {
                            return d.x;
                        })
                        .attr("cy", function(d) {
                            return d.y;
                        })
                });
        }
    }

    for (let item of clustersLevelX) {
        if (item.cildren.size != 0) {
            let itemcildren = new Set()
            for (let figlioid of item.cildren) {
                if (clusteredGraph.tree.clusters.get(figlioid).level == item.level + 1)
                    itemcildren.add(clusteredGraph.tree.clusters.get(figlioid))
            }
            for (let nodoid of item.nodes)
                itemcildren.add(clusteredGraph.graph.nodes.get(nodoid))
            simulationIntraClusters = d3.forceSimulation(Array.from(itemcildren))
                .force("collide", d3.forceCollide().radius(function(d) {
                    return d.r;
                }).iterations(20))
                .on("tick", function() {
                    d3.select("#c_cluster")
                        .selectAll("circle")
                        .attr("cx", function(d) {
                            return d.x;
                        })
                        .attr("cy", function(d) {
                            return d.y;
                        })
                    d3.select("#c_nodes")
                        .selectAll("nodes")
                        .attr("cx", function(d) {
                            return d.x;
                        })
                        .attr("cy", function(d) {
                            return d.y;
                        })
                });
        }

    }
}