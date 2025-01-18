import React from "react";

const UserCard = ({ userName, countryName, companyName, createdAt, question, onEdit }) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="flex flex-col gap-3">
        <div className="text-xl font-semibold text-gray-800">{userName}</div>
        <div className="text-gray-600">
          <span className="font-medium">Country:</span> {countryName}
        </div>
        <div className="text-gray-600">
          <span className="font-medium">Company:</span> {companyName}
        </div>
        <div className="text-gray-500 text-sm">
          <span className="font-medium">Created On:</span> {new Date(createdAt).toLocaleString()}
        </div>
        <div className="text-gray-700">
          <span className="font-medium">Question:</span> {question}
        </div>
        <button
          onClick={onEdit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default UserCard;
