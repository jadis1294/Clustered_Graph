/**
 * @function 
 */
function flatClusterButton(){
    l.text=" flatted the graph ";
    l.n=consoleCount;
    consoleCount++;
    addLog(l)
    allFalse();
    removeTransformation();
    for(let c of clusteredGraph.tree.clusters){
        if(c[1].cildren.size==0)
            for(let parent of c[1].parents)
                    if(clusteredGraph.tree.clusters.get(parent).level==parseInt(c[1].level)-1){
                        deleteCluster(parent)
                        let l= parseInt(c[1].level)
                        c[1].level= l-1;
                        addFakeCluster(c[1]);
                        addFakeCluster(c[1]);
                        addFakeNodes();
                        let ultimaChiave;
                        for(let key of clusteredGraph.graph.nodes) ultimaChiave= key[0];
                        n1=clusteredGraph.graph.nodes.get(ultimaChiave)
                        n2=clusteredGraph.graph.nodes.get(ultimaChiave-1)
                        addEdges(n1,n2);
                        redraw();
                    }
        }
    }

function addFakeCluster(cluster){
    let ultimaChiave;
    for(let key of clusteredGraph.tree.clusters) ultimaChiave= key[0];
    ultimaChiave++;
    let newCoords=[cluster.x+getCoordinates(cluster.x),cluster.y+getCoordinates(cluster.y)];
    newCluster(newCoords,ultimaChiave,"c_fake",1)
    clusteredGraph.tree.clusters.get(ultimaChiave).fill=cluster.fill
}

function getCoordinates(c){
    if(c<=50) return 50;
    else {
        if (c>=h-50) return -50;
        else return 0;
    } 
}

function addFakeNodes(){
    for(let c of clusteredGraph.tree.clusters)
        if(c[1].label=="c_fake"){
            newNode(c[1],c[1].key,[c[1].x,c[1].y],"n_fake");
        }
}

function addEdges(n1,n2){
    if(clusteredGraph.graph.edges.size==0)
    ultimaChiave=0;
else{ 
    for(let key of clusteredGraph.graph.edges)
    ultimaChiave= key[0]+1;
}
    let edge= new Edge(ultimaChiave,"edgeFake",n1.id,n2.id);
    clusteredGraph.graph.edges.set(ultimaChiave,edge);
    n1.rotationScheme.add(edge.id);
    n2.rotationScheme.add(edge.id);
    edge.x1=n1.x;
    edge.y1=n1.y;
    edge.x2=n2.x;
    edge.y2=n2.y
}
