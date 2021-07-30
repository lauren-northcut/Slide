const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const description = document.querySelector('#project-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  //create an edit form handler 
  const editButtonHandler = async (event)=> {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');
    const theId= document.querySelector('input[name="project-id"]').value;

    const name = document.querySelector('input[id="p.name"]').value;
    const description = document.querySelector('textarea[id="p.description"]').value;
    console.log("this is the id    " + id + "  " + name + "  " + theId + "   " + description)
    await fetch(`/api/projects/${theId}`, {
      method: 'PUT',
      body: JSON.stringify({
        name, 
        description
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
   
  };
  
  document
    .querySelector('.new-project-form')
    .addEventListener('click', newFormHandler);
  
  document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);



  document
    .querySelector('#edit-form')
    .addEventListener('submit', editButtonHandler)
