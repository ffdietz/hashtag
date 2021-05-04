import React, { useRef, useEffect, useState } from "react";
import useResizeObserver from "./useResizeObserver";
import styled from 'styled-components'
import * as d3 from 'd3';

// const getDate = dateString => {
//   const date = dateString.split(/[-_.]/);
//   return new Date(date[0], date[1], date[2], date[3], date[4], date[5]);
// };

export default function ImgChart(  props  ) {

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
    const margin = ({top: 10, bottom: 60, right: 40, left: 20})
    let { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();

    const chartWidth  = width  * 4; 
    const chartHeight = height * 3;
    const rectSize = 80;

    const initialZoom = d3.zoomIdentity.scale(0.21).translate((0.21 * chartWidth) / 2 , height *1 ) ;

    d3.zoom()
      .translateTo(svg, initialZoom.x, initialZoom.y);
    d3.zoom()
      .scaleTo(svg, initialZoom.k);
    // const rectGroup = ;

    const xScale =  d3.scaleBand()
                      .domain( data.map((d) => d.bytes ))
                      .range([ margin.left + rectSize, chartWidth - margin.right- rectSize])

    const yScale =  d3.scaleLinear()
                      .domain([ d3.min(data, (d) => d.bytes), 
                                d3.max(data, (d) => d.bytes) ]) 
                      .range([chartHeight - margin.bottom - rectSize, margin.top + rectSize]);
    
    const zoomed =  d3.zoom()
                      .scaleExtent([0.1, 15])
                      .translateExtent([ [ margin.left, margin.top ], [ chartWidth - margin.right, chartHeight - margin.bottom ] ])
                      .on("zoom", (event) => {
                        // console.log(event);
                      svg
                        .selectAll("rect")
                        .transition().duration(10)
                        .attr("transform", event.transform.toString()
                          // `
                          // translate(${event.transform.x } , ${event.transform.y }) 
                          // scale(${event.transform.k})
                          // `
                        )
                      });
  // function clicked(event, [x, y]) {
  //   event.stopPropagation();
  //   svg.transition().duration(750).call(
  //     d3.zoom.transform,
  //     d3.zoomIdentity.translate(width / 2, height / 2).scale(40).translate(-x, -y),
  //     // d3.mouse(svg.node())
  //   );
  // }

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

    svg
      .selectAll("rect")
      .attr("transform", initialZoom);

    svg.call(zoomed)

}, [ dimensions, data, viewState ]);

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
  /* border: 1px solid blue; */
`
const CanvasContainer = styled.div `
  width: 98vw;
  height: 90vh;
  display: flex;
  margin-top: 4vh;
  justify-content: center;
  /* border: 1px solid blue; */
`
const SVGCanvas = styled.svg `
  width: 98vw;
  height: 90vh;
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