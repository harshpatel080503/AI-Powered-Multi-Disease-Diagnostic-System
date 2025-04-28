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
    title: "Deep Learning for Early Diabetes Detection",
    authors: "Chen et al.",
    year: 2024,
    journal: "Nature AI Medicine",
    summary: "Novel deep learning approach achieving 95% accuracy in early diabetes detection using minimal health parameters."
  },
  {
    title: "Continuous Glucose Monitoring with AI",
    authors: "Smith, Johnson et al.",
    year: 2024,
    journal: "Digital Health Innovations",
    summary: "Real-time glucose monitoring system powered by AI for improved diabetes management and early detection."
  },
  {
    title: "Predictive Analytics in Diabetes Care",
    authors: "Patel, Wong et al.",
    year: 2023,
    journal: "AI in Healthcare",
    summary: "Machine learning models for predicting diabetes progression and complications with 90% accuracy."
  }
];

const workflowSteps = [
  {
    title: "Data Collection",
    icon: FaClipboardCheck,
    description: "Secure collection of health parameters including glucose levels, BMI, and other vital metrics."
  },
  {
    title: "AI Processing",
    icon: FaBrain,
    description: "Advanced deep learning models analyze your health data using patterns from millions of cases."
  },
  {
    title: "Risk Analysis",
    icon: FaChartLine,
    description: "Comprehensive risk assessment based on multiple health factors and historical data."
  },
  {
    title: "Personalized Results",
    icon: FaStethoscope,
    description: "Detailed results with personalized recommendations and next steps."
  }
];

const Diabetes = () => {
  const [formData, setFormData] = useState({
    pregnancies: '',
    glucose: '',
    blood_pressure: '', 
    skin_thickness: '',  
    insulin: '',
    bmi: '',
    diabetes_pedigree: '',
    age: ''
  });

  const [feedbackForm, setFeedbackForm] = useState({
    type: 'feedback',
    description: '',
    severity: 'low'
  });
  
  const [loading,setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(()=>{
    setShowPopup(false);
  },[])

  const handleAnalyze = async()=>{
    const transformedData = {
      pregnancies: Number(formData.pregnancies) || 0,
      glucose: Number(formData.glucose) || 0,
      blood_pressure: Number(formData.blood_pressure) || 0,
      skin_thickness: Number(formData.skin_thickness) || 0,
      insulin: Number(formData.insulin) || 0,
      bmi: Number(formData.bmi) || 0,
      diabetes_pedigree: Number(formData.diabetes_pedigree) || 0,
      age: Number(formData.age) || 0,
    };
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/diabetes/predict`,{
        method:'POST',
        headers:{
          "accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData)
      })
      if (!response.ok) {
        throw new Error("Error showing content is not processible");
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
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              AI-Powered Diabetes Detection
            </h1>
            <p className="mt-6 text-xl text-primary-100 max-w-3xl mx-auto">
              Get an instant AI-powered analysis of your diabetes risk based on your health parameters.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Diagnostic Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Diabetes Diagnostic Tool
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: 'pregnancies',
                  label: 'Number of Pregnancies',
                  type: 'number',
                  placeholder: '0',
                  unit: ''
                },
                {
                  name: 'glucose',
                  label: 'Glucose Level',
                  type: 'number',
                  placeholder: '120',
                  unit: 'mg/dL'
                },
                {
                  name: 'blood_pressure',
                  label: 'Blood Pressure',
                  type: 'number',
                  placeholder: '80',
                  unit: 'mmHg'
                },
                {
                  name: 'skin_thickness',
                  label: 'Skin Thickness',
                  type: 'number',
                  placeholder: '20',
                  unit: 'mm'
                },
                {
                  name: 'insulin',
                  label: 'Insulin Level',
                  type: 'number',
                  placeholder: '79',
                  unit: 'mu U/ml'
                },
                {
                  name: 'bmi',
                  label: 'BMI',
                  type: 'number',
                  placeholder: '23.1',
                  unit: 'kg/m²'
                },
                {
                  name: 'diabetes_pedigree',
                  label: 'Diabetes Pedigree Function',
                  type: 'number',
                  placeholder: '0.52',
                  unit: ''
                },
                {
                  name: 'age',
                  label: 'Age',
                  type: 'number',
                  placeholder: '30',
                  unit: 'years'
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
                    <input
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm pl-3 pr-12 py-2"
                    />
                    {field.unit && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 sm:text-sm">{field.unit}</span>
                      </div>
                    )}
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
               {loading ? "Analyzing..." : <><FaRobot className="mr-2 h-6 w-6" /> Analyze with AI </>}
              </button>
            </div>
          </form>
        </div>

        {/* AI Workflow Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            How Our AI Analyzes Your Data
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
            Latest Research in AI Diabetes Detection
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

export default Diabetes;