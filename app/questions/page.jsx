import React from "react";
import Header from "../Header";

const sampleQuestions = [
    "Tell me about yourself.",
    "What are your strengths and weaknesses?",
    "Describe a challenging project you worked on.",
    "How do you handle tight deadlines?",
    "Why do you want this job?",
];

const QuestionsPage = () => {
    return (
        <>
        <Header />
        <div style={{
            padding: "2rem",
            // background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <h1 style={{
                fontSize: "2.5rem",
                color: "#2d3a4b",
                marginBottom: "1rem",
                letterSpacing: "2px"
            }}>
                🎤 Interview Questions
            </h1>
            <p style={{ fontSize: "1.2rem", color: "#4b5d6b" }}>
                Get ready for your next interview! Here are some sample questions to practice:
            </p>
            <ul style={{
                marginTop: "2rem",
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(44,62,80,0.08)",
                padding: "2rem",
                maxWidth: "500px",
                listStyle: "none",
                background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)"
            }}>
                {sampleQuestions.map((q, idx) => (
                    <li key={idx} style={{
                        marginBottom: "1.2rem",
                        fontSize: "1.1rem",
                        color: "#2d3a4b",
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <span style={{
                            display: "inline-block",
                            width: "2rem",
                            height: "2rem",
                            background: "#6dd5ed",
                            color: "#fff",
                            borderRadius: "50%",
                            textAlign: "center",
                            lineHeight: "2rem",
                            marginRight: "1rem",
                            fontWeight: "bold"
                        }}>{idx + 1}</span>
                        {q}
                    </li>
                ))}
            </ul>
            <div style={{
                marginTop: "2.5rem",
                textAlign: "center",
                color: "#7b8fa1",
                fontStyle: "italic"
            }}>
                🚧 More features coming soon. Stay tuned!
            </div>
        </div>
        </>
    );
};

export default QuestionsPage;
