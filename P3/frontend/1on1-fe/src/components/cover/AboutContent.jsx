import React from 'react';
// Import images
import featureImage from '../../assets/images/feature1.jpg';
import teamMemberImage from '../../assets/images/ferret.jpg';

function AboutContent() {
    return (
        <main className="container py-5">
            <div className="container py-5">
                <h1>About</h1>
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <p className="lead">Welcome to 1on1, your premier scheduling platform dedicated to making meeting organization seamless and efficient. Our mission is to streamline the process of setting up regular one-on-one meetings, allowing you to focus more on meaningful interactions and less on the logistics.</p>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                <h2 className="mb-4">Key Features</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <img src={featureImage} className="card-img-top" alt="Feature 1"/>
                            <div className="card-body">
                                <h5 className="card-title">Feature 1</h5>
                                <p className="card-text">this feature is literally so good</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <img src={featureImage} className="card-img-top" alt="Feature 2"/>
                            <div className="card-body">
                                <h5 className="card-title">Feature 2</h5>
                                <p className="card-text">im in love with this feature</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <img src={featureImage} className="card-img-top" alt="Feature 3"/>
                            <div className="card-body">
                                <h5 className="card-title">Feature 3</h5>
                                <p className="card-text">this is my favourite one actually</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                <h2 className="mb-4">Meet the Team</h2>
                <div className="row">
                    <div className="col-md-3">
                        <div className="card">
                            <img src={teamMemberImage} className="card-img-top" alt="Team Member"/>
                            <div className="card-body text-center">
                                <h5 className="card-title">kailas</h5>
                                <p className="card-text">dev</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <img src={teamMemberImage} className="card-img-top" alt="Team Member"/>
                            <div className="card-body text-center">
                                <h5 className="card-title">jennifer</h5>
                                <p className="card-text">dev</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <img src={teamMemberImage} className="card-img-top" alt="Team Member"/>
                            <div className="card-body text-center">
                                <h5 className="card-title">robert</h5>
                                <p className="card-text">dev</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <img src={teamMemberImage} className="card-img-top" alt="Team Member"/>
                            <div className="card-body text-center">
                                <h5 className="card-title">ocean</h5>
                                <p className="card-text">dev</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AboutContent;
