//Retrieve data
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
  console.log(data);
  
  //Extract the necessary data for future use
  names = data.names;
  samples = data.samples;
  metadata = data.metadata;
  
  //create loop for the dropdown menu selection and have 940 be the constant on the dropdown menu
  const defaultID = 940;


  var selector = d3.select("#selDataset")

  for (var i=0; i<names.length; i++){
    selector.append("option").text(names[i]).property("value", names[i]);
  };

  optionChanged(defaultID)
  selector.on("change", optionChanged);

});

function optionChanged(value) {
    option = value;


  //retreieve data for the selected id
  var selection = d3.select("#selDataset")
  var dataset = selection.property("value")
  var samplesdata;
  var demographicdata;

  for (var i=0; i<samples.length; i++){
    if (dataset == samples[i].id){
      samplesdata = samples[i];
    };
  };

//create bar chart

  var barchart = [{
    x: samplesdata.sample_values.slice(0,10).reverse(),
    y: samplesdata.otu_ids.slice(0,10).reverse().map((id) => `OTU ${id}`),
    text: samplesdata.otu_labels.slice(0,10).reverse(),
    type:"bar",
    orientation:"h"
  }];

//create bar chart layout

  var layoutbar = {
    height: '100%',
    width: '100%',
  };

  Plotly.newPlot("bar", barchart, layoutbar);

//create bubble chart

  var bubblechart = [{
    x: samplesdata.otu_ids,
    y: samplesdata.sample_values,
    mode: "markers",
    marker: {
      size: samplesdata.sample_values,
      color: samplesdata.otu_ids,
      colorscale: "Blackbody"
    },
    text: samplesdata.otu_labels
  }];

//create bubble chart layout

  var bubblelayout = {
    xaxis: {
      title: {text: "OTU ID",}
    },
    showlegend: false,
    height: 800,
    width: 1400
  };

  Plotly.newPlot("bubble", bubblechart, bubblelayout);

//demographic info data tab

  for (var i=0; i<metadata.length; i++){
    if (dataset == metadata[i].id){
      demographicdata = metadata[i];
    };
  };

  // Adding html for each attribute to the tab
  d3.select(".panel-body").html(
    `<p> <b>id</b> : ${demographicdata.id}<br>
    <b>ethnicity</b> : ${demographicdata.ethnicity}<br>
    <b>gender</b> : ${demographicdata.gender}<br>
    <b>age</b> : ${demographicdata.age}<br>
    <b>location</b> : ${demographicdata.location}<br>
    <b>bbtype</b> : ${demographicdata.bbtype}<br>
    <b>wfreq</b> : ${demographicdata.wfreq}</p>`
  )};