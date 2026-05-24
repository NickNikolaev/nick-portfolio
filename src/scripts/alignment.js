const btns = document.querySelectorAll('.js-star-btn');
const panels = document.querySelectorAll('.js-star-panel');

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const step = btn.dataset.step;

    btns.forEach(b => {
      const active = b.dataset.step === step;
      b.style.backgroundColor = active ? '#0D9488' : '';
      b.style.color = active ? '#ffffff' : '';
      b.classList.toggle('text-slate-500', !active);
    });

    panels.forEach(p => {
      const show = p.dataset.step === step;
      p.classList.toggle('hidden', !show);
      p.classList.toggle('grid', show);
    });
  });
});

btns[0].style.backgroundColor = '#0D9488';
btns[0].style.color = '#ffffff';
