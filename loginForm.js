const form = document.querySelector('#login-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que a página recarregue ao enviar o formulário

    const formData = new FormData(form);
    const user = Object.fromEntries(formData.entries()); // Converte o FormData em um objeto

    fetch('http://localhost:80/userAuthentication/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => {
      if (response.ok) {
        const successMessage = document.querySelector('#success-message');
        successMessage.textContent = 'Login Realizado Com sucesso';
        form.reset(); // Limpa os campos do formulário
      } else {
        throw new Error('Usuario ou senha inválido.');
      }
    })
    .catch(error => {
      let errorMessage = '';
      if (error.message === 'Usuário não encontrado') {
        errorMessage = 'Usuario ou senha inválido';
      } else {
        errorMessage = 'Usuario ou senha inválido.';
      }
      const errorMessageElement = document.querySelector('#error-message');
      errorMessageElement.textContent = errorMessage;
    });

  })