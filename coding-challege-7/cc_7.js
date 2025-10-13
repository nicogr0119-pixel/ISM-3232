const input = document.getElementById('newHeadline');
const button = document.getElementById('updateBtn');
const cta = document.getElementById('cta-heading');

button.addEventListener('click', function(){
  const value = input.value.trim();
  cta.textContent = value.length ? value : 'We build modern web apps, automate operations, and translate data into action.';
});

input.addEventListener('keydown', function(e){
  if(e.key === 'Enter'){
    e.preventDefault();
    button.click();
  }
});
