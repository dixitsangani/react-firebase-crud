import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';

export default function Todo() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const todosCollection = collection(db, 'todos');
  const [todoData, setTodoData] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      const editData = doc(db, 'todos', editId);
      await updateDoc(editData, { email: login.email, password: login.password });
      setEditId(null);
      viewData();
      setLogin({ email: '', password: '' });
    } else {
      try {
        await addDoc(todosCollection, { email: login.email, password: login.password });
      } catch (err) {
        console.log('Something is wrong', err);
      }
      setLogin({ email: '', password: '' });
      viewData();
    }
  };

  const viewData = async () => {
    const todo = await getDocs(todosCollection);
    setTodoData(todo.docs.map((v, i) => ({ ...v.data(), id: v.id })));
  };

  useEffect(() => {
    viewData();
  }, []);

  const handleDelete = async (id) => {
    const deleteData = doc(db, 'todos', id);
    await deleteDoc(deleteData);
    setTodoData(todoData.filter((i) => i.id !== id));
  };

  const handleEdit = (v) => {
    setLogin({ email: v.email, password: v.password });
    setEditId(v.id);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Add an email"
          value={login.email}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="password"
          placeholder="Add a password"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editId ? 'Edit' : 'Add'}
        </button>
      </form>

      <div className="mt-4 space-y-4">
        {todoData.map((v) => (
          <div key={v.id} className="p-4 border rounded space-y-2">
            <h1 className="text-xl">{v.email}</h1>
            <h2 className="text-lg">{v.password}</h2>
            <div className="space-x-2">
              <button
                onClick={() => handleDelete(v.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                DELETE
              </button>
              <button
                onClick={() => handleEdit(v)}
                className="bg-yellow-500 text-white p-2 rounded"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
