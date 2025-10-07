import React from 'react'
import atsBad from '../../../../assets/icons/atsBad.svg'
import atsGood from '../../../../assets/icons/ats-good.svg'
import atsWarning from '../../../../assets/icons/ats-warning.svg'
import check from '../../../../assets/icons/check.svg'
import warning from '../../../../assets/icons/warning.svg'




const ATS = ({ score, suggestions }) => {
  // Determine background gradient based on score
  console.log(suggestions);
  
  const gradientClass = score > 69
    ? 'from-caribbeangreen-500'
    : score > 49
      ? 'from-yellow-100'
      : 'from-red-dark';

  // Determine icon based on score
  const iconSrc = score > 69
    ? atsGood
    : score > 49
      ? atsBad
      : atsWarning;

  // Determine subtitle based on score
  const subtitle = score > 69
    ? 'Great Job!'
    : score > 49
      ? 'Good Start'
      : 'Needs Improvement';

  return (
    <div className={`bg-gradient-to-b ${gradientClass} to-white text-richblack-900 rounded-2xl shadow-md w-full p-6`}>
      {/* Top section with icon and headline */}
      <div className="flex items-center gap-4 mb-6">
        <img src={iconSrc} alt="ATS Score Icon" className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold">ATS Score - {score}/100</h2>
        </div>
      </div>

      {/* Description section */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">{subtitle}</h3>
        <p className="text-richblack-900 text-xl mb-4">
          This score represents how well your resume is likely to perform in Applicant Tracking Systems used by employers.
        </p>

        {/* Suggestions list */}
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start text-sm gap-3">
              <img
                src={suggestion.type === "good" ? check : warning}
                alt={suggestion.type === "good" ? "Check" : "Warning"}
                className="w-5 h-5 mt-1"
              />
              <p
                className={suggestion.type === "good" ? "text-caribbeangreen-700" : ""}
                style={
                  suggestion.type === "good"
                    ? {}
                    : { color: "oklch(55.4% 0.135 66.442)" }
                }
              >
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing encouragement */}
      <p className="text-xl italic">
        Keep refining your resume to improve your chances of getting past ATS filters and into the hands of recruiters.
      </p>
    </div>
  )
}

export default ATS
