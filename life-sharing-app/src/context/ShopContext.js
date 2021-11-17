import createDataContext from './createDataContext';
import trackerApi from '../api/client';

const shopReducer = (state, action) => {
  switch (action.type) {
    case 'add_shop':
      return state;
    case 'user_shop':
      return {...state,user:action.payload};
    case 'all_shop':
      return {...state,shop:action.payload};
    case 'add_error':
      return state;
    default:
      return state;
  }
};

const userShop = (dispatch) => async (props) =>{
  try {
    const response = await trackerApi.get('/owner_tracks');
    dispatch({
      type: 'user_shop',
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with fetching',
    });
  }
}

const all_Shop = (dispatch) => async (props) =>{
  try {
    const response = await trackerApi.get('/shop_tracks');
    dispatch({
      type: 'all_shop',
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with fetching',
    });
  }
}

const createShop = (dispatch) => async (props) =>{
  const { name,address, phone,location } = props;
  try{
    const response = await trackerApi.post('/shop_tracks',{
      name,
      address,
      phone,
      location,
    });
    dispatch({
      type: 'add_shop',
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
  shopReducer,
  {createShop,userShop,all_Shop},
  {user: null,shop:null}
);


