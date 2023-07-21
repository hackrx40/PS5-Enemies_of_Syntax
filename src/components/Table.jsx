/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import { FiEye, FiTrash } from "react-icons/fi";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export const Table = ({
  name,
  data,
  fields,
  numberOfRows,
  enableTopToolBar,
  enableBottomToolBar,
  enablePagination,
  enableRowSelection,
  enableColumnFilters,
  enableEditing,
  enableColumnDragging,
  showPreview,
  routeLink,
}) => {
  const columns = useMemo(() => fields, []);

  const [tableData, setTableData] = useState(data);

  // const handleDeleteRow = useCallback(
  //   (row) => {
  //     if (!confirm("Are you sure you want to delete")) {
  //       return;
  //     }
  //     data.splice(row.index, 1);
  //     setTableData([...tableData]);
  //   },
  //   [tableData]
  // );
  console.log(data)
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      getRowId={(row) => row.id}
      enableEditing={enableEditing}
      enableColumnDragging={enableColumnDragging}
      enableColumnOrdering
      enableRowSelection={enableRowSelection}
      enableColumnFilters={enableColumnFilters}
      enablePagination={enablePagination}
      enableBottomToolbar={enableBottomToolBar}
      enableTopToolbar={enableTopToolBar}
      renderRowActions={({ row }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tooltip arrow placement="right" title="Delete">
            <IconButton color="error" onClick={() => {}}>
              <FiTrash />
            </IconButton>
          </Tooltip>
          {showPreview && (
            <Tooltip arrow placement="right" title="View">
              <Link to={`/${routeLink}/${row.id}`}>
                <IconButton>
                  <FiEye />
                </IconButton>
              </Link>
            </Tooltip>
          )}
        </Box>
      )}
      renderTopToolbarCustomActions={({ table }) => (
        <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        {name}
        </Typography>
      )}
      muiTableBodyRowProps={{ hover: false }}
      muiTablePaperProps={{
        sx: {
          padding: "20px",
          borderRadius: "15px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "divider",
        },
      }}
      muiTableContainerProps={{
        sx: { borderRadius: "15px" },
      }}
      muiTableHeadCellProps={{
        sx: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      }}
      muiTableHeadProps={{
        sx: {
          "& tr th": {
            borderWidth: "1px",
            borderColor: "divider",
            borderStyle: "solid",
          },
        },
      }}
      muiTableBodyProps={{
        sx: {
          "& tr td": {
            borderWidth: "1px",
            borderColor: "divider",
            borderStyle: "solid",
          },
        },
      }}
    />
  );
};

export default Table;
