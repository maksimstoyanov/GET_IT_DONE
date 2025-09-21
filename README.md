# Get It Done!

This repository contains a simple, full-stack task manager application that demonstrates a modern development workflow. The core objective is to build a robust application using an ASP.NET Core backend with a GraphQL API, a React frontend for the user interface, and Docker containers for a streamlined, portable deployment.

The project fulfills key requirements, including a clearly defined GraphQL schema on the backend and an intuitive user experience on the frontend. This setup provides a complete example of how to build, deploy, and manage a containerized application with a GraphQL API.

---

### ⚠️ Important Warnings ⚠️

* **Docker Hub Account:** Ensure your Docker account's email is verified before building the images. Otherwise, the build process will fail with a `401 Unauthorized` error when attempting to download the base images.
* **Data Persistence:** The SQLite database is created within the Docker container. If the container is removed, all your data will be lost. To prevent this, consider using a **Docker Volume** to mount the database file to your host machine's filesystem.

---

### 🚀 Getting Started

Follow these steps to set up and run the application.

1.  **Clone the Repository**

    Navigate to your desired directory and clone the project:

    ```bash
    git clone https://github.com/maksimstoyanov/GET_IT_DONE.git
    ```

2.  **Run with Docker Compose**

    Change your directory to the root of the cloned repository and execute the `docker compose up` command. This will build the necessary images and start the containers.

run the following command from GET_IT_DONE/ 
    ```bash
    docker compose up --build
    ```

    * The backend container will automatically apply the database migrations and create the `tasks.db` file.
    * The frontend container will serve the React application.

3.  **Access the Application**

    Once the containers are running, you can access the application in your web browser:

    * **Frontend:** [http://localhost:3000](http://localhost:3000)
    * **GraphQL Playground:** [http://localhost:5000/graphql](http://localhost:5000/graphql)

---

### Project Structure

* `client/`: Contains the React frontend application.
* `server/`: Contains the C# backend with the GraphQL API and Entity Framework Core migrations.
* `docker-compose.yml`: Defines the services, networks, and volumes for the Docker environment.
