import { Component, OnInit } from "@angular/core";
import * as d3 from "d3";
@Component({
  selector: "app-stock-chart",
  templateUrl: "./stock-chart.component.html",
  styleUrls: ["./stock-chart.component.scss"]
})
export class StockChartComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.chartIt()
  }

  chartIt() {
    const barData = [];
    for (let i = 0; i < 50; i++) {
      barData.push(Math.random() * 40);
    }

    const margin = { top: 0, right: 0, bottom: 30, left: 40 };

    const height = 250 - margin.top - margin.bottom,
      width = 350 - margin.left - margin.right,
      barWidth = 50,
      barOffset = 5;

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(barData)])
      .range([0, height]);

    const xScale = d3
      .scaleBand()
      .domain(barData)
      .padding(0.3)
      .range([0, width]);

    const colors = d3
      .scaleLinear<string>()
      .domain([0, d3.max(barData)])
      .range(["red", "green"]);

    var tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("padding", "0 10px")
      .style("background", "white")
      .style("opacity", 0);

    const yAxisValues = d3
      .scaleLinear()
      .domain([0, d3.max(barData)])
      .range([height, 0]);

    const yAxisTicks = d3.axisLeft(yAxisValues).ticks(10);

    var myChart = d3
      .select("#viz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.right})`)
      .style("background", "#C9D7D6")
      .selectAll("rect")
      .data(barData)
      .enter()
      .append("rect")
      .attr("fill", (d, i) => colors(d))
      .attr("width", () => xScale.bandwidth())
      .attr("height", 0)
      .attr("x", d => xScale(d))
      .attr("y", d => height)
      .on("mouseover", function(d) {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0.9)
          .style("background", "black")
        tooltip
          .html(d.toFixed(2))
          .style("left", d3.event.pageX - 35 + "px")
          .style("top", d3.event.pageY - 30 + "px");
        
      })
      .on("mouseout", function(d) {
        d3.select(this).style("opacity", 1);
      });

    const yGuide = d3
      .select("#viz svg")
      .append("g")
      .attr("transform", "translate(20,0)")
      .call(yAxisTicks);

    myChart
      .transition()
      .attr("height", d => yScale(d))
      .attr("y", d => height - yScale(d))
      .delay((d, i) => i * 20)
      .duration(1000)
      .ease(d3.easeBounceOut);
  }
}
