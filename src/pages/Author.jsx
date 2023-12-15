import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import axios from "axios";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState();
  const [loading, setLoading] = useState(true);
  const [followButton, setFollowButton] = useState(true);

  const fetchAuthor = async () => {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthor(data);
    setLoading(false);
  };

  // Add Follow
  const addFollow = () => {
    author.followers = author.followers + 1;
    setFollowButton(!followButton);
  };

  // Remove Follow
  const removeFollow = () => {
    author.followers = author.followers - 1;
    setFollowButton(!followButton);
  };

  useEffect(() => {
    fetchAuthor();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        {loading ? (
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton height={150} width={150} borderRadius={70} />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton height={30} width={100} />
                            <span className="profile_username">
                              <Skeleton height={25} width={50} />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton height={20} width={150} />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton height={30} width={200} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems loading={loading} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          author && (
            <section aria-label="section">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={author.authorImage} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {author.authorName}
                              <span className="profile_username">
                                @{author.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {author.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {author.followers} followers
                          </div>
                          {followButton ? (
                            <Link
                              to="#"
                              className="btn-main"
                              onClick={addFollow}
                            >
                              Follow
                            </Link>
                          ) : (
                            <Link
                              to="#"
                              className="btn-main"
                              onClick={removeFollow}
                            >
                              Unfollow
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems
                        loading={loading}
                        nftCollection={author.nftCollection}
                        author={author}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        )}
      </div>
    </div>
  );
};

export default Author;
