setInterval(()=> {
    animateCSS('#apostar', 'flipInX'); //botao
    animateCSS('.fa-heartbeat', 'swing'); //icone dos erros
    animateCSS('.fa-exclamation-circle', 'bounce'); //icone das chances
    animateCSS('.fa-concierge-bell', 'wobble'); //icone das tentativas
},5000)



let erros = [];

const numeroSorteado = Math.floor((Math.random() * 10)+1)

let chances = 6;


document.querySelector('#apostar').addEventListener('click', (event)=> {
  event.preventDefault();

  let num = Number(document.querySelector('#numero').value);
  
  if(num <=0 || num > 60) {
    alert('Informe um número válido');
  } 
  else if(num === numeroSorteado) {
    alert('Parabéns!! voçê acertou, jogo irá reiniciar.');
    setInterval(()=> window.location.reload(true), 2000);
  } 
  else if(erros.includes(num)) {
    alert(`Você já apostou o número ${num}. Tente outro!!!`);
  } else if(num !== numeroSorteado) {
      erros.push(num);

      localStorage.setItem('erros', JSON.stringify(erros));

      if (num < numeroSorteado) {
        document.querySelector('#saidaDica').innerHTML = `<h4 class="alert alert-success">
        O número sorteado é maior que ${num}</h4>`;
        document.querySelector('#numero').value = '';

      } else if(num > numeroSorteado) {
        document.querySelector('#saidaDica').innerHTML = `<h4 class="alert alert-success">
        O número sorteado é menor que ${num}</h4>`;
        document.querySelector('#numero').value = '';
      }

      chances--;   
      document.querySelector('#saidaErro').innerHTML = `<h4 class="alert alert-danger 😥">${erros}</h4>`;
      document.querySelector('#saidaChance').innerHTML = `<h4 class="alert alert-primary">${chances}</h4>`; 
      document.querySelector('#numero').value = '';


    if(chances === 0) {
      alert('Suas chances acabaram! O JOGO IRÁ RECOMEÇAR EM 3 segundos');
      document.querySelector('#saidaDica').innerHTML = `<h4 class="alert alert-danger">
      GAME OVER: O número sorteado é: ${numeroSorteado}</h4>`
      document.querySelector('#numero').value = '';
     
      
      setInterval(()=> window.location.reload(true), 3000); 
      return 
    }

  } 
  
  //limpando campos
  document.querySelector('#numero').value = '';
  document.querySelector('#numero').focus();

  if(num === numeroSorteado) {
    document.querySelector('#saidaDica').innerHTML = `<h4 class="alert alert-success">
    Parabéns! O número sorteado é: ${numeroSorteado}</h4>`
  }
})


console.log(numeroSorteado)