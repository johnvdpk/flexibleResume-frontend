import './FAQ.css';
import { useState } from 'react';
import faqs from './FAQData.json';
import { CSSTransition } from 'react-transition-group';


function FAQ() {


    // Gebruik één useState voor de zichtbaarheidsstatus van alle items
    const [visibleFAQIndex, setVisibleFAQIndex] = useState(null);

    // Toggle functie om de zichtbaarheid te veranderen
    const toggleVisibility = index => {
        if (visibleFAQIndex === index) {
            setVisibleFAQIndex(null);
        } else {
            setVisibleFAQIndex(index);
        }
    };

    return (
        <div className="FAQ-wrapper">
            <div className="FAQ-container">
                <h2>FAQ</h2>
                {faqs.map((faq, index) => (
                    <div key={index}>
                        <h4>{faq.question}</h4>
                        <button className="FAQ-button" onClick={() => toggleVisibility(index)}>
                            Wat is het antwoord?&nbsp;&nbsp;{visibleFAQIndex === index ? '  -' : '  +'}
                        </button>
                        <CSSTransition
                            in={visibleFAQIndex === index}
                            timeout={500}
                            classNames="faq-transition"
                            unmountOnExit
                        >
                            <div className="FAQ-div">
                                <p className="FAQ-p">{faq.answer}</p>
                            </div>
                        </CSSTransition>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FAQ;
