"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data?.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState("");
	const [posts, setPosts] = useState([]);
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch("/api/prompt");
			const data = await response.json();
			setPosts(data);
			setSearchResults(data);
		};

		fetchPosts();
	}, []);

	const filterData = (str) => {
		let filteredData = posts.filter(
			(post) =>
				post.prompt.toLowerCase().includes(str.toLowerCase()) ||
				post?.tag?.toLowerCase().includes(str.toLowerCase()) ||
				post?.creator?.username
					?.toLowerCase()
					.includes(str.toLowerCase()),
		);
		setSearchResults(filteredData);
	};

	const handleSearchChange = (e) => {
		if (e.target.value) {
			setSearchText(e.target.value);
			filterData(e.target.value);
		} else {
			setSearchText("");
			setSearchResults(posts);
		}
	};

	const handleTagClick = (tag) => {
		setSearchText(tag);
		filterData(tag);
	};

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search with tag/username/prompt"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>
			<PromptCardList
				data={searchResults}
				handleTagClick={handleTagClick}
			/>
		</section>
	);
};

export default Feed;
