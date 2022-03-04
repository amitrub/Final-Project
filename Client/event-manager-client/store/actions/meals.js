export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const SET_FILTERS = "SET_FILTERS";

export const toggleFavorite = (id) => {
  return async (dispatch) => {
    const title = "title";
    const description = `id=${id}`;
    const imageUrl = "imageUrl";
    const price = "price";

    console.log("before fetch");
    const response = await fetch(
      "https://test-server-event-manager-default-rtdb.firebaseio.com/tests.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );

    const resData = await response.json();
    console.log("resData");
    console.log(resData);
    dispatch({ type: TOGGLE_FAVORITE, mealId: id });
  };

  //return { type: TOGGLE_FAVORITE, mealId: id };
};

export const setFilters = (filterSettings) => {
  return { type: SET_FILTERS, filters: filterSettings };
};
