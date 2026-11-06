import axios from 'axios'

export async function getData(url:string){
    const response = await axios.get(url);
    return response.data;
}
