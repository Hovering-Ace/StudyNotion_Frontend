import React, { useState } from "react";
import ResumeGenerator from "./resumeGenerator";


const initialState = {
    personalDetails: { name: "", dob: "", address: "" },
    socialLinks: { linkedin: "", github: "", portfolio: "" },
    contactNo: "",
    email: "",
    education: [{ degree: "", institute: "", year: "" }],
    projects: [{ title: "", link: "", description: "" }],
    skills: [],
    role: "",
    summary: "",
    summaryOption: "typed",
    experience: [{ company: "", role: "", duration: "", description: "" }],
    achievements: [""],
    certifications: [""],
};

const ResumePage = ({onBack }) => {
    const [form, setForm] = useState(initialState);
    const [step, setStep] = useState(0);
    const [generatedSummary, setGeneratedSummary] = useState("");

    // Pass all handlers and state to ResumeGenerator
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <div style={{ flex: 1, padding: "32px" }}>
                <ResumeGenerator
                    onBack= { onBack }
                    form={form}
                    setForm={setForm}
                    step={step}
                    setStep={setStep}
                    generatedSummary={generatedSummary}
                    setGeneratedSummary={setGeneratedSummary}
                />
            </div>
           
        </div>
    );
};

export default ResumePage;