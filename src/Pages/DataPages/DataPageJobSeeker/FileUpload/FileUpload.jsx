import "./FileUpload.css"
import React, { useState, useRef } from 'react';
import axios from 'axios';


function FileUpload({setFileUrl, fileUrl}) {

    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [addSucces, toggleAddSucces] = useState(null);


    const cvId = localStorage.getItem('cvId');
    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
        handleUpload(event.target.files[0]); // Direct upload na bestandselectie
    };

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Activeer klik op verborgen file input
    };

    async function handleUpload(file) {

        if (!file) {
            alert('Selecteer een png bestand niet groter dan 1mb');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('cvId', cvId);

        // Haal het JWT-token op
        const token = localStorage.getItem('token'); // Zorg ervoor dat dit de juiste sleutel is voor uw token


        try {
            const response = await axios.post('http://localhost:8080/jobseeker/cv/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Na succesvol uploaden, haal de afbeelding op een geautoriseerde manier op
            const downloadResponse = await axios.get(response.data.url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                responseType: 'blob'
            });

            // Maak een Blob-URL uit de response
            const blobUrl = window.URL.createObjectURL(new Blob([downloadResponse.data]));
            setFileUrl(blobUrl); // Update de staat met de Blob-URL
            toggleAddSucces(true);

        } catch (error) {
            console.error('Er is een fout opgetreden bij het uploaden van het bestand:', error);
            toggleAddSucces(false);
        }
    }

    return (
        <div className="upload-file-div">

            <input className='input-file-upload'
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
            />
            <button className="button-upload" onClick={handleButtonClick}>Upload</button>
            {addSucces === false && <p className='p-false-upload'> Gebruik een bestand onder 1MB</p>}
        </div>
    );
}

export default FileUpload;
