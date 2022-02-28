import { TOGGLE_FAVORITE } from "../actions/meals";

const initialState = {
  meals: "MEALS",
  filteredMeals: "MEALS",
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      console.log("TOGGLE_FAVORITE");

      return async (dispatch) => {
        // any async code you want!
        const title = "title";
        const description = "description";
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
        dispatch({ ...state, favoriteMeals: "after change" });
      };

    // case SET_FILTERS:
    //   const appliedFilters = action.filters;
    //   const updatedFilteredMeals = state.meals.filter(meal => {
    //     if (appliedFilters.glutenFree && !meal.isGlutenFree) {
    //       return false;
    //     }
    //     if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
    //       return false;
    //     }
    //     if (appliedFilters.vegetarian && !meal.isVegetarian) {
    //       return false;
    //     }
    //     if (appliedFilters.vegan && !meal.isVegan) {
    //       return false;
    //     }
    //     return true;
    //   });
    //   return { ...state, filteredMeals: updatedFilteredMeals };
    default:
      return state;
  }
};

export default mealsReducer;
