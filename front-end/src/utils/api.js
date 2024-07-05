import axios from "axios";

const BASE_URL = "http://localhost:3000";


export const fetchDataFromApi = async (url, params) => {
  try {
      const { data } = await axios.get(BASE_URL + url, 
          params,
      );
      return data;
  } catch (err) {
      console.log(err);
      return err;
  }
};
export const postDataToApi = async (url, params) => {
  try {
      const { data } = await axios.post(BASE_URL + url, 
          params,
      );
      return data;
  } catch (err) {
      console.log(err);
      return err;
  }
};
export const deleteDataFromApi = async (url, params) => {
  try {
      const { data } = await axios.delete(BASE_URL + url, 
          params,
      );
      return data;
  } catch (err) {
      console.log(err);
      return err;
  }
};
export const updateDataFromApi = async (url, params) => {
  try {
      const { data } = await axios.put(BASE_URL + url, 
          params,
      );
      return data;
  } catch (err) {
      console.log(err);
      return err;
  }
};