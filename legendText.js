function createLegendButton(){
    legend++;
    if(legend<=1){
      var para = document.createElement("definition");
      para.innerText = "1) Clustered Graph: \n";
      document.body.appendChild(para);
  
      d3.select("body")
      .append("text")
      .attr("width", w)
      .attr("height", h)
      .attr('id', 'legend')
      .text(" A clustered graph (or c-graph) C is a pair (G, T) where G = (V,E) is a planar\
        graph, called the underlying graph of C, and T, called the inclusion tree of C,\
        is a rooted tree such that the set of leaves of T coincides with V . A cluster μ\
        is an internal node of T. When it is not ambiguous we also identify a cluster\
        with the respective subset of the vertex set. An inter-cluster edge of a cluster\
        μ of T is an edge of G that has one end-vertex inside μ and the other end-\
        vertex outside μ. An independent set of vertices is a set of pairwise non-adjacent\
        vertices. A cluster μ of T is independent if its vertices form an independent set.\
        A c-graph is independent if all its clusters, with the exception of the root, are\
        independent clusters. A cluster μ of T is a lower cluster (higher cluster ) of C if\
        μ is a lower node (higher node) of T.")
      .attr("y", 60)
      .attr("x", 10)
      .attr("fill", "white")
      .attr("font-size", "20px")
      .attr("id","text")
  
      var para = document.createElement("definition");
      para.innerText = "\n 2) Graph: \n";
      document.body.appendChild(para);
      
      
      d3.select("body")
      .append("text")
      .attr("width", w)
      .attr("height", h)
      .attr("font-size", "20px")
      .attr('id', 'legend')
      .text(" A c-graph is flat if its inclusion tree is flat. The clusters of a flat c-graph\
        are all lower clusters with the exception of the root cluster. A cluster is called\
        singleton if it contains a single cluster or a single vertex.\
        A graph G = (V,E) is a set V of vertices and a set E of edges, where each\
        edge is an unordered pair of vertices. A drawing Γ(G) of G is a mapping of its\
        vertices to distinct points on the plane and of its edges to Jordan curves joining\
        the incident vertices. Drawing Γ(G) is planar if no two edges intersect except\
        at common end-vertices. A graph is planar if it admits a planar drawing.")
      .attr("y", 60)
      .attr("x", 10)
      .attr("fill", "white")
      .attr("font-size", "20px")
      .attr("id","text")
  
      var para = document.createElement("definition");
      para.innerText = "\n 3) Drawing Γ(C) \n";
      document.body.appendChild(para);
      d3.select("body")
      .append("text")
      .attr("width", w)
      .attr("height", h)
      .attr('id', 'legend')
      .text("A drawing Γ(C) of a c-graph C(G, T) is a mapping of vertices and edges\
      of G to points and to Jordan curves joining their incident vertices, respectively,\
      and of each internal node μ of T to a simple closed region R(μ) containing\
      exactly the vertices of μ. Drawing Γ(C) is c-planar if: (i) curves representing\
      edges of G do not intersect except at common end-points; (ii) the boundaries of\
      the regions representing clusters do not intersect; and (iii) each edge intersects\
      the boundary of a region at most one time. A c-graph is c-planar if it admits a\
      c-planar drawing.")
      .attr("y", 60)
      .attr("x", 10)
      .attr("fill", "white")
      .attr("font-size", "20px")
      .attr("id","text")
    }
    
}