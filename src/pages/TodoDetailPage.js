import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useTodoStore from '../stores/todoStore';

function TodoDetailPage() {
    const { id } = useParams();
    const { fetchTodoDetail, selectedTodo, updateExistingTodo, patchExistingTodo, loading, error } = useTodoStore();
    const [editMode, setEditMode] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');

    useEffect(() => {
        if (id) {
            fetchTodoDetail(id);
        }
    }, [id, fetchTodoDetail]);

    useEffect(() => {
        if (selectedTodo) {
            setUpdatedTitle(selectedTodo.title);
            setUpdatedDescription(selectedTodo.description || '');
        }
    }, [selectedTodo]);

    const handleUpdate = async () => {
        if (!id) return;
        await updateExistingTodo(id, { title: updatedTitle, description: updatedDescription });
        setEditMode(false);
    };

    const handlePatch = async () => {
        if (!id) return;
        await patchExistingTodo(id, selectedTodo.completed); // 현재 상태 전달
      };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!selectedTodo) {
        return <p>No Todo found.</p>;
    }

    return (
        <div>
            <h1>Todo Detail Page</h1>
            <ul>
                <li><strong>ID:</strong> {selectedTodo.id}</li>
                <li>
                    <strong>Title:</strong>
                    {editMode ? (
                        <input
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                        />
                    ) : (
                        selectedTodo.title
                    )}
                </li>
                <li>
                    <strong>Description:</strong>
                    {editMode ? (
                        <textarea
                            value={updatedDescription}
                            onChange={(e) => setUpdatedDescription(e.target.value)}
                        />
                    ) : (
                        selectedTodo.description || 'No description available'
                    )}
                </li>
                <li><strong>Status:</strong> {selectedTodo.completed ? 'Completed' : 'Pending'}</li>
            </ul>

            {editMode ? (
                <>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                </>
            ) : (
                <button onClick={() => setEditMode(true)}>Edit</button>
            )}

            <button onClick={handlePatch}>
                {selectedTodo.completed ? 'Mark as Pending' : 'Mark as Completed'}
            </button>

            <Link to="/">Go Back</Link>
        </div>
    );
}

export default TodoDetailPage;
