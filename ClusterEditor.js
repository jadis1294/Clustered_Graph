/////////////////////////////////////////////////////////////////////////////////////////////////7
///////////////////////////FUNZIONI X IMPORTARE IL GRAFO ////////////////////////////
function importSVG() {
    d3.xml("d3.svg", "image/svg+xml", function(xml) {
        var importedNode = document.importNode(xml.documentElement, true);
        d3.select("#cgraph")
            .each(function() {
                this.appendChild(importedNode);
            })
    })
}
//////////////////////////FUNZIONI PER SALVARE GRAFO///////////////////////////////////////////
function salvaGrafo() {

    var svgString = getSVGString(d3.select("#cgraph").node());
    svgString2Image(svgString, 2 * w, 2 * h, 'png', save); // passes Blob and filesize String to the callback

    function save(dataBlob, filesize) {
        saveAs(dataBlob, 'D3 vis exported to PNG.png'); // FileSaver.js function
    }
}
// Below are the functions that handle actual exporting:
// getSVGString ( svgNode ) and svgString2Image( svgString, width, height, format, callback )
function getSVGString(svgNode) {
    svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
    var cssStyleText = getCSSStyles(svgNode);
    appendCSS(cssStyleText, svgNode);

    var serializer = new XMLSerializer();
    var svgString = serializer.serializeToString(svgNode);
    svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
    svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

    return svgString;

    function getCSSStyles(parentElement) {
        var selectorTextArr = [];

        // Add Parent element Id and Classes to the list
        selectorTextArr.push('#' + parentElement.id);
        for (var c = 0; c < parentElement.classList.length; c++)
            if (!contains('.' + parentElement.classList[c], selectorTextArr))
                selectorTextArr.push('.' + parentElement.classList[c]);

        // Add Children element Ids and Classes to the list
        var nodes = parentElement.getElementsByTagName("*");
        for (var i = 0; i < nodes.length; i++) {
            var id = nodes[i].id;
            if (!contains('#' + id, selectorTextArr))
                selectorTextArr.push('#' + id);

            var classes = nodes[i].classList;
            for (var c = 0; c < classes.length; c++)
                if (!contains('.' + classes[c], selectorTextArr))
                    selectorTextArr.push('.' + classes[c]);
        }

        // Extract CSS Rules
        var extractedCSSText = "";
        for (var i = 0; i < document.styleSheets.length; i++) {
            var s = document.styleSheets[i];

            try {
                if (!s.cssRules) continue;
            } catch (e) {
                if (e.name !== 'SecurityError') throw e; // for Firefox
                continue;
            }

            var cssRules = s.cssRules;
            for (var r = 0; r < cssRules.length; r++) {
                if (contains(cssRules[r].selectorText, selectorTextArr))
                    extractedCSSText += cssRules[r].cssText;
            }
        }

        return extractedCSSText;

        function contains(str, arr) {
            return arr.indexOf(str) === -1 ? false : true;
        }
    }

    function appendCSS(cssText, element) {
        var styleElement = document.createElement("style");
        styleElement.setAttribute("type", "text/css");
        styleElement.innerHTML = cssText;
        var refNode = element.hasChildNodes() ? element.children[0] : null;
        element.insertBefore(styleElement, refNode);
    }
}

function svgString2Image(svgString, width, height, format, callback) {
    var format = format ? format : 'png';
    var imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString))); // Convert SVG string to data URL
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    var image = new Image();
    image.onload = function() {
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        canvas.toBlob(function(blob) {
            var filesize = Math.round(blob.length / 1024) + ' KB';
            if (callback) callback(blob, filesize);
        });
    };
    image.src = imgsrc;
}
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

function eliminaCluster() {
    edit_cluster=false;
    ingrandisci_cluster = false;
    crea_cluster = false;
    crea_nodi = false;
    crea_archi = false;
    sposta_cluster = false;
    elimina_clusterNodo = true;
    naviga_cgraph = false;
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
//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////FUNZIONI PER DRAG/////////////////////////////////////
var drag = d3.drag()
    .on("drag", dragged)
function dragged(d) {
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragCluster() {
    d3.select("#c_cluster")
        .selectAll("circle") // For new circle, go through the update process
        .call(drag)
}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////    RANDOMIZZAZIOE DEI COLORI DEI CLUSTER    ////////////////////////////////
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//////////////////////////    new & edit CLUSTERS    /////////////////////////////////////////////////////7 
function bigAndNewCluster(key,coords){
    var newData = {
        x: coords[0], // Takes the pixel number to convert to number
        y: coords[1],
        r: radiusCluster,
        internalCluster: [],
        key: clusters[key].internalCluster.length
    };

    clusters[key].internalCluster.push(newData); // Push data to our array
    d3.select("#c_cluster_int")
        .selectAll("circle")
        .data(clusters[key].internalCluster)
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
                .attr("key",function(d){
            return d.key;
        })
    .attr("fill", getRandomColor)
    var simulationInterClusters = d3.forceSimulation(clusters[key].internalCluster)
    .force("attract",d3.forceManyBody().strength(80).distanceMax(400).distanceMin(80))
    .force("collide", d3.forceCollide().radius(function(d) {return d.r + 0.5;}).iterations(2))
    .on("tick", tickedinternalcluster);
}

function newCluster(coords) {
    var newData =
    {
        x: Math.round(coords[0]), // Takes the pixel number to convert to number
        y: Math.round(coords[1]),
        r: radiusCluster,
        internalCluster: [],
        key: clusters.length
    };
    clusters.push(newData); // Push data to our array
    d3.select("#c_cluster")
        .selectAll("circle") // For new circle, go through the update process
        .data(clusters)
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
        .attr("key",function(d){
            return d.key;
        })
        .attr("fill", getRandomColor)
        
        var simulationIntraClusters = d3.forceSimulation(clusters)
    .force("collide", d3.forceCollide().radius(function(d) { return d.r + 0.5; }).iterations(2))
    .on("tick", tickedcluster);

}

function removeCluster(i) {
    clusters.splice(i, 1);
    d3.select("#c_cluster").selectAll("circle").data(clusters).exit().remove();
    d3.select("#c_cluster")
        .selectAll("circle") // For new circle, go through the update process
        .data(clusters)
        .enter()
        .append("circle")
        .transition()
        .duration(800)
        .attr(clusterAttrs)
        .attr("fill", getRandomColor)
        .attr("opacity", 0.5)
        .attr("id", "cluster")
}
//////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////    TICKED ASINCRONI PER LE SIMULAZIONI    ///////////////////////
function tickedcluster() {
    d3.select("#c_cluster")
        .selectAll("circle")
        .data(clusters)
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        })
        .attr("r",function(d){
            return d.r;
        })
}
function tickedinternalcluster() {
    //console.log("ciao")
    d3.select("#c_cluster_int")
        .selectAll("circle")
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        })
        .attr("r",function(d){
            return d.r;
        })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////funzioni per FLAT TIME//////////////////////////////////////////////////////////////////
