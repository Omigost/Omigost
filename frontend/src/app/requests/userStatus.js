
import axios from 'axios'
import store from 'store'

export default function userStatus(options, okCallback, errCallback) {

  const requestKey = 'api-users-status';

  const onSuccess = (response) => {
      store.set(requestKey, response);
      const data = response.data || {};
      if (response.status != 200 || (data && data.errors)) {
          const errors = data.errors || {};
          let errorText = null;
          Object.keys(errors).forEach(key => {
              if(!errorText && errors[key] && errors[key][0]) {
                  errorText = errors[key][0];
              }
          });
          errorText = errorText || response.statusText || null;
          errCallback(errorText);
      } else {
        try {
          const userAuth = JSON.parse(atob(data.userAuth || ''));
          okCallback(userAuth);
        } catch(error) {
          errCallback((error.message || error).toString());
        }
      }
  };

  const onError = (error) => {
      store.set(requestKey, null);
      errCallback(error);
  };

  if(store.get(requestKey)) {
      onSuccess(store.get(requestKey));
  }

  axios({
      method: 'get',
      url: $API_BASE + '/api/users/status',
      config: {
          withCredentials: true,
          validateStatus: () => true
      },
      validateStatus: () => true,
  })
  .then(onSuccess)
  .catch(onError);

};
