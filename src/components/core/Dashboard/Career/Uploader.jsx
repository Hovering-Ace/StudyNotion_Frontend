import { Upload } from "lucide-react";
import { useState } from "react";

const FileUploader = ({ field, error }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      field.onChange(file); // Important: update RHF state
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      field.onChange(file);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        isDragOver
          ? "border-blue-400 bg-blue-50 bg-opacity-10"
          : error
          ? "border-red-500 bg-red-50 bg-opacity-10"
          : "border-gray-600 hover:border-gray-500"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragOver(false);
      }}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer block">
        {!selectedFile && <Upload className="mx-auto mb-4 text-gray-400" size={48} />}
        {selectedFile ? (
          <div className="">
            <p className="font-semibold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]  bg-clip-text text-transparent">{selectedFile.name}</p>
            <p className=" text-xl">Click to change file</p>
          </div>
        ) : (
          <div>
            <p className="text-lg mb-2">Drop your resume here or click to browse</p>
            <p className="text-sm text-gray-400">PDF, DOC, or DOCX files only</p>
          </div>
        )}
      </label>
    </div>
  );
};

export default FileUploader;
