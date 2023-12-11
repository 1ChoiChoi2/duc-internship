import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [NFTs, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch NFT Data
    const getNFTS = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setNFTs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
        setLoading(false); // Make sure to set loading to false even in case of an error
      }
    };
    getNFTS();
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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <OwlCarousel>
              {new Array(4).fill(0).map((_, index) => (
                <div key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width={500} height={200} />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton width={50} height={50} borderRadius={50} />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width={90} height={20} />
                      <div>
                        <span>
                          <Skeleton width={60} height={20} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel {...options}>
              {NFTs.map((nft) => (
                <div key={nft.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${nft.nftId}`}>
                        <img
                          src={nft.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${nft.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={nft.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{nft.title}</h4>
                      </Link>
                      <span>ERC-{nft.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
