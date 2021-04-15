import React, { useRef, useEffect, useState } from "react";
import useResizeObserver from "./useResizeObserver";
import DefsPattern from './DefsPattern'
import styled from 'styled-components'
import  { 
  min,
  max,
  select,
  scaleBand,
  scaleLinear
} from 'd3';
// import * as d3 from 'd3';

export default function ImgChart(  props  ) {

  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);


  const [ APIelements ] = useState( props.data );
  const [ size, setSize ] = useState( 10 );
  const [ opacity, setOpacity ] = useState( 0.5 );

console.log(APIelements.length);

  function DefsPattern (target) {
    return (
      target
        .append("defs")
        .selectAll(".image-pattern")
        .data(APIelements)
        .join("pattern")
        .attr("id", (d) => { return d.asset_id })     //from api object response
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "none")
        .attr("href", (d) => { return d.url } )        //from api object response
      )
  }

  useEffect(() => {
    const svg = select(svgRef.current);
    DefsPattern(svg);
  }, [APIelements] );

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
    dimensions || wrapperRef.current.getBoundingClientRect();

  const position_x = scaleBand()
    .domain(APIelements.map((d) => d.bytes))
    // .domain([ 0, APIelements.length])
    .range([0, width])
    .padding(0.5)

  const position_y = scaleLinear()
    .domain([min(APIelements, (d) => d.bytes), max(APIelements, (d) => d.bytes)]) 
    .range([height, 0]);

      svg
      .selectAll(".node")
      .data(APIelements)
      .join("rect")
        .attr("class", "node")
        .style("fill", (d) => { return "url(#" + d.asset_id + ")"})  //id name of pattern

        .transition().duration(500)
        .style("fill-opacity", opacity)

        .transition().duration(1500)
        .attr("width",  size * 1 ).attr("height", size *1.1 )
        
        .style("object-fit", 'contain')
        .transition().duration(1500)
        .attr("x", (d) => position_x(d.bytes))
        .transition().duration(1500)
        .attr("y", (d) => position_y(d.bytes))

}, [APIelements, dimensions, size, opacity] );

  return (
    <HashtagChartContainer>
      <InputContainer>
        <input 
          id="size" 
          type="number" 
          min="0" max="80" step="1" defaultValue="40" 
          value={size}
          onChange= { e => setSize(e.target.value) }
        />
        <input 
          id="opacity"
          type="number"
          min="0" max="1" step="0.05" defaultValue="1" 
          value={opacity}
          onChange= { e => setOpacity(e.target.value) }
        />
      </InputContainer>
      <CanvasContainer ref={wrapperRef} >
        <SVGCanvas ref={svgRef} />
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
`
const InputContainer = styled.div `
  display: flex;
  flex-direction: column;
`

const CanvasContainer = styled.div `
  width: 90vw;
  height: 80vh;
  margin: auto;
  /* border: 1px solid blue; */
`
const SVGCanvas = styled.svg `
    width: 100vw;
    height: 100vh;
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
