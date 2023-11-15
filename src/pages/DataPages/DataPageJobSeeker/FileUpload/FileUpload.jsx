import "./FileUpload.css"
import React, { useState, useRef } from 'react';
import axios from 'axios';

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
        handleUpload(event.target.files[0]); // Direct upload na bestandselectie
    };

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Activeer klik op verborgen file input
    };

    const handleUpload = async (file) => {
        if (!file) {
            alert('Selecteer eerst een bestand');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/werkzoekende/cv/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Bestand succesvol geüpload:', response.data);
        } catch (error) {
            console.error('Er is een fout opgetreden bij het uploaden van het bestand:', error);
        }
    };

    return (
        <div className="upload-file-div">
            <input className='input-file-upload'
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
            />
            <button className="button-upload" onClick={handleButtonClick}>Upload</button>
        </div>
    );
}

export default FileUpload;
