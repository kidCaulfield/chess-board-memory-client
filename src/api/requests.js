import axios from "axios";

export const Game = {
  get: async ({ route }) => {
    const response = await axios({
      method: "get",
      url: route,
    });

    return response.data;
  },

  post: async ({ route, data }) => {
    try {
      const response = await axios({
        method: "post",
        url: route,
        data: data,
      });

      return response.data;
    } catch (error) {
      console.log("error: ", JSON.stringify(error));
    }
  },
};
