import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexDataLabels,
  ApexStroke,
  ApexNonAxisChartSeries,
  ApexTooltip,
  ApexLegend,
  ApexYAxis,
  ApexGrid,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;
  title?: ApexTitleSubtitle;
  plotOptions?: ApexPlotOptions;
  dataLabels?: ApexDataLabels
  stroke?: ApexStroke
  labels?: string[];
  tooltip?: ApexTooltip;
  legend?: ApexLegend;
  colors?: any;
  yaxis?: ApexYAxis;
  grid?: ApexGrid;
  fill?: ApexFill
};
