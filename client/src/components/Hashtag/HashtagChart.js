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
  const [ opacity, setOpacity ] = useState( 100 );
  const [ currentZoomState, setCurrentZoomState ] = useState(1);
  const [ XScaleFaktor, setXScaleFaktor ] = useState(1);
  const [ YScaleFaktor, setYScaleFaktor ] = useState(1);  
  const [ viewState, setViewState ] = useState(false);
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
        .attr("href", (d) => { 
          const quality = "q_60";
          d.url;
          console.log(quality);
          return quality 
        } )        //from api object response
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
                        xScale.range([margin.left, width - margin.right].map(d => event.transform.applyX(d)));
                        svg.selectAll("rect").attr("xScale", d => xScale(d.bytes));
                        const zoomState = event.transform;
                        setCurrentZoomState(zoomState);
                        // console.log(zoomState);
                        // const newScale = `
                        //           translate(${ (zoomState.x)} , ${ (zoomState.y) } )
                        //           scale(${zoomState.k})
                        //           `;
                        svg.selectAll("rect")
                            .transition().duration(250)
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

        // .transition().duration(500)
        .style("opacity", opacity / 100)
        // .transition().duration(500)
        .attr("width", 80 ).attr("height", 80 )
        // .transition().duration(1500)
        .attr("x", (d) => xScale(d.bytes) - 80/2)
        // .transition().duration(1500)
        .attr("y", (d) => yScale(d.bytes) - 80/2)
        
    svg.call(zoomed);

}, [ dimensions, size, opacity, currentZoomState, XScaleFaktor, YScaleFaktor, viewState ]);

  return (
    <HashtagChartContainer>
      <InputWrapper>
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