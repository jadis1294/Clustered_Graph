/**
 * @function 
 */
function drawTree(){
    let treeDataList=[
      {"name": "root", "parent": null, "hasChildren": true,"fill":"black"}, 
    ];
    for (let item of clusteredGraph.tree.clusters){
            let figli=false,genitore;
            if(item[1].cildren.size!=0) figli=true;
            if(item[1].level==1) genitore="root";
            if(item[1].parents.size!=0){
              let f= Array.from(item[1].parents)[0]
              genitore=clusteredGraph.tree.clusters.get(f).label
            }
            
            treeDataList.push({
              "name":item[1].label,
              "parent":genitore, 
              "hasChildren":figli,
              "fill":item[1].fill
            });
    }
    for (let item of clusteredGraph.graph.nodes)
      treeDataList.push({
        "name":item[1].label,
        "parent":item[1].cluster, 
        "hasChildren":false,
        "fill":"black"
      });

    var treeData = [];
    treeDataList.map( data => {
      treeData.push(data);
    })
    let edgesDataList=[]
    for (let item of clusteredGraph.graph.edges){
      edgesDataList.push({
        "name":item[1].label,
        "source":clusteredGraph.graph.nodes.get(item[1].source).label, 
        "target":clusteredGraph.graph.nodes.get(item[1].target).label
      });
  }

  var edgesData = [];
    edgesDataList.map( data => {edgesData.push(data);})



/**
 * @function 
 */
function drawVerticalTree(treeData,edgesData) {

          // ************** Generate the tree diagram	 *****************
      var margin = {top: 40, right: 120, bottom: 20, left: 120},
        width = 960 - margin.right - margin.left,
        height = 300 - margin.top - margin.bottom;
  
      var i = 0;
  
          // convert the flat data into a hierarchy 
      var treeData = d3.stratify()
        .id(function(d) { return d.name; })
        .parentId(function(d) { return d.parent; })
        (treeData);
  
      // assign the name to each node
      treeData.each(function(d) {
          d.name = d.id;
        });
  
  
      var tree = d3.tree().size([height, width]);
  
      // set the dimensions and margins of the diagram
      var margin = {top: 40, right: 90, bottom: 50, left: 90},
          width = w - margin.left - margin.right,
          height = h - margin.top - margin.bottom - margin.bottom;
  
      // declares a tree layout and assigns the size
      var treemap = d3.tree().size([width, height]);
  
      //  assigns the data to a hierarchy using parent-child relationships
      var nodes = d3.hierarchy(treeData);
  
      // maps the node data to the tree layout
      nodes = treemap(nodes);
        console.log(nodes.descendants())
      // append the svg obgect to the body of the page
      // appends a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = d3.select("body").append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("id","inctree"),
          g = svg.append("g")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");


      // adds the links between the nodes
      var link = g.selectAll(".link")
          .data( nodes.descendants().slice(1))
          .enter().append("path")
          .attr("class", "link")
          .attr("d", function(d) {
             return "M" + d.x + "," + d.y
               + "C" + d.x + "," + (d.y + d.parent.y) / 2.5
               + " " + d.parent.x + "," +  (d.y + d.parent.y) / 2.5
               + " " + d.parent.x + "," + d.parent.y;
             });
  
      // adds each node as a group
      var node = g.selectAll(".node")
          .data(nodes.descendants())
          .enter().append("g")
          .attr("class", function(d) { 
            return "node" + 
              (d.children ? " node--internal" : " node--leaf"); })
              .attr("transform", function(d) { 
                return "translate(" + 0 + "," + -10 + ")"; })
  
      // adds the circle to the node
      node.append("circle")
        .attr("r", 10)
        .attr("id",function(d){
          return d.data.name; 
      });
          
          // adds the text to the node
    node.append("text")
    .attr("dy", ".35em")
    .attr("x",function(d) { return d.x-20; })
    .attr("y",function(d) { return d.y-20; })
    .style("text-anchor", "middle")
    .text(function(d) { return d.data.name; });

      console.log(edgesData)
      var prova=[]
      for(let item of edgesData){
        let p={};
        for(let i=0; i<nodes.descendants().length; i++){

        console.log(i)
          if( nodes.descendants()[i].data.id== item.source){
            p.source=nodes.descendants()[i].data.id;
            p.x1=nodes.descendants()[i].x;
            p.y1=nodes.descendants()[i].y;
          }
          if( nodes.descendants()[i].data.id== item.target){
            p.target=nodes.descendants()[i].data.id;
            p.x2=nodes.descendants()[i].x;
            p.y2=nodes.descendants()[i].y;
          }
            prova.push(p)
      }
    }
          // adds the links between the nodes
          var linkEdges = g.selectAll(".link")
          .data( prova)
          .enter().append("path")
          .attr("class", "link")
          .attr("d", function(d) {
             return "M" + d.x1 + "," + d.y1
               + "C" + d.x1 + "," + (d.y1 + d.y2) /1.7
               + " " + d.x2 + "," +  (d.y1 + d.y2) / 1.7
               + " " + d.x2 + "," + d.y2;
             });
      } 
  
    drawVerticalTree(treeData,edgesData);

}