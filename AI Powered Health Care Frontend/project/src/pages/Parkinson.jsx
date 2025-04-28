import React, { useState,useEffect } from 'react';
import { 
  FaRobot, 
  FaChartLine, 
  FaBrain, 
  FaStethoscope, 
  FaSearch,
  FaMicrophone,
  FaClipboardCheck,
  FaComments
} from 'react-icons/fa';

const researchPapers = [
  {
    title: "AI Voice Analysis for Parkinson's",
    authors: "Chen et al.",
    year: 2024,
    journal: "Nature Neurology",
    summary: "Deep learning model achieving 96% accuracy in early Parkinson's detection through voice pattern analysis."
  },
  {
    title: "Neural Signal Processing with AI",
    authors: "Smith, Johnson et al.",
    year: 2024,
    journal: "Digital Neuroscience",
    summary: "Advanced AI system for automated neural signal analysis and early Parkinson's detection."
  },
  {
    title: "Predictive Analytics in Neurology",
    authors: "Patel, Wong et al.",
    year: 2023,
    journal: "AI in Medicine",
    summary: "Machine learning models predicting Parkinson's progression with 93% accuracy using voice biomarkers."
  }
];

const workflowSteps = [
  {
    title: "Data Collection",
    icon: FaClipboardCheck,
    description: "Secure collection of voice parameters and neurological measurements."
  },
  {
    title: "AI Processing",
    icon: FaBrain,
    description: "Advanced neural networks analyze your data using patterns from millions of cases."
  },
  {
    title: "Risk Analysis",
    icon: FaChartLine,
    description: "Comprehensive assessment based on multiple neurological factors."
  },
  {
    title: "Personalized Results",
    icon: FaStethoscope,
    description: "Detailed analysis report with personalized recommendations and next steps."
  }
];

