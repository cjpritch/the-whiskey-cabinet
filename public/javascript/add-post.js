async function newFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('input[name="post-name"]').value;
    console.log(name);
    const response = await fetch(`/api/posts`, {
      method: 'GET',
      body: JSON.stringify({
        name
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);