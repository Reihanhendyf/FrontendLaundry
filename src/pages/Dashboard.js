import React from "react";
import axios from "axios";
import { baseUrl, formatNumber } from "../config";
import { error } from "jquery";

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      jmlMember: 0,
      jmlPaket: 0,
      jmlTransaksi: 0,
      income: 0,
    };
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }
  getSummary() {
    //get jumlah member
    let endpoint = `${baseUrl}/member`;
    axios
      .get(endpoint)
      .then((response) => {
        this.setState({ jmlMember: response.data.length });
      })
      .catch((error) => console.log(error));

    //get jumlah paket
    endpoint = `${baseUrl}/paket`;
    axios
      .get(endpoint)
      .then((response) => {
        this.setState({ jmlPaket: response.data.length });
      })
      .catch((error) => console.log(error));

    //get jumlah paket
    endpoint = `${baseUrl}/transaksi`;
    axios
      .get(endpoint)
      .then((response) => {
        let dataTransaksi = response.data;
        let income = 0;
        for (let i = 0; i < dataTransaksi.length; i++) {
          let total = 0;
          for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
            let harga = dataTransaksi[i].detail_transaksi[j].paket.harga;
            let qty = dataTransaksi[i].detail_transaksi[j].qty;

            total += harga * qty;
          }
          income += total;
        }
        this.setState({
          jmlTransaksi: response.data.length,
          income: income,
        });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getSummary();
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className=" col-lg-4 col-md-6">
            <div className="card text-center bg-primary text-white m-3">
              <div className="card-body">
                <h4 className="card-title">Data Member</h4>
                <h2>{this.state.jmlMember}</h2>
                <h6>This is customer</h6>
              </div>
            </div>
          </div>
          <div className=" col-lg-4 col-md-6">
            <div className="card text-center bg-info text-white m-3">
              <div className="card-body">
                <h4 className="card-title">Data paket</h4>
                <h2>{this.state.jmlPaket}</h2>
                <h6>Paket yg kami layani dalam laundry ini</h6>
              </div>
            </div>
          </div>
          <div className=" col-lg-4 col-md-6">
            <div className="card text-center bg-secondary text-white m-3">
              <div className="card-body">
                <h4 className="card-title">Data Transaksi</h4>
                <h2>{this.state.jmlTransaksi}</h2>
                <h6>Transaksi kami layani dengan sepenuh hati</h6>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card-center card bg-danger  text-white m-3">
              <div className="card-body">
                <h4 className="card-title">income</h4>
                <h2>Rp. {formatNumber(this.state.income)}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
