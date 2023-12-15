import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import axios from "axios";
import CountDown from "../UI/CountDown";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

const NewItems = () => {
  const [NFTs, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNFTs = async () => {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );

    setNFTs(data);
    setLoading(false);
  };

  useEffect(() => {
    getNFTs();
  }, []);

  // Owl Carousel Setting
  const options = {
    loop: true,
    nav: true,
    margin: 10,
    dots: false,
    responsive: {
      1200: {
        items: 4,
      },
      900: {
        items: 3,
      },
      600: {
        items: 2,
      },
      0: {
        items: 1,
      },
    },
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel {...options}>
            {loading
              ? new Array(4).fill(0).map((_, index) => (
                  <div key={index} data-aos="fade-up">
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton width={50} height={50} borderRadius={50} />
                      </div>
                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <Skeleton height={300} width={400} />
                      </div>
                      <div className="nft__item_info">
                        <Skeleton height={35} width={200} />
                        <div className="nft__item_price">
                          <Skeleton height={20} width={100} />
                        </div>
                        <div className="nft__item_like">
                          <Skeleton height={20} width={50} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : NFTs.map((nft) => (
                  <div key={nft.id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${nft.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img className="lazy" src={nft.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {nft.expiryDate ? (
                        <div className="de_countdown">
                          <CountDown expiryDate={nft.expiryDate} />
                        </div>
                      ) : (
                        <></>
                      )}

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to={`/item-details/${nft.nftId}`}>
                          <img
                            src={nft.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>{nft.title}</h4>
                        </Link>
                        <div className="nft__item_price">{nft.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{nft.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
