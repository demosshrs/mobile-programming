function calculateResult() {

  let totalMarks =
    Number(document.getElementById("s1").value) +
    Number(document.getElementById("s2").value) +
    Number(document.getElementById("s3").value) +
    Number(document.getElementById("s4").value) +
    Number(document.getElementById("s5").value) +
    Number(document.getElementById("s6").value) +
    Number(document.getElementById("s7").value) +
    Number(document.getElementById("s8").value);

  let resultText = document.getElementById("output");

  resultText.innerHTML = "Total Marks: " + totalMarks + "/ 800 <br>";

  if (totalMarks >= 700) {
    resultText.innerHTML += "PASS: Distinction";
    resultText.style.color = "green";
  }
  else if (totalMarks >= 600) {
    resultText.innerHTML += "PASS: First Division";
    resultText.style.color = "blue";
  }
  else if (totalMarks >= 500) {
    resultText.innerHTML += "PASS: Second Division";
    resultText.style.color = "orange";
  }
  else if (totalMarks >= 400) {
    resultText.innerHTML += "PASS: Third Division";
    resultText.style.color = "purple";
  }
  else {
    resultText.innerHTML += "FAIL";
    resultText.style.color = "red";
  }
}