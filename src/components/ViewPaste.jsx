import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ViewPaste() {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-500 text-center text-lg">Paste not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 sm:px-8 sm:py-10">
        <h1 className="text-xl font-semibold text-gray-700 text-center mb-6">
          View Paste
        </h1>
        
        <input
          type="text"
          placeholder="Enter Title"
          value={paste.title}
          disabled
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-md bg-gray-100 focus:outline-none cursor-not-allowed text-gray-600 text-lg sm:text-xl"
        />

        <textarea
          value={paste.content}
          placeholder="Enter content here"
          rows={10}
          disabled
          className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none cursor-not-allowed text-gray-600 leading-relaxed text-lg sm:text-xl"
        />
      </div>
    </div>
  );
}

export default ViewPaste;
