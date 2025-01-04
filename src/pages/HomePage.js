import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useTodoStore from '../stores/todoStore';

function HomePage() {
    const { fetchAllTodos, todos, createNewTodo, deleteExistingTodo } = useTodoStore();
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [newTodoDescription, setNewTodoDescription] = useState('');

    useEffect(() => {
        fetchAllTodos();
    }, [todos, fetchAllTodos]);

    const handleCreate = async () => {
        if (!newTodoTitle.trim()) {
            alert('Title is required');
            return;
        }

        await createNewTodo({
            title: newTodoTitle,
            description: newTodoDescription || '',
        });

        setNewTodoTitle('');
        setNewTodoDescription('');
        fetchAllTodos();
    };
    
    const handleDelete = async (id) => {
        await deleteExistingTodo(id);
        fetchAllTodos();
    }

    return (
        <div>
            <h1>Home Page</h1>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <Link to={`/todo/${todo.id}`}>{todo.title}</Link>
                        <button onClick={() => handleDelete(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={newTodoDescription}
                    onChange={(e) => setNewTodoDescription(e.target.value)}
                />
                <button onClick={handleCreate}>Create</button>
            </div>
        </div>
    );
}

export default HomePage;    