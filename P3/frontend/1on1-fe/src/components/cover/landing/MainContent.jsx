// MainContent.js
import React from 'react';
import FeatureCard from './FeatureCard';
import {Link} from 'react-router-dom';

function MainContent() {
    const features = [
        {
            title: 'Efficient Scheduling',
            text: 'Quickly find and set up meetings with an intuitive interface.',
        },
        {
            title: 'Flexible Integrations',
            text: 'Easily integrate with your favorite calendar apps.',
        },
        {
            title: 'Secure & Private',
            text: 'Your data is protected with end-to-end encryption.',
        },
    ];

    return (
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <main className="container py-5">
                <h2 className="text-center mb-4">Discover the easiest way to schedule and
                    manage your 1:1 meetings</h2>
                <div className="row row-cols-1 row-cols-md-3 g-4 text-center">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} title={feature.title}
                                     text={feature.text}/>
                    ))}
                </div>

                <div className="text-center mt-5">
                    <Link to="/signup"
                          className="btn btn-lg btn-light fw-bold border-white btn-log-in">Get
                        Started</Link>
                </div>
            </main>
        </div>
    );
}

export default MainContent;
