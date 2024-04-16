import React, { useState } from 'react';
import { db } from '../main';
import { collection, addDoc } from 'firebase/firestore';

export const Upload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnails, setThumbnails] = useState([]);
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'phones'), {
        title: title,
        description: description,
        thumbnails: thumbnails,
        price: Number(price)
      });

      console.log("Phone added with ID: ", docRef.id);

      // Reset form fields after successful upload
      setTitle('');
      setDescription('');
      setThumbnails([]);
      setPrice('');
    } catch (error) {
      console.error("Error adding phone: ", error);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload New Phone</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="thumbnails">Thumbnails (comma-separated URLs):</label>
        <input
          type="text"
          id="thumbnails"
          value={thumbnails.join(',')}
          onChange={(e) => setThumbnails(e.target.value.split(','))}
          required
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <button type="submit">Upload Phone</button>
      </form>
    </div>
  );
};
