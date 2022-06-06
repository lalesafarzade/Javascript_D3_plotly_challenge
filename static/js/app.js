d3.json("data/samples.json").then(function(data) {
    console.log(data);
  });
  

//Function that Display each key-value pair from the metadata
function demo_info(sample){
    d3.json("data/samples.json").then(function(data) {
        let mdata=data.metadata;
        let res=mdata.filter(function(sample_res){return sample_res.id==sample});
        //let res=mdata.filter(sample_res => sample_res.id==sample)
        let data_res=res[0];
        //console.log(data_res)
        d3.select("#sample-metadata").html("");
        Object.entries(data_res).forEach(function([key,value]){
            d3.select("#sample-metadata")
            .append("p").text(`${key}:${value}`);

        });

    });
}


//bar chart function
function bar_building(sample){
    d3.json("data/samples.json").then(function(data) {
        let sampleData=data.samples;
        //let res=mdata.filter(function(sample_res){sample_res.id==sample});
        let res=sampleData.filter(sample_res => sample_res.id==sample)
        let data_res=res[0];
        
        //get the otu labels, values and ids
        let otu_ids=data_res.otu_ids;
        let otu_labels=data_res.otu_labels;
        let sample_values=data_res.sample_values;
        

        //barchart
        let yticks=otu_ids.slice(0,10).map(function(id){
            return `OTU ${id}`
        });

        let x_values=sample_values.slice(0,10);
        let text_labels=otu_labels.slice(0,10);

        let bar_chart={
            y:yticks.reverse(),
            x:x_values.reverse(),
            text:text_labels.reverse(),
            type:"bar",
            orientation:"h",
            mode:"markers",
            marker:{
                
                color:x_values,
                colorscale:"#FF4F00"
            }
        }

        let layout={
            margin: { t: 55, r: 25, l: 65, b: 25 },
            title:"Top 10 Belly Button Bacteria"
        };
        var config = {responsive: true}

        Plotly.newPlot("bar",[bar_chart],layout,config);

    });
}


//Bubble chart function
function bubble_building(sample){
    d3.json("data/samples.json").then(function(data) {
        let sampleData=data.samples;
        //let res=mdata.filter(function(sample_res){sample_res.id==sample});
        let res=sampleData.filter(sample_res => sample_res.id==sample)
        let data_res=res[0];
        
        //get the otu labels, values and ids
        let otu_ids=data_res.otu_ids;
        let otu_labels=data_res.otu_labels;
        let sample_values=data_res.sample_values;
        

        //bubble chart


        let bubble_chart={
            y:sample_values,
            x:otu_ids,
            text:otu_labels,
            mode:"markers",
            marker:{
                size:sample_values,
                color:otu_ids,
                colorscale:"#FF4F00"
            }
        }

        let layout={
            margin: { t: 55, r: 35, l: 55, b: 65 },
            title:"Bacteria Culture per sample",
            hovermode:"closest",
            xaxis:{title:"OTU ID"},
            yaxis:{title:"Sample Value"},
            
          
        };
        var config = {responsive: true}
        Plotly.newPlot("bubble",[bubble_chart],layout,config);

    });
}

//Gauge function
function Gauge_building(sample){
    d3.json("data/samples.json").then(function(data) {
        let mdata=data.metadata;
        let res=mdata.filter(function(sample_res){return sample_res.id==sample});
        //let res=mdata.filter(sample_res => sample_res.id==sample)
        let data_res=res[0]['wfreq'];
        console.log(data_res)
       
        // Gauge chart 
        var Gauge_chart = [
            {
              type: "indicator",
              mode: "gauge+number+delta",
              value: data_res,
              title: { text: "Belly Button Washing Frequency <br><i>Scrubs per Week</i>", font: { size: 20 } },
              //delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
              gauge: {
                axis: { range: [null, 9], tickwidth: 2, tickcolor: "black" },
                bar: { color: "#ff0000" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "black",
                steps: [
                  { range: [0, 1], color: "#ffdccc" },
                  { range: [1, 2], color: "#ffcab3"},
                  { range: [2, 3], color: "#ffb999" },
                  { range: [3, 4], color: "#ffa780"},
                  { range: [4, 5], color: "#ff9566" },
                  { range: [5, 6], color: "#ff844d"},
                  { range: [6, 7], color: "#ff7233"},
                  { range: [7, 8], color: "#ff6119" },
                  { range: [8, 9], color: "#ff4f00"},
                ],
                
              }
            }
          ];
          
          var layout = {
            
            margin: { t: 55, r: 25, l: 25, b: 25 },
        
            
          };
          var config = {responsive: true}
          Plotly.newPlot('gauge', Gauge_chart, layout ,config);


    });
}




// Fetch the JSON data and console log it
function initialize(){
    
    var select=d3.select("#selDataset");
    d3.json("data/samples.json").then(function(data) {
        let sample_names=data.names;
        console.log(sample_names)

        //making options for samples
        sample_names.forEach(function(sample) {
            select.append("option")
            .text(sample)
            .property("value",sample)
        });
        let sample1=sample_names[0];
        demo_info(sample1);
        bar_building(sample1);
        bubble_building(sample1);
        Gauge_building(sample1);
    });

    
}


// Function for dashboard updating

function optionChanged(item){
    demo_info(item)
    bar_building(item)
    bubble_building(item)
    Gauge_building(item)
}

initialize();
