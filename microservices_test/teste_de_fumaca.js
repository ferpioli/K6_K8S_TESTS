import http from 'k6/http';
import {thresholds} from 'k6';
import {check} from 'k6';

//init
export const url= 'http://host.docker.internal:80';

export const options = {
    vus: 10,
    duration: '30s',
    thresholds: {
        http_req_duration: ['p(95) < 1000'],
        http_req_failed: ['rate < 0.01']
    }
};

//vu
export default function (){
    const response =  http.get(url);
    check(
     response,
     {
         'is status 200 ': (r) => r.status === 200,
         'body is not null':(r) => r.body.legth > 0,
     }
    );  
 
 }
 