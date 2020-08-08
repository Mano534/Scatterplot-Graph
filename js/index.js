let xml =new XMLHttpRequest();

let data ,
    url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',
    values ; 



let ALLFunctionalityOfCircleChart = (data)=>{
    let info = JSON.parse(data);
    let dates = [] ;

    info.forEach(element => {
        dates.push(new Date(element.Seconds*1000));
    });
    let h = 700;
    let w = 900; 

    let padding = 80;

             

    let svg  = d3.select('body')
             .append('svg')
             .attr('width',w)
             .attr('height',h)
             .attr('id',"svg")


    let title1 = svg.append('text')
             .text(`Doping in Professional Bicycle Racing`)
             .attr('x',w/2)
             .attr('y',(5*h)/100)
             .style("text-anchor", "middle")
             .style("font-size", "1.5rem")
             .attr('id','title')

    let title2 = svg.append('text')
             .text(`35 Fastest times up Alpe d'Huez`)
             .attr('x',w/2)
             .attr('y',(10*h)/100)
             .style("text-anchor", "middle")


    let xAxisScale = d3.scaleLinear()
             .domain([d3.min(info , d=>d.Year-1),d3.max(info , d=>d.Year+1)])
             .range([padding,w-padding])

    let yAxisScale = d3.scaleTime()
             .domain([d3.max(dates),d3.min(dates)])
             .range([h-padding,padding])


    let yScale = d3.scaleLinear()
             .domain([d3.min(info,d=>d.Seconds*1000),d3.max(info,d=>d.Seconds*1000)])
             .range([0,h-padding*2])


    let xColorScale = d3.scaleLinear()
            .domain([d3.min(info , d=>d.Year-1),d3.max(info , d=>d.Year+1)])
            .range(['#FF5133','#0A98DD '])
    
    let xScale = d3.scaleLinear()
             .domain([d3.min(info , d=>d.Year-1),d3.max(info , d=>d.Year+1)])
             .range([0,w-padding*2])



    let circle = svg.selectAll('circle')
             .data(info)
             .enter()
             .append('circle')
             .attr('cx',d=>xScale(d.Year))
             .attr('cy',d=>yScale(d.Seconds*1000))
             .attr('r',5)
             .attr('transform',`translate(${padding},${padding})`)
             .attr('class','dot')
             .attr('data-xvalue',d=>d.Year)
             .attr('data-yvalue',d=>new Date(d.Seconds*1000))
             .on('mouseover',function(d){
                document.getElementById('tooltip').setAttribute('data-year',d.Year) ;
                document.getElementById('tooltip').innerText = d.Year ;
                 
                 document.getElementById('tooltip').style.visibility = "visible";
                document.addEventListener('mousemove',function(e){
                    console.log(e)
                    document.getElementById('tooltip').style.top = e.y+'px' ;
                    document.getElementById('tooltip').style.left = e.x+5+'px' ;
            })})
            .on('mouseout',function(d){
                document.getElementById('tooltip').style.visibility = "hidden";
            })
            .attr('fill',d=>xColorScale(d.Year))
            .attr('id','cir')



    let xAxis = svg.append('g')
            .call(d3.axisBottom(xAxisScale).tickFormat(d=>+d))
            .attr('transform',`translate(0,${h-padding})`)
            .attr('id',"x-axis")

    let yAxis = svg.append('g')
            .call(d3.axisLeft(yAxisScale).tickFormat(d3.timeFormat('%M:%S')))
            .attr('transform',`translate(${padding},0)`)
            .attr('id',"y-axis")

    let legend = svg.append('text')
             .text('Doping and Not Doping')
             .attr('transform',`translate(${w/2+padding*4+10},${h/2})`)
             .attr('id',"legend")
             .style("text-anchor", "middle")
             .style('z-index',2)

    

    let legendRect = svg.append('rect')
             .attr('transform',`translate(${w/2+padding*2.5},${h/2-17})`)
             .style('z-index',2)
             .style('fill',"red")
             .attr("width",20)
             .attr("height",20)



    console.log(info)











}
























xml.open('GET',url,true);
xml.onreadystatechange=()=>{
    if(xml.status === 200 && xml.readyState === 4){
        data = xml.response ; 
        ALLFunctionalityOfCircleChart(data);
    }
}
xml.send();