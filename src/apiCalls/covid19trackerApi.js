import axios from "axios";

// axios.get()
// axios.post()
// axios.update()
// axios.delete()

export const GetGlobalSummary = () => {
  return axios.get("https://api.covid19api.com/summary");
};
