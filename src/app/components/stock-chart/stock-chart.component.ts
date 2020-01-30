import { Component, OnInit } from "@angular/core";
import * as d3 from "src/assets/d3.v5.js";

@Component({
  selector: "app-stock-chart",
  templateUrl: "./stock-chart.component.html",
  styleUrls: ["./stock-chart.component.scss"]
})
export class StockChartComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  chartItCandle(data: Object) {
    const margin = { top: 15, right: 65, bottom: 235, left: 50 };
    const w = 420 - margin.left - margin.right;
    const h = 400 - margin.top - margin.bottom;
    const margin2 = { top: 225, right: 65, bottom: 130, left: 50 };
    const h2 = 400 - margin2.top - margin2.bottom;

    const prices: DataInterface[] = data["timestamp"].map((e, i) => {
      return {
        date: new Date(data["timestamp"][i] * 1000),
        open: data["chart"]["open"][i].toFixed(2),
        close: data["chart"]["close"][i].toFixed(2),
        high: data["chart"]["high"][i].toFixed(2),
        low: data["chart"]["low"][i].toFixed(2)
      };
    });

    const months = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "Jun",
      6: "Jul",
      7: "Aug",
      8: "Sep",
      9: "Oct",
      10: "Nov",
      11: "Dec"
    };

    function wrap(text, width) {
      text.each(function() {
        var text = d3.select(this);
        var words = text
          .text()
          .split(/\s+/)
          .reverse();
        var word;
        var line = [];
        var lineNumber = 0;
        var lineHeight = 1.1;
        var y = text.attr("y");
        var dy = parseFloat(text.attr("dy"));
        var tspan = text
          .text(null)
          .append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", dy + "em");
        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text
              .append("tspan")
              .attr("x", 0)
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + dy + "em")
              .text(word);
          }
        }
      });
    }

    function brushed() {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return;
      var e;
      var s;
      if (!d3.event.selection) {
        if (d3.event.sourceEvent !== undefined) {
          e = d3.event.sourceEvent.x;
          s = [
            e - 60 - (dates.length / w) * 25,
            e - 60 + (dates.length / w) * 25
          ];
          brushTransform(s);
        }
      } else {
        s = d3.event.selection;
        brushTransform(s);
      }

      function brushTransform(s) {
        focus.select(".axis--x").call(xAxis);
        focus.call(
          zoom.transform,
          d3.zoomIdentity.scale(w / (s[1] - s[0])).translate(-s[0], 0)
        );
      }
    }

    // zoom drag or scroll
    function zoomed() {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return;

      var t = d3.event.transform;
      let xScaleZ = t.rescaleX(xScale);

      let hideTicksWithoutLabel = function() {
        d3.selectAll(".xAxis .tick text").each(function(d) {
          if (this.innerHTML === "") {
            this.parentNode.style.display = "none";
          }
        });
      };

      gX.call(
        d3
          .axisBottom(xScaleZ)
          .ticks(8, 4)
          .tickFormat(d => dateFormatter(d))
      );

      candles
        .attr("x", (d, i) => xScaleZ(i) - (xBand.bandwidth() * t.k) / 2)
        .attr("width", xBand.bandwidth() * t.k);
      resizeTimer;

      stems.attr(
        "x1",
        (d, i) => xScaleZ(i) - xBand.bandwidth() / 2 + xBand.bandwidth() * 0.5
      );
      stems.attr(
        "x2",
        (d, i) => xScaleZ(i) - xBand.bandwidth() / 2 + xBand.bandwidth() * 0.5
      );

      hideTicksWithoutLabel();

      gX.selectAll(".tick text").call(wrap, xBand.bandwidth());

      focus.select(".axis--x").call(xAxis);
      context
        .select(".brush")
        .call(brush.move, xScale.range().map(t.invertX, t));
    }//zoom

    function zoomend() {
      var t = d3.event.transform;
      let xScaleZ = t.rescaleX(xScale);

      clearTimeout(resizeTimer);
      var resizeTimer = setTimeout(function() {
        this.xmin = new Date(xDateScale(Math.floor(xScaleZ.domain()[0])));
        this.xmax = new Date(xDateScale(Math.floor(xScaleZ.domain()[1])));
        var filtered = prices.filter(
          d => d.date >= this.xmin && d.date <= this.xmax
        );

        var minP = d3.min(filtered, d => d.low);
        var maxP = d3.max(filtered, d => d.high);
        var buffer = Math.floor((maxP - minP) * 0.1);

        yScale.domain([minP - buffer, maxP + buffer]);
        candles
          .transition()
          .duration(800)
          .attr("y", d => yScale(Math.max(d.open, d.close)))
          .attr("height", d =>
            d.open === d.close
              ? 1
              : yScale(Math.min(d.open, d.close)) -
                yScale(Math.max(d.open, d.close))
          );

        stems
          .transition()
          .duration(800)
          .attr("y1", d => yScale(d.high))
          .attr("y2", d => yScale(d.low));

        gY.transition()
          .duration(800)
          .call(d3.axisLeft().scale(yScale));
      }, 300);
    }

    function dateFormatter(d) {
      var d = dates[d];
      if (d !== undefined) {
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
      }
    }

    d3.select("#container")
      .selectAll("svg")
      .remove();

    d3.select("#container")
      .selectAll("h2")
      .remove();

    d3.select("#container")
      .append("h2")
      .style("color", "white")
      .html(data["country"]);

    var tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("padding", "0 10px")

      .style("background", "#454b54")
      .style("font-size", "8px")
      .style("opacity", 0);

    var svg = d3
      .select("#container")
      .append("svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom);

    // define chart dimensions
    var focus = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // define brush dimensions
    var context = svg
      .append("g")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

    // get array of dates in data
    const dates = data["timestamp"].map(e => new Date(e * 1000));
    // console.log(dates)

    // define min and max dates in data
    var xmin = d3.min(prices.map(e => e.date.getTime()));
    var xmax = d3.max(prices.map(e => e.date.getTime()));

    var xScale = d3
      .scaleLinear()
      .domain([-1, dates.length])
      .range([0, w]);

    // define quantize date scale with continuous domain and discrete range
    var xDateScale = d3
      .scaleQuantize()
      .domain([0, dates.length])
      .range(dates);

    // define banded x-axis scale to account for discontinuities in financial time series
    let xBand = d3
      .scaleBand()
      .domain(d3.range(-1, dates.length))
      .range([0, w])
      .padding(0.3);

    var xAxis = d3
      .axisBottom()
      .scale(xScale)
      .ticks(8)
      .tickFormat(d => dateFormatter(d));

    // add clip path to focus - needed to make chart draggable
    focus
      .append("rect")
      .attr("id", "rect")
      .attr("width", w)
      .attr("height", h)
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr("clip-path", "url(#clip)");

    // Add x-axis to chart
    var gX = focus
      .append("g")
      .attr("class", "axis x-axis") //Assign "axis" class
      .attr("transform", "translate(0," + h + ")")
      .call(xAxis);

    // wrap x-axis labels
    gX.selectAll(".tick text").call(wrap, xBand.bandwidth());

    // add x-axis to brush
    var gX2 = context
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + h2 + ")")
      .call(xAxis);

    // add brush x-axis labels
    gX2.selectAll(".tick text").call(wrap, xBand.bandwidth());

    // define min and max prices in data
    var ymin = d3.min(prices.map(e => e.low));
    var ymax = d3.max(prices.map(e => e.high));

    // define linear y-axis scale
    var yScale = d3
      .scaleLinear()
      .domain([ymin, ymax])
      .range([h, 0])
      .nice();

    // define y-axis and apply scale
    var yAxis = d3.axisLeft().scale(yScale);

    // Add y-axis to chart
    var gY = focus
      .append("g")
      .attr("class", "axis y-axis")
      .call(yAxis);

    // add clip-path to chart
    var chartBody = focus
      .append("g")
      .attr("class", "chartBody")
      .style("pointer-events", "all")
      .attr("clip-path", "url(#clip)");

    // draw candles
    let candles = chartBody
      .selectAll(".candle")
      .data(prices)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(i) - xBand.bandwidth())
      .attr("class", "candle")
      .attr("y", d => yScale(Math.max(d.open, d.close)))
      .attr("width", xBand.bandwidth())
      .attr("height", d =>
        d.open === d.close
          ? 1
          : yScale(Math.min(d.open, d.close)) -
            yScale(Math.max(d.open, d.close))
      )
      .attr("fill", d =>
        d.open === d.close ? "silver" : d.open > d.close ? "red" : "green"
      )
      .on("mouseover", function(d) {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip
          .html(
            `O:${d.open}\n
                 C:${d.close}\n
                 H:${d.high}\n
                 L:${d.low}`
          )
          .style("left", d3.event.pageX - 35 + "px")
          .style("top", d3.event.pageY - 30 + "px");
        d3.select(this).style("opacity", 0.5);
      })
      .on("mouseout", function(d) {
        d3.select(this).style("opacity", 1);
      });

    // draw high and low in candles
    let stems = chartBody
      .selectAll("g.line")
      .data(prices)
      .enter()
      .append("line")
      .attr("class", "stem")
      .attr("x1", (d, i) => xScale(i) - xBand.bandwidth() / 2)
      .attr("x2", (d, i) => xScale(i) - xBand.bandwidth() / 2)
      .attr("y1", d => yScale(d.High))
      .attr("y2", d => yScale(d.Low))
      .attr("stroke", d =>
        d.open === d.close ? "white" : d.open > d.close ? "red" : "green"
      );

    // append clipPath to focus
    focus
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", w)
      .attr("height", h);

    // define brush and bind ebvent listeners
    var currentExtent;
    var brush = d3
      .brushX()
      .extent([
        [0, 0],
        [w, h2]
      ])
      .on("brush end", brushed);

    // define zoom and bind event listeners
    const extent = [
      [0, 0],
      [w, h]
    ];
    var resizeTimer;
    var zoom = d3
      .zoom()
      .scaleExtent([1, 100])
      .translateExtent(extent)
      .extent(extent)
      .on("zoom", zoomed)
      .on("zoom.end", zoomend);

    // initialise brush state
    context
      .append("g")
      .attr("class", "brush")
      .on("click", brushed)
      .call(brush)
      .call(brush.move, [w - (dates.length / w) * 500, w]);

    // initialise zoom state
    focus.call(zoom);
  }
}
interface DataInterface {
  date: Date;
  open: number;
  close: number;
  high: number;
  low: number;
}
