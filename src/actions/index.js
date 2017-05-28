import * as actionTypes from '../constants/actionTypes';
import initGlobe from '../components/Globe/libs/initGlobe';
import getDataApi from '../utils/mockDataApi';

// Filters and categories
export const category = (selectedCategory) => ({
  type: actionTypes.CHANGE_SELECTED_CATEGORY,
  selectedCategory: selectedCategory.toLowerCase()
});

export const filter = (selectedFilter) => ({
  type: actionTypes.CHANGE_SELECTED_FILTER,
  selectedFilter: selectedFilter.toLowerCase()
});

export const changeSelectedFilter = (selectedFilter) => (dispatch, getState) => {
  const currentFilter = getState().selectedOptions.filter;
  if(selectedFilter.toLowerCase() !== currentFilter) {
    dispatch(filter(selectedFilter));
    dispatch(getData());
    initGlobe();
  }
};

export const changeSelectedCategory = (selectedCategory) => (dispatch, getState) => {
  const currentCategory = getState().selectedOptions.category;

  if(selectedCategory.toLowerCase() !== currentCategory) {
    dispatch(category(selectedCategory));
    dispatch(getData());
    initGlobe();
  }
};


// Data for globe points

export const requestData = () =>({
  type: actionTypes.REQUEST_DATA
});

export const receiveData = (data) => ({
  type: actionTypes.RECEIVE_DATA,
  data: data
});

export const error = (err) => ({
  type: actionTypes.ERROR,
  errorMessage: err
})

export const getData = () => (dispatch, getState) => {
  dispatch(requestData());
  const category = getState().selectedOptions.category;
  const filter = getState().selectedOptions.filter;
  getDataApi(category, filter)
  .then(res => dispatch(receiveData(JSON.parse(res))))
  .catch(err => {
    dispatch(error(err));
  });
};