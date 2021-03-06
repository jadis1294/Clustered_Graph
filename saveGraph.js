/**
 * @function
 * @returns {void} 
 */
function saveGraph() {

    var svgString = getSVGString(d3.select("#cgraph").node());
    svgString2Image(svgString, 2 * w, 2 * h, 'png', save); // passes Blob and filesize String to the callback

    function save(dataBlob) {
        saveAs(dataBlob, 'D3 vis exported to PNG.png'); // FileSaver.js function
    }
    text=" saved the graph as a .png file ";
    addLog(text,consoleCount);
}
// Below are the functions that handle actual exporting:
// getSVGString ( svgNode ) and svgString2Image( svgString, width, height, format, callback )
/**
 * @function
 * @returns {String} 
 */
function getSVGString(svgNode) {
    svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
    var cssStyleText = getCSSStyles(svgNode);
    appendCSS(cssStyleText, svgNode);

    var serializer = new XMLSerializer();
    var svgString = serializer.serializeToString(svgNode);
    svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
    svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

    return svgString;
/**
 * @function
 * @returns {void} 
 */
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
/**
 * @function
 * @returns {void} 
 */
        function contains(str, arr) {
            return arr.indexOf(str) === -1 ? false : true;
        }
    }
/**
 * @function
 * @returns {void} 
 */
    function appendCSS(cssText, element) {
        var styleElement = document.createElement("style");
        styleElement.setAttribute("type", "text/css");
        styleElement.innerHTML = cssText;
        var refNode = element.hasChildNodes() ? element.children[0] : null;
        element.insertBefore(styleElement, refNode);
    }
}
/**
 * @function
 * @returns {void} 
 */
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

/**
 * @function
 * @returns {void} 
 * @description save the Cgraph as a .json file
 */
function saveAsJsonButton(){
    let clu=[]
    for(let c of clusteredGraph.tree.clusters){
        c[1].parents=Array.from(c[1].parents);
        c[1].cildren=Array.from(c[1].cildren);
        c[1].nodes=Array.from(c[1].nodes);
        clu.push(c[1])

    }
    let arc=[]
    for(let c of clusteredGraph.graph.edges) arc.push(c[1])
    let nod=[]
    for(let c of clusteredGraph.graph.nodes){
        c[1].rotationScheme=Array.from(c[1].rotationScheme);
        nod.push(c[1])
    } 
    let cgraph={
        "nodes": nod,
        "edges": arc,
        "clusters" : clu
    }
    var jsonse = JSON.stringify(cgraph);
    let blob = new Blob([jsonse], {type: "application/json"});
    saveAs(blob, "cgraph.json"); // FileSaver.js function
    text=" saved the graph as a .json file ";
    addLog(text,consoleCount);
}