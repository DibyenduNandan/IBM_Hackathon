import createDataContext from './createDataContext';
import trackerApi from '../api/client';

const scheduleReducer = (state, action) => {
  switch (action.type) {
    case 'add_schedule':
      return action.payload;
    // case 'start_recording':
    //   return { ...state, recording: true };
    default:
      return state;
  }
};

const active_donner = (dispatch) => async (props) =>{
  const {donner,user} = props;
  console.log(props,44,donner);
  try {
    const response = await trackerApi.post('/donner', {
      donner,
      user
    });
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in',
    });
  }
}

const findSchedule = (dispatch) => async () =>{
  try{
    const response = await trackerApi.get('/get_schedule');
    dispatch({
      type: 'add_schedule',
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
  scheduleReducer,
  { findSchedule,active_donner},
  []
);
