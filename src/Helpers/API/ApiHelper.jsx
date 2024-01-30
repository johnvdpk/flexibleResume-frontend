import React from 'react';
import axios from "axios";

export const apiRequest = async (url, method, data = null) => {
    try {

        const jwtToken = localStorage.getItem('token');

        // Configureer de headers
        const config = {
            method: method,
            url: url,
            headers: {
                'Authorization': `Bearer ${jwtToken}` // Voeg de token toe aan de headers
            },
            data: data
        };

        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error('fout bij API request', error);
        throw error;
    }
};

