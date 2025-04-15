# Final Project Requirements (Total: 15 Points)

## Overview

This guide outlines the required components to earn full credit (15 points) on the final group project using Azure Cloud Technologies and Tools. Each section includes a description and point value.

---

### 1. ML Write-Up (1 Point)

- Write a brief (max 200 words) explanation of the following ML models:
  - Linear Regression
  - Random Forest
  - Gradient Boosting
- Choose one model to answer the following question:
  **Retail Question**: *How can we predict long-term revenue potential to prioritize high-value customers?*

---

### 2. Web Server Setup (2 Points)

- Launch and configure a web server in Azure (or another cloud platform)
- Create a basic login page with the following fields:
  - Username
  - Password
  - Email

---

### 3. Datastore & Data Loading (2 Points)

- Upload the `Transactions`, `Households`, and `Products` datasets into a cloud datastore (e.g. Azure SQL, PostgreSQL)
- Display sample data for `HSHD_NUM #10`, including:
  - Hshd_num
  - Basket_num
  - Date
  - Product_num
  - Department
  - Commodity

---

### 4. Interactive Web Page (2 Points)

- Build a search interface for data pulls by `HSHD_NUM`
- Sort the results by:
  - Hshd_num
  - Basket_num
  - Date
  - Product_num
  - Department
  - Commodity

---

### 5. Data Loading Web App (2 Points)

- Create a webpage that allows users to upload updated versions of:
  - Transactions
  - Households
  - Products
- Ensure uploaded data is reflected in the interactive web page (requirement #4)

---

### 6. Dashboard Web Page (2 Points)

- Design a dashboard that explores at least one of the following questions:
  - How do demographics impact customer engagement?
  - Are households spending more or less over time?
  - What product combinations support cross-selling?
  - How do seasonal patterns affect inventory and promotions?
  - What are preferences for private vs national brands and organic items?

---

### 7. ML Model Application – Basket Analysis (2 Points)

- Use one of the following models:
  - Linear Regression
  - Random Forest
  - Gradient Boosting
- **Retail Question**: *What are the commonly purchased product combinations, and how can they drive cross-selling opportunities?*

---

### 8. Churn Prediction (2 Points)

- **Retail Question**: *Which customers are at risk of disengaging, and how can retention strategies address this?*
- Support this analysis using:
  - Regression
  - Correlation
  - Graphical results (or all of the above)
