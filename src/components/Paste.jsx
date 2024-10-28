import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removePaste, resetAllPaste } from '../features/paste/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { PencilIcon, EyeIcon, TrashIcon, ClipboardIcon, ShareIcon } from '@heroicons/react/24/solid';

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removePaste(pasteId));
  };

  const handleReset = () => {
    dispatch(resetAllPaste());
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard");
  };

  const handleShare = async (paste) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: paste.title,
          text: paste.content,
          url: window.location.href + `/?pasteId=${paste._id}`,
        });
        toast.success("Shared successfully!");
      } catch (err) {
        toast.error("Error sharing: " + err.message);
      }
    } else {
      handleCopy(`${paste.title}\n${paste.content}\n${window.location.href}/?pasteId=${paste._id}`);
      toast.success("Shared via copy to clipboard!");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-lg space-y-4">
        <input
          type="search"
          placeholder="Search here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleReset}
          className="w-full py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
        >
          Reset
        </button>

        <div className="space-y-4">
          {filterData.length > 0 ? (
            filterData.map((paste) => (
              <div key={paste._id} className="p-4 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 space-y-2">
                <div className="text-lg font-semibold">{paste.title}</div>
                <div className="text-gray-700">{paste.content}</div>

                <div className="flex flex-wrap gap-2 mt-2">
                  <NavLink to={`/?pasteId=${paste._id}`} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                    <PencilIcon className="w-5 h-5" aria-label="Edit" />
                  </NavLink>
                  <NavLink to={`/pastes/${paste._id}`} className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200">
                    <EyeIcon className="w-5 h-5" aria-label="View" />
                  </NavLink>
                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                  >
                    <TrashIcon className="w-5 h-5" aria-label="Delete" />
                  </button>
                  <button
                    onClick={() => handleCopy(paste.content)}
                    className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200"
                  >
                    <ClipboardIcon className="w-5 h-5" aria-label="Copy" />
                  </button>
                  <button
                    onClick={() => handleShare(paste)}
                    className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200"
                  >
                    <ShareIcon className="w-5 h-5" aria-label="Share" />
                  </button>
                </div>
                <div className="text-xs text-gray-500">{paste.createdAt}</div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No pastes found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Paste;
