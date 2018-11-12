import axios from 'axios'

export function userSubscribeNewsletter(id, shouldSubscribe, okCallback, errCallback) {

    axios.post($API_BASE + '/api/users/newsletter/subscribe', {
        withCredentials: true,
        id,
        should_subscribe: shouldSubscribe
    }).then(function (response) {
        console.log('newsletter response');
        console.log(JSON.stringify(response, null, 2));
        const data = response.data || {};
        if(data.error) {
            errCallback(data.error);
        } else {
            try {
                okCallback(data);
            } catch(error) {
                errCallback(error);
            }
        }
    }).catch(function (error) {
        errCallback(error);
    });

};
