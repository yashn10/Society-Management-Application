import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Home = () => {

    const [images, setImages] = useState([]);


    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('https://api.unsplash.com/search/photos', {
                    params: {
                        query: 'universe',
                        client_id: 'kA-zydsmeLXPKoB_5jA78VpnAoHJT0Fc2r1m1AXbSUs',
                        per_page: 3
                    }
                });
                setImages(response.data.results);
            } catch (error) {
                console.error('Error fetching images', error);
            }
        };

        fetchImages();
    }, []);


    return (

        <div>
            {/* Carousel */}
            <div id="carouselExampleCaptions" className="carousel slide shadow-lg mb-5" style={{ height: '500px', overflow: 'hidden', borderRadius: '0 0 24px 24px' }}>
                <div className="carousel-inner h-100">
                    {images.map((image, index) => (
                        <div key={index} className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`}>
                            <div className="position-absolute w-100 h-100" style={{ background: 'linear-gradient(rgba(0,0,0,0.3), rgba(10,10,14,1))', zIndex: 1 }}></div>
                            <img src={image.urls.regular} className="d-block w-100 h-100" alt={`Slide ${index + 1}`} style={{ objectFit: 'cover' }} />
                            <div className="carousel-caption d-none d-md-block" style={{ zIndex: 2 }}>
                                <h1 className="display-4 fw-bold fade-in mb-3 text-white">E-Housing Solutions</h1>
                                <p className="lead fade-in delay-100 text-light">Find your perfect space in the universe of real estate</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev" style={{ zIndex: 3 }}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next" style={{ zIndex: 3 }}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Welcome Section */}
            <div className="container py-5 mb-5">
                <div className="row align-items-center g-5">
                    <div className="col-md-5 d-flex justify-content-center">
                        <div className="position-relative float-anim">
                            <div className="position-absolute rounded-circle" style={{ top: '-10px', left: '-10px', right: '-10px', bottom: '-10px', background: 'var(--gradient-primary)', opacity: 0.3, filter: 'blur(20px)', zIndex: 0 }}></div>
                            <img
                                src="./login.webp"
                                alt="Member"
                                className="img-fluid rounded-circle shadow-lg zoom-in position-relative"
                                style={{ width: '320px', height: '320px', objectFit: 'cover', border: '4px solid var(--glass-border)', zIndex: 1 }}
                            />
                        </div>
                    </div>
                    <div className="col-md-7 ps-md-5">
                        <h2 className="display-5 fw-bold mb-4 fade-in">
                            Welcome To <span className="text-gradient">E-Housing</span> Society
                        </h2>
                        <p className="lead mb-4 fade-in delay-100 text-secondary" style={{ lineHeight: 1.8 }}>
                            We provide comprehensive solutions for housing needs, whether you’re looking to rent or sell your property. Explore our premium services and find the best fit for your modern lifestyle.
                        </p>
                        <div className="d-flex gap-3 fade-in delay-200 mt-4">
                            <button className="btn btn-primary btn-lg" onClick={() => console.log('Rent Home')}>
                                <i className="fas fa-key me-2"></i> Rent Home
                            </button>
                            <button className="btn btn-outline-light btn-lg" onClick={() => console.log('Sell Home')}>
                                <i className="fas fa-home me-2"></i> Sell Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="container pb-5">
                <div className="glass-panel p-5 text-center position-relative overflow-hidden fade-in delay-300">
                    <div className="position-absolute" style={{ top: '-50%', left: '-20%', width: '400px', height: '400px', background: 'var(--accent-primary)', opacity: 0.1, filter: 'blur(100px)', borderRadius: '50%' }}></div>
                    <div className="position-absolute" style={{ bottom: '-50%', right: '-20%', width: '400px', height: '400px', background: 'var(--accent-secondary)', opacity: 0.1, filter: 'blur(100px)', borderRadius: '50%' }}></div>

                    <h2 className="mb-4 fw-bold position-relative z-1">Ready to Get Started?</h2>
                    <p className="lead mb-4 text-secondary mx-auto position-relative z-1" style={{ maxWidth: '600px' }}>
                        Join thousands of users who have found their dream homes through our premium platform. Sign in today and unlock exclusive access.
                    </p>
                    <button
                        className="btn btn-primary btn-lg pulse mt-2 position-relative z-1"
                        data-bs-toggle="modal"
                        data-bs-target="#memberModal"
                    >
                        Sign In Now <i className="fas fa-arrow-right ms-2"></i>
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Home;
