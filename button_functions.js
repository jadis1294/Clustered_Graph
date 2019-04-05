
var edit_cluster=false;
var crea_cluster = false;
var crea_nodi = false;
var crea_archi = false;
var sposta_cluster = false;
var elimina_clusterNodo = false;



/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////7

function flatCluster() {
    crea_cluster = false;
    crea_nodi = false;
    crea_archi = false;
    sposta_cluster = false;
    elimina_clusterNodo = false;
    naviga_cgraph = false;
    d3.select("#c_cluster")
        .attr("transform", null)
    d3.select("#c_node")
        .attr("transform", null)
    d3.select("#c_edge")
        .attr("transform", null)

    d3.select("#c_cluster")
        .selectAll("circle")
        .data(clusters)
        .on("click", flattingClusterDelete)
}
function ingrandisciCluster() {
            edit_cluster=false;
    ingrandisci_cluster = true;
    crea_cluster = false;
    crea_nodi = false;
    crea_archi = false;
    sposta_cluster = false;
    elimina_clusterNodo = false;
    naviga_cgraph = false;
    d3.select("#c_cluster")
        .attr("transform", null)
    d3.select("#c_node")
        .attr("transform", null)
    d3.select("#c_edge")
        .attr("transform", null)
}

function creaCluster() {
        edit_cluster=false;
    ingrandisci_cluster = false;
    crea_cluster = true;
    crea_nodi = false;
    crea_archi = false;
    sposta_cluster = false;
    elimina_clusterNodo = false;
    naviga_cgraph = false;
    d3.select("#c_cluster")
        .attr("transform", null)
    d3.select("#c_node")
        .attr("transform", null)
    d3.select("#c_edge")
        .attr("transform", null)
}
function editCluster() {
    edit_cluster=true;
    ingrandisci_cluster = false;
    crea_cluster = false;
    crea_nodi = false;
    crea_archi = false;
    sposta_cluster = false;
    elimina_clusterNodo = false;
    naviga_cgraph = false;
    d3.select("#c_cluster")
        .attr("transform", null)
    d3.select("#c_node")
        .attr("transform", null)
    d3.select("#c_edge")
        .attr("transform", null)
}

function naviga() {
    edit_cluster=false;
    ingrandisci_cluster = false;
    crea_cluster = false;
    crea_nodi = false;
    crea_archi = false;
    sposta_cluster = false;
    elimina_clusterNodo = false;
    naviga_cgraph = true;
}

function creaNodi() {
    edit_cluster=false;
    ingrandisci_cluster = false;
    crea_cluster = false;
    crea_nodi = true;
    crea_archi = false;
    sposta_cluster = false;
    elimina_clusterNodo = false;
    naviga_cgraph = false;
    d3.select("#c_cluster")
        .attr("transform", null)
    d3.select("#c_node")
        .attr("transform", null)
    d3.select("#c_edge")
        .attr("transform", null)
}

function creaArchi() {
    edit_cluster=false;
    ingrandisci_cluster = false;
    crea_cluster = false;
    crea_nodi = false;
    crea_archi = true;
    sposta_cluster = false;
    elimina_clusterNodo = false;
    naviga_cgraph = false;
    d3.select("#c_cluster")
        .attr("transform", null)
    d3.select("#c_node")
        .attr("transform", null)
    d3.select("#c_edge")
        .attr("transform", null)
}

function spostaCluster() {
    edit_cluster=false;
    ingrandisci_cluster = false;
    crea_cluster = false;
    crea_nodi = false;
    crea_archi = false;
    sposta_cluster = true;
    elimina_clusterNodo = false;
    d3.select("#c_cluster")
        .attr("transform", null)
    d3.select("#c_node")
        .attr("transform", null)
    d3.select("#c_edge")
        .attr("transform", null)
}

function flatCluster() {
    edit_cluster=false;
    ingrandisci_cluster = false;
    crea_cluster = false;
    crea_nodi = false;
    crea_archi = false;
    sposta_cluster = false;
    elimina_clusterNodo = false;
    naviga_cgraph = false;
    d3.select("#c_cluster")
        .attr("transform", null)
    d3.select("#c_node")
        .attr("transform", null)
    d3.select("#c_edge")
        .attr("transform", null)
}

function eliminaGrafo() {
    d3.select("#c_cluster").selectAll("circle").remove();
    d3.select("#c_node").selectAll("circle").remove();
    d3.select("#c_edge").selectAll("line").remove();
    clusters = [];
    nodes = [];
    edges = [];
}