# Final Project Topic Proposal: Customer Engagement & CLV Prediction Using Azure

For our final project, our group will develop an Azure-based solution that analyzes customer engagement and spending behavior using anonymized retail data provided by 84.51°/Kroger. Our goal is to derive meaningful insights through data engineering and data science workflows and present them in a responsive, interactive web application.

## Cloud Technology
We are building our entire pipeline on Microsoft Azure. Azure SQL will be used to store and manage the cleaned and joined datasets. Azure Machine Learning will be used for model training and prediction.

## Data Engineering
Our data pipeline will ingest multiple CSV datasets, which we will clean, transform, and join based on unique household IDs. The dataset includes customer demographics, transaction history, and product information. Data will be preprocessed in Azure Data Studio and stored in Azure SQL Database for efficient querying and modeling.

## Data Science
We will implement machine learning models to estimate customer lifetime value (CLV), identify churn risk, and perform market basket analysis. These models will be trained and tested using Azure Machine Learning, with performance evaluated using metrics like RMSE and accuracy.

## Web Application
A React + TypeScript frontend will present dashboards and visualizations of CLV scores, churn risk categories, and recommended products. Users can interact with the application by filtering households or exploring patterns through dynamic charts and search functionality. The app will be deployed via Azure Static Web Apps.

## Innovation
By combining CLV and churn predictions with product affinity analysis, our solution empowers retailers to understand high-value customers and personalize promotions. The integration of machine learning and cloud-native tools highlights our team’s ability to develop scalable, data-driven applications.
