import React, { useRef, useEffect, useState } from "react";
import useResizeObserver from "./useResizeObserver";
import styled from 'styled-components'
import * as d3 from 'd3';

const getDate = dateString => {
  const date = dateString.split(/[-_.]/);
  return new Date(date[0], date[1], date[2], date[3], date[4], date[5]);
};

export default function ImgChart( props ) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);  

  const [ data ] = useState( props.data );
  const [ viewState, setViewState ] = useState(true);
  // const [ currentZoomState, setCurrentZoomState ] = useState(1);

  useEffect(() => {
    d3
      .select(svgRef.current)
      .append("defs")
      .selectAll(".image-pattern")
      .data(data)
      .join("pattern")
      .attr("id", (d) => { return d.asset_id })     //from api object response
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("patternContentUnits","objectBoundingBox")
      .append("image")
      .attr("height", 1)
      .attr("width", 1)
      .attr("preserveAspectRatio", "xMidYMid")       // slice or meet
      .attr("href", (d) => { return d.url });        //from api object response
  }, [data] );

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    const margin = ({top: 10, bottom: 10, right: 20, left: 20})
    let { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();

    const chartWidth  = width  * 4; 
    const chartHeight = height * 3;
    const rectSize = 80;

    const initialZoom = d3.zoomIdentity.scale(0.21).translate((0.21 * chartWidth)/2 , height*1 );
    d3.zoom().translateTo(svg, initialZoom.x, initialZoom.y);
    d3.zoom().scaleTo(svg, initialZoom.k);

    const nodesGroup = svg.selectAll("rect");

    const xScale =  d3.scaleBand()
                      .domain( data.map((d) => d.bytes ))
                      .range([ margin.left + rectSize, chartWidth - margin.right- rectSize]);

    const yScale =  d3.scaleLinear()
                      .domain([ d3.min(data, (d) => d.bytes), 
                                d3.max(data, (d) => d.bytes) ]) 
                      .range([chartHeight - margin.bottom - rectSize, margin.top + rectSize]);

    const timeScale = d3.scaleTime()
                        .domain(
                          [ d3.min(data, d => getDate(d.ig_uploaded_at)),
                            d3.max(data, d => getDate(d.ig_uploaded_at))])
                        .range([ margin.right + rectSize, chartWidth - margin.left - rectSize ]);

    const zoomed =  d3.zoom()
                      .scaleExtent([0.1, 15])
                      .translateExtent([ 
                        [ 0, 0 ], 
                        [ chartWidth , chartHeight] ])
                      .wheelDelta((event) => {
                        return -event.deltaY * (event.deltaMode ? 120 : 1) / 2500})
                      .on("zoom", (event) => {
                        nodesGroup
                          .transition().duration(10)
                          .attr("transform", event.transform.toString())
                      });

    function timeLine() {
      nodesGroup
        .transition().duration(5000)
        .attr("x", (d) => timeScale(getDate(d.ig_uploaded_at)))
      }

    function ordinal() {
      nodesGroup
        .transition().duration(5000)
        .attr("x", (d) => xScale(d.bytes) - rectSize/2 )
      }


    d3.select("#timeline")
      .on('click', () => {  timeLine(); })

    d3.select("#ordinal")
      .on('click', () => {  ordinal(); })

    nodesGroup
      .data(data)
      .join("rect")
      .attr("class", "node")
      .attr("fill", (d) => {
        if(!viewState)  return "none" 
        else  return `url( #${d.asset_id} )`
      })  //id name of pattern
      .attr("stroke", () => {
        if(viewState)  return "none" 
        else  return "turquoise"
      })
      .attr("width",  rectSize )
      .attr("height", rectSize )
      .transition().duration(5000)
      .attr("x", (d) => xScale(d.bytes) - rectSize/2 )
      .transition().duration(5000)
      .attr("y", (d) => yScale(d.bytes) - rectSize/2 )

    nodesGroup
      .attr("transform", initialZoom);

    svg.call(zoomed)

}, [ dimensions, data, viewState ]);

  return (
    <HashtagChartContainer>
      <CanvasContainer ref={wrapperRef} >
        <SVGCanvas ref={svgRef}/>
      </CanvasContainer>

      <div>
        <Button id="timeline">time</Button>
        <Button id="ordinal">ordinal</Button>
      </div>
    </HashtagChartContainer>
    
  );
}

const HashtagChartContainer = styled.div `
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  color: var(--font-color);  
  /* border: 1px solid blue; */
`
const CanvasContainer = styled.div `
  width: 98vw;
  height: 90vh;
  display: flex;
  margin-top: 10px;
  justify-content: center;
  border: 1px solid blue;
`
const SVGCanvas = styled.svg `
  width: 98vw;
  height: 90vh;
    border: 1px solid orange;
`

const Button = styled.button`
  width:80px;
  height:30px;
  text-transform: uppercase;
  margin:10;
  padding:0;
`
//Description
  //scaleBand split the axis and add margins
  //it split the axis in a defined number of elements
  //and divide the axis in those pieces
  //scaleLinear divide the axis without margins
  // from given range to the axis size
  // create defs/pattern to fill a shape with image
  // load each image with an id and then fill:url(#id)


  // https://www.freecodecamp.org/news/get-ready-to-zoom-and-pan-like-a-pro-after-reading-this-in-depth-tutorial-5d963b0a153e/