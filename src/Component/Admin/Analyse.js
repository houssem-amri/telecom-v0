import React, { useEffect, useState } from "react";
import Banner from "../Banner";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

export default function Analyse() {
  const [product, setProduct] = useState([]);
  const [users, setUsers] = useState({});
  const [seriesProduct, setseriesProduct] = useState([]);
  const [optionsProduct, setoptionsProduct] = useState({});

  const connectedUser = JSON.parse(
    localStorage.getItem("redux_localstorage_simple") || "[]"
  );
  useEffect(() => {
    getAllProducts();
    getAllUsers()
  }, []);
  const getAllUsers = () => {
    axios
      .get("http://localhost:3200/api/get_user")
      .then((result) => {
        // setUsers(result.data.data);
        FilterUser(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const FilterUser = (user) => {
    let RDS = 0;
    let RDA = 0;
    let Admin = 0;
    let S_Admin = 0;
    for (let i = 0; i < user.length; i++) {
      if (user[i].Poste === "super_admin") {
        S_Admin = 1 + S_Admin;
      }
      if (user[i].Poste === "RDS") {
        RDS = 1 + RDS;
      }
      if (user[i].Poste === "RDA") {
        RDA = 1 + RDA;
      }
      if (user[i].Poste === "admin") {
        Admin = 1 + Admin;
      }
    }
    setUsers({
      S_Admin: S_Admin,
      Admin: Admin,
      RDA: RDA,
      RDS: RDS,
    });
  };
  const getAllProducts = () => {
    axios
      .get("http://localhost:3200/api/get_Products")
      .then((result) => {
        setProduct(result.data.data);
        ProductDataChart(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ProductDataChart = (data) => {
    let category = [];
    let series = [];
    const grouped = groupByCategorie(data, "categorie");
    for (let i = 0; i < Object.keys(grouped).length; i++) {
      category.push(Object.keys(grouped)[i]);
      series.push(Object.values(grouped)[i].length);
    }
    const options = {
      annotations: {
        points: [
          {
            x: "Bananas",
            seriesIndex: 0,
            label: {
              borderColor: "#775DD0",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#775DD0",
              },
              text: "Bananas are good",
            },
          },
        ],
      },
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
      },

      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"],
        },
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: category,
        tickPlacement: "on",
      },
      yaxis: {
        title: {
          text: "Servings",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100],
        },
      },
    };
    setoptionsProduct(options);
    setseriesProduct([{ name: "product", data: series }]);
  };
  const groupByCategorie = (tableauObjets, propriete) => {
    return tableauObjets.reduce(function (acc, obj) {
      var array = [];
      var cle = obj[propriete];
      if (!acc[cle]) {
        acc[cle] = [];
        array[cle] = [];
      }

      acc[cle].push(obj);
      return acc;
    }, {});
  };
  return (
    <div className="app-main__inner">
      <Banner title="Analyse" icon="pe-7s-Fournisseurs" />
      <div className="row">
        <div className="col-md-6 col-xl-4">
          <div className="card mb-3 widget-content bg-midnight-bloom">
            <div className="widget-content-wrapper text-white">
              <div className="widget-content-left">
                <div className="widget-heading"> Admin</div>
                <div className="widget-subheading">Total Post Admin</div>
              </div>
              <div className="widget-content-right">
                <div className="widget-numbers text-white">
                  <span>{users.Admin}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4">
          <div className="card mb-3 widget-content bg-arielle-smile">
            <div className="widget-content-wrapper text-white">
              <div className="widget-content-left">
                <div className="widget-heading">RDA</div>
                <div className="widget-subheading">Total Post Responsable d'achat</div>
              </div>
              <div className="widget-content-right">
                <div className="widget-numbers text-white">
                  <span>{users.RDA}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4">
          <div className="card mb-3 widget-content bg-grow-early">
            <div className="widget-content-wrapper text-white">
              <div className="widget-content-left">
                <div className="widget-heading">RDS</div>
                <div className="widget-subheading">Total Post Responsable de stock</div>
              </div>
              <div className="widget-content-right">
                <div className="widget-numbers text-white">
                  <span>{users.RDS}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-xl-none d-lg-block col-md-6 col-xl-4">
          <div className="card mb-3 widget-content bg-premium-dark">
            <div className="widget-content-wrapper text-white">
              <div className="widget-content-left">
                <div className="widget-heading">Products Sold</div>
                <div className="widget-subheading">Revenue streams</div>
              </div>
              <div className="widget-content-right">
                <div className="widget-numbers text-warning">
                  <span>$14M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-md-6 col-xl-4">
          <div className="card mb-3 widget-content bg-midnight-bloom">
            <div className="widget-content-wrapper text-white">
              <div className="widget-content-left">
                <div className="widget-heading">Total Orders</div>
                <div className="widget-subheading">Last year expenses</div>
              </div>
              <div className="widget-content-right">
                <div className="widget-numbers text-white">
                  <span>1896</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4">
          <div className="card mb-3 widget-content bg-arielle-smile">
            <div className="widget-content-wrapper text-white">
              <div className="widget-content-left">
                <div className="widget-heading">Clients</div>
                <div className="widget-subheading">Total Clients Profit</div>
              </div>
              <div className="widget-content-right">
                <div className="widget-numbers text-white">
                  <span>$ 568</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4">
          <div className="card mb-3 widget-content bg-grow-early">
            <div className="widget-content-wrapper text-white">
              <div className="widget-content-left">
                <div className="widget-heading">Followers</div>
                <div className="widget-subheading">People Interested</div>
              </div>
              <div className="widget-content-right">
                <div className="widget-numbers text-white">
                  <span>46%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-xl-none d-lg-block col-md-6 col-xl-4">
          <div className="card mb-3 widget-content bg-premium-dark">
            <div className="widget-content-wrapper text-white">
              <div className="widget-content-left">
                <div className="widget-heading">Products Sold</div>
                <div className="widget-subheading">Revenue streams</div>
              </div>
              <div className="widget-content-right">
                <div className="widget-numbers text-warning">
                  <span>$14M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="row">
        <div className=" col-12 main-card mb-3 card">
          <div className="card-header">Analyle Product</div>
          <div id="chart">
            <ReactApexChart
              options={optionsProduct}
              series={seriesProduct}
              type="bar"
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
