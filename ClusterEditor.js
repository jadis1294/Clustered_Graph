var node;
var clickCount = 0;
var nodoCliccato = false;
var threshold = 300; // per il click VS doubleclick
var w = window.innerWidth,
    h = window.innerHeight,
    margin = {
        top: 40,
        right: 20,
        bottom: 20,
        left: 40
    },
    valore_scarto = 5;
radiusCluster = 40;
radiusNode = 9;
var radius;
var clusters = [];
var nodes = [];
var edges = [];
var clusters_fake = [];
var cgraph = [clusters, nodes, edges, clusters_fake]

var attractForce = d3.forceManyBody().strength(80).distanceMax(400).distanceMin(80);
var collisionClustersForce = d3.forceCollide(function(d) {
    return d.r + 10;
}).strength(1).iterations(400);


// We're passing in a function in d3.max to tell it what we're maxing (x value)
// We're passing in a function in d3.max to tell it what we're maxing (x value)

var clusterAttrs = {
    cx: function(d) {
        return d.x;
    },
    cy: function(d) {
        return d.y;
    },
    r: function(d) {
        return d.r;
    }
};


var nodeAttrs = {
    cx: function(d) {
        return d.x;
    },
    cy: function(d) {
        return d.y;
    },
    r: function(d) {
        return d.r;
    }
};

var crea_cluster = false;
var crea_nodi = false;
var crea_archi = false;
var sposta_cluster = false;
var elimina_clusterNodo = false;


var drag = d3.drag()
    .on("drag", dragged)


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



function dragged(d) {
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function ingrandisciCluster() {
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

function naviga() {
    ingrandisci_cluster = false;
    crea_cluster = false;
    crea_nodi = false;
    crea_archi = false;
    sposta_cluster = false;
    elimina_clusterNodo = false;
    naviga_cgraph = true;
}

function creaNodi() {
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
    // initialize();

}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function newCluster(coords) {
    var newData = {
        x: Math.round(coords[0]), // Takes the pixel number to convert to number
        y: Math.round(coords[1]),
        r: radiusCluster
    };
    clusters.push(newData); // Push data to our array
    d3.select("#c_cluster")
        .selectAll("circle") // For new circle, go through the update process
        .data(clusters)
        .enter()
        .append("circle")
        .transition()
        .duration(800)
        .attr(clusterAttrs)
        .attr("cx",function(d) {
        return d.x;
    })
        .attr("cy",function(d) {
        return d.y;
    })
        .attr("r",function(d) {
        return d.r;
    })
        .attr("fill", getRandomColor)
        .attr("opacity", 0.5)
        .attr("id", "cluster")
var simulationclusters = d3.forceSimulation(clusters)
    .velocityDecay(0.2)
    .force("collide", d3.forceCollide().radius(function(d) { return d.r + 0.5; }).iterations(2))
    .on("tick", ticked);
    d3.select("#c_cluster")
        .selectAll("circle")
        .on("click", function(i) {
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
            if (ingrandisci_cluster == true) {
                var bigRad = d3.select(this).attr("r")
                if (bigRad >= 320) return;
                if (bigRad == radiusCluster) {
                    var r = radiusCluster + valore_scarto;
                    d3.select(this)
                        .transition()
                        .duration(1000)
                        .attr("r", r)
                }
                if (bigRad > radiusCluster) {
                    d3.select(this)
                        .transition()
                        .duration(1000)
                        .attr("r", bigRad * 2)
                }
            }
        });
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
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
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
}

function dragCluster() {
    d3.select("#c_cluster")
        .selectAll("circle") // For new circle, go through the update process
        .call(drag)
}


function ticked() {
    d3.select("#c_cluster")
        .selectAll("circle")
        .data(clusters)
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
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

function handleMouseOver(d, i) { // Add interactivity
    if (naviga_cgraph == false) return;
    // Use D3 to select element, change color and size
    d3.select(this).attr({
        fill: "orange",
        r: radiusNode * 1.5
    });

    // Specify where to put label of text
    d3.select("#cgraph").append("text").attr({
            id: "t" + d.x + "-" + d.y + "-" + i, // Create an id for text so we can select it later for removing on mouseout
            x: function() {
                return d.x;
            },
            y: function() {
                return d.y;
            }
        })
        .text(function() {
            return [d.x, d.y]; // Value of the text
        });
}

function handleMouseOut(d, i) {
    if (naviga_cgraph == false) return;
    // Use D3 to select element, change color back to normal
    d3.select(this).attr({
        fill: "grey",
        r: radiusNode
    });

    // Select text by id and then remove
    d3.select("#t" + d.x + "-" + d.y + "-" + i).remove(); // Remove text location
};




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////inizializzazione DEI CLUSTERS E DEI NODI//////////////////////////////////////////////////////////////
function initialize() {
    d3.select("body")
        .append("svg")
        .attr("width", w - 130)
        .attr("height", h - 100)

        .attr('id', 'cgraph')
        .call(d3.zoom()
            .on("zoom", function() {
                if (naviga_cgraph == true) {
                    d3.select("#c_cluster")
                        .attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")")
                    d3.select("#c_node")
                        .attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")")
                    d3.select("#c_edge")
                        .attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")")
                }
            }))
        .on("click", function() {
            var coords = d3.mouse(this);
            if (crea_cluster == true)
                newCluster(coords);
            if (crea_nodi == true)
                newNode(coords);

        })
    d3.select("c_node")
        .selectAll("circle")
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

    d3.select("#cgraph")
        .append('g')
        .attr('id', 'c_cluster')


    d3.select("#cgraph")
        .append('g')
        .attr('id', 'c_cluster_fake')

    d3.select("#cgraph")
        .append('g')
        .attr('id', 'c_node')

    d3.select("#cgraph")
        .append("g")
        .attr("id", "c_edge")

}
initialize();