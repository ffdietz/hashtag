import React, { useRef, useEffect, useState } from "react";
import useResizeObserver from "./useResizeObserver";
import styled from 'styled-components'
import * as d3 from 'd3';

export default function ImgChart(  props  ) {

  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  console.log(props);

  const [ APIelements ] = useState( props.data );
  const [ viewState, setViewState ] = useState(true);
  const [ currentZoomState, setCurrentZoomState ] = useState(1);

  

  useEffect(() => {
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
  }, [APIelements] );

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const margin = ({top: 60, bottom: 10, right: 30, left: 40})
    let { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();

    width = width * 4;
    height = height * 3;

    const xScale =  d3.scaleBand()
                      .domain( APIelements.map((d) => d.bytes ))
                      .range([ margin.left, (width - margin.right)  ])

    const yScale =  d3.scaleLinear()
                      .domain([ d3.min(APIelements, (d) => d.bytes), 
                                d3.max(APIelements, (d) => d.bytes) ]) 
                      .range([(height - margin.bottom) , margin.top]);
    
    const zoomed =  d3.zoom()
                      .scaleExtent([0.1, 15])
                      .translateExtent([
                        [ 0, 0 ], 
                        [ width , height ] ])
                      .on("zoom", (event) => {
                        const zoomState = event.transform;
                        setCurrentZoomState(zoomState);
                        console.log(zoomState);
                        // const newScale = `
                        //           translate(${ (zoomState.x)} , ${ (zoomState.y) } )
                        //           scale(${zoomState.k})
                        //           `;
                        svg.selectAll("rect")
                            .transition().duration(50)
                            .attr("transform", zoomState.toString())
                        // console.log(newScale);
                      });

    svg
      .selectAll(".node")
      .data(APIelements)
      .join("rect")
        .attr("class", "node")
        .attr("fill", (d) => {
          if(viewState) return "none" 
          return `url( #${d.asset_id} )` 
          })  //id name of pattern
          .attr("stroke", () => {
            if(!viewState) return "none" 
            return "red"
          })

        .attr("width", 80 ).attr("height", 80 )
        .transition().duration(5000)
        .attr("x", (d) => xScale(d.bytes) - 80/2)
        .transition().duration(5000)
        .attr("y", (d) => yScale(d.bytes) - 80/2)
        
    svg.call(zoomed);

}, [ dimensions, currentZoomState ]);

  return (
    <HashtagChartContainer>
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
const CanvasContainer = styled.div `
  width: 95vw;
  height: 85vh;
  margin: auto;
  margin-top:10vh;
  /* border: 1px solid blue; */
`
const SVGCanvas = styled.svg `
    width: 95vw;
    height: 85vh;
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