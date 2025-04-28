import React, { useState,useEffect } from 'react';
import imageToBase64Browser from '../utilites/imgToBase64';
import { 
  FaRobot, 
  FaChartLine, 
  FaBrain, 
  FaStethoscope, 
  FaSearch,
  FaUpload,
  FaClipboardCheck,
  FaComments
} from 'react-icons/fa';

const researchPapers = [
  {
    title: "Deep Learning in Brain MRI Analysis",
    authors: "Chen et al.",
    year: 2024,
    journal: "Nature Neuroscience",
    summary: "Revolutionary deep learning model achieving 98% accuracy in detecting brain tumors from MRI scans with precise region localization."
  },
  {
    title: "AI-Powered Early Detection",
    authors: "Wilson, Lee et al.",
    year: 2024,
    journal: "Digital Neurology",
    summary: "Advanced AI system for automated MRI analysis reducing detection time by 75% while maintaining high accuracy."
  },
  {
    title: "Neural Networks in Tumor Classification",
    authors: "Kumar, Zhang et al.",
    year: 2023,
    journal: "AI in Medicine",
    summary: "Novel neural network architecture improving tumor type classification accuracy to 96% with reduced false positives."
  }
];

const workflowSteps = [
  {
    title: "Image Upload",
    icon: FaUpload,
    description: "Secure upload of brain MRI scans for AI analysis."
  },
  {
    title: "AI Processing",
    icon: FaBrain,
    description: "Advanced neural networks analyze images using patterns from millions of cases."
  },
  {
    title: "Risk Analysis",
    icon: FaChartLine,
    description: "Comprehensive assessment of tumor presence and characteristics."
  },
  {
    title: "Expert Review",
    icon: FaStethoscope,
    description: "AI-assisted analysis with detailed findings and recommendations."
  }
];

const BrainTumor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [feedbackForm, setFeedbackForm] = useState({
    type: 'feedback',
    description: '',
    severity: 'low'
  });
  const [base64Image, setBase64Image] = useState(null);
  const [loading,setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showPopup,setShowPopup] = useState(false);

  const handleFileChange = async(e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const base64Url = await imageToBase64Browser(file);
      setBase64Image(base64Url);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFeedbackChange = (e) => {
    setFeedbackForm({
      ...feedbackForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Analysis requested with file:', selectedFile);
  };

  useEffect(()=>{
    setShowPopup(false);
  },[])
  const handleAnalyze =async ()=>{
    if (!base64Image) {
      alert("Please upload an image first.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/brain_tumor/predict`, {
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
      setAnalysisResult({
        prediction:data.prediction,
        confidence: data.confidence
      });
      setShowPopup(true);
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Failed to analyze the image. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedbackForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              AI-Powered Brain Tumor Detection
            </h1>
            <p className="mt-6 text-xl text-primary-100 max-w-3xl mx-auto">
              AI-driven MRI scan analysis for early brain tumor diagnosis.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Diagnostic Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Brain Tumor Detection Diagnostic Tool
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="max-w-xl mx-auto">
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  {previewUrl ? (
                    <div className="relative group">
                      <img
                        src={previewUrl}
                        alt="Selected MRI scan"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl(null);
                          }}
                          className="text-white hover:text-primary-200"
                        >
                          Change Image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                        >
                          <span>Upload a brain MRI scan</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={!selectedFile}
                className={`inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg shadow-sm text-white transition-colors duration-200 ${
                  selectedFile
                    ? 'bg-primary-600 hover:bg-primary-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                  onClick={handleAnalyze}
              >
                {loading ? "Loading..." : <><FaRobot className="mr-2 h-6 w-6" /> Analyze with AI </> } 
                
              </button>
            </div>
          </form>
        </div>

        {/* AI Workflow Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            How Our AI Analyzes Your MRI Scans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="bg-white rounded-xl shadow-md p-6 h-full transform transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-primary-100 rounded-full p-3">
                      <step.icon className="h-8 w-8 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-primary-200"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Research Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Latest Research in AI Brain Tumor Detection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchPapers.map((paper) => (
              <div
                key={paper.title}
                className="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <FaSearch className="h-6 w-6 text-primary-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">{paper.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {paper.authors} • {paper.year} • {paper.journal}
                </p>
                <p className="text-gray-700">{paper.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Feedback & Issue Reporting
          </h2>
          <form onSubmit={handleFeedbackSubmit} className="max-w-2xl mx-auto">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={feedbackForm.type}
                  onChange={handleFeedbackChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="feedback">General Feedback</option>
                  <option value="issue">Report Issue</option>
                  <option value="suggestion">Suggestion</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={feedbackForm.description}
                  onChange={handleFeedbackChange}
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="Please describe your feedback, issue, or suggestion..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Severity
                </label>
                <select
                  name="severity"
                  value={feedbackForm.severity}
                  onChange={handleFeedbackChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                >
                  <FaComments className="mr-2 h-5 w-5" />
                  Submit Feedback
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {showPopup && analysisResult && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold">Analysis Result</h2>
            <p className="mt-2 text-lg">
              <strong>Prediction:</strong> {analysisResult.prediction}
            </p>
            <p className="text-lg">
              <strong>Confidence:</strong> {analysisResult.confidence}
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
  );
};

export default BrainTumor;