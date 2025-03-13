import { useState } from 'react'; 
import './Post.css';

function Post({ id, author, body, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(body);

    // **Fix Edit Handler**
    async function handleSave() {
        const response = await fetch(`http://localhost:8080/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ body: editedText })
        });

        if (!response.ok) {
            console.error('Failed to update post');
            return;
        }

        onEdit(id, editedText);
        setIsEditing(false);
    }

    // **Fix Delete Handler**
    async function handleDelete() {
        const response = await fetch(`http://localhost:8080/posts/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            console.error('Failed to delete post');
            return;
        }

        onDelete(id);
    }

    return (
        <li className="post">
            <p className="author">{author}</p>
            
            {isEditing ? (
                <div className="edit-section">
                    <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        rows="3"
                    />
                    <div className="btn-group">
                        <button className="btn save" onClick={handleSave}>Save</button>
                        <button className="btn cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <p className="text">{body}</p>
            )}

            {!isEditing && (
                <div className="btn-group">
                    <button className="btn edit" onClick={() => setIsEditing(true)}>Edit</button>
                    <button className="btn delete" onClick={handleDelete}>Delete</button>
                </div>
            )}
        </li>
    );
}

export default Post;
