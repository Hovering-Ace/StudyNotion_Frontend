import React, { useState, useRef } from 'react';
import { Upload, BookmarkCheck, Briefcase, FileText, Building, LucideScanSearch, BriefcaseBusiness } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { TiArrowBack } from "react-icons/ti";
import { useForm, Controller } from "react-hook-form"
import FileUploader from './Uploader';

import { AIResponseFormat, prepareInstructions } from '../../../../utils/constants';
import { GoogleGenAI } from "@google/genai";

import Summary from './Summary';
import ATS from './ATS';
import Details from './Details';
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";



const Feedback = ({ onBack }) => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm()
    const [pdfUrl, setPdUrl] = useState(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [feedback, setFeedback] = useState(null);
    const generateFeedbackFromGemini = async (details) => {
        const content = prepareInstructions({
            jobTitle: details.jobTitle,
            jobDescription: details.jobDescription,
            AIResponseFormat: AIResponseFormat,
        });
        // init Gemini client
        const ai = new GoogleGenAI({
            apiKey: "AIzaSyCLxTedH4JvJxLgRGHDcDrVWjRPnIvu2Fw" // ⚠️ don’t hardcode in production!
        });

        console.log("Generating feedback with Gemini API call...");

        // make request
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: "user", parts: [{ text: content }] }],
        });

        console.log("Gemini response:", response);
        // extract text properly
        const text =
            response.candidates?.[0]?.content?.parts?.[0]?.text || "";
        // If the response is supposed to be JSON, ensure it's valid

        return text.trim();
    };


    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            setIsProcessing(true);
            setStatusText('Analyzing your resume...');

            const file = watch("resume");
            const pdfUrl = URL.createObjectURL(file);
            setPdUrl(pdfUrl);
           

            const feedback = await generateFeedbackFromGemini(data);
            const validText = JSON.parse(feedback.replace(/[\r\n]+/g, '').replace(/\s{2,}/g, ' '));

            setFeedback(validText);

            setStatusText('Analysis complete! See results below.');
            


        } catch (error) {
            console.error("Submission error:", error);
            setStatusText('Error occurred during analysis');
        } finally {
            setIsSubmitting(false);

            setIsProcessing(false);
            setStatusText('');
            reset(); // <- from useForm()

        }
    };

   
    return (
        feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                <Summary  feedback={feedback} />
                <ATS  score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                <Details feedback={feedback} />
                
            </div>
        ) : (
            <div className=" text-white min-h-screen flex flex-col items-center justify-center gap-1 px-5  font-bold">
                <section className="w-full  max-w-4xl bg-richblack-800 p-8 rounded-xl shadow-2xl">

                    <div className="text-center mb-8">

                        {isProcessing ? (
                            <div className="space-y-4">
                                <h2 className="text-2xl text-blue-400">{statusText}</h2>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse w-3/4"></div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]  bg-clip-text text-transparent">
                                    AI-Smart Feedback for Your Dream Job
                                </h1>
                                <h2 className="text-2xl bg-gradient-to-r from-pink-200 to-blue-100 text-gray-300 bg-clip-text text-transparent">
                                    Drop your resume for an ATS score and improvement tips
                                </h2>
                            </div>
                        )}
                    </div>
                    {
                        !isProcessing ? (

                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-6">
                                    <div className="w-full grid md:grid-cols-2 gap-6">
                                        {/* Company Name */}
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-2xl font-bold text-gray-200" htmlFor="companyName">
                                                <Building size={20} />
                                                Company Name
                                            </label>
                                            <input
                                                id="companyName"
                                                {...register("companyName", { required: true, maxLength: 50 })}
                                                aria-invalid={errors.companyName ? "true" : "false"}
                                                aria-describedby="companyNameError"
                                                placeholder="e.g. Google, Microsoft, Amazon"
                                                className={`w-full px-3 py-2 rounded-lg text-black text-lg placeholder-gray-400 bg-richblack-600 border transition-colors focus:outline-none focus:ring-2 ${errors.companyName
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-600 focus:ring-blue-500"
                                                    }`}
                                            />
                                            {errors.companyName && (
                                                <span id="companyNameError" className="text-red-400 text-sm">
                                                    Company Name is required and must be under 50 characters.
                                                </span>
                                            )}
                                        </div>

                                        {/* Job Title */}
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-2xl font-bold text-gray-200" htmlFor="jobTitle">
                                                <BriefcaseBusiness size={20} />
                                                Job Title
                                            </label>
                                            <input
                                                id="jobTitle"
                                                {...register("jobTitle", { required: true, maxLength: 50 })}
                                                aria-invalid={errors.jobTitle ? "true" : "false"}
                                                aria-describedby="jobTitleError"
                                                placeholder="e.g. Software Engineer, Product Manager"
                                                className={`w-full px-3 py-2 rounded-lg text-black text-lg placeholder-gray-400 bg-richblack-600 border transition-colors focus:outline-none focus:ring-2 ${errors.jobTitle
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-600 focus:ring-blue-500"
                                                    }`}
                                            />
                                            {errors.jobTitle && (
                                                <span id="jobTitleError" className="text-red-400 text-sm">
                                                    Job Title is required and must be under 50 characters.
                                                </span>
                                            )}
                                        </div>



                                    </div>
                                    {/* Job Description */}
                                    <div className="space-y-2 col-span-2">
                                        <label className="flex items-center gap-2 text-2xl font-bold text-gray-200" htmlFor="jobDescription">
                                            <FileText size={20} />
                                            Job Description
                                        </label>
                                        <textarea
                                            id="jobDescription"
                                            {...register("jobDescription", { required: true, minLength: 50 })}
                                            aria-invalid={errors.jobDescription ? "true" : "false"}
                                            aria-describedby="jobDescriptionError"
                                            placeholder="Paste the complete job description here..."
                                            rows={6}
                                            className={`w-full px-3 py-2 rounded-lg text-black text-lg placeholder-gray-400 bg-richblack-600 border transition-colors focus:outline-none focus:ring-2 resize-y ${errors.jobDescription
                                                ? "border-red-500 focus:ring-red-500"
                                                : "border-gray-600 focus:ring-blue-500"
                                                }`}
                                        />
                                        {errors.jobDescription && (
                                            <span id="jobDescriptionError" className="text-red-400 text-sm">
                                                Job description is required and must be at least 50 characters.
                                            </span>
                                        )}
                                        {/* Resume Upload */}
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 font-bold text-2xl text-gray-200">
                                                <Upload />
                                                Upload Resume
                                            </label>

                                            <Controller
                                                name="resume"
                                                control={control}
                                                rules={{ required: "Resume is required" }}
                                                render={({ field }) => (
                                                    <FileUploader field={field} error={errors.resume} />
                                                )}
                                            />

                                            {errors.resume && (
                                                <span className="text-sm text-red-400">{errors.resume.message}</span>
                                            )}
                                        </div>

                                        <div className='w-full flex py-5 justify-evenly items-center  gap-2 '>
                                            <button
                                                type="submit"
                                                className="bg-yellow-100 flex text-2xl  items-center gap-2 px-4 py-2 rounded font-bold text-black hover:bg-yellow-300"
                                            >
                                                <LucideScanSearch /> Analyze CV
                                            </button>
                                            <button
                                                type="submit"
                                                onClick={onBack}
                                                className="bg-yellow-100 flex text-2xl  items-center px-4 py-2 rounded font-bold text-black hover:bg-yellow-300"
                                            >
                                                <TiArrowBack /> Back
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </form>

                        ) : <></>
                    }
                </section>
            </div >)
    );
   
}
export default Feedback;
