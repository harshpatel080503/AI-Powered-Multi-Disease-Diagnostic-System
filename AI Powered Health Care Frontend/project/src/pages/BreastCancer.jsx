import React, { useState,useEffect } from "react";
import {
  FaRobot,
  FaChartLine,
  FaBrain,
  FaStethoscope,
  FaSearch,
  FaUpload,
  FaClipboardCheck,
  FaComments,
} from "react-icons/fa";

import imageToBase64Browser from "../utilites/imgToBase64";

const researchPapers = [
  {
    title: "Deep Learning in Mammography",
    authors: "Zhang et al.",
    year: 2024,
    journal: "Nature Medicine",
    summary:
      "Revolutionary deep learning model achieving 98% accuracy in detecting early-stage breast cancer from mammogram images.",
  },
  {
    title: "AI-Powered Early Detection",
    authors: "Anderson, Lee et al.",
    year: 2024,
    journal: "Digital Oncology",
    summary:
      "Advanced AI system for automated mammogram analysis reducing false negatives by 45%.",
  },
  {
    title: "Neural Networks in Cancer Detection",
    authors: "Kumar, Chen et al.",
    year: 2023,
    journal: "AI in Medicine",
    summary:
      "Novel neural network architecture improving breast cancer detection accuracy to 96% while reducing false positives.",
  },
];

const workflowSteps = [
  {
    title: "Image Upload",
    icon: FaUpload,
    description: "Secure upload of mammogram or breast scan images for AI analysis.",
  },
  {
    title: "AI Processing",
    icon: FaBrain,
    description: "Advanced neural networks analyze images using patterns from millions of cases.",
  },
  {
    title: "Risk Analysis",
    icon: FaChartLine,
    description: "Comprehensive assessment of cancer risk and anomaly detection.",
  },
  {
    title: "Expert Review",
    icon: FaStethoscope,
    description: "AI-assisted analysis with detailed findings and recommendations.",
  },
];

const BreastCancer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [feedbackForm, setFeedbackForm] = useState({
    type: "feedback",
    description: "",
    severity: "low",
  });
  const [loading,setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(false);
  }, []);


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const base64Url = await imageToBase64Browser(file);
      setBase64Image(base64Url);
      console.log("Base64 Image:", base64Url);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAnalyze = async () => {
    if (!base64Image) {
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/breast_cancer/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ base64_image: base64Image }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze image");
      }

      const data = await response.json(); 
      console.log(data);
      setAnalysisResult({
        label: data.predicted_class,
        probability: data.confidence,
      });
      setShowPopup(true);
      
          
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Failed to analyze the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackChange = (e) => {
    setFeedbackForm({
      ...feedbackForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedbackForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            AI-Powered Breast Cancer Detection
          </h1>
          <p className="mt-6 text-xl text-primary-100 max-w-3xl mx-auto">
            AI-driven image analysis for early breast cancer diagnosis.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Breast Cancer Detection Diagnostic Tool
          </h2>
          <div className="max-w-xl mx-auto">
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                {previewUrl ? (
                  <img src={previewUrl} alt="Selected scan" className="max-h-64 mx-auto rounded-lg" />
                ) : (
                  <>
                    <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <label className="cursor-pointer text-primary-600 hover:text-primary-500">
                      <span>Upload a mammogram</span>
                      <input type="file" accept="image/*" className="sr-only" onChange={handleFileChange} />
                    </label>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              disabled={!selectedFile}
              className={`inline-flex items-center px-8 py-4 border text-lg font-medium rounded-lg shadow-sm text-white ${
                selectedFile ? "bg-primary-600 hover:bg-primary-700" : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={handleAnalyze}
            >
                {loading ? "Analyzing..." : <><FaRobot className="mr-2 h-6 w-6" /> Analyze with AI</>}
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How Our AI Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workflowSteps.map((step) => (
            <div key={step.title} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-center">
                <step.icon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-center mt-4">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Feedback & Issues</h2>
          <form onSubmit={handleFeedbackSubmit}>
            <textarea name="description" value={feedbackForm.description} onChange={handleFeedbackChange} placeholder="Describe your feedback..." className="w-full border p-4 rounded-md" />
            <button type="submit" className="mt-4 bg-primary-600 text-white py-2 px-6 rounded-lg">
              Submit Feedback
            </button>
          </form>
        </div>


        {showPopup && analysisResult && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold">Analysis Result</h2>
            <p className="mt-2 text-lg">
              <strong>Label:</strong> {analysisResult.label}
            </p>
            <p className="text-lg">
              <strong>Probability:</strong> {analysisResult.probability}
            </p>
            <button
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      </div>

    </div>
  );
};

export default BreastCancer;
