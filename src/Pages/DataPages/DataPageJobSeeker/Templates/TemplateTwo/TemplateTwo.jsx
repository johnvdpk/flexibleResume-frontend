import "./TemplateTwo.css"
import profilePhoto from '../../../../../Assets/profilefoto.png';
import React, {useEffect, useState} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function TemplateTwo({ fileUrl, profileData, aboutMe, workData, studyData, personalData }) {
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
        const input = document.getElementById('template-two');
        html2canvas(input, { scale: 5 })
            .then((canvas) => {
                const imgData = canvas.toDataURL('png');
                const pdf = new jsPDF('a4');
                pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
                pdf.save("CV.pdf");
            });
    };

    return (
        <div className='div-template-two-wrapper-component' >
            <div className='div-template-two' id='template-two'>


                <div className='header-template-two'>
                    <div className='template-two-image'>
                        <img src={base64Image} className='img-foto' alt='profilephoto' />
                    </div>

                    <div className='template-two-aboutme'>
                        <p>{aboutMe}</p>
                    </div>

                    <div className='vertical-line'></div>

                    <div className='template-two-profielgegevens'>
                        <table className='template-two-table'>

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

                <div className='middle-template-two'>

                    <div className='data-template-two'>
                        <h3 className='h3-template-two'>Werkervaring</h3>
                        <div className='horizontal-line'></div>
                        {workData.map((workItem, index) => (
                            <div key={index} className='item-template-two'>
                                <p className='p-title-template-two'>{workItem.company}</p>
                                <p className='p-period-template-two'>{workItem.periodOfEmployment}</p>
                                <p className='p-info-template-two'>{workItem.jobTitle}</p>
                                <p className='p-extrainfo-template-two'>{workItem.jobInfo}</p>
                            </div>
                        ))}
                    </div>
                    <div className='data-template-two'>

                        <h3 className='h3-template-two'>Studies</h3>
                        <div className='horizontal-line'></div>
                        {studyData.map((studyItem, index) => (
                            <div key={index} className='item-template-two'>
                                <p className='p-title-template-two'>{studyItem.educationalInstitute}</p>
                                <p className='p-period-template-two'>{studyItem.periodOfStudy}</p>
                                <p className='p-info-template-two'>{studyItem.education}</p>
                                <p className='p-extrainfo-template-two'>{studyItem.studyInfo}</p>
                            </div>
                        ))}


                    </div>
                    <div className='data-template-two'>

                        <h3 className='h3-template-two'>Hobbys</h3>
                        <div className='horizontal-line'></div>
                        {personalData.map((personalItem, index) => (
                            <div key={index} className='item-template-two'>
                                <p className='p-title-template-two'>{personalItem.hobby}</p>
                                <p className='p-period-template-two'>{personalItem.periodOfHobby}</p>
                                <p className='p-extrainfo-template-two'>{personalItem.hobbyInfo}</p>
                            </div>
                        ))}


                    </div>

                </div>

                <div className='footer-template-two'>
                </div>



            </div>
            <button onClick={generatePDF}>Download als PDF</button>
        </div>
    );
}

export default TemplateTwo;