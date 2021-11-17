import createDataContext from './createDataContext';
import trackerApi from '../api/client';

const doctorReducer = (state, action) => {
  switch (action.type) {
    case 'add_doctor':
      return action.payload;
    // case 'start_recording':
    //   return { ...state, recording: true };
    default:
      return state;
  }
};

const finddoctor = (dispatch) => async () =>{
  try {
    const response = await trackerApi.get('/schedule');
    // console.log(response.data);
    console.log(2);
    dispatch({
      type: 'add_doctor',
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with fetching',
    });
  }
};


export const { Context, Provider } = createDataContext(
  doctorReducer,
  { finddoctor},
  []
);
