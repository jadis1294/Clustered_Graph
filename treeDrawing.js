/**
 * @function 
 */
function drawTree(){
    let flatDataList=[
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
            
            flatDataList.push({
              "name":item[1].label,
              "parent":genitore, 
              "hasChildren":figli,
              "fill":item[1].fill
            });
    }
    for (let item of clusteredGraph.graph.nodes)
      flatDataList.push({
        "name":item[1].label,
        "parent":item[1].cluster, 
        "hasChildren":false,
        "fill":"black"
      });

    var flatData = [];
    flatDataList.map( data => {
      flatData.push(data);
    })

/**
 * @function 
 */
function drawVerticalTree(flatData) {

          // ************** Generate the tree diagram	 *****************
      var margin = {top: 40, right: 120, bottom: 20, left: 120},
        width = 960 - margin.right - margin.left,
        height = 300 - margin.top - margin.bottom;
  
      var i = 0;
  
          // convert the flat data into a hierarchy 
      var treeData = d3.stratify()
        .id(function(d) { return d.name; })
        .parentId(function(d) { return d.parent; })
        (flatData);
  
      // assign the name to each node
      treeData.each(function(d) {
          d.name = d.id;
        });
  
  
      var tree = d3.tree().size([height, width]);
  
      // set the dimensions and margins of the diagram
      var margin = {top: 40, right: 90, bottom: 50, left: 90},
          width = w - margin.left - margin.right,
          height = h - margin.top - margin.bottom;
  
      // declares a tree layout and assigns the size
      var treemap = d3.tree().size([width, height]);
  
      //  assigns the data to a hierarchy using parent-child relationships
      var nodes = d3.hierarchy(treeData);
  
      // maps the node data to the tree layout
      nodes = treemap(nodes);
  
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
               + "C" + d.x + "," + (d.y + d.parent.y) / 2
               + " " + d.parent.x + "," +  (d.y + d.parent.y) / 2
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
                return "translate(" + 0 + "," + 0 + ")"; })
  
      // adds the circle to the node
      node.append("circle")
        .attr("r", 10);
          
          // adds the text to the node
    node.append("text")
    .attr("dy", ".35em")
    .attr("x",function(d) { return d.x-20; })
    .attr("y",function(d) { return d.y-20; })
    .style("text-anchor", "middle")
    .text(function(d) { return d.data.name; });

      } 
  
    drawVerticalTree(flatData);
  }