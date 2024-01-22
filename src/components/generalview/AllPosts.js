import { useState, useEffect } from "react";
import { getAllPosts } from "../../services/postService";
import { getAllTopics } from "../../services/topicService";
import("./AllPosts.css");

export const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allTopics, setAllTopics] = useState([]);
  const [showFilteredPosts, setFilteredPosts] = useState([]);
  const [showChosenTopicOnly, setChosenTopicOnly] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllTopics().then((allTopicsArr) => {
      setAllTopics(allTopicsArr);
    });
  }, []);

  useEffect(() => {
    getAllPosts().then((allPostsArr) => {
      setAllPosts(allPostsArr);
    });
  }, []);

  useEffect(() => {
    if (showChosenTopicOnly === "0") {
      setFilteredPosts(allPosts);
    } else if (showChosenTopicOnly) {
      const filteredPosts = allPosts.filter(
        (post) => post.topic.id === parseInt(showChosenTopicOnly)
      );
      setFilteredPosts(filteredPosts);
    } else {
      setFilteredPosts(allPosts);
    }
  }, [allPosts, showChosenTopicOnly]);

  useEffect(() => {
    const foundPosts = allPosts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setFilteredPosts(foundPosts);
  }, [searchTerm, allPosts]);

  return (
    <div className="allPosts">
      <div className="filter-bar">
        <select
          className="filter-dropdown"
          onChange={(e) => {
            setChosenTopicOnly(e.target.value);
          }}
        >
          <option value="0">Filter by topic</option>$
          {allTopics.map((topicObj) => {
            return (
              <option key={topicObj.id} value={topicObj.id}>
                {topicObj.name}
              </option>
            );
          })}
        </select>
        <input
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          type="text"
          placeholder="Search Posts By Title"
          className="post-search"
        ></input>
      </div>

      {showFilteredPosts.map((postObj) => {
        return (
          <section className="post-card" key={postObj.id}>
            <div className="topic-card">
              <div className="topic-name">{postObj.topic.name}</div>
            </div>
            <div className="title-text">
              <div>"{postObj.title}"</div>
            </div>
            <div className="likes">
              <div>Likes</div>
            </div>
          </section>
        );
      })}
    </div>
  );
};
