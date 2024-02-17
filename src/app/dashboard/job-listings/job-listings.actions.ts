import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetJobs = (endpoint: string, query: any) => {
  const fetchJobs = async () => {
    const options = {
      method: "GET",
      url: `https://jsearch.p.rapidapi.com/${endpoint}`,
      headers: {
        "X-RapidAPI-Key": '3dd96bab7fmsh19e94d07e08a88ep142813jsn4275666848f1',
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
      params: { ...query },
    };

    const response = await axios.request(options);
    return response.data.data;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["get_jobs"],
    queryFn: () => fetchJobs(),
    enabled: true
  });

  return { data, isLoading, error, refetch };
};

export default useGetJobs;





// import { useState, useEffect } from "react";
// import axios from "axios";



// const useGetJobs = (endpoint:string, query:any) => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const options = {
//     method: "GET",
//     url: `https://jsearch.p.rapidapi.com/${endpoint}`,
//     headers: {
//       "X-RapidAPI-Key": '1ba7af6d43msh229b98cb8f2a51fp14c309jsn760eb60920f7',
//       "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
//     },
//     params: { ...query },
//   };

//   const fetchData = async () => {
//     setIsLoading(true);

//     try {
//       const response = await axios.request(options);

//       setData(response.data.data);
//       setIsLoading(false);
//     } catch (error:any) {
//       setError(error);
//       console.log(error)
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const refetch = () => {
//     setIsLoading(true);
//     fetchData();
//   };

//   return { data, isLoading, error, refetch };
// };

// export default useGetJobs;
