import "./TemplateTwo.css"
import profilephoto from '../../../../../assets/profilefoto.png';
import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function TemplateTwo({profileData, aboutMe, workData, studyData, personalData}) {

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
        <div className='div-templatetwo-wrapper-component' >
            <div className='div-templatetwo' id='templatetwo'>


                <div className='header-templatetwo'>
                    <div className='templatetwo-image'>
                        <img src={profilephoto} className='img-foto' />
                    </div>

                    <div className='templatetwo-aboutme'>
                        <p>{aboutMe}</p>
                    </div>

                    <div className='vertical-line'></div>

                    <div className='templatetwo-profielgegevens'>
                        <table className='templatetwo-table'>

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

                <div className='middle-templatetwo'>

                    <div className='data-templatetwo'>
                        <h3 className='h3-templatetwo'>Werkervaring</h3>
                        <div className='horizontal-line'></div>
                        {workData.map((workItem, index) => (
                            <div key={index} className='item-templatetwo'>
                                <p className='p-title-templatetwo'>{workItem.company}</p>
                                <p className='p-period-templatetwo'>{workItem.periodOfEmployment}</p>
                                <p className='p-info-templatetwo'>{workItem.jobTitle}</p>
                                <p className='p-extrainfo-templatetwo'>{workItem.jobInfo}</p>
                            </div>
                        ))}
                    </div>
                    <div className='data-templatetwo'>

                        <h3 className='h3-templatetwo'>Studies</h3>
                        <div className='horizontal-line'></div>
                        {studyData.map((studyItem, index) => (
                            <div key={index} className='item-templatetwo'>
                                <p className='p-title-templatetwo'>{studyItem.educationalInstitute}</p>
                                <p className='p-period-templatetwo'>{studyItem.periodOfStudy}</p>
                                <p className='p-info-templatetwo'>{studyItem.education}</p>
                                <p className='p-extrainfo-templatetwo'>{studyItem.studyInfo}</p>
                            </div>
                        ))}


                    </div>
                    <div className='data-templatetwo'>

                        <h3 className='h3-templatetwo'>Studies</h3>
                        <div className='horizontal-line'></div>
                        {personalData.map((personalItem, index) => (
                            <div key={index} className='item-templatetwo'>
                                <p className='p-title-templatetwo'>{personalItem.hobby}</p>
                                <p className='p-period-templatetwo'>{personalItem.periodOfHobby}</p>
                                <p className='p-extrainfo-templatetwo'>{personalItem.hobbyInfo}</p>
                            </div>
                        ))}


                    </div>

                </div>

                <div className='footer-templatetwo'>
                </div>



            </div>
            <button onClick={generatePDF}>Download als PDF</button>
        </div>
    );
}

export default TemplateTwo;