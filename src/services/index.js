import Request from "../utils/request";

export const getPermit = (params) => {
  return Request.get("/getPermit", params);
};

export const addPermit = (data) => {
  return Request.post("/addPermit", data);
};
