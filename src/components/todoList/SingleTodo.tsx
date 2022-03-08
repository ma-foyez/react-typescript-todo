import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../model';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

interface Props {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {

    const [edit, setEdit] = useState<Boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
      }, [edit]);

    const handleDone = (id: Number) => {
        setTodos(todos.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)
        )
    }
console.log('editTodo :>> ', editTodo);
    const handleEdit = (e: React.FormEvent, id: Number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
        );
        setEdit(false);
    };

    const handleDelete = (id: Number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <form className='todos__single' onSubmit={(e) => handleEdit(e, todo.id)}>
            {edit ? (
                <input
                    value={editTodo}
                    onChange={(e) => setEditTodo(e.target.value)}
                    className="todos_single_text"
                    ref={inputRef}
                />
            ) : todo.isDone ? (
                <s className="todos_single_text">{todo.todo}</s>
            ) : (
                <span className="todos_single_text">{todo.todo}</span>
            )}

            <div>
                <span className="icon">
                    <AiFillEdit
                        onClick={() => {
                            if (!edit && !todo.isDone) {
                                setEdit(!edit);
                            }
                        }}
                    />
                </span>
                <span className="icon">
                    <AiFillDelete onClick={() => handleDelete(todo.id)} />
                </span>
                <span className="icon">
                    <MdDone onClick={() => handleDone(todo.id)} />
                </span>
            </div>
        </form>
    );
};

export default SingleTodo;