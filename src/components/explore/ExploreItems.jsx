import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import CountDown from "../UI/CountDown";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [NFTs, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOpt, setFilterOpt] = useState(null);
  const [totalNFTPerLoad, setTotalNFTPerLoad] = useState(8);
  const NFTsPerLoad = 4;

  // Get NFT Data
  const getNFTs = async (filterOption) => {
    let urlLink = "";

    if (filterOption) {
      urlLink = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterOption}`;
    } else {
      urlLink = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`;
    }

    const { data } = await axios.get(urlLink);
    setNFTs(data);
    setLoading(false);
  };

  // Load More Post
  const loadMoreNFT = () => {
    setTotalNFTPerLoad(totalNFTPerLoad + NFTsPerLoad);
  };

  useEffect(() => {
    getNFTs(filterOpt);
  }, [filterOpt]);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => setFilterOpt(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
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
                  <Skeleton width={300} height={300} />
                </div>
                <div className="nft__item_info">
                  <Skeleton width={100} />
                  <div className="nft__item_price">
                    <Skeleton width={70} />
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <Skeleton />
                  </div>
                </div>
              </div>
            </div>
          ))
        : NFTs.slice(0, totalNFTPerLoad).map((nft) => (
            <div
              key={nft.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${nft.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
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

      <div className="col-md-12 text-center">
        {totalNFTPerLoad !== NFTs.length ? (
          <Link
            onClick={loadMoreNFT}
            to=""
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </Link>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
