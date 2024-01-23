import React from 'react';
import axios from "axios";

export const apiRequest = async (url, method, data = null) => {

    try {
        const response = await axios({url, method, data});
        return response.data;

    } catch (error) {
        console.error('fout bij API request', error);
    }

};

