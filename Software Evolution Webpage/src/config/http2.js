import axios from 'axios'

export const http = axios.create({
    baseURL: 'http://vulno-xml-files.s3.amazonaws.com', //base URL goes here
})