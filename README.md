# Get It Done!

This repository contains a full-stack task management application. The frontend is built with **React** and the **Adobe Spectrum** design system, while the backend is a **C# GraphQL API** using **Entity Framework Core**. The entire application is containerized with **Docker** for easy and consistent setup.

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
    git clone [https://github.com/maksimstoyanov/GET_IT_DONE.git](https://github.com/maksimstoyanov/GET_IT_DONE.git)
    ```

2.  **Run with Docker Compose**

    Change your directory to the root of the cloned repository and execute the `docker compose up` command. This will build the necessary images and start the containers.

    ```bash
    cd GET_IT_DONE/
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
