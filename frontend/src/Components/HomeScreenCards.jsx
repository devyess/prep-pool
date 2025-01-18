import React from 'react';

const HomeScreenCards = ({ userName, country, company, question, createdAt }) => {
  return (
    <div>
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{userName}</h2>
            <p className="text-sm text-gray-600">{country}</p>
            <p className="text-sm text-gray-600">{company}</p>
          </div>
          <p className="text-sm text-gray-500">{createdAt}</p>
        </div>
        {/* Question Section */}
        <p className="mt-4 text-gray-700 text-base leading-relaxed">{question}</p>
      </div>
    </div>
  );
};

export default HomeScreenCards;
