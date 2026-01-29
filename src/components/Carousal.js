import React from 'react'

export default function Carousel() {
    return (
        <div>

            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

                <div className="carousel-inner " id='carousel'>
                    <div className="carousel-caption" style={{ zIndex: "9" }}>
                        <form className="d-flex justify-content-center">
                            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn text-white bg-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active" >
                        <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1920&h=1080&fit=crop&q=80" className="d-block w-100" style={{ filter: "brightness(30%)", height: "500px", objectFit: "cover" }} alt="Burger background" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1920&h=1080&fit=crop&q=80" className="d-block w-100" style={{ filter: "brightness(30%)", height: "500px", objectFit: "cover" }} alt="Pizza background" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1920&h=1080&fit=crop&q=80" className="d-block w-100" style={{ filter: "brightness(30%)", height: "500px", objectFit: "cover" }} alt="Food background" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>


        </div>
    )
}