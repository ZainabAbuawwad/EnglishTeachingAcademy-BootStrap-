// ==========================================================================
// Lexicon Academy — shared behavior
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {

  // Tooltips
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (el) {
    new bootstrap.Tooltip(el);
  });

  // Back to top button
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.style.display = window.scrollY > 500 ? 'flex' : 'none';
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Count-up stats
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    }
    window.requestAnimationFrame(step);
  }

  // Navbar shadow on scroll
  var nav = document.querySelector('.navbar-chalk');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.style.boxShadow = window.scrollY > 10 ? '0 8px 20px rgba(0,0,0,0.25)' : 'none';
    });
  }

  // Bootstrap form validation (client-side only — no backend in this template)
  var forms = document.querySelectorAll('.needs-validation');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      form.classList.add('was-validated');
      var successEl = form.querySelector('.form-success-msg');
      if (successEl) {
        successEl.classList.remove('d-none');
      }
      form.reset();
      form.classList.remove('was-validated');
      var modalEl = form.closest('.modal');
      if (modalEl) {
        setTimeout(function () {
          var instance = bootstrap.Modal.getInstance(modalEl);
          if (instance) instance.hide();
          if (successEl) successEl.classList.add('d-none');
        }, 1800);
      }
    });
  });

});