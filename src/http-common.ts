import axios from "axios";
import {Capacitor} from "@capacitor/core";

const env = Capacitor.getPlatform();
let baseURL;
if (env === "web") {
    baseURL = "http://localhost:8080/api"
} else {
    baseURL = "http://10.0.2.2:8080/api"
}

export default axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "application/json"
    }
});