import React, { useRef, useEffect, useState } from "react";
import useResizeObserver from "./useResizeObserver";
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


  const [elements] = useState( props.data );
  const [size] = useState( 10 );

  // const height = 650;
  // const width = 1300;

  useEffect(() => {
    const svg = select(svgRef.current);

    svg
      .append("defs")
      .selectAll(".image-pattern")
      .data(props.data)
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

  }, [] );

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
    dimensions || wrapperRef.current.getBoundingClientRect();

  const position_x = scaleBand()
    .domain(props.data.map((d) => d.bytes))
    .range([0, width])

  const position_y = scaleLinear()
    .domain([min(props.data, (d) => d.bytes), max(props.data, (d) => d.bytes)]) 
    .range([height, 0]);

      svg
      .selectAll(".node")
      .data(props.data)
      .join("rect")
        .attr("class", "node")

        // .attr("width", 200).attr("height", 190).attr("fill-opacity", ".2")
        .style("fill-opacity", "0.8")
        
        .attr("width",  props.size * 1 ).attr("height", props.size *1.1 )

        .attr("stroke", "red").attr("fill", "none")
        // .style("fill", (d) => { return "url(#" + d.asset_id + ")"})  //id name of pattern
        .transition().duration(1500)
        .attr("x", (d) => position_x(d.bytes))
        .transition().duration(1500)
        .attr("y", (d) => position_y(d.bytes))

}, [props.data, dimensions] );

  return (
    <HashtagContainer>
      <CanvasContainer ref={wrapperRef} >
        <svg ref={svgRef} >
          <g className="plot-area" />
        </svg>
      </CanvasContainer>

    </HashtagContainer>
  );
}

const HashtagContainer = styled.div `
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-content: center;
  /* border: 1px solid turquoise */
`

const CanvasContainer = styled.div `
  width: 85vw;
  height: 80vh;
  margin: auto;
  /* border: 1px solid blue; */

  svg {
    width: 100vw;
    height: 100vh;
    /* border: 1px solid orange; */
  }
`


//Description
  //scaleBand split the axis and add margins
  //it split the axis in a defined number of elements
  //and divide the axis in those pieces
  //scaleLinear divide the axis without margins
  // from given range to the axis size
  // create defs/pattern to fill a shape with image
  // load each image with an id and then fill:url(#id)
