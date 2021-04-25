import React, { useRef, useEffect, useState } from "react";
import useResizeObserver from "./useResizeObserver";
import styled from 'styled-components'
import * as d3 from 'd3';

const getDate = dateString => {
  const date = dateString.split(/[-_.]/);
  return new Date(date[0], date[1], date[2], date[3], date[4], date[5]);
};

export default function ImgChart(  props  ) {

  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);  

  const [ APIelements ] = useState( props.data );
  const [ size, setSize ] = useState( 50 );
  const [ opacity, setOpacity ] = useState( 100 );
  const [ currentZoomState, setCurrentZoomState ] = useState(1);
  const [ viewBorderState ] = useState(true);
  // const [ sorting, setSorting ] = useState("bytes")

  // const zoomInit = d3.zoomIdentity.scale(0.1);

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
      .attr("href", (d) => { return d.url })        //from api object response
  }, [ APIelements ] );

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    let { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
    const margin = ({top: 60, bottom: 10, right: 30, left: 40});    
    if (!dimensions) return;

    width = width * 4;
    height = height *3;

    const minDate = d3.min(APIelements, (d) => getDate(d.ig_uploaded_at));
    const maxDate = d3.max(APIelements, (d) => getDate(d.ig_uploaded_at));

const xScale =  d3.scaleBand()
                  .domain( APIelements.map((d) => d.bytes ))
                  .range([ margin.left, width - margin.right ])

const yScale =  d3.scaleLinear()
                  .domain([ d3.min(APIelements, (d) => d.bytes), 
                            d3.max(APIelements, (d) => d.bytes) ]) 
                  .range([height-margin.bottom, margin.top]);

    // const xScale =  d3.scaleTime()
    //                   .domain([ minDate, maxDate ]) 
    //                   .range([margin.left, width - margin.right]);

    // const yScale =  d3.scaleLinear()
    //                   .domain([ 0, 
    //                             d3.max(APIelements, (d) => d.bytes) ]) 
    //                   .range([(margin.top, height - margin.bottom)]);

    const zoomed =  d3.zoom()
                      .scaleExtent([0.1, 15])
                      .translateExtent([
                        [ 0, 0 ], 
                        [ width, height] ])
                      .on("zoom", (event) => {
                        setCurrentZoomState(event.transform);
                      svg
                        .selectAll("rect")
                        .transition().duration(100)
                        .attr("transform", currentZoomState.toString())
                      });
    // function clicked(event, [x, y]) {
    //   event.stopPropagation();
    //   svg.transition().duration(750).call(
    //     d3.zoom.transform,
    //     d3.zoomIdentity.translate(width / 2, height / 2).scale(40).translate(-x, -y),
    //     // d3.mouse(svg.node())
    //   );
    // }

    svg.selectAll(".node")
      .data(APIelements)
      .join("rect")
      .attr("class", "node")
      .attr("fill", (d) => {
        if(viewBorderState) return "none" 
        return `url( #${d.asset_id} )` 
        })  //id name of pattern
      .attr("stroke", () => {
        if(!viewBorderState) { return "none" }
        return "red"
      })
      // .transition().duration(500)
      .style("opacity", opacity / 100)
      // .transition().duration(500)
      .attr("width", 80 ).attr("height", 80 )
      // .transition().duration(1500)
      // .attr("x", (d) => xScale(getDate(d.ig_uploaded_at)) )
      .attr("x", (d) => xScale(d.bytes) )
      // .transition().duration(1500)
      .attr("y", (d) => yScale(d.bytes) )

    svg.call(zoomed);

}, [ dimensions, size, opacity, currentZoomState, viewBorderState ]);

  return (
    <HashtagChartContainer>
      <InputWrapper>
        {/* <label for="size"> SIZE </label>
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
        /> */}

        {/* <label for="XScale"> XScale </label>
        <Input 
          id="XScale" 
          type="number" 
          min="0" max="10" step="0.5" defaultValue="1" 
          value={ XScaleFaktor }
          onChange= { e => setXScaleFaktor(e.target.value) }
        />

        <label for="YScale"> YScale </label>
        <Input 
          id="YScale" 
          type="number" 
          min="0" max="10" step="0.5" defaultValue="1" 
          value={ YScaleFaktor }
          onChange= { e => setYScaleFaktor(e.target.value) }
        /> */}

      </InputWrapper>

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
    cursor: crosshair;
    /* border: 1px solid orange; */
`
const InputWrapper = styled.div `
  display: flex;
  flex-direction: column;
  z-index: 1000;
`
const Input = styled.input `
  width: 50px;
  height: 40px;
  line-height: 1.65;
  float: left;
  display: block;
  padding: 0;
  margin: 0;
  text-align: left;
  padding-left: 15px;

  background: black;
  color: var(--font-color);
  font-size: 1.3rem;  
  font-family: 'Lato';
  border: none;
  /* border: 0.5px solid turquoise; */

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


  // https://www.freecodecamp.org/news/get-ready-to-zoom-and-pan-like-a-pro-after-reading-this-in-depth-tutorial-5d963b0a153e/