import createDataContext from './createDataContext';
import trackerApi from '../api/client';

const donnerReducer = (state, action) => {
  switch (action.type) {
    case 'add_donners':
      return action.payload;
    // case 'start_recording':
    //   return { ...state, recording: true };
    default:
      return state;
  }
};

const all_donners = (dispatch) => async () =>{
  try{
    const response = await trackerApi.get('/get_donner');
    dispatch({
      type: 'add_donners',
      payload: response.data
    });
  }catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with fetching',
    });
  }
};


export const { Context, Provider } = createDataContext(
  donnerReducer,
  { all_donners},
  []
);
