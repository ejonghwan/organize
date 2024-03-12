import axios from "../node_modules/axios/dist/esm/axios.min.js";


class Request {
    constructor() {}
    
    async init(method = 'get', url, data, headers) {
        try {
            const result = await axios[method](url, data, headers);
            return result.data;
        } catch(err) { 
            console.error('e?', err) 
        }
    }
}


export default Request;