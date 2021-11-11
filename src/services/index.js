import Request from "../utils/request";

export const getPermit = (params) => {
  return Request.get("/getPermit", { wid: "lololol" });
};
