flatpickr("#date", {
  dateFormat: "Y-m-d",
  minDate: "2024-01-01",
  maxDate: "2124-01-01",
  defaultDate: "2024-01-01",
  yearSelector: true,
  onReady: function (selectedDates, dateStr, instance) {
      const yearSelect = instance.currentYearElement;
      yearSelect.type = "select-one";
  }
});

function generateCorID() {
  const date = document.getElementById('date').value;
  const facility = document.getElementById('facility').value.padStart(5, '0');
  const patient = document.getElementById('patient').value.padStart(5, '0');
  const yearOfBirth = document.getElementById('yearOfBirth').value;
  const gender = document.getElementById('gender').value;

  const days = daysSince2024(date).toString();
  const concatenated = days + facility + patient;
  const corid = toBase36(Number(concatenated)) + yearOfBirth + gender;

  document.getElementById('corid-output').innerText = corid;
}

function daysSince2024(dateString) {
  const startDate = new Date('2024-01-01');
  const selectedDate = new Date(dateString);
  const diffTime = Math.abs(selectedDate - startDate);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

function toBase36(number) {
  return number.toString(36).toUpperCase();
}

function decodeCorID() {
  const corid = document.getElementById('corid-input').value;
  const base36Part = corid.slice(0, corid.length - 5);
  const yearOfBirth = corid.slice(-5, -1);
  const gender = corid.slice(-1);

  const decodedNumber = parseInt(base36Part, 36);
  const days = decodedNumber.toString().slice(0, -10);
  const facility = decodedNumber.toString().slice(-10, -5);
  const patient = decodedNumber.toString().slice(-5);


  const decodedDate = new Date('2024-01-01');
  decodedDate.setDate(decodedDate.getDate() + Number(days));

  const startDate = new Date('2024-01-01');
  startDate.setDate(startDate.getDate() + Number(days));

  const day = startDate.getDate().toString().padStart(2, '0');
  const month = (startDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const year = startDate.getFullYear();

  const output = `
      Date: ${day}/${month}/${year}<br>
      Facility Number: ${+facility}<br>
      Patient Number: ${+patient}<br>
      Year of Birth: ${yearOfBirth}<br>
      Gender: ${gender === 'M' ? 'Male' : 'Female'}
  `;
  document.getElementById('decoded-output').innerHTML = output;
}
