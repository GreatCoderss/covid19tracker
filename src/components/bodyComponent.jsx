import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { blue, green, red } from "@material-ui/core/colors";
import { GetGlobalSummary } from "../apiCalls/covid19trackerApi";
import { renderDisplayCard } from "./commonComponent";
import CountUp from "react-countup";
import indianFlag from "./indianFlag.png";
import Chart from "chart.js";

export default function BodyComponent() {
  const [fetched, setfetcheds] = useState(false);
  const [globalCases, setGlobalcases] = useState({});

  useEffect(
    () =>
      !fetched &&
      GetGlobalSummary().then(({ data: { Global } }) => {
        setGlobalcases({
          "New Cases": Global.NewConfirmed,
          "Total Cases": Global.TotalConfirmed,
          "New Recovery": Global.NewRecovered,
          "Total Recovery": Global.TotalRecovered,
          "New Deaths": Global.NewDeaths,
          "Total Deaths": Global.TotalDeaths,
        });
        renderGraph();
        setfetcheds(true);
      })
  );

  return (
    <Box mt={2} mr={2} ml={2}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <Typography variant='h6' color='primary' gutterBottom={true}>
            Global Status
          </Typography>
        </Grid>
        {!Object.entries(globalCases).length ? (
          <Box
            style={{
              height: "200px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Typography variant='body1' color='textSecondary' align='center'>
              Loading Global state ...
            </Typography>
            <br />
            <CircularProgress color='secondary' />
          </Box>
        ) : (
          Object.entries(globalCases).map((item, i) =>
            renderDisplayCard({
              key: item[0],
              value: <CountUp start={0} end={item[1]} duration={2} />,
              index: i,
              Color:
                item[0] === "New Cases"
                  ? blue[500]
                  : item[0] === "Total Cases"
                  ? blue[500]
                  : item[0] === "New Recovery"
                  ? green[500]
                  : item[0] === "Total Recovery"
                  ? green[500]
                  : red[500],
            })
          )
        )}
      </Grid>
      <Grid container style={{ marginTop: "40px" }}>
        <Grid item xs={12} sm={12}>
          <Typography variant='h6' color='primary' gutterBottom={true}>
            Regional Status
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Card>
            <Box p={(1, 1)} display='flex'>
              <IconButton>
                <img
                  src={indianFlag}
                  alt='imdian flag'
                  style={{ width: "40px", height: "auto" }}
                />
              </IconButton>
              <Typography variant='body1' component='h6' color='textSecondary'>
                {" "}
                india
              </Typography>
            </Box>
            <CardContent>
              <canvas id='myChart' width='400' height='400'></canvas>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export const renderGraph = () => {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
  return myChart;
};