const Parkinson = () => {
  const [formData, setFormData] = useState({
    mdvp_fo: '',
    mdvp_fhi: '',
    mdvp_flo: '',
    mdvp_jitter_percent: '',
    mdvp_jitter_abs: '',
    mdvp_rap: '',
    mdvp_ppq: '',
    jitter_ddp: '',
    mdvp_shimmer: '',
    mdvp_shimmer_db: '',
    shimmer_apq3: '',
    shimmer_apq5: '',
    mdvp_apq: '',
    shimmer_dda: '',
    nhr: '',
    hnr: '',
    rpde: '',
    dfa: '',
    spread1: '',
    spread2: '',
    d2: '',
    ppe: ''
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

  const handleFeedbackChange = (e) => {
    setFeedbackForm({
      ...feedbackForm,
      [e.target.name]: e.target.value
    });
  };

  useEffect(()=>{
    setShowPopup(false);
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedbackForm);
  };
  const handleAnalyze = async()=>{
    const editFormData = {
      MDVP_Fo: Number(formData.mdvp_fo) || 0,
      MDVP_Fhi: Number(formData.mdvp_fhi) || 0,
      MDVP_Flo: Number(formData.mdvp_flo) || 0,
      MDVP_Jitter_percent:Number(formData.mdvp_jitter_percent) || 0 ,
      MDVP_Jitter_Abs:Number(formData.mdvp_jitter_abs) || 0 ,
      MDVP_RAP: Number(formData.mdvp_rap) || 0,
      MDVP_PPQ:  Number(formData.mdvp_ppq) || 0,
      Jitter_DDP: Number(formData.jitter_ddp) || 0,
      MDVP_Shimmer: Number(formData.mdvp_shimmer) || 0,
      MDVP_Shimmer_dB: Number(formData.mdvp_shimmer_db) || 0,
      Shimmer_APQ3:Number(formData.shimmer_apq3) || 0 ,
      Shimmer_APQ5: Number(formData.shimmer_apq5) || 0,
      MDVP_APQ:Number(formData.mdvp_apq) || 0 ,
      Shimmer_DDA:Number(formData.shimmer_dda) || 0 ,
      NHR: Number(formData.nhr) || 0,
      HNR: Number(formData.hnr) || 0,
      RPDE:Number(formData.rpde) || 0 ,
      DFA: Number(formData.dfa) || 0,
      spread1:Number(formData.spread1) || 0 ,
      spread2:Number(formData.spread2) || 0 ,
      D2:Number(formData.d2) || 0 ,
      PPE: Number(formData.ppe) || 0
    }
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/parkinsons/predict`,{
        method:'POST',
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData)
      })
      if (!response.ok) {
        throw new Error("Failed to analyze image");
      }
      const data = await response.json(); 
      setAnalysisResult({
        prediction:data.prediction,
        probability:data.probability
      });
      setShowPopup(true);
      setLoading(false)
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Something Wrong in Filling Data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              AI-Powered Parkinson Disease Detection
            </h1>
            <p className="mt-6 text-xl text-primary-100 max-w-3xl mx-auto">
              Analyze voice and neurological data using AI for early Parkinson's detection.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Parkinson Disease Diagnostic Tool
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: 'mdvp_fo',
                  label: 'MDVP:Fo(Hz)',
                  type: 'number',
                  placeholder: '120',
                  unit: 'Hz',
                  step: 0.001
                },
                {
                  name: 'mdvp_fhi',
                  label: 'MDVP:Fhi(Hz)',
                  type: 'number',
                  placeholder: '150',
                  unit: 'Hz',
                  step: 0.001
                },
                {
                  name: 'mdvp_flo',
                  label: 'MDVP:Flo(Hz)',
                  type: 'number',
                  placeholder: '100',
                  unit: 'Hz',
                  step: 0.001
                },
                {
                  name: 'mdvp_jitter_percent',
                  label: 'MDVP:Jitter(%)',
                  type: 'number',
                  placeholder: '0.5',
                  unit: '%',
                  step: 0.001
                },
                {
                  name: 'mdvp_jitter_abs',
                  label: 'MDVP:Jitter(Abs)',
                  type: 'number',
                  placeholder: '0.00005',
                  step: 0.00001
                },
                {
                  name: 'mdvp_rap',
                  label: 'MDVP:RAP',
                  type: 'number',
                  placeholder: '0.003',
                  step: 0.001
                },
                {
                  name: 'mdvp_ppq',
                  label: 'MDVP:PPQ',
                  type: 'number',
                  placeholder: '0.002',
                  step: 0.001
                },
                {
                  name: 'jitter_ddp',
                  label: 'Jitter:DDP',
                  type: 'number',
                  placeholder: '0.004',
                  step: 0.001
                },
                {
                  name: 'mdvp_shimmer',
                  label: 'MDVP:Shimmer',
                  type: 'number',
                  placeholder: '0.04',
                  step: 0.001
                },
                {
                  name: 'mdvp_shimmer_db',
                  label: 'MDVP:Shimmer(dB)',
                  type: 'number',
                  placeholder: '0.3',
                  unit: 'dB',
                  step: 0.001
                },
                {
                  name: 'shimmer_apq3',
                  label: 'Shimmer:APQ3',
                  type: 'number',
                  placeholder: '0.02',
                  step: 0.001
                },
                {
                  name: 'shimmer_apq5',
                  label: 'Shimmer:APQ5',
                  type: 'number',
                  placeholder: '0.025',
                  step: 0.001
                },
                {
                  name: 'mdvp_apq',
                  label: 'MDVP:APQ',
                  type: 'number',
                  placeholder: '0.03',
                  step: 0.001
                },
                {
                  name: 'shimmer_dda',
                  label: 'Shimmer:DDA',
                  type: 'number',
                  placeholder: '0.045',
                  step: 0.001
                },
                {
                  name: 'nhr',
                  label: 'NHR',
                  type: 'number',
                  placeholder: '0.015',
                  step: 0.001
                },
                {
                  name: 'hnr',
                  label: 'HNR',
                  type: 'number',
                  placeholder: '20',
                  unit: 'dB',
                  step: 0.001
                },
                {
                  name: 'rpde',
                  label: 'RPDE',
                  type: 'number',
                  placeholder: '0.5',
                  step: 0.001
                },
                {
                  name: 'dfa',
                  label: 'DFA',
                  type: 'number',
                  placeholder: '0.7',
                  step: 0.001
                },
                {
                  name: 'spread1',
                  label: 'spread1',
                  type: 'number',
                  placeholder: '-5',
                  step: 0.001
                },
                {
                  name: 'spread2',
                  label: 'spread2',
                  type: 'number',
                  placeholder: '0.2',
                  step: 0.001
                },
                {
                  name: 'd2',
                  label: 'D2',
                  type: 'number',
                  placeholder: '2.5',
                  step: 0.001
                },
                {
                  name: 'ppe',
                  label: 'PPE',
                  type: 'number',
                  placeholder: '0.2',
                  step: 0.001
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
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                onClick={handleAnalyze}
              >
              {loading ? "Loading..." : <>  <FaMicrophone className="mr-2 h-6 w-6" /> Analyze with AI </> }
               
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
            Latest Research in AI Parkinson's Detection
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
            <p className="mt-4 text-lg">
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
  );
};

export default Parkinson;