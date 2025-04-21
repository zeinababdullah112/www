const form = document.getElementById('contactForm');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Collect form values
  const email = document.getElementById('email').value.trim();
  const company = document.getElementById('company').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const tax = document.getElementById('tax').value.trim();
  const speakers = document.getElementById('speakers').value.trim();
  const message = document.getElementById('message').value.trim();
  const department = document.getElementById('department').value;
  const agreementCheckbox = document.getElementById('agreement');
  const agreementMessage = document.getElementById('agreement-message');

  // Agreement checkbox validation
  if (!agreementCheckbox.checked) {
    agreementMessage.classList.remove('hidden');
    agreementMessage.classList.add('error');
    return; // stop submission
  } else {
    agreementMessage.classList.add('hidden');
    agreementMessage.classList.remove('error');
  }

  // Form fields validation
  if (email && company && phone && tax && speakers && message && department) {
    alert('Your message has been sent successfully!');
    form.reset();
  } else {
    alert('Please fill out all fields.');
  }
});
