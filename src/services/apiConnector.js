import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method,url,bodyData,headers,params)=>{
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodyData? bodyData:null,
        headers:headers?headers:{},
        params:params?params:{}
    });
}

export default apiConnector

// import axios from "axios";

// export const axiosInstance = axios.create();

// export const apiConnector = (method, url, bodyData = null, headers = {}, params = {}) => {
//   const config = {
//     method,
//     url,
//     headers,
//     params,
//   };

//   // Only attach `data` for non-GET requests
//   if (method !== "GET" && bodyData) {
//     config.data = bodyData;
//   }

//   return axiosInstance(config);
// };

// export default apiConnector;
