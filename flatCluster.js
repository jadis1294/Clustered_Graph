/**
 * @function 
 */
function flatClusterButton()
 {
    allFalse();
    removeTransformation();
    for(let c of clusteredGraph.tree.clusters)
    {
            if(c[1].cildren.size==0)
            {
                for(let parent of c[1].parents)
                {
                    if(clusteredGraph.tree.clusters.get(parent).level==parseInt(c[1].level)-1)
                    {
                        deleteCluster(parent)
                        let l= parseInt(c[1].level)
                        c[1].level= l-1;
                        addFakeClusters(c[1])
                    }
                }
            }
        }
    }

function addFakeClusters(cluster){

}
