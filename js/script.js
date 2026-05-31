//JavaScript for contact form submission using EmailJS

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const formNote = contactForm.querySelector('.form-note');

  if (!contactForm) {
    return;
  }

  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (!window.emailjs) {
      formNote.textContent = 'Email service is unavailable. Please try again later.';
      return;
    }

    const templateParams = {
      from_name: document.getElementById('name').value.trim(),
      from_email: document.getElementById('email').value.trim(),
      message: document.getElementById('message').value.trim(),
    };

    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    emailjs.send('service_5fx15oa', 'template_zkmmgzi', templateParams)
      .then(function() {
        formNote.textContent = 'Message sent successfully! We will reply within 24 hours.';
        contactForm.reset();
      })
      .catch(function(error) {
        console.error('EmailJS error:', error);
        formNote.textContent = 'Unable to send message right now. Please try again later.';
      })
      .finally(function() {
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Submit inquiry';
      });
  });
});
