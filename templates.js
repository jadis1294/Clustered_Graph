function templatesButton(p){
    removeAll();
    initialize();
    let data

    if(p==0){
        data={
            "nodes":[
                {"id":0,"label":"n0","rotationScheme":[4,5],"cluster":"c4","x":342,"y":86.80000305175781,"key":0,"r":9,"index":0,"vy":0,"vx":0},
                {"id":1,"label":"n1","rotationScheme":[0,1,2],"cluster":"c2","x":328,"y":245.8000030517578,"key":1,"r":9,"index":0,"vy":0,"vx":0},
                {"id":2,"label":"n2","rotationScheme":[2,4,6,7],"cluster":"c1","x":722,"y":76.80000305175781,"key":2,"r":9,"index":0,"vy":0,"vx":0},
                {"id":3,"label":"n3","rotationScheme":[0,5,6],"cluster":"c4","x":327,"y":58.80000305175781,"key":3,"r":9,"index":1,"vy":0,"vx":0},
                {"id":4,"label":"n4","rotationScheme":[3,7],"cluster":"c5","x":729,"y":207.8000030517578,"key":4,"r":9,"index":0,"vy":0,"vx":0},
                {"id":5,"label":"n5","rotationScheme":[1,3],"cluster":"c5","x":715,"y":250.8000030517578,"key":5,"r":9,"index":1,"vy":0,"vx":0}
                    ],
            "edges":[
                {"id":0,"label":"e0","source":3,"target":1,"x1":327,"y1":58,"x2":328,"y2":245},
                {"id":1,"label":"e1","source":1,"target":5,"x1":328,"y1":245,"x2":715,"y2":250},
                {"id":2,"label":"e2","source":2,"target":1,"x1":722,"y1":76,"x2":328,"y2":245},
                {"id":3,"label":"e3","source":5,"target":4,"x1":715,"y1":250,"x2":729,"y2":207},
                {"id":4,"label":"e4","source":0,"target":2,"x1":342,"y1":86,"x2":722,"y2":76},
                {"id":5,"label":"e5","source":3,"target":0,"x1":327,"y1":58,"x2":342,"y2":86},
                {"id":6,"label":"e6","source":3,"target":2,"x1":327,"y1":58,"x2":722,"y2":76},
                {"id":7,"label":"e7","source":4,"target":2,"x1":729,"y1":207,"x2":722,"y2":76}
                    ],
            "clusters":[
                {"label":"c0","level":1,"cildren":[4],"parents":[],"nodes":[],"x":338,"y":87.80000305175781,"r":80,"fill":"#8AC267","key":0,"index":0,"vy":0,"vx":0},
                {"label":"c1","level":1,"cildren":[],"parents":[],"nodes":[2],"x":704,"y":87.80000305175781,"r":40,"fill":"#7DE42A","key":1,"index":1,"vy":0,"vx":0},
                {"label":"c2","level":1,"cildren":[],"parents":[],"nodes":[1],"x":323,"y":233.8000030517578,"r":40,"fill":"#770B54","key":2,"index":2,"vy":0,"vx":0},
                {"label":"c3","level":1,"cildren":[5],"parents":[],"nodes":[],"x":718,"y":230.8000030517578,"r":80,"fill":"#7AC563","key":3,"index":3,"vy":0,"vx":0},
                {"label":"c4","level":2,"cildren":[],"parents":[0],"nodes":[0,3],"x":338,"y":87.80000305175781,"r":40,"fill":"#F8F736","key":4,"index":0,"vy":0,"vx":0},
                {"label":"c5","level":2,"cildren":[],"parents":[3],"nodes":[4,5],"x":718,"y":230.8000030517578,"r":40,"fill":"#DF2169","key":5,"index":0,"vy":0,"vx":0}
            ]};
    }
    if(p==1){
        data={
            "nodes":[
                {"id":0,"label":"n0","rotationScheme":[4],"cluster":"c1","x":382,"y":79.80000305175781,"key":0,"r":9,"index":0,"vy":0,"vx":0},
                {"id":1,"label":"n1","rotationScheme":[0],"cluster":"c1","x":359,"y":101.80000305175781,"key":1,"r":9,"index":1,"vy":0,"vx":0},
                {"id":2,"label":"n2","rotationScheme":[0,1],"cluster":"c7","x":255,"y":193.8000030517578,"key":2,"r":9,"index":0,"vy":0,"vx":0},
                {"id":3,"label":"n3","rotationScheme":[1,3],"cluster":"c7","x":260,"y":218.8000030517578,"key":3,"r":9,"index":1,"vy":0,"vx":0},
                {"id":4,"label":"n4","rotationScheme":[2,3,6],"cluster":"c8","x":310,"y":275.79998779296875,"key":4,"r":9,"index":0,"vy":0,"vx":0},
                {"id":5,"label":"n5","rotationScheme":[4,5,8,9],"cluster":"c5","x":523,"y":163.8000030517578,"key":5,"r":9,"index":0,"vy":0,"vx":0},
                {"id":6,"label":"n6","rotationScheme":[6,9],"cluster":"c5","x":508,"y":188.8000030517578,"key":6,"r":9,"index":1,"vy":0,"vx":0},
                {"id":7,"label":"n7","rotationScheme":[5,7,10],"cluster":"c6","x":541,"y":245.8000030517578,"key":7,"r":9,"index":0,"vy":0,"vx":0},
                {"id":8,"label":"n8","rotationScheme":[2,7],"cluster":"c6","x":549,"y":283.79998779296875,"key":8,"r":9,"index":1,"vy":0,"vx":0},
                {"id":9,"label":"n9","rotationScheme":[8,12],"cluster":"c9","x":806,"y":132.8000030517578,"key":9,"r":9,"index":0,"vy":0,"vx":0},
                {"id":10,"label":"n10","rotationScheme":[11],"cluster":"c9","x":783,"y":163.8000030517578,"key":10,"r":9,"index":1,"vy":0,"vx":0},
                {"id":11,"label":"n11","rotationScheme":[10,11,12],"cluster":"c10","x":742,"y":340.79998779296875,"key":11,"r":9,"index":0,"vy":0,"vx":0}
                ],
                "edges":[
                    {"id":0,"label":"e0","source":1,"target":2,"x1":359,"y1":101,"x2":255,"y2":193},
                    {"id":1,"label":"e1","source":2,"target":3,"x1":255,"y1":193,"x2":260,"y2":218},
                    {"id":2,"label":"e2","source":4,"target":8,"x1":310,"y1":275,"x2":549,"y2":283},
                    {"id":3,"label":"e3","source":3,"target":4,"x1":260,"y1":218,"x2":310,"y2":275},
                    {"id":4,"label":"e4","source":0,"target":5,"x1":382,"y1":79,"x2":523,"y2":163},
                    {"id":5,"label":"e5","source":5,"target":7,"x1":523,"y1":163,"x2":541,"y2":245},
                    {"id":6,"label":"e6","source":6,"target":4,"x1":508,"y1":188,"x2":310,"y2":275},
                    {"id":7,"label":"e7","source":8,"target":7,"x1":549,"y1":283,"x2":541,"y2":245},
                    {"id":8,"label":"e8","source":5,"target":9,"x1":523,"y1":163,"x2":806,"y2":132},
                    {"id":9,"label":"e9","source":6,"target":5,"x1":508,"y1":188,"x2":523,"y2":163},
                    {"id":10,"label":"e10","source":7,"target":11,"x1":541,"y1":245,"x2":742,"y2":340},
                    {"id":11,"label":"e11","source":11,"target":10,"x1":742,"y1":340,"x2":783,"y2":163},
                    {"id":12,"label":"e12","source":9,"target":11,"x1":806,"y1":132,"x2":742,"y2":340}],
                "clusters":[
                    {"label":"c0","level":1,"cildren":[7,8],"parents":[],"nodes":[],"x":278.5227799440625,"y":246.2066143577252,"r":120,"fill":"#6D54B4","key":0,"index":0,"vy":5e-324,"vx":-5e-324},
                    {"label":"c1","level":1,"cildren":[],"parents":[],"nodes":[0,1],"x":362.74550031632435,"y":92.61992603533321,"r":40,"fill":"#182E4F","key":1,"index":1,"vy":-5e-324,"vx":5e-324},
                    {"label":"c2","level":1,"cildren":[9],"parents":[],"nodes":[],"x":788,"y":147.8000030517578,"r":80,"fill":"#13E92E","key":2,"index":2,"vy":0,"vx":0},
                    {"label":"c3","level":1,"cildren":[10],"parents":[],"nodes":[],"x":749,"y":339.79998779296875,"r":80,"fill":"#4A6986","key":3,"index":3,"vy":0,"vx":0},
                    {"label":"c4","level":1,"cildren":[5,6],"parents":[],"nodes":[],"x":530.9499422430125,"y":217.6356225253934,"r":120,"fill":"#DA2D15","key":4,"index":4,"vy":-5e-324,"vx":5e-324},
                    {"label":"c5","level":2,"cildren":[],"parents":[4],"nodes":[5,6],"x":519.4560241386565,"y":179.32257192105806,"r":40,"fill":"#03A224","key":5,"index":0,"vy":4.620598947403278e-16,"vx":1.3861866976537863e-16},
                    {"label":"c6","level":2,"cildren":[],"parents":[4],"nodes":[7,8],"x":542.4438603473684,"y":255.94867312972872,"r":40,"fill":"#DCCC77","key":6,"index":1,"vy":-4.620598947403278e-16,"vx":-1.3861866976537863e-16},
                    {"label":"c7","level":2,"cildren":[],"parents":[0],"nodes":[2,3],"x":260.9487783519279,"y":209.70677521089468,"r":40,"fill":"#2395E4","key":7,"index":0,"vy":0.0000025353647914588384,"vx":0.000001220731540829506},
                    {"label":"c8","level":2,"cildren":[],"parents":[0],"nodes":[4],"x":296.0967815361971,"y":282.70645350455567,"r":40,"fill":"#8CE5FB","key":8,"index":1,"vy":-0.0000025353647914588384,"vx":-0.000001220731540829506},
                    {"label":"c9","level":2,"cildren":[],"parents":[2],"nodes":[9,10],"x":788,"y":147.8000030517578,"r":40,"fill":"#13AFEE","key":9,"index":0,"vy":0,"vx":0},
                    {"label":"c10","level":2,"cildren":[],"parents":[3],"nodes":[11],"x":749,"y":339.79998779296875,"r":40,"fill":"#5BDD61","key":10,"index":0,"vy":0,"vx":0}
                ]}
    }
    if(p==2){
        data={
            "nodes":[
                {"id":0,"label":"n0","rotationScheme":[],"cluster":"c10","x":268,"y":255.8000030517578,"key":0,"r":9,"index":0,"vy":0,"vx":0},
                {"id":1,"label":"n1","rotationScheme":[],"cluster":"c9","x":509,"y":58.80000305175781,"key":1,"r":9,"index":0,"vy":0,"vx":0},
                {"id":2,"label":"n2","rotationScheme":[4],"cluster":"c5","x":952,"y":222.8000030517578,"key":2,"r":9,"index":0,"vy":0,"vx":0},
                {"id":3,"label":"n3","rotationScheme":[2],"cluster":"c11","x":802,"y":259.79998779296875,"key":3,"r":9,"index":0,"vy":0,"vx":0},
                {"id":4,"label":"n4","rotationScheme":[1,2],"cluster":"c8","x":549,"y":194.8000030517578,"key":4,"r":9,"index":0,"vy":0,"vx":0},
                {"id":5,"label":"n5","rotationScheme":[4],"cluster":"c7","x":635,"y":112.80000305175781,"key":5,"r":9,"index":0,"vy":0,"vx":0},
                {"id":6,"label":"n6","rotationScheme":[0],"cluster":"c10","x":279,"y":236.8000030517578,"key":6,"r":9,"index":1,"vy":0,"vx":0},
                {"id":7,"label":"n7","rotationScheme":[0,1],"cluster":"c8","x":518,"y":194.8000030517578,"key":7,"r":9,"index":1,"vy":0,"vx":0},
                {"id":8,"label":"n8","rotationScheme":[3],"cluster":"c0","x":159,"y":185.8000030517578,"key":8,"r":9,"index":0,"vy":0,"vx":0},
                {"id":9,"label":"n9","rotationScheme":[],"cluster":"c1","x":144,"y":286.79998779296875,"key":9,"r":9,"index":0,"vy":0,"vx":0},
                {"id":10,"label":"n10","rotationScheme":[3],"cluster":"c9","x":498,"y":36.80000305175781,"key":10,"r":9,"index":1,"vy":0,"vx":0},
                {"id":11,"label":"n11","rotationScheme":[],"cluster":"c11","x":826,"y":268.79998779296875,"key":11,"r":9,"index":1,"vy":0,"vx":0}
            ],
            "edges":[
                {"id":0,"label":"e0","source":7,"target":6,"x1":518,"y1":194,"x2":279,"y2":236},
                {"id":1,"label":"e1","source":4,"target":7,"x1":549,"y1":194,"x2":518,"y2":194},
                {"id":2,"label":"e2","source":4,"target":3,"x1":549,"y1":194,"x2":802,"y2":259},
                {"id":3,"label":"e3","source":8,"target":10,"x1":159,"y1":185,"x2":498,"y2":36},
                {"id":4,"label":"e4","source":5,"target":2,"x1":635,"y1":112,"x2":952,"y2":222}
            ],
            "clusters":[
                {"label":"c0","level":1,"cildren":[],"parents":[],"nodes":[8],"x":157.79955056749327,"y":181.20858732528092,"r":40,"fill":"#0000DA","key":0,"index":0,"vy":-5e-324,"vx":-5e-324},
                {"label":"c1","level":1,"cildren":[],"parents":[],"nodes":[9],"x":144.9265786024896,"y":283.3778519372371,"r":40,"fill":"#000024","key":1,"index":1,"vy":5e-324,"vx":-5e-324},
                {"label":"c2","level":1,"cildren":[10],"parents":[],"nodes":[],"x":262.3184677075044,"y":251.55339094730988,"r":80,"fill":"#0000FE","key":2,"index":2,"vy":5e-324,"vx":5e-324},
                {"label":"c4","level":1,"cildren":[11],"parents":[],"nodes":[],"x":808.093927450562,"y":266.8640156189601,"r":80,"fill":"#005900","key":4,"index":3,"vy":5e-324,"vx":-5e-324},
                {"label":"c5","level":1,"cildren":[],"parents":[],"nodes":[2],"x":935.6242901977516,"y":214.54389174779163,"r":40,"fill":"#007600","key":5,"index":4,"vy":-5e-324,"vx":5e-324},
                {"label":"c6","level":1,"cildren":[9],"parents":[],"nodes":[],"x":504.3695256650365,"y":57.103416833691476,"r":80,"fill":"#FA3F2A","key":6,"index":5,"vy":-5e-324,"vx":-5e-324},
                {"label":"c7","level":1,"cildren":[],"parents":[],"nodes":[5],"x":624.6103949192736,"y":107.33680135818251,"r":40,"fill":"#F90000","key":7,"index":6,"vy":5e-324,"vx":5e-324},
                {"label":"c8","level":1,"cildren":[],"parents":[],"nodes":[4,7],"x":531.9115024205806,"y":194.04954961759853,"r":40,"fill":"#C90000","key":8,"index":7,"vy":5e-324,"vx":5e-324},
                {"label":"c9","level":2,"cildren":[],"parents":[6],"nodes":[1,10],"x":504.3695256650365,"y":57.103416833691476,"r":40,"fill":"#BE0000","key":9,"index":0,"vy":0,"vx":0},
                {"label":"c10","level":2,"cildren":[],"parents":[2],"nodes":[0,6],"x":262.3184677075044,"y":251.55339094730988,"r":40,"fill":"#043557","key":10,"index":0,"vy":0,"vx":0},
                {"label":"c11","level":2,"cildren":[],"parents":[4],"nodes":[3,11],"x":808.093927450562,"y":266.8640156189601,"r":40,"fill":"#E3BA88","key":11,"index":0,"vy":0,"vx":0}
            ]}
    }
    createCgraph(data);
    undGraph = new UnderlyingGraph("grafo", false, nodes, edges);
    incTree = new InclusionTree("albero", clusters);
    clusteredGraph = new ClusteredGraph(undGraph, incTree);
    redraw();
}