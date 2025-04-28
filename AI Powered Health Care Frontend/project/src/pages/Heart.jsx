import React, { useState,useEffect } from 'react';
import { 
  FaRobot, 
  FaChartLine, 
  FaHeartbeat, 
  FaStethoscope, 
  FaSearch,
  FaBrain,
  FaClipboardCheck,
  FaComments
} from 'react-icons/fa';

const researchPapers = [
  {
    title: "Deep Learning in ECG Analysis",
    authors: "Anderson et al.",
    year: 2024,
    journal: "Nature Cardiology",
    summary: "Revolutionary deep learning model achieving 97% accuracy in detecting various heart conditions from ECG data."
  },
  {
    title: "AI-Powered Cardiac Imaging",
    authors: "Zhang, Williams et al.",
    year: 2024,
    journal: "Digital Cardiology",
    summary: "Advanced AI system for automated cardiac MRI analysis and early heart disease detection."
  },
  {
    title: "Predictive Analytics in Cardiology",
    authors: "Kumar, Lee et al.",
    year: 2023,
    journal: "AI in Medicine",
    summary: "Machine learning models predicting heart disease risk with 94% accuracy using multiple health parameters."
  }
];

const workflowSteps = [
  {
    title: "Data Collection",
    icon: FaClipboardCheck,
    description: "Secure collection of cardiac health parameters including ECG data, blood pressure, and cholesterol levels."
  },
  {
    title: "AI Processing",
    icon: FaBrain,
    description: "Advanced neural networks analyze your cardiac data using patterns from millions of cases."
  },
  {
    title: "Risk Analysis",
    icon: FaChartLine,
    description: "Comprehensive heart health assessment based on multiple cardiovascular factors."
  },
  {
    title: "Personalized Results",
    icon: FaStethoscope,
    description: "Detailed cardiac health report with personalized recommendations and next steps."
  }
];

const Heart = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  });

  const [feedbackForm, setFeedbackForm] = useState({
    type: 'feedback',
    description: '',
    severity: 'low'
  });
  const [loading,setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showPopup,setShowPopup] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(()=>{
    setShowPopup(false);
  },[])

  const handleFeedbackChange = (e) => {
    setFeedbackForm({
      ...feedbackForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedbackForm);
  };

  const handleAnalyze = async()=>{
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/heart_disease/predict`,{
        method:'POST',
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        throw new Error("Failed to analyze image");
      }
      const data = await response.json(); 
      setAnalysisResult({
        prediction: data.prediction
      });
      setShowPopup(true);
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Something Wrong in Filling Data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              AI-Powered Heart Disease Detection
            </h1>
            <p className="mt-6 text-xl text-primary-100 max-w-3xl mx-auto">
              Analyze your heart health with AI-powered diagnostics for early detection and prevention.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Diagnostic Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Heart Disease Diagnostic Tool
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: 'age',
                  label: 'Age',
                  type: 'number',
                  placeholder: '45',
                  unit: 'years',
                  min: 0,
                  max: 120
                },
                {
                  name: 'sex',
                  label: 'Sex (0: Female, 1: Male)',
                  type: 'number',
                  placeholder: '1',
                  min: 0,
                  max: 1
                },
                {
                  name: 'cp',
                  label: 'Chest Pain Type (1-4)',
                  type: 'number',
                  placeholder: '1',
                  min: 1,
                  max: 4,
                  step: 1
                },
                {
                  name: 'trestbps',
                  label: 'Resting Blood Pressure',
                  type: 'number',
                  placeholder: '120',
                  unit: 'mmHg',
                  min: 0
                },
                {
                  name: 'chol',
                  label: 'Serum Cholesterol',
                  type: 'number',
                  placeholder: '200',
                  unit: 'mg/dL',
                  min: 0
                },
                {
                  name: 'fbs',
                  label: 'Fasting Blood Sugar > 120 mg/dL (0: No, 1: Yes)',
                  type: 'number',
                  placeholder: '0',
                  min: 0,
                  max: 1
                },
                {
                  name: 'restecg',
                  label: 'Resting ECG Results (0-2)',
                  type: 'number',
                  placeholder: '0',
                  min: 0,
                  max: 2,
                  step: 1
                },
                {
                  name: 'thalach',
                  label: 'Maximum Heart Rate',
                  type: 'number',
                  placeholder: '150',
                  unit: 'bpm',
                  min: 0
                },
                {
                  name: 'exang',
                  label: 'Exercise Induced Angina (0: No, 1: Yes)',
                  type: 'number',
                  placeholder: '0',
                  min: 0,
                  max: 1
                },
                {
                  name: 'oldpeak',
                  label: 'ST Depression',
                  type: 'number',
                  placeholder: '0.0',
                  unit: 'mm',
                  step: 0.1
                },
                {
                  name: 'slope',
                  label: 'Slope of Peak Exercise ST Segment (1-3)',
                  type: 'number',
                  placeholder: '1',
                  min: 1,
                  max: 3,
                  step: 1
                },
                {
                  name: 'ca',
                  label: 'Number of Major Vessels (0-3)',
                  type: 'number',
                  placeholder: '0',
                  min: 0,
                  max: 3,
                  step: 1
                },
                {
                  name: 'thal',
                  label: 'Thalassemia (3: Normal, 6: Fixed Defect, 7: Reversible)',
                  type: 'number',
                  placeholder: '3',
                  min: 3,
                  max: 7,
                  step: 1
                }
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {field.label}
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="relative">
                      <input
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm pl-3 pr-12 py-2"
                      />
                      {field.unit && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-gray-500 sm:text-sm">{field.unit}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                onClick={handleAnalyze}
              >
               { loading ? "Loading..."  :  <><FaHeartbeat className="mr-2 h-6 w-6" /> Analyze with AI </>}
                
              </button>
            </div>
          </form>
        </div>

        {/* AI Workflow Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            How Our AI Analyzes Your Heart Health
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
            Latest Research in AI Heart Disease Detection
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

export default Heart;