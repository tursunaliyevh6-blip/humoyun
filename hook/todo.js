import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:4000/api";

//KATEGORIYALARNI OLISH
const fetchCategories = async () => {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data.data; 
};

export const useGetCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });
};

// MAXSULOTLARNI OLISH 
const fetchFastfoods = async () => {
    const response = await axios.get(`${API_URL}/fastfoods`);
    return response.data.data; 
};

export const useGetFastfoods = () => {
    return useQuery({
        queryKey: ['fastfoods'],
        queryFn: fetchFastfoods,
    });
};