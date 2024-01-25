import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { universalurl } from "../helper";

import { CartProvider } from "../components/ContextReducer";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch(`${universalurl}/api/foodData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      

      const data = await response.json();
      // console.log(data);
      setFoodItem(data[0]);
      setFoodCat(data[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <CartProvider>
      <div>
        <div>
          <Navbar />
        </div>
        <div>
          <div
            id="carouselExampleControls"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
            style={{ objectFit: "contain !important" }}
          >
            <div className="carousel-inner" id="carousel-inner">
              <div className="carousel-caption" style={{ zIndex: 10 }}>
                <div className="d-flex justify-content-center">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
                </div>
              </div>
              <div className="carousel-item active">
                <img
                  src="https://source.unsplash.com/random/900×700/?burger"
                  className="d-block w-100"
                  style={{ filter: "brightness(30%)" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/900×700/?momo"
                  className="d-block w-100"
                  style={{ filter: "brightness(30%)" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/900×700/?pizza"
                  className="d-block w-100"
                  style={{ filter: "brightness(30%)" }}
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="container">
          {foodCat && foodCat.length !== 0 ? (
            foodCat.map((data) => (
              <div key={data._id} className="row mb-3">
                <div>
                  <div className="fs-3 m-3">{data.CategoryName}</div>
                </div>
                <hr />
                {foodItem && foodItem.length !== 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filteritem) => (
                      <div
                        key={filteritem._id}
                        className="col-12 col-md-6 col-lg-3"
                      >
                        <Card
                          foodItem={filteritem}
                          options={filteritem.options}
                        />
                      </div>
                    ))
                ) : (
                  <div key="noDataFound">"no such data found"</div>
                )}
              </div>
            ))
          ) : (
            <div key="noResponse">no response</div>
          )}
        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
    </CartProvider>
  );
}
