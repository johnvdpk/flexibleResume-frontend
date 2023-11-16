import "./TemplateOne.css"
import profilephoto from '../../../../../assets/profilefoto.png';
import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import defaultProfilePhoto from '../../../../../assets/profilefoto.png'

function TemplateOne({fileUrl,profileData, aboutMe, workData, studyData, personalData}) {

    const generatePDF = () => {
        const input = document.getElementById('template');
        html2canvas(input, { scale: 5 })
            .then((canvas) => {
                const imgData = canvas.toDataURL('png')
                const pdf = new jsPDF('a4');
                pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
                pdf.save("CV.pdf");
            });
    }

    return (
        <div className='div-template-wrapper-component' >
            <div className='div-template' id='template'>


                <div className='header-template'>
                    <div className='template-image'>
                        <img src={fileUrl || defaultProfilePhoto} className='img-foto' />
                    </div>

                    <div className='template-aboutme'>
                        <p>{aboutMe}</p>
                    </div>

                    <div className='vertical-line'></div>

                    <div className='template-profielgegevens'>
                        <table className='template-table'>

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

                <div className='middle-template'>

                    <div className='data-template'>
                        <h3 className='h3-template'>Werkervaring</h3>
                        <div className='horizontal-line'></div>
                        {workData.map((workItem, index) => (
                            <div key={index} className='item-template'>
                                <p className='p-title-template'>{workItem.company}</p>
                                <p className='p-period-template'>{workItem.periodOfEmployment}</p>
                                <p className='p-info-template'>{workItem.jobTitle}</p>
                                <p className='p-extrainfo-template'>{workItem.jobInfo}</p>
                            </div>
                        ))}
                    </div>
                    <div className='data-template'>

                        <h3 className='h3-template'>Studies</h3>
                        <div className='horizontal-line'></div>
                        {studyData.map((studyItem, index) => (
                            <div key={index} className='item-template'>
                                <p className='p-title-template'>{studyItem.educationalInstitute}</p>
                                <p className='p-period-template'>{studyItem.periodOfStudy}</p>
                                <p className='p-info-template'>{studyItem.education}</p>
                                <p className='p-extrainfo-template'>{studyItem.studyInfo}</p>
                            </div>
                        ))}


                    </div>
                    <div className='data-template'>

                        <h3 className='h3-template'>Studies</h3>
                        <div className='horizontal-line'></div>
                        {personalData.map((personalItem, index) => (
                            <div key={index} className='item-template'>
                                <p className='p-title-template'>{personalItem.hobby}</p>
                                <p className='p-period-template'>{personalItem.periodOfHobby}</p>
                                <p className='p-extrainfo-template'>{personalItem.hobbyInfo}</p>
                            </div>
                        ))}


                    </div>

                </div>

                <div className='footer-template'>
                </div>



            </div>
            <button onClick={generatePDF}>Download als PDF</button>
        </div>
    );
}

export default TemplateOne;