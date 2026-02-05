function exceptionStatus(response) {
    const status = response.status;
    switch (status) {
        case 400:
            return 'Dados inválidos';

        case 401:
            return 'Email ou senha incorretos';

        case 403:
            return 'Acesso negado';

        case 404:
            return 'Recurso não encontrado';

        case 409:
            return 'Conflito: ';

        case 500:
            return 'Erro no servidor. Tente novamente mais tarde.';

        case 503:
            return 'Serviço temporariamente indisponível';

        default:
            return 'Erro ao processar requisição';
    }
}

function postExceptionStatus(response) {
    const status = response.status;
    switch (status) {
        case 200:
            const message = {
                GET: "Posts carregados com sucesso",
                PUT: "Postagem atualizada"
            }
            return message;
        case 201:
            return "Postagem criada";
        case 204:
            return "Postagem deletada";
        case 403:
            return "Login necessário para continuar";
        case 404:
            return "Nenhum Post foi encontrado. Crie um ou tente novamente mais tarde.";
        case 500:
            return "Algo deu Errado.Tente novamente mais tarde";
    }
}
