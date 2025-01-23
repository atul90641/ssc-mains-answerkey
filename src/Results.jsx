import React, { useEffect, useState } from "react";
import parseHTML from "./fetchData";
import './App.css';  // Make sure to create a Results.css file in the same directory

function Results({ htmlData }) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!htmlData) {
      setError("No HTML data provided.");
      return;
    }

    try {
      const calculatedResult = parseHTML(htmlData);
      setResult(calculatedResult);
    } catch (err) {
      setError("Error parsing HTML data. Please check the input format.");
      console.error("Parsing error:", err);
    }
  }, [htmlData]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  const combinedTotalMarks = {
    "Math & Reasoning": (result?.Math?.marks ?? 0) + (result?.Reasoning?.marks ?? 0),
    "English & GK": (result?.English?.marks ?? 0) + (result?.GK?.marks ?? 0)
  };

  const finalTotalMarks = combinedTotalMarks["Math & Reasoning"] + combinedTotalMarks["English & GK"];

  return (
    <div className="results">
      {result ? (
        <div>
          <h2>Results:</h2>
          <table className="result-table">
            <thead>
              <tr>
                <th>Sections</th>
                <th>Details</th>
                <th>Total Marks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Math & Reasoning</td>
                <td>
                  <table className="inner-table">
                    <thead>
                      <tr>
                        <th>Section</th>
                        <th>Correct</th>
                        <th>Wrong</th>
                        <th>Not Attempted</th>
                        <th>Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {["Math", "Reasoning"].map((section) => (
                        <tr key={section}>
                          <td>{section}</td>
                          <td>{result?.[section]?.correct ?? 0}</td>
                          <td>{result?.[section]?.wrong ?? 0}</td>
                          <td>{result?.[section]?.not_attempted ?? 0}</td>
                          <td>{result?.[section]?.marks ?? 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td>{combinedTotalMarks["Math & Reasoning"]}</td>
              </tr>
              <tr>
                <td>English & GK</td>
                <td>
                  <table className="inner-table">
                    <thead>
                      <tr>
                        <th>Section</th>
                        <th>Correct</th>
                        <th>Wrong</th>
                        <th>Not Attempted</th>
                        <th>Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {["English", "GK"].map((section) => (
                        <tr key={section}>
                          <td>{section}</td>
                          <td>{result?.[section]?.correct ?? 0}</td>
                          <td>{result?.[section]?.wrong ?? 0}</td>
                          <td>{result?.[section]?.not_attempted ?? 0}</td>
                          <td>{result?.[section]?.marks ?? 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td>{combinedTotalMarks["English & GK"]}</td>
              </tr>
              <tr>
                <td>Computer</td>
                <td>
                  <table className="inner-table">
                    <thead>
                      <tr>
                        <th>Section</th>
                        <th>Correct</th>
                        <th>Wrong</th>
                        <th>Not Attempted</th>
                        <th>Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Computer</td>
                        <td>{result?.Computer?.correct ?? 0}</td>
                        <td>{result?.Computer?.wrong ?? 0}</td>
                        <td>{result?.Computer?.not_attempted ?? 0}</td>
                        <td>{result?.Computer?.marks ?? 0}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td>{result?.Computer?.marks ?? 0}</td>
              </tr>
            </tbody>
          </table>
          <h3>Total Marks: {finalTotalMarks} + {result?.Computer?.marks ?? 0}(Computer)</h3>
        </div>
      ) : (
        <p>Processing...</p>
      )}
    </div>
  );
}

export default Results;
