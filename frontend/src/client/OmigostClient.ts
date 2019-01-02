import axios from 'axios'

interface OmigostClientInterface {
    callEndpoint(endpoint?: string, options?: any, okCallback?: (data: any) => void, errCallback?: (data: any) => void);
};

export default class OmigostClient implements OmigostClientInterface {
    apiBase: string;
    
    constructor(apiBase: string) {
        this.apiBase = apiBase;
    }
    
    callEndpoint(endpoint, options, okCallback, errCallback) {
        let method = 'get';
        if(options && options.method) {
            method = options.method;
        }
        
        let params = {};
        if(options && options.params) {
            params = options.params;
        }
        
        let url = '/';
        if(options && endpoint) {
            url = endpoint;
        }
        url = this.apiBase + url;
        
        axios({
            method,
            url,
            withCredentials: true,
            params
        }).then((response) => {
            const data = response.data || {};
            if(data.error) {
                if(errCallback) {
                    errCallback(data.error);
                }
            } else {
                if(okCallback) {
                    okCallback(data || {});
                }
            }
        }).catch((error) => {
            if(errCallback) {
                errCallback(error);
            }
        });
    }
};