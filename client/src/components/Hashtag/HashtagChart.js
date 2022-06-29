import React, { useRef, useEffect, useState } from "react";
import useResizeObserver from "./useResizeObserver";
import styled from 'styled-components'
import * as d3 from 'd3';

const getDate = dateString => {
  return new Date(dateString);
};

export default function HashtagChart( props ) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);  

  const [ data, setData ] = useState([]);
  const [ viewState, setViewState ] = useState(false);

  useEffect(() => {
    const dataMounting = async() => {
      setData(props.data);
    }
    dataMounting();
  }, [data]);

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
    const margin = ({top: 10, bottom: 10, right: 20, left: 50})
    let { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();

    const chartWidth  = width  * 4; 
    const chartHeight = height * 3.2;
    const nodesGroup = svg.selectAll("rect");
    const rectSize = 40;

    const initialZoom = d3.zoomIdentity
      .scale(1.2)
      .translate((1.2 * chartWidth)/2 , height * 1 );

    d3.zoom()
    .translateTo(svg, initialZoom.x, initialZoom.y);

    d3.zoom()
    .scaleTo(svg, initialZoom.k);

    const xScale =  d3.scaleBand()
      .domain( data.map((d) => d.bytes ))
      .range([ margin.left + rectSize, chartWidth - margin.right- rectSize])
      .padding(rectSize);

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
      .scaleExtent([0.1, 20])
      .translateExtent([ 
        [ 0, 0 ], 
        [ chartWidth , chartHeight] ])
      .wheelDelta((event) => {
        return -event.deltaY * (event.deltaMode ? 120 : 1) / 200})
      .on("zoom", (event) => {
        // console.log("zoom: " + event);
        nodesGroup
          .attr("transform", event.transform.toString())}
      );

      // const simulation = d3.forceSimulation(nodesGroup)
      // .force('x', d3.forceX(width/2).strength(0.5))
      // .force('y', d3.forceY(width/2).strength(0.5))
      // .on('tick', ticked);

    function timeLine() {
      nodesGroup
        .transition().duration(5000)
        .attr("x", (d) => timeScale(getDate(d.ig_uploaded_at)))
      }

    function bytesSorting() {
      nodesGroup
        .transition().duration(5000)
        .attr("x", (d) => xScale(d.bytes) - rectSize/2 )
      }

    nodesGroup
      .data(data)
      .join("rect")
      .attr("class", "node")
      .attr("width",  rectSize )
      .attr("height", rectSize )
      .transition().duration(5000)
      .attr("x", (d) => xScale(d.bytes) - rectSize/2)
      .transition().duration(5000)
      .attr("y", (d) => yScale(d.bytes) - rectSize/2 )
      .attr("fill", (d) => {
        if(!viewState)  return "none" 
        else  return `url( #${d.asset_id} )`
      })  //id name of pattern
      .attr("stroke", () => {
        if(viewState)  return "none" 
        else  return "turquoise"
      })

    // function ticked() {
    //   nodesGroup
    //   .data(data)
    //   .join("rect")
    //   .attr("class", "node")
    //   .attr("width",  rectSize )
    //   .attr("height", rectSize )
    //   .transition().duration(5000)
    //   .attr("x", (d) => xScale(d.bytes) - rectSize/2)
    //   .transition().duration(5000)
    //   .attr("y", (d) => yScale(d.bytes) - rectSize/2 )
    //   .attr("fill", (d) => {
    //     if(!viewState)  return "none" 
    //     else  return `url( #${d.asset_id} )`
    //   })  //id name of pattern
    //   .attr("stroke", () => {
    //     if(viewState)  return "none" 
    //     else  return "turquoise"
    //   })
    // }

    // ticked();
    // simulation.nodes(nodesGroup)
    // .on('tick', ticked)

    //INITIAL ZOOM STATE
    nodesGroup
      .attr("transform", initialZoom);

    //ZOON FUNCTION
    svg.call(zoomed)

    //HANDLE BUTTON EVENT
    d3.select("#timeline")
      .on('click', () => {  timeLine(); })

    d3.select("#ordinal")
      .on('click', () => {  bytesSorting(); })

}, [ dimensions, data, viewState ]);

  return (
    <HashtagChartContainer>

      <CanvasContainer ref={wrapperRef} >
        <SVGCanvas ref={svgRef}/>
      </CanvasContainer>

      <ButtonContainer>
        <Button id="ordinal">ordinal</Button>
        <Button id="timeline">time</Button>
      </ButtonContainer>
    </HashtagChartContainer>
  );
}

const HashtagChartContainer = styled.div `
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  color: var(--font-color);
    /* border: 1px solid green; */
`
const CanvasContainer = styled.div `
  width: 99vw;
  height: 99vh;
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  margin-left: 3vw;
    /* border: 1px solid blue; */
`
const SVGCanvas = styled.svg `
  width: 100%;
  height: 98%;
    /* border: 1px solid orange; */
`
const ButtonContainer = styled.div`
  position: relative;
  bottom: 40px;
  left: 10px;
`
const Button = styled.button`
  width:80px;
  height:30px;
  margin-right:2px;
  padding:0;
  background-color: transparent;
  border: 1px solid turquoise;
  color: turquoise;
  text-transform: uppercase;
  text-align: center;
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