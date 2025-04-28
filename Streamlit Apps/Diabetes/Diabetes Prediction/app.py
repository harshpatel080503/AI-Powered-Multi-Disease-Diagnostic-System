# Importing Libraries

import streamlit as st
import numpy as np
import pandas as pd
import joblib
from sklearn.preprocessing import StandardScaler

# Loading the model
model = joblib.load("model/SVM.joblib")

# Loading Diabetes Dataset
df = pd.read_csv("dataset/diabetes.csv")
feature_columns = df.columns[:-1]

# StandarScalar for Feature Scaling
scaler = StandardScaler()
scaler.fit(df[feature_columns])

# Streamlit APP

st.title("🔬 Diabetes Prediction App")
st.write("This app predicts whether a person is diabetic based on their medical data.")
st.markdown("### 📌 Enter Patient Details")

# User Inputs for 8 Features

input_data = []
for feature in feature_columns:
    value = st.number_input(f"**{feature}*", min_value=0.0,step=0.1, format="%.2f")
    input_data.append(value)

# Predict Button
if st.button("🔍 Predict"):
    input_array = np.array(input_data).reshape(1, -1)
    input_scaled = scaler.transform(input_array)
    prediction = model.predict(input_scaled)
    probability = model.decision_function(input_scaled)
    st.markdown("### 🔎 Prediction Result")

    if prediction[0] == 1:
        st.error("🚨 The patient is **predicted to have diabetes**.")
        st.write(f"📊 **Confidence Score:** {probability[0]:.2f}")
    else:
        st.success("✅ The patient is **predicted to be non-diabetic**.")
    st.write(f"📊 **Confidence Score:** {probability[0]: .2f}")

st.markdown("---")
st.write("📌 **Model Used:** Support Vector Machine (SVM)")
st.write("📊 **Dataset:** PIMA Indian Diabetes Dataset")
st.write("🔗 **Built with Streamlit**")