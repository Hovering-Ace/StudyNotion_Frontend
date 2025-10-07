// import React from "react";
// import { useRef } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import PreviewSection from "./previewSection";
// import { BiDownload } from "react-icons/bi";
// import Btn from "./btn";

// const Downloader =(()=>{
//     const resumeRef = useRef();
//     //const[loading,setLoading]=useState(false);
//   const generateResumePDF = async () => {
//   const input = resumeRef.current;

//   const canvas = await html2canvas(input, { scale: 2 });
//   const imgData = canvas.toDataURL("image/png");

//   const pdf = new jsPDF("p", "mm", "a4");
//   const pdfWidth = pdf.internal.pageSize.getWidth();
//   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//   const pageHeight = pdf.internal.pageSize.getHeight();

//   let heightLeft = pdfHeight;
//   let position = 0;

//   // First page
//   pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
//   heightLeft -= pageHeight;

//   // Extra pages
//   while (heightLeft > 0) {
//     position = heightLeft - pdfHeight;
//     pdf.addPage();
//     pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
//     heightLeft -= pageHeight;
//   }

//   pdf.save("resume.pdf");
//     };
    

//    return(
//     <>

//       <div className="bg-richblack-600 to-blue-400 via-purple-500 from-pink-500 bg-gradient-to-tr text-white text-4xl font-semibold min-w-full flex flex-col items-center justify-center gap-10 py-10 px-5">
//         <PreviewSection ref={resumeRef} form={null} />
//         <div className="mt-10">
//           <Btn type="submit"
//             onClick={() => { generateResumePDF() }}
//             active={true}>Download</Btn>
//        </div>

//     </>
//     )
        

// });

// export default Downloader;

import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import PreviewSection from "./previewSection";
import Btn from "./btn";

const Downloader = () => {
  const resumeRef = useRef();

  const generateResumePDF = async () => {
    const input = resumeRef.current;
    if (!input) {
      console.error("Resume ref not found!");
      return;
    }

    const canvas = await html2canvas(input, {
      scale: 2,
      backgroundColor: "#ffffff", // fixes transparent background
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    const pageHeight = pdf.internal.pageSize.getHeight();

    let heightLeft = pdfHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;

    // Extra pages
    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("resume.pdf");
  };

  return (
    <div className="bg-richblack-600 bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-400 text-white text-4xl font-semibold min-w-full flex flex-col items-center justify-center gap-10 py-10 px-5">
      {/* ✅ ref works only because of forwardRef */}
     
      
    </div>
  );
};

export default Downloader;
