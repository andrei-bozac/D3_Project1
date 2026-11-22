
import { scaleBand, scaleLinear } from "d3-scale";

function Barplot({ data }) {


  const width = 500;
  const height = 400;


  const margin = {
    top: 20,
    right: 40,
    bottom: 30,
    left: 130
  };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;


  const yScale = scaleBand()
    .domain(data.map(d => d.country))
    .range([margin.top, height - margin.bottom])
    .padding(0.2);

  const xScale = scaleLinear()
    .domain([0, Math.max(...data.map(d => d.students), 0) || 1])
    .nice()
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>

      {data.map((d) => (
        <g key={d.country}>

          <rect
            x={margin.left}
            y={yScale(d.country)}
            width={xScale(d.students)}
            height={yScale.bandwidth()}
            fill="steelblue"
          />

          <text
            x={margin.left - 10}
            y={yScale(d.country) + yScale.bandwidth() / 2}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize="12"
          >
            {d.country}
          </text>

          <text
            x={margin.left + xScale(d.students) + 5}
            y={yScale(d.country) + yScale.bandwidth() / 2}
            dominantBaseline="middle"
            fontSize="12"
          >
            {d.students}
          </text>

        </g>
      ))}

    </svg>
  );
}

export default Barplot;
