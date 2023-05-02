import axios from "axios";
import { API_BASE_URL } from "@core/utils/constants/clientConfig";

export const client = axios.create({
	baseURL: API_BASE_URL
});