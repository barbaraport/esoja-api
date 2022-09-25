# :vibration_mode: eSoja app :seedling:
## :running_woman: Como rodar o back-end

Primeiramente, clone o repositório. Atente-se sobre o caminho do clone dentro da sua máquina. Evite que quaisquer pastas tenham caracteres especiais e espaços no nome. Depois, siga os seguintes passos:

1. Instale o NodeJS. Talvez seja necessário reiniciar o computador para que a instalação seja reconhecida.
2. Instale o PostgreSQL.
3. Instale o Redis. Ele não está disponível para Windows, então uma opção é instalar o [WSL](https://docs.microsoft.com/en-us/windows/wsl/install) ou criar uma máquina virtual.
4. Quando finalizar a instalação do Redis, inicie o serviço com o comando `sudo service redis-server start`. O serviço precisará estar ativo sempre que o projeto for executado.
5. Dentro abra o projeto na sua *IDE* de preferência. Dentro da pasta raiz (`esoja-api`), crie um arquivo `.env` seguindo de exemplo o arquivo `.env.example`. Altere o conteúdo de cada variável de acordo com a sua necessidade, pois elas são utilizadas dentro do código-fonte.
6. Lembre-se de sempre estar na mesma rede que o seu celular!
7. Abra o terminal e digite `npm install` para baixar todas as dependências do projeto, talvez seja necessário adicionar ao comando `--legacy-peer-deps` ou `--force`.
8. Na pasta raiz, abra o terminal e digite `npx prisma generate` e depois `npx prisma migrate deploy`.
9. Depois disso, dentro da pasta raiz, abra o terminal e digite `npm run start:local` para executar o back-end. :warning: Caso esteja executando o *app* também, não se esqueça de trocar o *ip* e a porta no arquivo `\esoja-mobile\src\data\services\api.ts`. :warning:
