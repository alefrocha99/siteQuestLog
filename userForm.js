const form = document.querySelector('#user-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que a página recarregue ao enviar o formulário

    const formData = new FormData(form);
    const user = Object.fromEntries(formData.entries()); // Converte o FormData em um objeto

    fetch('http://200.98.161.74/users2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => {
      if (response.ok) {
        const successMessage = document.querySelector('#success-message');
        successMessage.textContent = 'Usuário cadastrado com sucesso!';
        form.reset(); // Limpa os campos do formulário
        window.location.replace('/SucessoCadastro.html');
      } else {
        throw new Error('Ocorreu um erro ao cadastrar o usuário.', console.log(JSON.stringify(user)))
        
      }
    })
    .catch(error => {
      let errorMessage = '';
      if (error.message === 'Este endereço de email já está em uso') {
        errorMessage = 'Este endereço de email já está em uso. Por favor, tente outro.';
      } else {
        errorMessage = 'Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente mais tarde.';
      
      }
      const errorMessageElement = document.querySelector('#error-message');
      errorMessageElement.textContent = errorMessage;
    });

  })

  