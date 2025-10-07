import React from 'react';
const ScoreBadge = ({ score }) => {
  let badgeColor = '';
  let badgeText = '';

  if (score > 70) {
    badgeColor = 'bg-badge-green caribbeangreen-400';
    badgeText = 'Strong';
  } else if (score > 49) {
    badgeColor = 'bg-badge-yellow text-yellow-200';
    badgeText = 'Good Start';
  } else {
    badgeColor = 'bg-badge-red text-red-dark';
    badgeText = 'Needs Work';
  }

  return (
    <div className={`px-3 bg-richblack py-1 rounded-full ${badgeColor}`}>
      <p className="text-sm font-medium">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;
