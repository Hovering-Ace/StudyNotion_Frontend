
import React, { useState } from "react";

import Btn from "./btn";
import { FaArrowLeft, FaArrowRight, FaBriefcase } from "react-icons/fa";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { GoogleGenAI } from "@google/genai";
import PreviewSection from "./previewSection";
import { TiTickOutline } from "react-icons/ti";
import html2pdf from "html2pdf.js";

import { useNavigate } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";


const ResumeGenerator = ({
    onBack,
    form,
    setForm,
    step,
    setStep,
    generatedSummary,
    setGeneratedSummary
}) => {
    // Steps for required fields
    const steps = [
        "Personal Details",
        "Social Links",
        "Skills",
        "Objective",
        "Contact Details",
        "Projects",
        "Education",
        "Experience",
        "Achievements",
        "Certifications",
    ];
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault(); // prevent form refresh
        const element = document.getElementById("resume-preview");
        
        html2pdf(element);  
    };
   


    // Handlers
    const handleChange = (section, field, value, idx) => {
        if (Array.isArray(form[section])) {
            const updated = [...form[section]];
            if (typeof updated[idx] === "object") {
                updated[idx][field] = value;
            } else {
                updated[idx] = value;
            }
            setForm({ ...form, [section]: updated });
        } else if (typeof form[section] === "object") {
            setForm({ ...form, [section]: { ...form[section], [field]: value } });
        } else {
            setForm({ ...form, [section]: value });
        }
    };

    const handleAdd = (section, template) => {
        setForm({ ...form, [section]: [...form[section], template] });

    };

    const handleRemove = (section, idx) => {
        const updated = [...form[section]];
        updated.splice(idx, 1);
        setForm({ ...form, [section]: updated });
    };

    const handleSkillsChange = (value) => {
        setForm({ ...form, skills: value.split(",").map((s) => s.trim()) });
    };

    const handleSummaryOption = async (option) => {
        setForm({ ...form, summaryOption: option });
        setLoading(true);

        if (option === "gemini") {
            console.log("Generating summary with Gemini...");
            try {
                const summary = await generateSummaryFromGemini(form);
                setGeneratedSummary(summary);
                setForm((prev) => ({ ...prev, summary, summaryOption: option }));
            } catch (err) {
                console.error("Error generating summary:", err);
            } finally {
                setLoading(false);
            }
        }
    };

    const generateSummaryFromGemini = async (details) => {
        // prompt
        const content = `
            Consider yourself as a resume building expert. 
            Tailor the given summary in a professional manner — Also don’t add all skills mention only add necessary skills and don't sound like a machine and avoid buzzwords. 
            Limit the summary to 4-5 lines. 
            use details from the job role and skills provided below to customize the summary:
            In the end, only give the summary as a response, nothing else.
            Job Role: ${details.jobTitle}.
            student Skills: ${details.skills.join(", ")}.
        `;

        // init Gemini client
        const ai = new GoogleGenAI({
            apiKey: "AIzaSyCLxTedH4JvJxLgRGHDcDrVWjRPnIvu2Fw" // ⚠️ don’t hardcode in production!
        });

        console.log("Generating summary with Gemini API call...");

        // make request
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: "user", parts: [{ text: content }] }],
        });
        console.log("Gemini response:", response);
        // extract text properly
        const text =
            response.candidates?.[0]?.content?.parts?.[0]?.text || "";
        console.log("Extracted summary text:", text);
        return text.trim();
    };


    // Form UI for each step
    const renderStep = () => {
        const label = "block text-s px-1 py-1 font-semibold text-gray-200 mb-2 mt-2 tracking-wide";
        const input = "w-fit h-fit px-1 py-1 rounded-md text-richblack-800 bg-richblack-50 text-xl";

        switch (step) {
            case 0:
                return (
                    <>
                        <label className={label}>Name*</label>
                        <input className={input}
                            type="text"
                            value={form.personalDetails.name}
                            onChange={(e) =>
                                handleChange("personalDetails", "name", e.target.value)
                            }
                            required
                        />
                       
                        <label className={label}>Address</label>
                        <input className={input}
                            type="text"
                            value={form.personalDetails.address}
                            onChange={(e) =>
                                handleChange("personalDetails", "address", e.target.value)
                            }
                        />
                    </>
                );
            case 1:
                return (
                    <>
                        <label className={label}>LinkedIn*</label>
                        <input className={input}
                            type="url"
                            value={form.socialLinks.linkedin}
                            onChange={(e) =>
                                handleChange("socialLinks", "linkedin", e.target.value)
                            }
                            required
                        />
                        <label className={label}>GitHub</label>
                        <input className={input}
                            type="url"
                            value={form.socialLinks.github}
                            onChange={(e) =>
                                handleChange("socialLinks", "github", e.target.value)
                            }
                        />
                        <label className={label}>Portfolio</label>
                        <input className={input}
                            type="url"
                            value={form.socialLinks.portfolio}
                            onChange={(e) =>
                                handleChange("socialLinks", "portfolio", e.target.value)
                            }
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <label className={label}>Skills*</label>
                        <input className={input}
                            type="text"
                            placeholder="Comma separated skills (e.g. React, Node.js, Python)"
                            value={form.skills.join(", ")}
                            onChange={(e) => handleSkillsChange(e.target.value)}
                            required
                        />
                    </>
                );
            case 3:
                return (
                    <>
                        <label className={label}>Role*</label>
                        <input className={input}
                            type="text"
                            placeholder="Your desired role"
                            value={form.role}
                            onChange={(e) => handleChange("role", null, e.target.value)}
                            required
                        />
                        <label className={label}>Summary*</label>

                        <div>
                            {loading ? (
                                <div className="flex items-center space-x-2 text-sm text-richblack-200 animate-pulse">
                                    <span className="animate-bounce">⚡</span>
                                    <span className="tracking-wide">Generating Summary</span>
                                    <span className="dot1 animate-bounce delay-100 ">.</span>
                                    <span className="dot2 animate-bounce delay-200 ">.</span>
                                    <span className="dot3 animate-bounce delay-300 ">.</span>
                                </div>
                            ) : (
                                <button
                                    className="text-sm ml-3 bg-gradient-to-r from-blue-400 to-pink-100 rounded-xl 
                                         text-center p-2 hover:scale-110 transition-transform"
                                    type="button"
                                    onClick={() => handleSummaryOption("gemini")}
                                >
                                    Generate with AI 🤖
                                </button>
                            )}
                        </div>
                        <textarea
                            className="m-2 rounded-xl w-[90%] text-black border-2 border-richblack-600 p-2 text-xl"
                            placeholder="Professional summary"
                            value={form.summaryOption === "gemini" ? generatedSummary : form.summary}
                            onChange={(e) => handleChange("summary", null, e.target.value)}
                            disabled={form.summaryOption === "gemini" && loading}
                            required
                            rows={4}
                        />


                    </>
                );
            case 4:
                return (

                    <>
                        <label className={label}>Contact No*</label>
                        <input className={input}
                            type="tel"
                            value={form.contactNo}
                            onChange={(e) => handleChange("contactNo", null, e.target.value)}
                            required
                        />

                        <label className={label}>Email*</label>
                        <input className={input}
                            type="email"
                            value={form.email}
                            onChange={(e) => handleChange("email", null, e.target.value)}
                            required
                        />
                    </>
                );
            case 5:
                return (
                    <>
                        <label className={label}>Projects*</label>
                        {form.projects.map((proj, idx) => (
                            <div key={idx} className="m-4 flex flex-col gap-2">
                                <input className={input}
                                    type="text"
                                    placeholder="Title"
                                    value={proj.title}
                                    onChange={(e) =>
                                        handleChange("projects", "title", e.target.value, idx)
                                    }
                                    required
                                />
                                <input className={input}
                                    type="text"
                                    placeholder="Tech stack"
                                    value={proj.techStack}
                                    onChange={(e) =>
                                        handleChange("projects", "techStack", e.target.value, idx)
                                    }
                                    required
                                />
                                <input className={input}
                                    type="url"
                                    placeholder="Link"
                                    value={proj.link}
                                    onChange={(e) =>
                                        handleChange("projects", "link", e.target.value, idx)
                                    }
                                />
                                <input className={input}
                                    type="text"
                                    placeholder="Description"
                                    value={proj.description}
                                    onChange={(e) =>
                                        handleChange("projects", "description", e.target.value, idx)
                                    }
                                    required
                                />
                                {form.projects.length > 1 && (
                                    <button className="text-xl flex gap-2 items-center justify-center" type="button" onClick={() => handleRemove("projects", idx)}>
                                        <FaCircleMinus />
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        <button className="text-xl flex gap-2 items-center justify-center" type="button" onClick={() => handleAdd("projects", { title: "", link: "", description: "" })}>
                            <FaCirclePlus />
                            Add Project

                        </button>
                    </>
                );
            case 6:
                return (
                    <>
                        <label className={label}>Education*</label>
                        {form.education.map((edu, idx) => (
                            <div key={idx} className="m-4 flex flex-col gap-2 ">
                                <input className={input}
                                    type="text"
                                    placeholder="Degree"
                                    value={edu.degree}
                                    onChange={(e) =>
                                        handleChange("education", "degree", e.target.value, idx)
                                    }
                                    required
                                />
                                <input className={input}
                                    type="text"
                                    placeholder="Institute"
                                    value={edu.institute}
                                    onChange={(e) =>
                                        handleChange("education", "institute", e.target.value, idx)
                                    }
                                    required
                                />
                                <input className={input}
                                    type="text"
                                    placeholder="Year"
                                    value={edu.year}
                                    onChange={(e) =>
                                        handleChange("education", "year", e.target.value, idx)
                                    }
                                    required
                                />
                                {form.education.length > 1 && (
                                    <button className="text-xl flex gap-2 items-center justify-center"
                                        type="button" onClick={() => handleRemove("education", idx)}>
                                        <FaCircleMinus />
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        <button className="text-xl flex gap-2 items-center justify-center" type="button" onClick={() => handleAdd("education", { degree: "", institute: "", year: "" })}>
                            <FaCirclePlus /> Add Education
                        </button>
                    </>
                );
            case 7:
                return (
                    <>
                        <label className={label}>Experience*</label>
                        {form.experience.map((exp, idx) => (
                            <div key={idx} className="m-4 flex flex-col gap-2" >
                                <input className={input}
                                    type="text"
                                    placeholder="Company"
                                    value={exp.company}
                                    onChange={(e) =>
                                        handleChange("experience", "company", e.target.value, idx)
                                    }
                                    required
                                />
                                <input className={input}
                                    type="text"
                                    placeholder="Role"
                                    value={exp.role}
                                    onChange={(e) =>
                                        handleChange("experience", "role", e.target.value, idx)
                                    }
                                    required
                                />
                                <input className={input}
                                    type="text"
                                    placeholder="Duration"
                                    value={exp.duration}
                                    onChange={(e) =>
                                        handleChange("experience", "duration", e.target.value, idx)
                                    }
                                    required
                                />
                                <input className={input}
                                    type="text"
                                    placeholder="Description"
                                    value={exp.description}
                                    onChange={(e) =>
                                        handleChange("experience", "description", e.target.value, idx)
                                    }
                                    required
                                />
                                {form.experience.length > 1 && (
                                    <button type="button" className="text-xl flex gap-2 items-center justify-center" onClick={() => handleRemove("experience", idx)}>
                                        <FaCircleMinus /> Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        <button className="text-xl flex gap-2 items-center justify-center" type="button" onClick={() => handleAdd("experience", { title: "", link: "", description: "" })}>
                            <FaBriefcase />
                            Add Experience
                        </button>
                    </>
                );
            case 8:
                return (
                    <>
                        <label className={label}>Achievements</label>
                        {form.achievements.map((ach, idx) => (
                            <div key={idx} style={{ marginBottom: "8px" }}>
                                <input className={input}
                                    type="text"
                                    placeholder="Achievement"
                                    value={ach}
                                    onChange={(e) =>
                                        handleChange("achievements", null, e.target.value, idx)
                                    }
                                />
                                {form.achievements.length > 1 && (
                                    <button className="text-xl flex gap-2 items-center justify-center" type="button" onClick={() => handleRemove("achievements", idx)}>
                                        <FaCircleMinus /> Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" className="text-xl flex gap-2 items-center justify-center" onClick={() => handleAdd("achievements", "")}>
                            <FaCirclePlus /> Add Achievement
                        </button>
                    </>
                );
            case 9:
                return (
                    <>
                        <label className={label}>Certifications</label>
                        {form.certifications.map((cert, idx) => (
                            <div key={idx} style={{ marginBottom: "8px" }}>
                                <input className={input}
                                    type="text"
                                    placeholder="Certification"
                                    value={cert}
                                    onChange={(e) =>
                                        handleChange("certifications", null, e.target.value, idx)
                                    }
                                />
                                {form.certifications.length > 1 && (
                                    <button className="text-xl flex gap-2 items-center justify-center" type="button" onClick={() => handleRemove("certifications", idx)}>
                                        <FaCircleMinus />  Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        <button className="text-xl flex gap-2 items-center justify-center" type="button" onClick={() => handleAdd("certifications", "")}>
                            <FaCirclePlus /> Add Certification
                        </button>
                    </>
                );
            default:
                return null;
        }
    };

    // Navigation handlers
    const nextStep = () => {
        if (step < steps.length - 1) setStep(step + 1);
    };
    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    }



    return (
       <div  className="gap-2 flex-col md:flex-grow flex md:flex-row " >
        <div className="border border-richblack-300 rounded-lg p-2 mb-4 w-[45%] max-h-fit bg-gradient-to-tr from-caribbeangreen-700 " >
            {/* <EnhancedProgressSection></EnhancedProgressSection> */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    // You can handle final submission here
                    alert("Resume data submitted!");
                }}
            >
                <div className="border border-richblack-300 rounded-lg p-2 mb-4">
                    <strong>Step {step + 1} of {steps.length}: {steps[step]}</strong>
                </div>
                {renderStep()}
                <div className="flex justify-around mt-4">
                     {step > 0? (
                        <Btn
                            type="button"
                            onClick={prevStep}
                            active={true}
                        >
                            <FaArrowLeft />
                            Previous
                           
                        </Btn>
                    ) : (
                        <Btn
                            type="button"   // prevent unwanted form refresh
                            onClick={onBack}
                            active={true}
                        >
                            <MdDashboardCustomize />Back to Dashboard
                        </Btn>

                    )}
                    {step < steps.length - 1 ? (
                        <Btn
                            type="button"
                            onClick={nextStep}
                            active={true}
                        >
                            Next
                            <FaArrowRight />
                        </Btn>
                    ) : (
                        <Btn
                            type="button"   // prevent unwanted form refresh
                            onClick={handleSubmit}
                            active={true}
                        >
                            <TiTickOutline className="h-6 w-6" /> Generate Resume
                        </Btn>

                    )}
                </div>
            </form>
        </div>
         <div id="resume-preview"  style={{ flex: 1 }}>
           <PreviewSection form={form} />
        </div>
       </div>
    );
}
export default ResumeGenerator;

