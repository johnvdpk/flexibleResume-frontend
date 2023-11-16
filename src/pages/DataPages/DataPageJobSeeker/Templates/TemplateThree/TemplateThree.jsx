import "./TemplateThree.css"
import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import defaultProfilePhoto from '../../../../../assets/profilefoto.png'

function TemplateThree({fileUrl,profileData, aboutMe, workData, studyData, personalData}) {

    const generatePDF = () => {
        const input = document.getElementById('template');
        html2canvas(input, {scale: 5})
            .then((canvas) => {
                const imgData = canvas.toDataURL('png')
                const pdf = new jsPDF('a4');
                pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
                pdf.save("CV.pdf");
            });
    }
    return (
        <div className='div-templatethree-wrapper-component' >
            <div className='div-templatethree' id='templatethree'>


                <div className='header-templatethree'>
                    <div className='templatethree-image'>
                        <img src={fileUrl || defaultProfilePhoto} className='img-foto' />
                    </div>

                    <div className='templatethree-aboutme'>
                        <p>{aboutMe}</p>
                    </div>

                    <div className='vertical-line'></div>

                    <div className='templatethree-profielgegevens'>
                        <table className='templatethree-table'>

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

                <div className='middle-templatethree'>

                    <div className='data-templatethree'>
                        <h3 className='h3-templatethree'>Werkervaring</h3>
                        <div className='horizontal-line'></div>
                        {workData.map((workItem, index) => (
                            <div key={index} className='item-templatethree'>
                                <p className='p-title-templatethree'>{workItem.company}</p>
                                <p className='p-period-templatethree'>{workItem.periodOfEmployment}</p>
                                <p className='p-info-templatethree'>{workItem.jobTitle}</p>
                                <p className='p-extrainfo-templatethree'>{workItem.jobInfo}</p>
                            </div>
                        ))}
                    </div>
                    <div className='data-templatethree'>

                        <h3 className='h3-templatethree'>Studies</h3>
                        <div className='horizontal-line'></div>
                        {studyData.map((studyItem, index) => (
                            <div key={index} className='item-templatethree'>
                                <p className='p-title-templatethree'>{studyItem.educationalInstitute}</p>
                                <p className='p-period-templatethree'>{studyItem.periodOfStudy}</p>
                                <p className='p-info-templatethree'>{studyItem.education}</p>
                                <p className='p-extrainfo-templatethree'>{studyItem.studyInfo}</p>
                            </div>
                        ))}


                    </div>
                    <div className='data-templatethree'>

                        <h3 className='h3-templatethree'>Studies</h3>
                        <div className='horizontal-line'></div>
                        {personalData.map((personalItem, index) => (
                            <div key={index} className='item-templatethree'>
                                <p className='p-title-templatethree'>{personalItem.hobby}</p>
                                <p className='p-period-templatethree'>{personalItem.periodOfHobby}</p>
                                <p className='p-extrainfo-templatethree'>{personalItem.hobbyInfo}</p>
                            </div>
                        ))}


                    </div>

                </div>

                <div className='footer-templatethree'>
                </div>



            </div>
            <button onClick={generatePDF}>Download als PDF</button>
        </div>
    );
}

export default TemplateThree;