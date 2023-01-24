import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      });
  }, []);
  //deleting
  const handleDeleteClick = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const updateDeleteuestions = questions.filter(
          (quizes) => quizes.id !== id
        );
        setQuestions(updateDeleteuestions);
      });
  };
  const handleAnswerChange = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({correctIndex})
              })
        .then(res => res.json())
        .then(updatequiz => {
          const updatequestion = questions.map((qui) => {
            if (qui.id === updatequiz.id) return updatequiz;

            return qui;
          });
          setQuestions(updatequestion);
    });
  };

  const questionitems = questions.map((quiz) => (
    <QuestionItem
      key={quiz.id}
      question={quiz}
      onDeleteItem={handleDeleteClick}
      onAnswerSelect={handleAnswerChange}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionitems}</ul>
    </section>
  );
}

export default QuestionList;w