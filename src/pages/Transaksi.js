import React from "react";
import axios from "axios";
import { baseUrl } from "../config";
import { error } from "jquery";

export default class Transaksi extends React.Component {
  constructor() {
    super();
    this.state = {
      transaksi: [],
    };
  }
  getData() {
    let endpoint = "http://localhost:8000/transaksi";
    axios
      .get(endpoint)
      .then((response) => {
        let dataTransaksi = response.data;
        for (let i = 0; i < dataTransaksi.length; i++) {
          let total = 0;
          for (let j = 0; j < dataTransaksi[i].length; j++) {
            let harga = dataTransaksi[i].detail_transaksi[j].paket.harga;
            let qty = dataTransaksi[i].detail_transaksi[j].qty;

            total += harga * qty;
          }
          //tambahkan key "total"
          dataTransaksi[i].total = total;
        }
        this.setState({ transaksi: dataTransaksi });
      })
      .catch((error) => console.log(error));
  }
  componentDidMount() {
    this.getData();
  }
  convertStatus(id_transaksi, status) {
    if (status === 1) {
      return (
        <div className="badge bg-info">
          Transaksi baru
          <br />
          <a
            onClick={() => this.changeStatus(id_transaksi, 2)}
            className="text-dark"
          >
            Click here to the next level
          </a>
        </div>
      );
    } else if (status === 2) {
      return (
        <div className="badge bg-primary  ">
          Sedang diproses
          <br />
          <a
            onClick={() => this.changeStatus(id_transaksi, 3)}
            className="text-dark"
          >
            Click here to the next level
          </a>
        </div>
      );
    } else if (status === 3) {
      return (
        <div className="badge bg-secondary">
          Siap diambil
          <br />
          <a
            onClick={() => this.changeStatus(id_transaksi, 4)}
            className="text-dark"
          >
            Click here to the next level
          </a>
        </div>
      );
    }
    if (status === 4) {
      return <div className="badge bg-success">Telah diambil</div>;
    }
  }
  changeStatus(id, status) {
    if (
      window.confirm("Apakah anda yakin ingin mengganti status transaksi ini?")
    ) {
      let endpoint = `${baseUrl}/transaksi/status/${id}`;
      let data = {
        status: status,
      };
      axios
        .post(endpoint, data)
        .then((response) => {
          window.alert(`Status transaksi telah diubah`);
          this.getData();
        })
        .catch((error) => console.error(error));
    }
  }
  convertStatusBayar(id_transaksi, dibayar) {
    if (dibayar == 0) {
      return (
        <div className="badge bg-danger text-white">
          Belum Dibayar
          <br />
          <a
            className="text-primary"
            onClick={() => this.changeStatusBayar(id_transaksi)}
          ></a>
        </div>
      );
    } else if (dibayar == 1) {
      return <div className="badge bg-success text-white">Sudah Dibayar</div>;
    }
  }
  deleteTransaksi(id) {
    if (window.confirm(`Apakah anda yakin ingin menghapus data ini?`)) {
      let endpoint = `${baseUrl}/transaksi/${id}`;
      axios
        .delete(endpoint)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));
    }
  }
  render() {
    return (
      <div className="card">
        <div className="card-header bg-primary">
          <h4 className="text-center text-white">List Transaksi</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {this.state.transaksi.map((trans) => (
              <li className="list-group-item">
                <div className="row">
                  {/*this is member area*/}
                  <div className="col-lg-3">
                    <small className="text-info">Member</small> <br />
                    {trans.member.nama}
                  </div>
                  {/*this is tgl transaksi area*/}
                  <div className="col-lg-3">
                    <small className="text-info">Tgl. Transaksi</small> <br />
                    {trans.tgl}
                  </div>
                  {/*this is batas waktu area*/}
                  <div className="col-lg-3">
                    <small className="text-info">Batas Waktu</small> <br />
                    {trans.batas_waktu}
                  </div>
                  {/*this is tgl bayar area*/}
                  <div className="col-lg-3">
                    <small className="text-info">Tgl. Bayar</small> <br />
                    {trans.tgl_bayar}
                  </div>
                  {/*this is status area*/}
                  <div className="col-lg-5">
                    <small className="text-info">Status</small> <br />
                    {this.convertStatus(trans.id_transaksi, trans.status)}
                  </div>

                  {/*this is status pembayaran area*/}
                  <div className="col-lg-5">
                    <small className="text-info">Status pembayaran</small>{" "}
                    <br />
                    {this.convertStatusBayar(trans.id_transaksi, trans.dibayar)}
                  </div>
                  {/** this is total */}
                  <div className="col-lg-3">
                    <small className="text-info">Total</small> <br />
                    Rp. {trans.total}
                  </div>
                  {/** this is delete button */}
                  <div className="col-lg-3">
                    <small className="text-info">Option</small> <br />
                    <button
                      className=" btn btn-sm btn-danger"
                      onClick={() => this.deleteTransaksi(trans.id_transaksi)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
                {/*this is detail transaksi area*/}
                <hr />
                <small className="text-warning">Detail Transaksi</small> <br />
                {trans.detail_transaksi.map((detail) => (
                  <div className="row">
                    {/** area nama paket col-3 */}
                    <div className="col-lg-3">{detail.paket.jenis_paket}</div>
                    {/** area qty col-2 */}
                    <div className="col-lg-2">qty: {detail.qty}</div>
                    {/** area harga paket col-3 */}
                    <div className="col-lg-3">@ Rp {detail.paket.harga}</div>
                    {/** area total paket col-lg 4 */}
                    <div className="col-lg-4">
                      Rp {detail.paket.harga * detail.qty}
                    </div>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
