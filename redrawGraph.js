/**
 * @function
 * @description redrawClusters the graph everytime it changes 
 */
function redraw(){
    let clus=[]
    let nodes=Array.from(clusteredGraph.graph.nodes.values());
    let edges=Array.from(clusteredGraph.graph.edges.values());
    let clusFake=[]
    for(let c of clusteredGraph.tree.clusters)
        if(c[1].label=="c_fake")
            clusFake.push(c[1])
        else clus.push(c[1])
    console.log(clusFake)
    d3.select("#c_cluster")
    .selectAll("circle")
    .data(clus)
    .remove()
    
    d3.select("#c_cluster")
    .selectAll("circle")
    .data(nodes)
    .remove()
    
    d3.select("#c_edge")
    .selectAll("line")
    .data(edges)
    .remove()

    d3.select("#c_node")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r",radiusNode)
    .attr("id", "nodo")
    .attr("cx", function(d){ return d.x;})
    .attr("cy", function(d){return d.y})
    .attr("key", function(d){return d.key});

    d3.select("#c_edge")
    .selectAll("line")
    .data(edges)
    .enter()
    .append("line")
    .attr("id", "edge")
    .attr("x1", function(d){ return d.x1;})
    .attr("y1", function(d){return d.y1;})
    .attr("x2", function(d){ return d.x2;})
    .attr("y2", function(d){return d.y2;})
    .attr("key", function(d){return d.id;});


    d3.select("#c_cluster_Fake")
    .selectAll("circle")
    .data(clusFake)
    .enter()
    .append("circle")
    .attr("r", function(d){ return d.r;})
    .attr("id","clusterFake")
    .attr("cx", function(d){ return d.x;})
    .attr("cy", function(d){return d.y;})
    .attr("fill", function(d){return d.fill;})
    .attr("key", function(d){return d.key});
    let sim = d3.forceSimulation(clusFake)
    .force("collide", d3.forceCollide().radius(function(d) {return d.r;}).iterations(20))
    .on("tick", function(){
        d3.selectAll("circle")
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        })
    });

    d3.select("#c_cluster")
    .selectAll("circle")
    .data(clus)
    .enter()
    .append("circle")
    .attr("r", function(d){ return d.r;})
    .attr("id","cluster")
    .attr("cx", function(d){ return d.x;})
    .attr("cy", function(d){return d.y;})
    .attr("fill", function(d){return d.fill;})
    .attr("key", function(d){return d.key});
    let clustersLevelOne=new Set();
    for (let item of clusteredGraph.tree.clusters){
        if(item[1].level==1) {
            clustersLevelOne.add(item[1])
        } 

    }
    let nodeClusters = new Set();
    for(let cluster of clusteredGraph.tree.clusters){
        for(let nodo of clusteredGraph.graph.nodes){
            for(let figlio of cluster[1].cildren){
                if(!clusteredGraph.tree.clusters.get(figlio).nodes.has(nodo[0])){
                    nodeClusters.add(figlio)
                    nodeClusters.add(nodo)
                }
            }
        }

    }
    forceClusters(clustersLevelOne);
}


/**
 * @function
 * @description function for start the collision and attraction force everytime the graph changes 
 */
function forceClusters(clustersLevelX){
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
        if(item.cildren.size!=0){
            let itemcildren=new Set()
            for (let figlioid of item.cildren) {
                if(clusteredGraph.tree.clusters.get(figlioid).level==item.level+1)
                itemcildren.add(clusteredGraph.tree.clusters.get(figlioid))
            }
            //console.log(item.x)
                  simulationIntraClusters = d3.forceSimulation(Array.from(itemcildren))
                    .force('center', d3.forceCenter(item.x,item.y))
                    .force("charge", d3.forceManyBody().strength(0.4)) // Nodes are attracted one each other of value is > 0
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
            }
        }

    for(let item of clustersLevelX){
        if(item.cildren.size!=0){
            let itemcildren=new Set()
            for (let figlioid of item.cildren) {
                if(clusteredGraph.tree.clusters.get(figlioid).level==item.level+1)
                itemcildren.add(clusteredGraph.tree.clusters.get(figlioid))
        }
            for(let nodoid of item.nodes)
                itemcildren.add(clusteredGraph.graph.nodes.get(nodoid))
                console.log(itemcildren)
                simulationIntraClusters = d3.forceSimulation(Array.from(itemcildren))
                .force("collide", d3.forceCollide().radius(function(d) {console.log(d.r); return d.r;}).iterations(20))
                .on("tick", function(){
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
                .attr("cx",function(d){
                    return d.x;
                })
                .attr("cy",function(d){
                    return d.y;
                })
            });    
    }
        
    }
}

