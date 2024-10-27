Personal Diary with Sentiment Analysis

Project Overview
This Personal Diary is a web application that allows users to document their daily experiences and moods. Each journal entry undergoes sentiment analysis to detect the overall mood of the text (positive, neutral, or negative), giving users valuable insights into their emotional well-being over time. Users can view their mood trends through graphical representations, helping them track their mental health journey week by week or month by month.

Features

1. Journal Management
   Users can add new journal entries, edit existing ones, and delete entries as needed.
2. Sentiment Analysis
   Each entry is analyzed for sentiment (positive, neutral, negative) using NLP (Natural Language Processing). This provides users with an immediate sense of the      overall mood of their writing.
3. Mood Trend Visualization
   Users can view their mood trends over weeks and months using graphs, allowing for an overview of emotional patterns over time.

Tech Stack
Frontend
1. HTML/CSS: For layout and styling of the application.
2. React.js: For managing the user interface and providing a smooth user experience.
Backend
1. JavaScript (Node.js): Used for sentiment analysis and backend processing.
2. NLP Library (Sentiment.js): For analyzing the sentiment of each journal entry and categorizing it as positive, neutral, or negative.

Setup and Installation
Prerequisites
1. Node.js and npm installed on your system.
2. Knowledge of React.js and basic JavaScript for frontend development.

Project Structure:

/src:
 Contains the main code files for the application.

components/:
 Contains React components for entries, forms, and graphs.

utils/:
 Utility functions, including sentiment analysis setup and helper functions for date and trend calculations.

Usage:

1.Adding an Entry
Navigate to the entry section and click on "Save Entry" to write your journal entry for the day.

2. Sentiment Analysis
Once you submit an entry, the sentiment analysis module automatically analyzes it and assigns a mood (positive, neutral, or negative). You can view or delete    your previous entries by clickinf on "View Entries".

3.Viewing Mood Trends
Go to the "Mood Trends" section to see graphical representations of your mood over time, with options to filter by weeks, months, or custom date ranges.

Implementation Details:

1. Sentiment Analysis
  The application uses Sentiment.js to calculate an initial sentiment score for each entry. The NLP module parses each word to determine an overall sentiment     (   (positive, neutral, or negative).
  Manual Adjustments: 
  Users can manually influence the sentiment score by specifying keywords or phrases that they feel strongly affect their mood. This custom vocabulary is used to     modify the automatic sentiment calculation, resulting in a more personalized sentiment score.

2.Trend Visualization
Trend data is calculated and visualized using a JavaScript graphing library (Chart.js).
Mood trends are displayed over time, helping users identify patterns in their mood.

Future Enhancements

Exporting Entries: Allow users to export entries and sentiment data in a format of their choice (e.g., PDF, CSV).

User Authentication: Integrate login and signup functionality for privacy and personalized experience.

Advanced Sentiment Analysis: Implement a more sophisticated NLP model to capture complex emotions.

License
This project is licensed under the MIT License. See the LICENSE file for more details.

Acknowledgments
Special thanks to the creators of Sentiment.js and Chart.js for providing essential tools for sentiment analysis and data visualization.
