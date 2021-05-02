import React, { useRef, useEffect, useState } from "react";
import useResizeObserver from "./useResizeObserver";
import styled from 'styled-components'
import * as d3 from 'd3';

export default function ImgChart(  props  ) {

  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  const [ data ] = useState( props.data );
  const [ viewState, setViewState ] = useState(true);
  const [ currentZoomState, setCurrentZoomState ] = useState(1);

  useEffect(() => {
  d3.select(svgRef.current)
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
    .attr("preserveAspectRatio", "none")
    .attr("href", (d) => { return d.url });        //from api object response
  }, [data] );

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    const margin = ({top: 10, bottom: 60, right: 40, left: 40})
    let { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();

    const chartWidth  = width  * 4; 
    const chartHeight = height * 3;
    const rectSize = 80;

    const initialZoom = d3.zoomIdentity.scale(0.2).translate((0.2 * chartWidth) / 2 , ( chartHeight)/2) ;

    const xScale =  d3.scaleBand()
                      .domain( data.map((d) => d.bytes ))
                      .range([ margin.left + rectSize, chartWidth - margin.right - rectSize])

    const yScale =  d3.scaleLinear()
                      .domain([ d3.min(data, (d) => d.bytes), 
                                d3.max(data, (d) => d.bytes) ]) 
                      .range([margin.top + rectSize , chartHeight - margin.bottom - rectSize]);
    
    const zoomed =  d3.zoom()
                      .scaleExtent([0.1, 15])
                      .translateExtent([ [ margin.left, margin.top ], [ chartWidth - margin.right, chartHeight - margin.bottom ] ])
                      .on("zoom", (event) => {
                      svg
                        .selectAll("rect")
                        .transition().duration(100)
                        .attr("transform", event.transform.toString())
                      });
    svg
      .selectAll("rect")
      .attr("transform", initialZoom);

    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("class", "node")
      .attr("fill", (d) => {
        if(!viewState) return "none" 
        else return `url( #${d.asset_id} )` 
      })  //id name of pattern
      .attr("stroke", () => {
        if(viewState) return "none" 
        else return "red"
      })
      .attr("width", rectSize ).attr("height", rectSize )
      .transition().duration(5000)
      .attr("x", (d) => xScale(d.bytes) - rectSize/2)
      .transition().duration(5000)
      .attr("y", (d) => yScale(d.bytes) - rectSize/2);

    svg.call(zoomed)

}, [ dimensions ]);

  return (
    <HashtagChartContainer>
      <CanvasContainer ref={wrapperRef} >
        <SVGCanvas ref={svgRef}/>
      </CanvasContainer>
    </HashtagChartContainer>
  );
}

const HashtagChartContainer = styled.div `
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--font-color);
`
const CanvasContainer = styled.div `
  width: 95vw;
  height: 85vh;
  display: flex;
  margin-top:12vh;
  justify-content: center;
  /* border: 1px solid blue; */
`
const SVGCanvas = styled.svg `
    width: 90vw;
    height: 80vh;
  /* justify-content: center; */
    /* border: 1px solid orange; */
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