// api.ts

import axios from "axios";

interface Status {
  id: string;
  status_name: string;
  count: number;
}

interface Category {
  id: string;
  category_name: string;
  count: number;
}

interface Info {
  total: number;
  valid: number;
  invalid: number;
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

export async function getCategory<Category>() {
  const instance = axios.create();

  try {
    const response_category = await instance.get("products/cate");
    return response_category.data.data as Category[];
  } catch (error) {
    console.error("Error fetching category:", error);
    return [];
  }
}

export async function getInfo(): Promise<Info | null> {
  const instance = axios.create();

  try {
    const response_info = await instance.get("products/info");
    return response_info.data.data as Info;
  } catch (error) {
    console.error("Error fetching info:", error);
    return null;
  }
}
