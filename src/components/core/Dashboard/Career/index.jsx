import React, { useEffect, useState } from "react";
import HighlightText from "../../homePage/HighlightText"
import Btn from "./btn";
import { FaArrowRight } from "react-icons/fa";
import Feedback from "./feedback";
import ResumePage from "./resumePage";


// const Career = () => {
//     const [resumes, setResume] = useState([]);
//     const [selectedOption, setSelectedOption] = useState(null);

//     return (
//         <div className="bg-richblack-900 text-white text-4xl font-semibold min-w-full flex flex-col items-center justify-center gap-10 py-10 px-5" >
//             <div className="bg-richblack-900 text-white text-4xl font-semibold min-w-full " >

//                 {!selectedOption ? (<>
//                     <p className="w-full min-h-fit ">
//                         <HighlightText text={"Empower Your Career With- "} />
//                         <span className="bg-gradient-to-br from-[#7e3caa] via-[#cc4242] to-[#f3dc0e] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">AI-Crafted Resumes, Real-Time Feedback, and ATS Insights.</span>
//                     </p>
//                     <div className="hover:cursor-pointer" style={{ display: "flex", gap: "2rem", margin: "3rem 0", justifyContent: "center" }}>

//                         <Btn onClick={() => {
//                             setSelectedOption("feedback")
//                             console.log("Feedback Selected");
//                         }} active={true}
//                         >
//                             Analyze Resume with AI
//                             <FaArrowRight />
//                         </Btn>

//                         <Btn
//                             onClick={() => {
//                                 setSelectedOption("generator")
//                                 console.log("Resume Generator Selected");

//                             }}
//                             active={true}
//                             className="flex "
//                         >
//                             Generate Resume with NextGen AI
//                             <FaArrowRight />
//                         </Btn>


//                     </div>
//                      <div>
//                 {resumes.length > 0 ? (
//                     <div>
//                         <h2 className="text-2xl font-semibold mb-4">Your Previous Resumes</h2>
//                         <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
//                             {resumes.map((resume, idx) => (
//                                 <div
//                                     key={idx}
//                                     style={{
//                                         background: "#162447",
//                                         color: "#fff",
//                                         borderRadius: "12px",
//                                         boxShadow: "0 2px 8px #222",
//                                         padding: "1.5rem",
//                                         minWidth: "220px",
//                                         maxWidth: "320px",
//                                         marginBottom: "1rem"
//                                     }}
//                                 >
//                                     <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
//                                         {resume.title || `Resume ${idx + 1}`}
//                                     </h3>
//                                     <p style={{ fontSize: "1rem", color: "#c7c7c7" }}>
//                                         {resume.score || "No score available."}
//                                     </p>
//                                     {/* Add more fields as needed */}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ) : (
//                     <div className=" flex flex-col items-center justify-center mt-20">
//                         <h2 className="text-2xl font-semibold mb-4">No Resume Available</h2>
//                     </div>
//                 )}
//             </div>
//                 </>) : (
//                     <div>
//                         {selectedOption === "feedback" && <Feedback />}
//                         {selectedOption === "generator" && <ResumePage />}
//                     </div>
//                 )}

//             </div>
           
//         </div>
//     );
// };

// export default Career; 
// import { useState } from "react";
// import Feedback from "./Feedback";
// import ResumePage from "./ResumePage";
// import HighlightText from "./HighlightText"; // Assuming this exists
// import Btn from "./Btn"; // Assuming this is your custom button
// import { FaArrowRight } from "react-icons/fa";

const Career = () => {
  const [resumes, setResume] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleBack = () => {
    setSelectedOption(null); // Go back to the two-option view
  };
  // console.log("Career rendered");
  return (
    <div className="bg-richblack-900 text-white text-4xl font-semibold min-w-full flex flex-col items-center justify-center gap-10 py-10 px-5">
      <div className="bg-richblack-900 text-white text-4xl font-semibold min-w-full">
        {!selectedOption ? (
          <>
            <p className="w-full min-h-fit ">
              <HighlightText text={"Empower Your Career With- "} />
              <span className="bg-gradient-to-br from-[#7e3caa] via-[#cc4242] to-[#f3dc0e] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]">
                AI-Crafted Resumes, Real-Time Feedback, and ATS Insights.
              </span>
            </p>

            <div
              className="hover:cursor-pointer"
              style={{
                display: "flex",
                gap: "2rem",
                margin: "3rem 0",
                justifyContent: "center",
              }}
            >
              <Btn onClick={() => setSelectedOption("feedback")} active={true}>
                Analyze Resume with AI
                <FaArrowRight />
              </Btn>

              <Btn onClick={() => setSelectedOption("generator")} active={true}>
                Generate Resume with NextGen AI
                <FaArrowRight />
              </Btn>
            </div>

            <div>
              {resumes.length > 0 ? (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Your Previous Resumes
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    {resumes.map((resume, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: "#162447",
                          color: "#fff",
                          borderRadius: "12px",
                          boxShadow: "0 2px 8px #222",
                          padding: "1.5rem",
                          minWidth: "220px",
                          maxWidth: "320px",
                          marginBottom: "1rem",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {resume.title || `Resume ${idx + 1}`}
                        </h3>
                        <p style={{ fontSize: "1rem", color: "#c7c7c7" }}>
                          {resume.score || "No score available."}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center mt-20">
                  <h2 className="text-2xl font-semibold mb-4">
                    No Resume Available
                  </h2>
                </div>
              )}
            </div>
          </>
        ) : (
          <div>
            {selectedOption === "feedback" && (<Feedback onBack={handleBack}  />)}
            {selectedOption === "generator" && (<ResumePage onBack={handleBack} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Career;
