import React, { useRef, useEffect, useState } from "react";
import useResizeObserver from "./useResizeObserver";
import styled from 'styled-components'
import * as d3 from 'd3';

export default function ImgChart(  props  ) {

  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  const [ APIelements ] = useState( props.data );
  const [ size, setSize ] = useState( 50 );
  const [ opacity, setOpacity ] = useState( 70 );
  const [ currentZoomState, setCurrentZoomState ] = useState(1);
  // const [ sorting, setSorting ] = useState("bytes")

  function ImageDefsPattern () {
      d3.select(svgRef.current)
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
  }

  useEffect(() => {
    ImageDefsPattern();
  }, [APIelements] );

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const margin = ({top: 60, bottom: 10, right: 30, left: 40})
    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();

    const xScale =  d3.scaleBand()
                      .domain( APIelements.map((d) => d.bytes ))
                      .range([ margin.left, width - margin.right ])

    // if (currentZoomState) {
    //   const newXScale = currentZoomState.scale(xScale).domain();
    //   xScale.domain(currentZoomState.rescale(xScale).domain());
    // }

    const yScale =  d3.scaleLinear()
                      .domain([ d3.min(APIelements, (d) => d.bytes), 
                                d3.max(APIelements, (d) => d.bytes) ]) 
                      .range([height-margin.bottom, margin.top]);
    
    const zoomBehavior =  d3.zoom()
                            .scaleExtent([0.5, 10])
                            .translateExtent([
                              [ margin.left, margin.top ], 
                              [ width - margin.right, height-margin.bottom ] ])
                            .on("zoom", (event) => {
                              // xScale.range([margin.left, width - margin.right].map(d => event.transform.applyX(d)));
                              // svg.selectAll(".node").attr("xScale", d => xScale(d.bytes));
                              // const zoomState = event.transform;
                              // setCurrentZoomState(zoomState);

                              // const newScale = `translate(${zoomState.x}, ${zoomState.y}) scale(${zoomState.k})`;                              
                              // svg.transition().duration(750)
                              //     .attr("transform", newScale)
                              // console.log(newScale);
                            });

    svg
      .selectAll(".node")
      .data(APIelements)
      .join("rect")
        .attr("class", "node")
        .style("fill", (d) => { return "url(#" + d.asset_id + ")"})  //id name of pattern
        // .style("fill", "none").style("stroke", "red")

        .transition().duration(500)
        .style("opacity", opacity / 100)

        .transition().duration(500)
        .attr("width", 100 ).attr("height", 100 )

        .transition().duration(1500)
        .attr("x", (d) => xScale(d.bytes) - size/2)

        .transition().duration(1500)
        .attr("y", (d) => yScale(d.bytes) - size/2)

    svg.call(zoomBehavior);

}, [ dimensions, size, opacity, currentZoomState] );

  return (
    <HashtagChartContainer>
      <InputContainer>
        <label for="size"> SIZE </label>
        <Input 
          id="size" 
          type="number" 
          min="0" max="80" step="2" defaultValue="40" 
          value={ size }
          onChange= { e => setSize(e.target.value) }
        />
          
        <label for="opacity"> OPACITY </label>
        <Input 
          id="opacity"
          type="number"
          min="5" max="100" step="5" defaultValue="60" 
          value={ opacity }
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
  color: var(--font-color);
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
const Input = styled.input `
  width: 50px;
  height: 40px;
  line-height: 1.65;
  /* float: left; */
  display: block;
  padding: 0;
  margin: 0;
  text-align: left;
  padding-left: 15px;

  background: black;
  color: var(--font-color);
  font-size: 1.1rem;  
  font-family: 'Lato', sans-serif;
  border: 0.5px solid turquoise;
  /* border: 1px solid #eee; */

  &:focus {
  border: 0.5px solid turquoise;
  }
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
