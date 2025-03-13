import { useEffect, useState } from 'react';
import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import LoadingSpinner from './LoadingSpinner';

function PostsList({ isPosting, onStopPosting }) {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchPosts();
	}, []);

	async function fetchPosts() {
		setLoading(true);
		const response = await fetch('http://localhost:8080/posts');
		const resData = await response.json();
		setPosts(resData.posts);
		setLoading(false);
	}

	async function addPostHandler(postData) {
		setLoading(true);
		const response = await fetch('http://localhost:8080/posts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(postData)
		});
		const resData = await response.json();
		setPosts((prevPosts) => [resData.post, ...prevPosts]);
		setLoading(false);
	}

	// **Fix Edit Post**
	async function editPostHandler(postId, newBody) {
		setPosts((prevPosts) =>
			prevPosts.map((post) => (post.id === postId ? { ...post, body: newBody } : post))
		);
	}

	// **Fix Delete Post**
	async function deletePostHandler(postId) {
		setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
	}

	return (
		<>
			{isPosting && (
				<Modal onCloseModal={onStopPosting}>
					<NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
				</Modal>
			)}

			{loading && <LoadingSpinner />}

			{!loading && posts.length > 0 && (
				<ul className="posts">
					{posts.map((post) => (
						<Post
							key={post.id}
							id={post.id}
							author={post.author}
							body={post.body}
							onDelete={deletePostHandler}
							onEdit={editPostHandler}
						/>
					))}
				</ul>
			)}

			{!loading && posts.length === 0 && (
				<div style={{ textAlign: 'center', color: 'white' }}>
					<h2>There is no post yet.</h2>
					<p>Try to add some!</p>
				</div>
			)}
		</>
	);
}

export default PostsList;
