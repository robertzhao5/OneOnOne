// FeatureCard.js
import React from 'react';

function FeatureCard({ title, text }) {
    return (
        <div className="col">
            <div className="card h-100 bg-body-secondary">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{text}</p>
                </div>
            </div>
        </div>
    );
}

export default FeatureCard;
