# Interactive Analysis of College Attendance Systems with AI Tools

This project is an interactive, single-page web application that provides a comprehensive analysis of attendance systems used in Indian engineering colleges. It visualizes data on system adoption and effectiveness, compares different attendance-taking methods, and presents case studies from various institutions. 

The standout feature is a suite of AI-powered tools, built using the Google Gemini API, designed to assist administrators, faculty, and students with common attendance-related challenges.

## ✨ Key Features

*   **Interactive Data Visualizations:** Uses `Chart.js` to display the adoption rates of different systems and their effectiveness in reducing proxy attendance.
*   **Methods Comparison:** A detailed breakdown of various attendance methods (Manual, Biometric, QR Code, Facial Recognition) with their pros, cons, and vulnerability to "proxy" attendance.
*   **Case Studies:** Presents real-world examples and trends from institutions like IITs, NITs, and other top state universities.
*   **AI-Powered Attendance Suite (Powered by Gemini):**
    *   **Policy Drafter:** An administrative tool to automatically generate formal attendance policy notices.
    *   **System Auditor:** A security tool that analyzes a described attendance process to identify potential loopholes.
    *   **Excuse Validator:** A tool for faculty to analyze the genuineness of student excuses and generate a reply.
    *   **Recovery Planner:** A tool for students to calculate the required number of classes they need to attend to meet the minimum attendance criteria.

## 🚀 How to Use

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd <repository-name>
    ```
3.  **Add your API Key:**
    *   Open the `script.js` file.
    *   Find the line `const apiKey = "AIzaSyBrhPgsSZ8PbTdb-ABfbq5TMeChwTuk-Zg";`.
    *   Replace the placeholder key with your own Google Gemini API key.
    
    > **Warning**
    > The AI-powered features will not work without a valid API key.

4.  **Open the application:**
    *   Simply open the `index.html` file in your web browser. No special server is needed.

## 🛠️ Technology Stack

*   **Frontend:** HTML, [Tailwind CSS](https://tailwindcss.com/), Vanilla JavaScript
*   **Libraries:**
    *   [Chart.js](https://www.chartjs.org/) for data visualization.
    *   [Marked.js](https://marked.js.org/) for rendering Markdown from the AI's response.
*   **AI:** [Google Gemini API](https://ai.google.dev/)
