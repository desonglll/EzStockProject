// api.ts

import axios from "axios";

interface Status {
  id: string;
  status_name: string;
  count: number;
}

interface Catagory {
  id: string;
  category_name: string;
  count: number;
}

export async function getStatus() {
  const instance = axios.create();

  try {
    const response_status = await instance.get("products/status");
    return response_status.data.data as Status[];
  } catch (error) {
    console.error("Error fetching status:", error);
    return [];
  }
}

export async function getCategory() {
  const instance = axios.create();

  try {
    const response_category = await instance.get("products/cate");
    return response_category.data.data as Catagory[];
  } catch (error) {
    console.error("Error fetching category:", error);
    return [];
  }
}
