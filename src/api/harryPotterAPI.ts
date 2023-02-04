import axios from 'axios';

const harryPotterApi = axios.create({

    baseURL: 'https://hp-api.onrender.com/api'
});

export default harryPotterApi;