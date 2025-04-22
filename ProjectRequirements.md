# Final Project Plan: Customer Lifetime Value + Basket Analysis

## 🎯 Project Focus

Our project will focus on analyzing **Customer Lifetime Value (CLV)** and performing **Basket Analysis** to identify product purchasing patterns and customer retention insights. We will use anonymized retail data from 84.51°/Kroger and build a full-stack solution using **Azure Cloud services** to meet all project requirements.

Our primary retail questions are:

- **CLV:** How can we predict long-term revenue potential to prioritize high-value customers?
- **Basket Analysis:** What are the commonly purchased product combinations, and how can they drive cross-selling opportunities?
- **Churn:** Which customers are at risk of disengaging, and how can we identify them?

---

## 🧩 Task Breakdown

### 1. ML Write-Up (1 Point)
- Write brief descriptions of:
  - Linear Regression
  - Random Forest
  - Gradient Boosting
- Choose one model to apply for predicting **Customer Lifetime Value (CLV)**.

### 2. Web Server Setup (2 Points)
- Launch a web server using Azure or another cloud provider.
- Create a login page with:
  - Username
  - Password
  - Email field

### 3. Data Storage & Loading (2 Points)
- Upload and store:
  - `400_households.csv`
  - `400_transactions.csv`
  - `400_products.csv`
- Use Azure SQL (or another service) to store and join the data.
- Display sample results for **HSHD_NUM #10**, showing:
  - Hshd_num, Basket_num, Date, Product_num, Department, Commodity

### 4. Interactive Web Page (2 Points)
- Build a search form for querying `HSHD_NUM`
- Sort and display results by:
  - Hshd_num, Basket_num, Date, Product_num, Department, Commodity

### 5. Data Loading Web App (2 Points)
- Add functionality to upload new versions of the CSV files
- Ensure the interactive webpage reflects updated data automatically

### 6. Dashboard (2 Points)
- Create visualizations for:
  - Spend over time
  - Brand preference (private vs. national)
  - Department/category trends
- Use chart libraries like Chart.js, Plotly, or Power BI Embedded

### 7. ML Model for Basket Analysis (2 Points)
- Use one of the following models:
  - Linear Regression
  - Random Forest
  - Gradient Boosting
- Analyze product combinations frequently purchased together
- Display common baskets and cross-selling opportunities

### 8. Churn Prediction (2 Points)
- Define churn (e.g., customers with no purchases after a certain period)
- Use regression, correlation, or visualization to identify at-risk households
- Present churn analysis in your dashboard and write-up

---

## ✅ Final Deliverables

- [ ] Azure-hosted web app with search and upload features
- [ ] Dashboard with at least 3 visual insights
- [ ] ML write-up (200 words)
- [ ] CLV model implementation
- [ ] Basket analysis model and results
- [ ] Churn prediction results
- [ ] Joined and cleaned dataset (SQL or CSV)
- [ ] Final report with screenshots, write-up, and project URL

