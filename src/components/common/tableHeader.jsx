import React, { Component } from "react";
// columns:array
//sortColumn
//
class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderIcons = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-down " />;
    if (sortColumn.order === "desc") return <i className="fa fa-sort-up " />;
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(
            column =>
              column.path && (
                <th
                  className="clickable"
                  key={column.path || column.key}
                  onClick={() => this.raiseSort(column.path)}
                >
                  {column.label}
                  {this.renderIcons(column)}
                </th>
              )
          )}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
