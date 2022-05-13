import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";

const SideBar = ({ user }) => {
  return (
    <PerfectScrollbar>
      <div className="app-sidebar sidebar-shadow">
        <div className="app-header__logo">
          <div className="logo-src" />
          <div className="header__pane ml-auto">
            <div>
              <button
                type="button"
                className="hamburger close-sidebar-btn hamburger--elastic"
                data-class="closed-sidebar"
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner" />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="app-header__mobile-menu">
          <div>
            <button
              type="button"
              className="hamburger hamburger--elastic mobile-toggle-nav"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </button>
          </div>
        </div>
        <div className="app-header__menu">
          <span>
            <button
              type="button"
              className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
            >
              <span className="btn-icon-wrapper">
                <i className="fa fa-ellipsis-v fa-w-6" />
              </span>
            </button>
          </span>
        </div>
        <div className="scrollbar-sidebar">
          <div className="app-sidebar__inner">
            <ul className="vertical-nav-menu">
              {user.Poste === "admin" ? (
                <Fragment>
                  <li className="app-sidebar__heading">Dashboards Admin</li>
                  <li>
                    <Link to="#">
                      <i className="metismenu-icon pe-7s-car" />
                      Utilisateur
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="Add_User">
                          <i className="metismenu-icon pe-7s-display2" />
                          Ajouter Utilisateur
                        </Link>
                      </li>
                      <li>
                        <Link to="tableUser">
                          <i className="metismenu-icon pe-7s-display2" />
                          Tableau d'Utilisateurs
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <Link to="#">
                      <i className="metismenu-icon pe-7s-car" />
                      Commande
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="/TableCommande">
                          <i className="metismenu-icon"> </i>Table Commande
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="metismenu-icon pe-7s-car" />
                      Bon d'achat
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="/Table_bonDachat">
                          <i className="metismenu-icon"> </i>Table Bon d'achat
                        </Link>
                      </li>
                    </ul>
                  </li>
                </Fragment>
              ) : user.Poste === "RDA" ? (
                <Fragment>
                  <li className="app-sidebar__heading">
                    Dashboards Responsable d'achat
                  </li>
                  <li>
                    <Link to="#">
                      <i className="metismenu-icon pe-7s-car" />
                      Commande
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="Add_commande">
                          <i className="metismenu-icon"> </i>
                          Ajouter Commande
                        </Link>
                      </li>
                      <li>
                        <Link to="TableCommande">
                          <i className="metismenu-icon"> </i>
                          Tableau de Cammande
                        </Link>
                      </li>
                    </ul>
                  </li>
                </Fragment>
              ) : user.Poste === "RDS" ? (
                <Fragment>
                  <li className="app-sidebar__heading">
                    Dashboards Responsable de stock
                  </li>
                  <li>
                    <Link to="#">
                      <i className="metismenu-icon pe-7s-diamond" />
                      Categories
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="/Add_Categorie">
                          <i className="metismenu-icon" />
                          Ajouter Categorie
                        </Link>
                      </li>
                      <li>
                        <Link to="/TableCategorie">
                          <i className="metismenu-icon"> </i>Tableau de
                          Categorie
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="metismenu-icon pe-7s-diamond" />
                      Produits
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="/">
                          <i className="metismenu-icon" />
                          Ajouter Produits
                        </Link>
                      </li>
                      <li>
                        <Link to="Tableproducts">
                          <i className="metismenu-icon"> </i>Tableau de Produit
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="metismenu-icon pe-7s-diamond" />
                      Sortie
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="/Table_Rds">
                          <i className="metismenu-icon"> </i>Tableau de Sortie
                        </Link>
                      </li>
                    </ul>
                  </li>
                </Fragment>
              ) : user.Poste === "RDV" ? (
                <Fragment></Fragment>
              ) : user.Poste === "super_admin" ? (
                <Fragment>
                  <li className="app-sidebar__heading">
                    Dashboards Super Admin
                  </li>
                  <li>
                    <Link to="#">
                      <i className="metismenu-icon pe-7s-car" />
                      Analyses
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="/Analyse">
                          <i className="metismenu-icon pe-7s-display2" />
                           Admin Analyse
                        </Link>
                      </li>
                    
                    </ul>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="metismenu-icon pe-7s-car" />
                      Utilisateur
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="Add_User">
                          <i className="metismenu-icon pe-7s-display2" />
                          Ajouter Admin
                        </Link>
                      </li>
                      <li>
                        <Link to="tableUser">
                          <i className="metismenu-icon pe-7s-display2" />
                          Tableau d'Admin
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <Link to="#">
                      <i className="metismenu-icon pe-7s-car" />
                      Magasin
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </Link>

                    <ul>
                      <li>
                        <Link to="Addmagasin">
                          <i className="metismenu-icon pe-7s-display2" />
                          Ajouter Magasin
                        </Link>
                      </li>
                      <li>
                        <Link to="TableMagasin">
                          <i className="metismenu-icon"> </i>
                          Tableau de Magasin
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="metismenu-icon pe-7s-car" />
                      Fournisseu
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="/Add_fournisseur">
                          <i className="metismenu-icon"> </i>Ajouter Fournisseur
                        </Link>
                      </li>
                      <li>
                        <Link to="Tablefournisseur">
                          <i className="metismenu-icon"> </i>Tableau de
                          Fournisseur
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="metismenu-icon pe-7s-car" />
                      Projet & Sortie
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </Link>

                    <ul>
                      <li>
                        <Link to="Add_project">
                          <i className="metismenu-icon pe-7s-display2" />
                          Ajouter projet
                        </Link>
                      </li>
                      <li>
                        <Link to="Tableproject">
                          <i className="metismenu-icon"> </i>
                          Tableau de projet
                        </Link>
                      </li>
                      <li>
                        <Link to="Tablesortie">
                          <i className="metismenu-icon"> </i>
                          Tableau de Sortie
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="metismenu-icon pe-7s-car" />
                      Commande
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="/TableCommande">
                          <i className="metismenu-icon"> </i>Table Commande
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="metismenu-icon pe-7s-car" />
                      Bon d'achat
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="/Table_bonDachat">
                          <i className="metismenu-icon"> </i>Table Bon d'achat
                        </Link>
                      </li>
                    </ul>
                  </li>
                </Fragment>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </PerfectScrollbar>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.userData,
  };
};

export default connect(mapStateToProps)(SideBar);
