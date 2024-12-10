// Function to calculate BMI
function calculateBMI() {
  // Retrieve input values
  const age = parseFloat(document.getElementById('age').value);
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const gender = document.querySelector('input[name="gender"]:checked').id;

  const bmiResultElement = document.getElementById('bmiResult');
  const bmiAlertElement = document.getElementById('bmialert');
  const bmiActionElement = document.getElementById('bmiAction');
  const bmihealthyWeight = document.getElementById('healthyWeight');
  const bmiweghit = document.getElementById('action');
  const progressBar = document.getElementById('progress-bar');

  // Validate inputs
  if (!age || age <= 0 || !height || height <= 0 || !weight || weight <= 0) {
      bmiAlertElement.textContent = 'Please enter valid values for age, height, and weight.';
      bmiAlertElement.style.color = 'red';
      return;
  }
  bmiAlertElement.textContent = ''; // Clear any previous alert

  // Convert height from cm to meters
  const heightInMeters = height / 100;

  // Calculate BMI
  const bmi = (weight / (heightInMeters ** 2)).toFixed(2);

  // Determine BMI category and progress bar color
  let category = '';
  let progressColor = '#3498db'; // Default color for the progress bar

  if (bmi < 18.5) {
      category = 'Underweight';
      bmiActionElement.innerHTML = 'You need to gain weight.';
      bmiActionElement.style.color = 'orange';
      progressColor = '#f1c40f'; // Yellow for underweight
  } else if (bmi >= 18.5 && bmi <= 24.9) {
      category = 'Normal weight';
      bmiActionElement.innerHTML = 'You are in a healthy range!';
      bmiActionElement.style.color = 'green';
      progressColor = '#2ecc71'; // Green for normal weight
  } else if (bmi >= 25 && bmi <= 29.9) {
      category = 'Overweight';
      bmiActionElement.innerHTML = 'Consider losing some weight.';
      bmiActionElement.style.color = 'orange';
      progressColor = '#e67e22'; // Orange for overweight
  } else {
      category = 'Obesity';
      bmiActionElement.innerHTML = 'Consider consulting a healthcare provider.';
      bmiActionElement.style.color = 'red';
      progressColor = '#e74c3c'; // Red for obesity
  }

  // Update BMI result
  bmiResultElement.textContent = bmi;

  // Update height weight range
  const minHealthyWeight = (18.5 * (heightInMeters ** 2)).toFixed(2);
  const maxHealthyWeight = (24.9 * (heightInMeters ** 2)).toFixed(2);
  bmihealthyWeight.innerHTML = `${minHealthyWeight} - ${maxHealthyWeight} Kg`;

  // Update weight action
  const weightLose = (weight - maxHealthyWeight).toFixed(2);
  const weightGain = (minHealthyWeight - weight).toFixed(2);
  if (weight < minHealthyWeight) {
      bmiweghit.innerHTML = `Gain ${weightGain} kg`;
  } else if (weight >= minHealthyWeight && weight <= maxHealthyWeight) {
      bmiweghit.innerHTML= `Perfect weight`;
      bmiweghit.style.color='green'
  } else {
      bmiweghit.innerHTML = `Lose ${weightLose} kg`;
  }

  // Update progress bar width and color
  const bmiPercentage = Math.min((bmi / 40) * 100, 100); // Cap at 100%
  progressBar.style.width = `${bmiPercentage}%`;
  progressBar.style.backgroundColor = progressColor;
}

// Function to clear form and reset outputs
function clearForm() {
  document.querySelector('#bmiForm').reset(); // Reset form fields
  document.getElementById('bmiResult').textContent = '0'; // Reset BMI result
  document.getElementById('bmialert').textContent = ''; // Clear alert message
  document.getElementById('bmiRange').textContent = '18.5 - 24.9'; // Reset BMI range
  document.getElementById('healthyWeight').textContent = '0 - 0 Kg'; // Reset healthy weight range
  document.getElementById('bmiAction').textContent = ''; // Reset action text
  document.getElementById('bmiAction').style.color = ''; // Reset action color
  document.getElementById('action').textContent = 'Lose 0 kg'; 

  // Reset progress bar
  const progressBar = document.getElementById('progress-bar');
  progressBar.style.width = '0%';
  progressBar.style.backgroundColor = '#3498db';
}
