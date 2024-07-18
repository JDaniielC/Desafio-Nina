import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexPlotOptions, ApexDataLabels, ApexStroke } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title?: ApexTitleSubtitle;
  plotOptions?: ApexPlotOptions;
  dataLabels?: ApexDataLabels
  stroke?: ApexStroke
};
