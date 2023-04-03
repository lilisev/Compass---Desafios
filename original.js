var h1 = document.createElement('h1'); //criei o elemento h1
h1.innerText = 'Compass Brain';
var body = document.body;
var firstChild = body.firstChild;
body.insertBefore(h1, firstChild); //para exibir h1 no topo da página
var posts = [
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
var commentPost = [
    {
        id: 1,
        postId: 2,
        email: 'joao@gmail.com',
        body: 'Sempre estou conectado, quero saber o que ocorre no mundo todo',
    },
    {
        id: 2,
        postId: 2,
        email: 'gabriela123@gmail.com',
        body: 'A informação chega de forma de tão rápida, isso facilita muito as tomadas de decisão',
    }
];
var app = document.getElementById('app'); //cria variavel app e obtem o elemento de acordo com o id.
//Se o id existir, crio a funcao que irá percorrer o array 'posts'  e renderizar a pagina inicial.
if (app) {
    var pagePosts = function () {
        app.innerHTML = " \n     <div class=\"image-gallery\"> \n      ".concat(posts.map(function (image) { return "\n        <div class='post'> \n          <button type='button' class='post-btn' data-id=\"".concat(image.id, "\"> \n            <a href=\"image.html\">\n              <img src=\"").concat(image.url, "\" alt=\"").concat(image.title, "\">\n            </a>\n            <div>\n              <h2>").concat(image.title, "</h2> \n              <p>").concat(image.description, "</p> \n            </div> \n          </button>\n        </div>\n      "); }).join(""), " \n     </div> \n    ");
    };
    //funcao recebe o parametro id e ao encontrar o id correspondente, renderiza a imagem com os dados
    //linha 90 - o array 'commentPost é mapeado e se o'postId' for igual ao id da imagem, renderiza os comentarios
    var pagePostComments = function (id) {
        var image = posts.find(function (image) { return image.id === id; });
        if (image) {
            app.innerHTML = " \n        <div class=\"image\" data-id=\"".concat(image.id, "\"> \n          <img src=\"").concat(image.url, "\" alt=\"").concat(image.title, "\" /> \n          <h2>").concat(image.title, "</h2> \n          <p>").concat(image.description, "</p> \n        </div>\n        <div class=\"comments-gallery\"> \n          ").concat(commentPost.map(function (comment) { return "\n            ".concat(comment.postId === image.id ? "\n              <div class=\"comment\" data-id=\"".concat(comment.id, "\">\n                <p><strong>").concat(comment.email, "</strong></p> \n                <p>").concat(comment.body, "</p> \n              </div>\n            ") : '', " \n          "); }).join(""), " \n        </div> \n        <button type='button' class='back-btn'>Voltar</button>\n      ");
            //crio o evento para que ao clicar no botao 'voltar' eu seja direcionada para a página index.html
            var backButton = app.querySelector('.back-btn');
            if (backButton) {
                backButton.addEventListener('click', function () {
                    window.location.href = '/index.html';
                });
            }
        }
    };
    //se abrir uma nova pagina, a nova página vai receber os dados da imagem clicada e chamará a função 'pagePostComments'
    if (window.location.pathname === "/image.html") {
        var id = new URLSearchParams(window.location.search).get('id');
        if (id) {
            pagePostComments(parseInt(id));
        }
    }
    else {
        pagePosts();
    }
    //evento para clicar na imagem e direcionar à nova pagina com detalhes do post.
    document.addEventListener('click', function (event) {
        var target = event.target;
        if (target.classList.contains('post-btn')) {
            var id = target.dataset.id;
            if (id) {
                window.location.href = "/image.html?id=".concat(id);
            }
        }
    });
}
