import "./TemplateThree.css"
import profilePhoto from '../../../../../assets/profilefoto.png';
import React, {useEffect, useState} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function TemplateThree({ fileUrl, profileData, aboutMe, workData, studyData, personalData }) {
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
        const input = document.getElementById('template-three');
        html2canvas(input, { scale: 5 })
            .then((canvas) => {
                const imgData = canvas.toDataURL('png');
                const pdf = new jsPDF('a4');
                pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
                pdf.save("CV.pdf");
            });
    };

    return (
        <div className='div-template-three-wrapper-component' >
            <div className='div-template-three' id='template-three'>


                <div className='header-template-three'>
                    <div className='template-three-image'>
                        <img src={base64Image} className='img-foto' alt='profilephoto' />
                    </div>

                    <div className='template-three-aboutme'>
                        <p>{aboutMe}</p>
                    </div>

                    <div className='vertical-line'></div>

                    <div className='template-three-profielgegevens'>
                        <table className='template-three-table'>

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

                <div className='middle-template-three'>

                    <div className='data-template-three'>
                        <h3 className='h3-template-three'>Werkervaring</h3>
                        <div className='horizontal-line'></div>
                        {workData.map((workItem, index) => (
                            <div key={index} className='item-template-three'>
                                <p className='p-title-template-three'>{workItem.company}</p>
                                <p className='p-period-template-three'>{workItem.periodOfEmployment}</p>
                                <p className='p-info-template-three'>{workItem.jobTitle}</p>
                                <p className='p-extrainfo-template-three'>{workItem.jobInfo}</p>
                            </div>
                        ))}
                    </div>
                    <div className='data-template-three'>

                        <h3 className='h3-template-three'>Studies</h3>
                        <div className='horizontal-line'></div>
                        {studyData.map((studyItem, index) => (
                            <div key={index} className='item-template-three'>
                                <p className='p-title-template-three'>{studyItem.educationalInstitute}</p>
                                <p className='p-period-template-three'>{studyItem.periodOfStudy}</p>
                                <p className='p-info-template-three'>{studyItem.education}</p>
                                <p className='p-extrainfo-template-three'>{studyItem.studyInfo}</p>
                            </div>
                        ))}


                    </div>
                    <div className='data-template-three'>

                        <h3 className='h3-template-three'>Hobbys</h3>
                        <div className='horizontal-line'></div>
                        {personalData.map((personalItem, index) => (
                            <div key={index} className='item-template-three'>
                                <p className='p-title-template-three'>{personalItem.hobby}</p>
                                <p className='p-period-template-three'>{personalItem.periodOfHobby}</p>
                                <p className='p-extrainfo-template-three'>{personalItem.hobbyInfo}</p>
                            </div>
                        ))}


                    </div>

                </div>

                <div className='footer-template-three'>
                </div>



            </div>
            <button onClick={generatePDF}>Download als PDF</button>
        </div>
    );
}

export default TemplateThree;