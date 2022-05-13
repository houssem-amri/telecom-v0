import { useEffect } from "react";

import PropTypes from "prop-types";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Add_commande from "./Component/Admin/Add_commande";
import Add_fournisseur from "./Component/Admin/Add_fournisseur";

import Add_products from "./Component/Admin/Add_products";
import Tablefournisseur from "./Component/Admin/Tablefournisseur";
import Tableproducts from "./Component/Admin/Tableproducts";
import NavBar from "./Component/NavBar";
import SideBar from "./Component/SideBar";
import Add_Categorie from "./Component/Admin/Add_Categorie";
import TableCategorie from "./Component/Admin/TableCategorie";
import Add_User from "./Component/Admin/Add_User";
import TableUser from "./Component/Admin/TableUser";
import Edit_User from "./Component/Admin/Edit_User";
import Edit_commande from "./Component/Admin/Edit_commande";
import TableCommande from "./Component/Admin/TableCommande";
import EditCategorie from "./Component/Admin/EditCategorie";
import EditProducts from "./Component/Admin/EditProducts";
import EditFournisseur from "./Component/Admin/EditFournisseur";
import Add_magasin from "./Component/Admin/Add_magasin";
import TableMagasin from "./Component/Admin/TableMagasin";
import EditMagasin from "./Component/Admin/EditMagasin";
import Authentifier from "./Component/Login/Authentifier";
import Table_bonDachat from "./Component/Admin/Table_bonDachat";
import Register from "./Component/Login/Register";
// import Register from "./Component/Login/RegTest";
import Add_project from "./Component/Admin/Add_project";
import TableProject from "./Component/Admin/TableProject";
import TableSortie from "./Component/Admin/TableSortie";
import EditProject from "./Component/Admin/EditProject";
import { connect } from "react-redux";
import Todo_list from "./Component/Admin/Todo_list";
import Rds_sortie from "./Component/Admin/Rds_sortie";
import Analyse from "./Component/Admin/Analyse";


function App({ user }) {

  useEffect(() => {}, [user]);
  return (
    <div>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        {user?.Poste === undefined ? (
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Authentifier />} />
              <Route exact path="/register" element={<Register />} />
              {/* <Route exact path="/register" element={<Register />} /> */}
            </Routes>
          </BrowserRouter>
        ) : (
          <BrowserRouter>
            <NavBar />

            <div className="app-main">
              <SideBar />
              <div className="app-main__outer">
                <Routes>
                  <Route path="/" element={<Add_products />} />
                  <Route path="/Analyse" element={<Analyse />} />
                  <Route path="/todo/:id" element={<Todo_list />} />
                  <Route path="/Table_Rds" element={<Rds_sortie />} />
                  <Route path="/Tableproducts" element={<Tableproducts />} />
                  <Route
                    path="/Table_bonDachat"
                    element={<Table_bonDachat />}
                  />
                  <Route path="/EditProducts/:id" element={<EditProducts />} />
                  <Route path="/Add_Categorie" element={<Add_Categorie />} />
                  <Route path="/TableCategorie" element={<TableCategorie />} />

                  <Route
                    path="/EditCategorie/:id"
                    element={<EditCategorie />}
                  />
                  <Route
                    path="/Add_fournisseur"
                    element={<Add_fournisseur />}
                  />
                  <Route
                    path="/Tablefournisseur"
                    element={<Tablefournisseur />}
                  />
                  <Route
                    path="/EditFournisseur/:id"
                    element={<EditFournisseur />}
                  />
                  <Route path="/Add_commande" element={<Add_commande />} />
                  <Route path="/TableCommande" element={<TableCommande />} />
                  <Route
                    path="/Edit_Commande/:id"
                    element={<Edit_commande />}
                  />
                  <Route path="/Add_user" element={<Add_User />} />
                  <Route path="/Edit_user/:id" element={<Edit_User />} />
                  <Route path="/tableUser" element={<TableUser />} />
                  <Route path="/Addmagasin" element={<Add_magasin />} />
                  <Route path="/TableMagasin" element={<TableMagasin />} />
                  <Route path="/EditMagasin/:id" element={<EditMagasin />} />
                  <Route path="/Add_project" element={<Add_project />} />
                  <Route path="/Tableproject" element={<TableProject />} />
                  <Route path="/TableSortie" element={<TableSortie />} />
                  <Route path="/EditProject/:id" element={<EditProject />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        )}
      </div>
    </div>
  );
}
App.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    user: state.userData,
  };
};
export default connect(mapStateToProps)(App);
