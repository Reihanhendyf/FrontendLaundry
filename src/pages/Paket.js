import React from "react";
import { Modal } from "bootstrap";
import axios from "axios";
import { baseUrl } from "../config";

class Paket extends React.Component {
  constructor() {
    super();
    this.state = {
      action: "",
      id_paket: "",
      jenis_paket: "",
      harga: "",
      pakets: [
        {
          id_paket: "1",
          jenis_paket: "Baju",
          harga: "5000",
        },
        {
          id_paket: "2",
          jenis_paket: "Celana",
          harga: "7000",
        },
      ],
    };
  }
  tambahData() {
    this.modalPaket = new Modal(document.getElementById("modal_paket"));
    this.modalPaket.show(); //menampilkan modal

    //reset state untuk form paket
    this.setState({
      action: "tambah",
      id_paket: Math.random(1, 100000),
      jenis_paket: "",
      harga: "",
    });
  }

  hapusData(id_paket) {
    if (window.confirm("Apakah anda yakin menghapus data ini?")) {
      //mencari posisi index dari data yg akan dihapus
      let temp = this.state.pakets;
      let index = temp.findIndex((paket) => paket.id_paket === id_paket);

      //dihapus data pada array
      temp.splice(index, 1);

      this.setState({ pakets: temp });
    }
  }
  ubahData(id_paket) {
    this.modalPaket = new Modal(document.getElementById("modal_paket"));
    this.modalPaket.show(); //menampilkan modal

    //mencari index posisi dari data member yg akan diubah
    let index = this.state.pakets.findIndex(
      (paket) => paket.id_paket === id_paket
    );

    this.setState({
      action: "ubah",
      id_paket: id_paket,
      jenis_paket: this.state.pakets[index].jenis_paket,
      harga: this.state.pakets[index].harga,
    });
  }
  simpanData(event) {
    event.preventDefault();
    //prefentDefault -> mencegah aksi default refresh di page form submit

    if (this.state.action === "tambah") {
      let endpoint = `${baseUrl}/paket`;
      //menampung data isian dari user
      let data = {
        id_paket: this.state.id_paket,
        jenis_paket: this.state.jenis_paket,
        harga: this.state.harga,
      };

      //tambahkan ke state pakets (array)
      //let temp = this.state.pakets
      //temp.push(data) //menambah data pada array
      //this.setState({ pakets: temp })
      //menghilangkan modal
      //this.modalPaket.hide()
      axios
        .post(endpoint, data)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));
    } else if (this.state.action === "ubah") {
      let endpoint = `${baseUrl}/paket` / +this.state.id_paket;
      // let temp = this.state.pakets
      // let index = temp.findIndex(
      //     paket => paket.id_paket === this.state.id_paket
      // )

      // temp[index].jenis_paket = this.state.jenis_paket
      // temp[index].harga = this.state.harga
      // this.setState({ pakets: temp })
      let data = {
        id_paket: this.state.id_paket,
        jenis_paket: this.state.jenis_paket,
        harga: this.state.harga,
      };
      axios
        .put(endpoint, data)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));
      this.modalPaket.hide();
    }
  }
  getData() {
    let endpoint = `${baseUrl}/paket`;
    axios
      .get(endpoint)
      .then((response) => {
        this.setState({ pakets: response.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    //fungsi ini dijalankan setelah fungsi render berjalan
    this.getData();
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header bg-primary">
            <h3 className="text-center text-white">List Paket</h3>
          </div>
          <div className="card-body">
            <ul className="list-group">
              {this.state.pakets.map((paket) => (
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-lg-5">
                      <small className="text-dark">Jenis Paket</small> <br />
                      <h5>{paket.jenis_paket}</h5>
                    </div>
                    <div className="col-lg-5">
                      <small className="text-dark">Harga</small> <br />
                      <h5>{paket.harga}</h5>
                    </div>
                    <div className="col-lg-2">
                      <small className="text-dark"></small> <br />
                      <button
                        className="btn btn-sm btn-primary mx-1"
                        onClick={() => this.ubahData(paket.id_paket)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => this.hapusData(paket.id_paket)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="btn btn-sm btn-primary my-2"
              onClick={() => this.tambahData()}
            >
              Tambah data paket
            </button>
          </div>
        </div>

        {/* form modal data paket */}
        <div className="modal" id="modal_paket">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header bg-primary">
                <h4 className="text-white">Form Data Paket</h4>
              </div>
              <div className="modal-body">
                <form onSubmit={(ev) => this.simpanData(ev)}>
                  Jenis Paket
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.jenis_paket}
                    onChange={(ev) =>
                      this.setState({ jenis_paket: ev.target.value })
                    }
                  />
                  Harga
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.harga}
                    onChange={(ev) => this.setState({ harga: ev.target.value })}
                  />
                  <button className="btn btn-primary" type="submit">
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Paket;