function flattingClusterDelete(d, i) {
    var rad = d3.select(this).attr("r")
    if (rad <= 40) return;
    var newCluster_fake = {
        x: clusters[i].x, // Takes the pixel number to convert to number
        y: clusters[i].y
    };
    clusters_fake.push(newCluster_fake)
    clusters.splice(i, 1);
    d3.select(this)
        .remove()
    d3.select("#c_cluster_fake")
        .selectAll("circle") // For new circle, go through the update process
        .data(clusters_fake)
        .enter()
        .append("circle")
        .transition()
        .duration(800)
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y
        })
        .attr("r", rad)
        .attr("id", "cluster_fake")

}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////inizializzazione DEI CLUSTERS E DEI NODI//////////////////////////////////////////////////////////////
function initialize() {
    d3.select("body")
        .append("svg")
        .attr("width", w - 130)
        .attr("height", h - 100)
        .attr('id', 'cgraph')

    d3.select("#cgraph")
        .append('g')
        .attr('id', 'c_cluster')


    d3.select("#cgraph")
        .append('g')
        .attr('id', 'c_cluster_fake')


    d3.select("#cgraph")
        .append('g')
        .attr('id', 'c_cluster_int')


    d3.select("#cgraph")
        .append('g')
        .attr('id', 'c_node')

    d3.select("#cgraph")
        .append("g")
        .attr("id", "c_edge")

}

initialize();


///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////on click /////////////////////////////////////////////////////////
d3.select("#cgraph")
    .call(d3.zoom()
        .scaleExtent([1, 40])
    .translateExtent([[-100, -100], [w + 90, h + 100]])
            .on("zoom", function() {
                if (naviga_cgraph == true) {

                    d3.select("#c_cluster")
                        .attr("transform",d3.event.transform )
                    d3.select("#c_cluster_int")
                        .attr("transform", d3.event.transform )
                    d3.select("#c_node")
                        .attr("transform", d3.event.transform )
                    d3.select("#c_edge")
                        .attr("transform", d3.event.transform )
                }
            }))
        .on("click", function() {
            var coords = d3.mouse(this);
            if (crea_cluster == true)
                newCluster(coords);
            if (crea_nodi == true)
                newNode(coords);
            else{
                d3.select("#cgraph")
                    .selectAll("circle")
                    .data(clusters)
                    .on("click", function(d) {
                    var coords = d3.mouse(this);
                        if (sposta_cluster == true)
                            dragCluster();
                    if (elimina_clusterNodo == true) {
                clusters.splice(i, 1);
                d3.select("#c_cluster")
                    .selectAll("circle") 
                    .data(clusters)
                    .enter()
                    .append("circle")
            }
            if (edit_cluster == true) {
                var key= d3.select(this).attr("key")
                bigAndNewCluster(key,coords);
                console.log("edit_cluster")
                var bigRad = d3.select(this).attr("r")
                if (bigRad >= 320) return;
                if(bigRad== radiusCluster){
                    d3.select(this)
                        .transition()
                        .duration(1000)
                        .attr("r", d.r = d3.sum([bigRad,20]))
                }
                if(bigRad>radiusCluster){
                    d3.select(this)
                        .transition()
                        .duration(1000)
                        .attr("r", d.r = d3.sum([bigRad,radiusCluster]))
                }
            }
                            simulationIntraClusters = d3.forceSimulation(clusters)
    .force("collide", d3.forceCollide().radius(function(d) { return d.r + 0.5; }).iterations(2))
    .on("tick", tickedcluster);
        });
            }

        })
d3.select("#c_node")
        .selectAll("circle")
        .on("click", function() {
            if (crea_archi == true) {
                let smallRad = d3.select(this).attr("r")
                d3.select(this)
                    .transition()
                    .duration(1000)
                    .attr("r", smallRad * 1.5)
                var puntoiniziale = d3.mouse(this);
                line = d3.select("#c_edge")
                    .append("line")
                    .attr("x1", puntoiniziale[0])
                    .attr("y1", puntoiniziale[1])
                    .attr("x2", puntoiniziale[0])
                    .attr("y2", puntoiniziale[1])
                    .attr("id", "edge")
                d3.select("#c_node").selectAll("circle").on("click", fineArco)
            }
        });
