import React from "react";
import { Modal } from "bootstrap";
import axios from "axios";
import { baseUrl } from "../config.js";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      action: "",
      id_user: "",
      nama: "",
      username: "",
      role: "",
      password: "",
      userss: [
        {
          id_user: "1",
          nama: "Reihan",
          username: "ReihanH",
          role: "Admin",
          password: "111",
        },
        {
          id_user: "2",
          nama: "Hendy",
          username: "Hendyf",
          role: "Admin",
          password: "111",
        },
      ],
    };
  }
  tambahData() {
    this.modalUsers = new Modal(document.getElementById("modal_users"));
    this.modalUsers.show(); //menampilkan modal

    //reset state untuk form member
    this.setState({
      action: "tambah",
      id_user: Math.random(1, 100000),
      nama: "",
      username: "",
      role: "",
      password: "",
      role: "admin",
        });
  }

  hapusData(id_user) {
    if (window.confirm("Apakah anda yakin menghapus data ini?")) {
      //mencari posisi index dari data yg akan dihapus
      let temp = this.state.userss;
      let index = temp.findIndex((users) => users.id_user === id_user);

      //dihapus data pada array
      temp.splice(index, 1);

      this.setState({ users: temp });
    }
  }
  ubahData(id_user) {
    this.modalUsers = new Modal(document.getElementById("modal_users"));
    this.modalUsers.show(); //menampilkan modal

    //mencari index posisi dari data member yg akan diubah
    let index = this.state.userss.findIndex(
      (users) => users.id_user === id_user
    );

    this.setState({
      action: "ubah",
      id_user: id_user,
      nama: this.state.userss[index].nama,
      username: this.state.userss[index].username,
      role: this.state.userss[index].role,
      password: this.state.userss[index].password,
    });
  }
  simpanData(event) {
    event.preventDefault();
    //prefentDefault -> mencegah aksi default refresh di page form submit

    if (this.state.action === "tambah") {
      let endpoint = `${baseUrl}/users`;
      //menampung data isian dari user
      let data = {
        id_users: this.state.id_user,
        nama: this.state.nama,
        username: this.state,
        role: this.state.role,
        password: this.state.password,
      };
      axios
        .post(endpoint, data)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));

      // //tambahkan ke state pakets (array)
      // let temp = this.state.pakets
      // temp.push(data) //menambah data pada array
      // this.setState({ pakets: temp })
      // //menghilangkan modal
      this.modalUsers.hide();
    } else if (this.state.action === "ubah") {
      let endpoint = `${baseUrl}/users/` + this.state.id_user;
      let data = {
        id_user: this.state.id_user,
        nama: this.state.nama,
        username: this.state,
        role: this.state.role,
        password: this.state.password,
      };
      axios
        .put(endpoint, data)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));
      this.modalUsers.hide();
    }
    //     let temp = this.state.pakets
    //     let index = temp.findIndex(
    //         paket => paket.id_paket === this.state.id_paket
    //     )

    //     temp[index].jenis_paket = this.state.jenis_paket
    //     temp[index].harga = this.state.harga

    //     this.setState({ pakets: temp })
  }

  getData() {
    let endpoint = `${baseUrl}/users`;
    axios
      .get(endpoint)
      .then((response) => {
        this.setState({ userss: response.data });
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
            <h3 className="text-white">List Users</h3>
          </div>
          <div className="card-body">
            <ul className="list-group">
              {this.state.userss.map((user) => (
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-lg-3">
                      <small className="text-info">Nama</small> <br />
                      <h5>{user.nama}</h5>
                    </div>
                    <div className="col-lg-4">
                      <small className="text-info">Username</small> <br />
                      <h5>{user.username}</h5>
                    </div>
                    <div className="col-lg-3">
                      <small className="text-info">Role</small> <br />
                      <h5>{user.role}</h5>
                    </div>
                    <div className="col-lg-2">
                      <small className="text-info"></small> <br />
                      <button
                        className="btn btn-sm btn-warning mx-1"
                        onClick={() => this.ubahData(user.id_user)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => this.hapusData(user.id_user)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="btn btn-sm btn-success my-2"
              onClick={() => this.tambahData()}
            >
              Tambah data user
            </button>
          </div>
        </div>

        {/* form modal data users */}
        <div className="modal" id="modal_users">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header bg-success">
                <h4 className="text-white">Form Data User</h4>
              </div>
              <div className="modal-body">
                <form onSubmit={(ev) => this.simpanData(ev)}>
                  Nama
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.nama}
                    onChange={(ev) => this.setState({ nama: ev.target.value })}
                  />
                  Username
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.username}
                    onChange={(ev) =>
                      this.setState({ username: ev.target.value })
                    }
                  />
                  Password
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.password}
                    onChange={(ev) =>
                      this.setState({ password: ev.target.value })
                    }
                  />
                  Role
                  <select
                    className="form-control mb-2"
                    value={this.state.role}
                    onChange={(ev) => this.setState({ role: ev.target.value })}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Kasir">Member</option>
                  </select>
                  <button className="btn btn-success" type="submit">
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
export default Users;
