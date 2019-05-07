document.addEventListener('DOMContentLoaded', () => {
  const endPoint = 'http://localhost:3000/users';
  fetch(endPoint)
    .then(res => res.json())
    .then(json => console.log(json));
});
