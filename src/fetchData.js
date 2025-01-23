export default function parseHTML(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  let questions = doc.querySelectorAll(".question-pnl");

  // Limit to the first 150 questions
  let questionsToProcess = questions.length > 150 ? 150 : questions.length;

  let sections = {
    "Math": { correct: 0, wrong: 0, not_attempted: 0, marks: 0 },
    "Reasoning": { correct: 0, wrong: 0, not_attempted: 0, marks: 0 },
    "English": { correct: 0, wrong: 0, not_attempted: 0, marks: 0 },
    "GK": { correct: 0, wrong: 0, not_attempted: 0, marks: 0 },
    "Computer": { correct: 0, wrong: 0, not_attempted: 0, marks: 0 }
  };

  let sectionNames = ["Math", "Reasoning", "English", "GK", "Computer"];
  let sectionLimits = [30, 30, 45, 25, 20];
  let sectionIndexes = sectionLimits.map((limit, index) => sectionLimits.slice(0, index).reduce((a, b) => a + b, 0));

  // Iterate through the first 150 questions
  for (let i = 0; i < questionsToProcess; i++) {
    let question = questions[i];

    // Determine the section based on the question's index
    let section = sectionNames[sectionIndexes.findIndex((start, index) => i >= start && i < sectionIndexes[index] + sectionLimits[index])];

    // Extract Question Number
    let questionNumber = question.querySelector(".questionRowTbl td.bold")?.innerText.trim().replace('Q.', '').trim();

    // Extract Chosen Option
    let chosenOptionRow = [...question.querySelectorAll(".menu-tbl tr")].find(row =>
      row.innerText.includes("Chosen Option :")
    );
    let chosenOption = chosenOptionRow ? chosenOptionRow.querySelector("td.bold").innerText.trim() : "--";

    // Find the Correct Answer by locating the tick mark in the answer section
    let rightAnswer = [...question.querySelectorAll(".rightAns")]
      .find(ans => ans.querySelector("img.tick"))?.innerText.trim().split('.')[0];

    if (!questionNumber || !chosenOption || !rightAnswer) {
      console.log(`Skipping question: ${i + 1} due to missing data.`);
      continue; // Skip if any critical information is missing
    }

    // Update counters based on the chosen option
    if (chosenOption === "--") {
      sections[section].not_attempted++;
    } else if (chosenOption === rightAnswer) {
      sections[section].correct++;
      sections[section].marks += 3; // +3 for correct answer
    } else {
      sections[section].wrong++;
      sections[section].marks -= 1; // -1 for wrong answer
    }
  }

  let totalMarks = Object.values(sections).reduce((sum, sec) => sum + sec.marks, 0);

  // Debugging: Log the sections data to verify calculations
  console.log('Sections Data:', sections);

  return { ...sections, totalMarks };
}
