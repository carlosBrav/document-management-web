import React, {Component} from 'react';

class CommonMenu extends Component {

  render() {
    const {goToPage, menus} = this.props;
    const {head, firstColumn, secondColumn, thirdColumn, fourthColumn, fifthColumn} = menus;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-brand hover-pointer" onClick={() => goToPage(head.url)}>{head.title}</div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {
              firstColumn ?
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button"
                     data-toggle="dropdown"
                     aria-haspopup="true" aria-expanded="false">
                    {firstColumn.title}
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {
                      firstColumn.subMenus && firstColumn.subMenus.length > 0 ?
                        firstColumn.subMenus.map((col, index) => {
                          return <div key={"col"+index} className="dropdown-item hover-pointer"
                                      onClick={() => goToPage(col.url)}>{col.title}</div>
                        })
                        : null
                    }
                  </div>
                </li>
                : null
            }
            {
              secondColumn ?
                <li className="nav-item dropdown">
                  <a className="nav-link  dropdown-toggle" href="/#" role="button" data-toggle="dropdown"
                     aria-haspopup="true" aria-expanded="false">
                    {secondColumn.title}</a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {
                      secondColumn.subMenus && secondColumn.subMenus.length > 0 ?
                        secondColumn.subMenus.map((column, index) =>
                          column.subMenus && column.subMenus.length > 0 ?
                            <li key={"columnLi"+index} className="dropdown-submenu">
                              <a className="dropdown-item dropdown-toggle" data-toggle="dropdown"
                                 href="/#">{column.title}</a>
                              <ul className="dropdown-menu">
                                {
                                  column.subMenus.map((col,index) => {
                                    return <div key={"subCol"+index} className="dropdown-item hover-pointer"
                                                onClick={() => goToPage(col.url)}>{col.title}</div>
                                  })
                                }
                              </ul>
                            </li>
                            : <div  key={"divColumn"+index} className="dropdown-item hover-pointer"
                                   onClick={() => goToPage(column.url)}>{column.title}</div>
                        )
                        : null
                    }
                  </div>
                </li>
                : null
            }
            {
              thirdColumn && thirdColumn.title && thirdColumn.url ?
                <li className="nav-item">
                  <div className="nav-link hover-pointer"
                       onClick={() => goToPage(thirdColumn.url)}>{thirdColumn.title}</div>
                </li> : null
            }
            {
              fourthColumn ? <li className="nav-item dropdown">
                  <a className="nav-link  dropdown-toggle" href="/#" role="button" data-toggle="dropdown"
                     aria-haspopup="true" aria-expanded="false">
                    {fourthColumn.title}</a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {
                      fourthColumn.subMenus && fourthColumn.subMenus.length > 0 ?
                        fourthColumn.subMenus.map((column, index) =>
                          column.subMenus && column.subMenus.length > 0 ?
                            <li key={"columnLi"+index} className="dropdown-submenu">
                              <a className="dropdown-item dropdown-toggle" data-toggle="dropdown"
                                 href="/#">{column.title}</a>
                              <ul className="dropdown-menu">
                                {
                                  column.subMenus.map((col,index) => {
                                    return <div key={"subCol"+index} className="dropdown-item hover-pointer"
                                                onClick={() => goToPage(col.url)}>{col.title}</div>
                                  })
                                }
                              </ul>
                            </li>
                            : <div  key={"divColumn"+index} className="dropdown-item hover-pointer"
                                    onClick={() => goToPage(column.url)}>{column.title}</div>
                        )
                        : null
                    }
                  </div>
                </li>
                : null
            }
          </ul>
          <ul className="navbar-nav">
            {
              fifthColumn && fifthColumn.title ?
                <li className="nav-item dropdown">
                  <a className="nav-link  dropdown-toggle" href="/#" role="button" data-toggle="dropdown"
                     aria-haspopup="true" aria-expanded="false">
                    {fifthColumn.title}</a>
                  <div className="dropdown-menu" style={{left: 10, minWidth: "9rem"}} aria-labelledby="navbarDropdown">
                    {
                      fifthColumn.subMenus && fifthColumn.subMenus.length > 0 ?
                        fifthColumn.subMenus.map((column,index) =>
                          column.subMenus && column.subMenus.length > 0 ?
                            <li key={"subMenuLi"+index} className="dropdown-submenu">
                              <a className="dropdown-item dropdown-toggle" data-toggle="dropdown"
                                 href="/#">{column.title}</a>
                              <ul className="dropdown-menu">
                                {
                                  column.subMenus.map((col, index) => {
                                    return <div key={"subMen"+index} className="dropdown-item hover-pointer"
                                                onClick={() => goToPage(col.url)}>{col.title}</div>
                                  })
                                }
                              </ul>
                            </li>
                            : <div key={"subMenuDiv"+index} className="dropdown-item hover-pointer"
                                   onClick={column.action}>{column.title}</div>
                        )
                        : null
                    }
                  </div>
                </li>
                : null
            }
          </ul>
        </div>
      </nav>
    )
  }
}

export default CommonMenu;