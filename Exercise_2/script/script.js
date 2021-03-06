/*Start by setting up the canvas */
var margin = {t:50,r:100,b:50,l:100};
var width = $('.canvas').width() - margin.r - margin.l,
    height = $('.canvas').height() - margin.t - margin.b;

var canvas = d3.select('.canvas')
    .append('svg')
    .attr('width',width+margin.r+margin.l)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','canvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

/* set up scale and axes*/
var scales = {};
scales.x = d3.scale.linear().range([0,width]);
scales.y = d3.scale.linear().range([height,0]);

var axisX = d3.svg.axis()
    .orient('bottom')
    .tickSize(-height,0)
    .scale(scales.x);
var axisY = d3.svg.axis()
    .orient('left')
    .tickSize(-width,0)
    .scale(scales.y);


d3.csv('data/fao_coffee_world_1963_2013.csv', parse, dataLoaded);


function dataLoaded(err,rows){

    //Mine the data for max and min
    scales.x.domain( d3.extent(rows, function(d){ return d.year; }) );
    scales.y.domain( d3.extent(rows, function(d){ return d.value; }) );

    //Draw axes once
    canvas.append('g')
        .attr('class','axis x')
        .attr('transform','translate(0,'+height+')')
        .call(axisX);
    canvas.append('g')
        .attr('class','axis y')
        .call(axisY);

    draw(rows);
}

function draw(data){

    //Draw line

    //Draw area

    //Draw dots

}

function parse(row){
    //@param row is each unparsed row from the dataset

    if(row.Year && row.Value){
        return {
            year: +row.Year,
            value: +row.Value,
            element: row.ItemName
        }
    }else{
        return;
    }
}