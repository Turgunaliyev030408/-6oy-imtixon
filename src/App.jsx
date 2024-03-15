import React, { useState, useEffect } from 'react';

function Shaxslar() {
  const [shaxslar, setShaxslar] = useState([]);
  const [familya, setFamilya] = useState('');
  const [ism, setIsm] = useState('');
  const [updateIndex, setUpdateIndex] = useState(null);

  useEffect(() => {
    shaxslarniOlish();
  }, []);

  const shaxslarniOlish = () => {
    const shaxslarLS = JSON.parse(localStorage.getItem('shaxslar')) || [];
    setShaxslar(shaxslarLS);
  };

  const qoshish = () => {
    const shaxs = { familya, ism };
    const yangiShaxslar = [...shaxslar, shaxs];

    localStorage.setItem('shaxslar', JSON.stringify(yangiShaxslar));
    setShaxslar(yangiShaxslar);
    setFamilya('');
    setIsm('');
  };

  const yangilash = (index) => {
    setUpdateIndex(index);
    setFamilya(shaxslar[index].familya);
    setIsm(shaxslar[index].ism);
  };

  const saqlash = () => {
    const yangilanganShaxs = { familya, ism };
    const yangiShaxslar = [...shaxslar];
    yangiShaxslar[updateIndex] = yangilanganShaxs;

    localStorage.setItem('shaxslar', JSON.stringify(yangiShaxslar));
    setShaxslar(yangiShaxslar);
    setFamilya('');
    setIsm('');
    setUpdateIndex(null);
  };

  const oChirish = (index) => {
    const yangiShaxslar = shaxslar.filter((_, i) => i !== index);
    localStorage.setItem('shaxslar', JSON.stringify(yangiShaxslar));
    setShaxslar(yangiShaxslar);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl text-center font-bold text-white mb-8">Imtixon</h1>

      <form id="shaxsForm" className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
        <div className="mb-4">
          <label htmlFor="familya" className="block text-sm font-medium text-gray-600 mb-2">Familya:</label>
          <input type="text" id="familya" name="familya" value={familya} onChange={(e) => setFamilya(e.target.value)} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-6">
          <label htmlFor="ism" className="block text-sm font-medium text-gray-600 mb-2">Ism:</label>
          <input type="text" id="ism" name="ism" value={ism} onChange={(e) => setIsm(e.target.value)} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        {updateIndex === null ? (
          <button type="button" onClick={qoshish} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:border-green-900">Create</button>
        ) : (
          <button type="button" onClick={saqlash} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:border-yellow-700">Storage</button>
        )}
      </form>

      <ul id="shaxslarList" className="mt-8 space-y-4">
        {shaxslar.map((shaxs, index) => (
          <li key={index} className="flex justify-between items-center">
            <span className="bg-white text-black px-4 py-2 rounded-md focus:outline-none ">Familya: {shaxs.familya}, Ism: {shaxs.ism}</span>
            <div>
              <button onClick={() => yangilash(index)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700">Update</button>
              <button onClick={() => oChirish(index)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:border-red-700 ml-2">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Shaxslar;
