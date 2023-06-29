"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
	const [posts, setPosts] = useState([]);
	const searchParams = useSearchParams();
	const userName = searchParams.get("name");

	console.log(params);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(
				`/api/users/${params?.id}/posts`,
			);
			const data = await response.json();
			setPosts(data);
		};

		if (params?.id) fetchPosts();
	}, []);

	return (
		<Profile
			name={userName}
			desc={`Welcome to ${userName} personalized profile page. Explore amazing prompts and get inspired by the power of their imagination.`}
			data={posts}
		/>
	);
};

export default UserProfile;
