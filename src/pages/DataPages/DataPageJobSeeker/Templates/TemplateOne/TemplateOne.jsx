import "./TemplateOne.css"
import profilePhoto from '../../../../../assets/profilefoto.png';
import React, {useEffect, useState} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function TemplateOne({ fileUrl, profileData, aboutMe, workData, studyData, personalData }) {
    const [base64Image, setBase64Image] = useState('');

    const convertImageToBase64 = (imgUrl) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imgUrl;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.height = img.naturalHeight;
            canvas.width = img.naturalWidth;
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL('image/png');
            setBase64Image(dataURL);
        };
    };

    useEffect(() => {
        convertImageToBase64(fileUrl || profilePhoto);
    }, [fileUrl]);

    const generatePDF = () => {
        const input = document.getElementById('template-one');
        html2canvas(input, { scale: 5 })
            .then((canvas) => {
                const imgData = canvas.toDataURL('png');
                const pdf = new jsPDF('a4');
                pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
                pdf.save("CV.pdf");
            });
    };

    return (
        <div className='div-template-one-wrapper-component' >
            <div className='div-template-one' id='template-one'>


                <div className='header-template-one'>
                    <div className='template-one-image'>
                        <img src={base64Image} className='img-foto' alt='profilephoto' />
                    </div>

                    <div className='template-one-aboutme'>
                        <p>{aboutMe}</p>
                    </div>

                    <div className='vertical-line'></div>

                    <div className='template-one-profielgegevens'>
                        <table className='template-one-table'>

                            <tr><td>{profileData.firstName}</td></tr>
                            <tr><td>{profileData.surName}</td></tr>
                            <tr><td>{profileData.dateOfBirth}</td></tr>
                            <tr><td>{profileData.phoneNumber}</td></tr>
                            <tr><td>{profileData.residence}</td></tr>
                            <tr><td>{profileData.zipCode}</td></tr>
                            <tr><td>{profileData.homeAddress}</td></tr>
                            <tr><td>{profileData.houseNumber}</td></tr>

                        </table>
                    </div>

                </div>

                <div className='middle-template-one'>

                    <div className='data-template-one'>
                        <h3 className='h3-template-one'>Werkervaring</h3>
                        <div className='horizontal-line'></div>
                        {workData.map((workItem, index) => (
                            <div key={index} className='item-template-one'>
                                <p className='p-title-template-one'>{workItem.company}</p>
                                <p className='p-period-template-one'>{workItem.periodOfEmployment}</p>
                                <p className='p-info-template-one'>{workItem.jobTitle}</p>
                                <p className='p-extrainfo-template-one'>{workItem.jobInfo}</p>
                            </div>
                        ))}
                    </div>
                    <div className='data-template-one'>

                        <h3 className='h3-template-one'>Studies</h3>
                        <div className='horizontal-line'></div>
                        {studyData.map((studyItem, index) => (
                            <div key={index} className='item-template-one'>
                                <p className='p-title-template-one'>{studyItem.educationalInstitute}</p>
                                <p className='p-period-template-one'>{studyItem.periodOfStudy}</p>
                                <p className='p-info-template-one'>{studyItem.education}</p>
                                <p className='p-extrainfo-template-one'>{studyItem.studyInfo}</p>
                            </div>
                        ))}


                    </div>
                    <div className='data-template-one'>

                        <h3 className='h3-template-one'>Hobbys</h3>
                        <div className='horizontal-line'></div>
                        {personalData.map((personalItem, index) => (
                            <div key={index} className='item-template-one'>
                                <p className='p-title-template-one'>{personalItem.hobby}</p>
                                <p className='p-period-template-one'>{personalItem.periodOfHobby}</p>
                                <p className='p-extrainfo-template-one'>{personalItem.hobbyInfo}</p>
                            </div>
                        ))}


                    </div>

                </div>

                <div className='footer-template-one'>
                </div>



            </div>
            <button onClick={generatePDF}>Download als PDF</button>
        </div>
    );
}

export default TemplateOne;