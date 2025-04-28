import streamlit as st
import pandas as pd
from sklearn.preprocessing import StandardScaler
from joblib import load

# Load the pre-trained SVM model and scaler
MODEL_PATH = "model/SVM_model.joblib"
SCALER_PATH = "model/scaler.joblib"

svm_model = load(MODEL_PATH)
scaler = load(SCALER_PATH)

# Title and Description
st.title("Parkinson's Disease Prediction")
st.markdown("""
This application predicts the likelihood of Parkinson's disease based on various vocal features. 
Input the features manually, and the app will provide a prediction.
""")

# Feature Input Form
def user_input_features():
    st.header("Input Features")
    features = {
        "MDVP:Fo(Hz)": st.number_input("MDVP:Fo(Hz)", min_value=0.0, value=120.0, step=1.0, help="Average vocal fundamental frequency"),
        "MDVP:Fhi(Hz)": st.number_input("MDVP:Fhi(Hz)", min_value=0.0, value=150.0, step=1.0, help="Maximum vocal fundamental frequency"),
        "MDVP:Flo(Hz)": st.number_input("MDVP:Flo(Hz)", min_value=0.0, value=110.0, step=1.0, help="Minimum vocal fundamental frequency"),
        "MDVP:Jitter(%)": st.number_input("MDVP:Jitter(%)", min_value=0.0, value=0.005, step=0.0001, help="Variation in fundamental frequency"),
        "MDVP:Jitter(Abs)": st.number_input("MDVP:Jitter(Abs)", min_value=0.0, value=0.00003, step=0.00001, help="Absolute jitter"),
        "MDVP:RAP": st.number_input("MDVP:RAP", min_value=0.0, value=0.003, step=0.0001, help="Relative amplitude perturbation"),
        "MDVP:PPQ": st.number_input("MDVP:PPQ", min_value=0.0, value=0.004, step=0.0001, help="Five-point perturbation quotient"),
        "Jitter:DDP": st.number_input("Jitter:DDP", min_value=0.0, value=0.010, step=0.0001, help="Average absolute difference of jitter"),
        "MDVP:Shimmer": st.number_input("MDVP:Shimmer", min_value=0.0, value=0.04, step=0.001, help="Amplitude perturbation"),
        "MDVP:Shimmer(dB)": st.number_input("MDVP:Shimmer(dB)", min_value=0.0, value=0.2, step=0.01, help="Amplitude perturbation in decibels"),
        "Shimmer:APQ3": st.number_input("Shimmer:APQ3", min_value=0.0, value=0.02, step=0.001, help="Three-point amplitude perturbation quotient"),
        "Shimmer:APQ5": st.number_input("Shimmer:APQ5", min_value=0.0, value=0.03, step=0.001, help="Five-point amplitude perturbation quotient"),
        "MDVP:APQ": st.number_input("MDVP:APQ", min_value=0.0, value=0.03, step=0.001, help="Amplitude perturbation quotient"),
        "Shimmer:DDA": st.number_input("Shimmer:DDA", min_value=0.0, value=0.01, step=0.001, help="Average absolute difference of shimmer"),
        "NHR": st.number_input("NHR", min_value=0.0, value=0.02, step=0.001, help="Noise-to-harmonics ratio"),
        "HNR": st.number_input("HNR", min_value=0.0, value=21.0, step=1.0, help="Harmonics-to-noise ratio"),
        "RPDE": st.number_input("RPDE", min_value=0.0, value=0.4, step=0.01, help="Recurrence period density entropy"),
        "DFA": st.number_input("DFA", min_value=0.0, value=0.8, step=0.01, help="Detrended fluctuation analysis"),
        "spread1": st.number_input("spread1", value=-4.5, step=0.1, help="Nonlinear measure of fundamental frequency variation"),
        "spread2": st.number_input("spread2", min_value=0.0, value=0.3, step=0.01, help="Nonlinear measure of fundamental frequency variation"),
        "D2": st.number_input("D2", min_value=0.0, value=2.3, step=0.1, help="Dynamical complexity measure"),
        "PPE": st.number_input("PPE", min_value=0.0, value=0.2, step=0.01, help="Pitch period entropy"),
    }
    return pd.DataFrame([features])

# Predict Function
def predict(features):
    # Scale the features using the loaded scaler
    scaled_features = scaler.transform(features)
    prediction = svm_model.predict(scaled_features)
    return "Parkinson's Detected" if prediction[0] == 1 else "Healthy"

# Application Logic
input_features = user_input_features()

if st.button("Predict"):
    result = predict(input_features)
    st.header(f"Prediction: {result}")
