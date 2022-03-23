//Function that Display each key-value pair from the metadata
function demo_info(sample){
    d3.json("data/samples.json").then(function(data) {
        let mdata=data.metadata;
        //let res=mdata.filter(function(sample_res){sample_res.id==sample});
        let res=mdata.filter(sample_res => sample_res.id==sample)
        let data_res=res[0];
        console.log(data_res)
        d3.select("#sample-metadata").html("");
        Object.entries(data_res).forEach(function([key,value]){
            d3.select("#sample-metadata")
            .append("h5").text(`${key}:${value}`);

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
            orientation:"h"
        }

        let layout={
            title:"Top 10 Belly Button Bacteria"
        };

        Plotly.newPlot("bar",[bar_chart],layout);

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
        let yticks=otu_ids.slice(0,10).map(function(id){
            return `OTU ${id}`
        });

        let x_values=sample_values.slice(0,10);
        let text_labels=otu_labels.slice(0,10);

        let bubble_chart={
            y:sample_values,
            x:otu_ids,
            text:otu_labels,
            mode:"markers",
            marker:{
                size:sample_values,
                color:otu_ids,
                colorscale:"Earth"
            }
        }

        let layout={
            title:"Bacteria Culture per sample",
            hovermode:"closest",
            xaxis:{title:"OTU ID"}
        };

        Plotly.newPlot("bubble",[bubble_chart],layout);

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
    });

    
}


// Function for dashboard updating

function optionChanged(item){
    demo_info(item);
    bar_building(item)
    bubble_building(item)
}

initialize();
