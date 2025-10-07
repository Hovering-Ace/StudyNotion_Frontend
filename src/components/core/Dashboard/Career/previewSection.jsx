import React, { forwardRef } from "react";

const PreviewSection = forwardRef(({ form }, ref) => {
    // Sample data for demo


    // Use provided form data or sample data for demo
    const data = form;

    return (
        <div ref={ref}  className="max-w-4xl mx-auto border-richblack-600 shadow-2xl print:shadow-none">
            {/* A4 Page Container */}
            <div className="w-full max-h-[297mm] text-sm text-black p-6 print:p-8 bg-white" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                
                {/* Header Section */}
                <header className="border-b-[1px] border-gray-900 pb-4 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-wide mb-2">
                        {data.personalDetails.name || "Your Name"}
                    </h1>
                    {data.role && (
                        <p className="text-xl text-gray-700 font-medium mb-3">
                            {data.role}
                        </p>
                    )}
                    
                    {/* Contact Information */}
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-600">
                        {data.personalDetails.address && (
                            <span className="flex items-center">
                                📍 {data.personalDetails.address}
                            </span>
                        )}
                        {data.email && (
                            <span className="flex items-center">
                                ✉️ {data.email}
                            </span>
                        )}
                        {data.contactNo && (
                            <span className="flex items-center">
                                📞 {data.contactNo}
                            </span>
                        )}
                        {data.socialLinks.linkedin && (
                            <a 
                                href={data.socialLinks.linkedin} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                🔗 LinkedIn
                            </a>
                        )}
                        {data.socialLinks.github && (
                            <a 
                                href={data.socialLinks.github} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-800 hover:text-gray-600 transition-colors"
                            >
                                💻 GitHub
                            </a>
                        )}
                        {data.socialLinks.portfolio && (
                            <a 
                                href={data.socialLinks.portfolio} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                🌐 Portfolio
                            </a>
                        )}
                    </div>
                </header>

                {/* Professional Summary */}
                {data.summary && (
                    <section className="mb-6">
                        <h2 className=" text-gray-900 mb-2 border-b border-gray-300 pb-1">
                            PROFESSIONAL SUMMARY
                        </h2>
                        <p className="px-3 py-1 bg-gray-100 rounded-lg shadow-sm text-xs font-medium text-gray-800 hover:bg-gray-200 transition">
                            {data.summary}
                        </p>
                    </section>
                )}

                {/* Skills */}
                {data.skills && (
                    <section className="mb-6">
                  <h2 className=" font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
                    CORE COMPETENCIES
                  </h2>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-gray-700">
                    {data.skills.map((skill, idx) => (
                      <div
                        key={idx}
                      className="px-3 py-1 bg-gray-100 rounded-lg shadow-sm text-xs font-medium text-gray-800 hover:bg-gray-200 transition"
                      >
                        {skill}
                     </div>
                    ))}
                  </div>
                 </section>
                )}
                

                {/* Professional Experience */}
                {data.experience && data.experience.filter(e => e.company || e.role).length > 0 && (
                    <section className="mb-6">
                        <h2 className="font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                            PROFESSIONAL EXPERIENCE
                        </h2>
                        {data.experience.map((exp, idx) =>
                            (exp.company || exp.role) && (
                                <div key={idx} className="mb-4 last:mb-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-gray-900">
                                            {exp.company}
                                            {exp.company && (
                                                <span className="font-normal text-gray-700"> | {exp.role}</span>
                                            )}
                                        </h3>
                                        {exp.duration && (
                                            <span className="text-sm text-gray-600 font-medium">
                                                {exp.duration}
                                            </span>
                                        )}
                                    </div>
                                    {exp.description && (
                                        <p className="px-3 py-1 bg-gray-100 rounded-lg shadow-sm text-xs font-medium text-gray-800    hover:bg-gray-200 transition">
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            )
                        )}
                    </section>
                )}

                {/* Projects */}
                {data.projects && data.projects.filter(p => p.title).length > 0 && (
                    <section className="mb-6">
                        <h2 className=" font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                            KEY PROJECTS
                        </h2>
                        {data.projects.map((proj, idx) =>
                            proj.title && (
                                <div key={idx} className="mb-3 last:mb-0">
                                    <div className='flex gap-4 items-start'>
                                        <h3 className="font-bold text-gray-900">
                                        {proj.title}
                                        {proj.link && (
                                            <a
                                                href={proj.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ml-2 text-blue-600 hover:text-blue-800 font-normal text-sm transition-colors"
                                            >
                                                [View Live]
                                            </a>
                                        )}
                                    </h3>
                                    <h2 className='font-bold text-gray-900'>{proj.techStack && (` - ${proj.techStack}`     
                                    )}</h2>
                                    </div>
                                    {proj.description && (
                                        <p className="px-3 py-1 bg-gray-100 rounded-lg shadow-sm text-xs font-medium text-gray-800    hover:bg-gray-200 transition">
                                            {proj.description}
                                        </p>
                                    )}
                                </div>
                            )
                        )}
                    </section>
                )}

                {/* Education */}
                {data.education && data.education.filter(e => e.degree || e.institute).length > 0 && (
                    <section className="mb-6">
                        <h2 className=" font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                            EDUCATION
                        </h2>
                        {data.education.map((edu, idx) =>
                            (edu.degree || edu.institute) && (
                                <div key={idx} className="mb-2 last:mb-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            {edu.degree && (
                                                <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                            )}
                                            {edu.institute && (
                                                <p className="text-gray-700 text-xs">{edu.institute}</p>
                                            )}
                                        </div>
                                        {edu.year && (
                                            <span className="text-sm text-gray-600 font-medium">
                                                {edu.year}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                    </section>
                )}

                {/* Two-column layout for Achievements and Certifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Achievements */}
                    {data.achievements && data.achievements.filter(Boolean).length > 0 && (
                        <section>
                            <h2 className=" font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                                ACHIEVEMENTS
                            </h2>
                            <ul className="space-y-1">
                                {data.achievements.filter(Boolean).map((ach, idx) => (
                                    <li key={idx} className="text-gray-700 text-xs leading-relaxed flex items-start">
                                        <span className="text-gray-400 mr-2 mt-1">•</span>
                                        <span>{ach}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Certifications */}
                    {data.certifications && data.certifications.filter(Boolean).length > 0 && (
                        <section>
                            <h2 className=" font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                                CERTIFICATIONS
                            </h2>
                            <ul className="space-y-1">
                                {data.certifications.filter(Boolean).map((cert, idx) => (
                                    <li key={idx} className="text-gray-700 text-xs leading-relaxed flex items-start">
                                        <span className="text-gray-400 mr-2 mt-1">•</span>
                                        <span>{cert}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
            
            {/* Print Styles */}
            <style jsx>{`
                @media print {
                    body { margin: 0; }
                    .print\\:shadow-none { box-shadow: none !important; }
                    .print\\:p-8 { padding: 2rem !important; }
                    @page { 
                        margin: 0.5in; 
                        size: A4;
                    }
                }
            `}</style>
        </div>
    );
});

export default PreviewSection;