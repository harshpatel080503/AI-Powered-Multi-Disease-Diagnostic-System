# AI Powered Multi Disease Diagnostic System

An AI-driven multi-disease diagnostic system designed to provide early, accessible, and cost-effective detection for six critical diseases:  
**Diabetes**, **Heart Disease**, **Parkinson’s Disease**, **Brain Tumor**, **Tuberculosis**, and **Breast Cancer**.

Developed as part of our 8th Semester Project in the Department of Computer Engineering.

## 👨‍💻 Team Members
- **Vraj Patel** (21BECE30244)
- **Harsh Patel** (21BECE30191)
- **Vishva Patel** (21BECE30242)
- **Charmi Rupareliya** (21BECE30278)

**Project Mentor:**  
Prof. Tejasvee Gupta

---

## 📖 Table of Contents
- [Introduction](#introduction)
- [Challenges in Healthcare Diagnostics](#challenges-in-healthcare-diagnostics)
- [Proposed Solution](#proposed-solution)
- [System Architecture](#system-architecture)
- [Model Performances](#model-performances)
- [Advantages and Challenges](#advantages-and-challenges)
- [Future Work](#future-work)
- [References](#references)

---

## 📌 Introduction
The rise of chronic and life-threatening diseases like diabetes, heart disease, Parkinson’s, brain tumors, TB, and breast cancer demands innovative diagnostic solutions.  
Traditional methods are often expensive, slow, and inaccessible, especially in remote regions.

---

## 🚑 Challenges in Healthcare Diagnostics
- **High Costs:** Traditional diagnosis is expensive.
- **Delayed Diagnosis:** Late detection worsens patient outcomes.
- **Limited Early Detection Tools:** Lack of proactive care options.
- **Accessibility Issues:** Remote areas suffer due to poor healthcare infrastructure.

---

## 💡 Proposed Solution
- Accessible and cost-effective AI-based diagnostic system.
- Early detection to improve treatment outcomes.
- Reduce dependency on expensive equipment.
- Increase accuracy and minimize diagnostic errors.

---

## 🛠️ System Architecture
> **Data Flow Diagram** is available in the project documentation.

**Data Flow:**  
Data Collection ➔ Preprocessing ➔ Model Training ➔ Model Evaluation ➔ Diagnosis Output

---

## 📊 Model Performances

### 🔵 Diabetes Detection
| Model                | Precision | Recall | Accuracy | F1 Score |
|----------------------|-----------|--------|----------|----------|
| Logistic Regression  | 0.71      | 0.51   | 75%      | 0.60     |
| Naive Bayes           | 0.72      | 0.57   | 77%      | 0.55     |
| Random Forest         | 0.67      | 0.50   | 74%      | 0.55     |
| Hybrid (ANN + XGBoost) | 0.74     | 0.50   | 75%      | 0.63     |
| SVM                   | 0.75      | 0.51   | 77%      | 0.63     |

### ❤️ Heart Disease Detection
| Model           | Precision | Recall | Accuracy | F1 Score |
|-----------------|-----------|--------|----------|----------|
| EfficientNet    | 0.80      | 0.84   | 80%      | 0.82     |
| TabTransformer  | 0.78      | 0.90   | 81%      | 0.83     |
| KNN             | 0.81      | 0.81   | 81%      | 0.84     |
| SVM             | 0.81      | 0.81   | 80%      | 0.81     |

### 🧠 Parkinson’s Disease Detection
| Model             | Precision | Recall | Accuracy | F1 Score |
|-------------------|-----------|--------|----------|----------|
| Random Forest     | 1.00      | 1.00   | 96.3%    | 1.00     |
| XGBoost           | 1.00      | 1.00   | 96.3%    | 1.00     |
| SVM               | 1.00      | 1.00   | 96.3%    | 1.00     |

### 🎗️ Breast Cancer Detection
| Model             | Precision | Recall | Accuracy | F1 Score |
|-------------------|-----------|--------|----------|----------|
| CNN (5 Layers)    | 0.81      | 0.81   | 89%      | 0.81     |
| DenseNet121       | 0.89      | 0.89   | 97%      | 0.89     |

### 🫁 Tuberculosis Detection
| Model             | Precision | Recall | Accuracy | F1 Score |
|-------------------|-----------|--------|----------|----------|
| DenseNet121       | 0.91      | 0.44   | 90%      | 0.59     |
| EfficientNetB0    | 0.72      | 0.57   | 77%      | 0.56     |
| DenseNet169       | 0.93      | 0.41   | 95%      | 0.63     |

### 🧠 Brain Tumor Detection
| Model             | Precision | Recall | Accuracy | F1 Score |
|-------------------|-----------|--------|----------|----------|
| Yolov8            | 0.71      | 0.81   | 81%      | 0.70     |
| CNN (8 Layers)    | 0.72      | 0.82   | 82%      | 0.73     |
| VGG16             | 0.98      | 0.91   | 99%      | 0.94     |

---

## ✅ Advantages and ❌ Challenges

### ✅ Advantages
- Cost-effective compared to traditional diagnostic methods.
- Enables early-stage detection, reducing mortality.
- Automation minimizes diagnostic errors.
- Scalable for future disease expansions.

### ❌ Challenges
- Limited availability of high-quality datasets.
- Balancing performance across diseases with varying data sizes.
- High computational requirements during training.

---

## 🚀 Future Work
- **LLM Integration(INPROGRESS):**  
  Incorporate Large Language Models to provide disease-specific health advice and precautions based on diagnosis results.

---

## 📚 References
- [IEEE - Disease Prediction Using ML](https://ieeexplore.ieee.org/document/10060903)
- [E3S Conferences - ML based Diagnostics](https://www.e3s-conferences.org/articles/e3sconf/pdf/2023/67/e3sconf_icmpc2023_01051.pdf)
- [IRJMETS - Multi Disease Prediction](https://www.irjmets.com/uploadedfiles/paper/issue_1_january_2024/48476/final/fin_irjmets1705419474.pdf)
- [ResearchGate - Multi Disease Prediction System](https://www.researchgate.net/publication/381309960_MULTI_DISEASE_PREDICTION_SYSTEM_USING_MACHINE_LEARNING)
