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
      return { ...state, favoriteMeals: ["roee"] };
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
