import axios from "axios";

// interface dataProps {
//     url: string,
    
// }

const BASE_URL = "https://dummyjson.com";



const headers = {
    accept: 'application/json',
}

export const fetchDataFromApi = async (url: string) => {
    try {
        // const {url} = props
        const { data } = await axios.get(BASE_URL + url, {
            headers
        })
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}