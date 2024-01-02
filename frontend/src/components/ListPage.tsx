import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Box, Container } from "@mui/material";
interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  status: string;
}
function ListPage() {
  const [list, setList] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const handleSelectionModelChange = (newSelection) => {
    // 在这里处理多选的数据
    console.log("Selected Rows:", newSelection);
    setSelectionModel(newSelection);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/products", {
        headers: {
          Accept: "application/json",
        },
      });
      const data = response.data;
      setList(data);
    };
    fetchData();
  }, []);
  // 断言
  const rows_data = [] as { id: string; col1: string; col2: string }[];
  list.forEach((item) => {
    const dic = {
      id: item["id"],
      col1: item["title"],
      col2: item["price"],
      col3: item["description"],
      col4: item["category"],
      col5: item["status"],
    };
    rows_data.push(dic);
  });
  const rows: GridRowsProp = rows_data;

  const columns: GridColDef[] = [
    { field: "col1", headerName: "title", width: 300 },
    { field: "col2", headerName: "price", width: 150 },
    { field: "col3", headerName: "description", width: 150 },
    { field: "col4", headerName: "category", width: 150 },
    { field: "col5", headerName: "status", width: 150 },
  ];

  return (
    <Fragment>
      <Container>
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 50,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            selectionModel={selectionModel}
            onSelectionModelChange={handleSelectionModelChange}
          />
        </Box>
      </Container>
    </Fragment>
  );
}

export default ListPage;
