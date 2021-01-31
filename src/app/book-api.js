import axios from 'axios';
import auth from './auth';


export default{  
    getAllBooks(){
        axios.get("http://localhost:8082/book").then(response => { 
            return response.data;
        });
    }
}