const h1 = document.createElement('h1'); //criei o elemento h1
h1.innerText = 'Compass Brain';

const body = document.body; 
const firstChild = body.firstChild;

body.insertBefore(h1, firstChild); //para exibir h1 no topo da página

//criei as interfaces para tipar os atributos dos arrays 'posts' e 'commentPost'
interface PostType { 
     id: number; 
     title: string; 
     description: string; 
     url: string; 
 } 
  
 const postsData: Array<PostType> = [ 
     { 
         id: 1, 
         title: 'Everything you need in the palm of your hand', 
         description: 'Having everything in the palm of your hand has never been so easy. With just a few touches on the cell phone screen, it is possible to access a multitude of information and services. For you, what still needs to be solved with just one touch?', 
         url: 'https://www.pontotel.com.br/wp-content/uploads/2022/07/iot.webp', 
     }, 
     { 
         id: 2, 
         title: 'Connected in the world', 
         description: 'Connecting is what enables humanity to transform. Evolution occurs more quickly as human beings connect, whether with other individuals, with technology or with the world around them.', 
         url: 'https://neilpatel.com/wp-content/uploads/2019/06/propagacao-de-informacao-na-era-digital.jpeg', 
     } 
 ]; 
 
 interface Comments { 
     id: number;
     postId: number; 
     email: string; 
     body: string; 
 } 
        
 const commentPost: Comments[] = [ 
     { 
         id: 1, 
         postId: 2,  
         email: 'joao@gmail.com', 
         body: 'Sempre estou conectado, isso me atualiza sobre as mudanças no mundo todo', 
     }, 
     { 
         id: 2, 
         postId: 2,  
         email: 'gabriela123@gmail.com', 
         body: 'Estar conectado se faz indispensável para o mundo dos negócios, que cada dia exige mais e mais conexões.'
     } 
 ]; 
        
 const app = document.getElementById('app'); //cria variavel app e obtem o elemento de acordo com o id.
//Se o id existir, crio a funcao que irá percorrer o array 'posts'  e renderizar a pagina inicial.
if (app) { 
  const pagePosts = () => {
    app.innerHTML = ` 
     <div class="image-gallery"> 
      ${postsData.map(({ description, id, title, url }) => `
        <div class='post'> 
          <button type='button' class='post-btn' data-id="${id}"> 
            <a href="image.html">
              <img src="${url}" alt="${title}">
            </a>
            <div>
              <h2>${title}</h2> 
              <p>${description}</p> 
            </div> 
          </button>
        </div>
      `).join("")} 
     </div> 
    `;
  };

  //funcao recebe o parametro id e ao encontrar o id correspondente, renderiza a imagem com os dados
  //linha 90 - o array 'commentPost é mapeado e se o'postId' for igual ao id da imagem, renderiza os comentarios
  const pagePostComments = (id: number) => { 

  const image = postsData.find((image) => image.id === id);
    if (image) {
      app.innerHTML = ` 
        <div class="image" data-id="${image.id}"> 
          <img src="${image.url}" alt="${image.title}" /> 
          <h2>${image.title}</h2> 
          <p>${image.description}</p> 
        </div>
        <div class="comments-gallery"> 
          ${commentPost.map(({postId, email, body}) => `
            ${postId === image.id ? `
              <div class="comment" data-id="${id}">
                <p><strong>${email}</strong></p> 
                <p>${body}</p> 
              </div>
            ` : ''} 
          `).join("")} 
        </div> 
        <button type='button' class='back-btn'>Voltar</button>
      `;
      //crio o evento para que ao clicar no botao 'voltar' eu seja direcionada para a página index.html
      const backButton = app.querySelector('.back-btn') as HTMLButtonElement; 
      if (backButton){
        backButton.addEventListener('click', () => {
          window.location.href = '/index.html';
        });
      }
    }
  };
          
  //se abrir uma nova pagina, a nova página vai receber os dados da imagem clicada e chamará a função 'pagePostComments'
  if (window.location.pathname === "/image.html") {
    const id = new URLSearchParams(window.location.search).get('id');
    if (id) {
      pagePostComments(parseInt(id));
    }
  } else {
    pagePosts();
  }

  //evento para clicar na imagem e direcionar à nova pagina com detalhes do post.
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('post-btn')) {
      const id = target.dataset.id;
      if (id) {
        window.location.href = `/image.html?id=${id}`;
      }
    }
  });
}