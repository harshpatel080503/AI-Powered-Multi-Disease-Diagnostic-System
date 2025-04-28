# Importing Libraries

import streamlit as st
import numpy as np
import pandas as pd
import joblib
from sklearn.preprocessing import StandardScaler

# Loading Model
model_path = "model/Support Vector Machine_model.pkl"
model = joblib.load(model_path)

# Loading Dataset
df = pd.read_csv("dataset/heart.csv")
feature_columns = df.columns[:-1]

# Initialize a StandardScalar
scaler = StandardScaler()
scaler.fit(df[feature_columns])

def preprocess_input(user_input):
    """Preprocess user input for prediction."""
    input_array = np.array(user_input).reshape(1, -1)
    return scaler.transform(input_array) # Applying Standardization


# Streamlit UI
st.title("❤️ Heart Disease Prediction System")
st.write("Enter the following details to predict the likelihood of heart disease.")

# User Inputs
user_input = []
for feature in feature_columns:
    value = st.number_input(f"Enter {feature}", step=0.1)
    user_input.append(value)

# Predict Button
if st.button("Predict"):
    try:
        # Standardize input (if required)
        input_data = preprocess_input(user_input)

        # Make prediction
        prediction = model.predict(input_data)

        # Display result
        st.markdown("### 🔎 Prediction Result")

        if prediction[0] == 1:
            st.error("🚨 High risk of heart disease")
        else:
            st.success("✅ Low risk of heart disease")
    except Exception as e:
        st.error(f"Error: {e}")