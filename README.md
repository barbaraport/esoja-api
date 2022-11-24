# :vibration_mode: eSoja app :seedling:
## :running_woman: How to run the server

First of all, you'll need to clone the repository. Pay attention to the path of the clone that you'll download. Avoid any folders having special characters and/or spaces in the name. Afterwards, follow these steps:

1. Install the NodeJS. You may need to restart your computer to the installation be recognized.
2. Install the PostgreSQL.
3. Install Redis. It is not available for Windows, so one option is to install [WSL](https://docs.microsoft.com/en-us/windows/wsl/install) or create a virtual machine and install Redis on it.
4. When you finish installing Redis, start the service with the command `sudo service redis-server start`. The service must be active whenever the project will be executed.
5. Open the project in your preferred *IDE*. Inside the root folder (`esoja-api`), create an `.env` file following the `.env.example` file as an example. Change the content of each variable according to your needs, as they are used within the source code.
6. Remember to always be on the same network as your smartphone!
7. In the terminal, run the ```npm install``` command to install all the server's dependencies, you may need to add the `--legacy-peer-deps` or `--force` argument.
8. In the root folder, open the terminal and type `npx prisma generate` and `npx prisma migrate dev` commands. If you already have the database in an older version, it will be necessary to drop the tables so that they can be recreated.
9. Make sure you are in the `esoja-api` folder and run our app with the `npm run dev` command. :warning: If you're running the [app](https://github.com/barbaraport/esoja-mobile) too, don't forget to change the **IP Address** and **port** in the `esoja-mobile\src\data\services\api.ts` file. :warning:
