
# ECatalogue

ECatalogue is a web application designed to manage and display products within various categories. It uses Django and Django REST Framework for the backend, PostgreSQL for database management, and JWT for secure user authentication. The frontend is built with React and Material-UI, leveraging Axios for efficient HTTP requests.

## Features

- **User Authentication**: Utilizes JWT for handling both access and refresh tokens for secure and efficient user authentication.
- **Category Management**: Allows users to create, update, and delete categories via RESTful APIs implemented using Django's ViewSets and APIView for flexible HTTP method responses.
- **Product Management**: Enables detailed management of products including additions, updates, and deletions within catalogs, managed through Django models and serialization for API interactions.
- **Responsive Frontend**: Developed with React and styled with Material-UI for a responsive and modern user interface. Axios is used for API requests to handle asynchronous data exchanges smoothly.

## Technology Stack

- **Frontend**: React.js, Material-UI, Axios
- **Backend**: Django, Django REST Framework (using ViewSets, APIView)
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)

## Backend Details

- **ViewSets and APIView**: Simplify CRUD operations and provide flexibility for custom behaviors on HTTP requests.
- **Models**: Define the data schema and behavior of the application's data storage.
- **Serialization**: Handles conversion between JSON and Django querysets or model instances.
- **JWT Authorization**: Secures the application by ensuring all requests to the API are authenticated.

## Frontend Details

- **React**: Facilitates building dynamic user interfaces with efficient updates and state management.
- **Axios**: Used for making HTTP requests from the frontend to the backend, supporting the dynamic interaction between user actions and the server.
- **Material-UI**: Provides ready-to-use components that are customizable for building a uniform and attractive user interface.

## Getting Started

Follow these instructions to get your project up and running on your local machine for development and testing purposes.

### Prerequisites

- Python 3.12.3
- Django and Django REST Framework
- Node.js and npm
- PostgreSQL

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/iCelf08/Ecatalogue.git
   cd Ecatalogue
   ```
2. **Setup a Virtual Environment (optional but recommended)**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. **Install Backend Dependencies**
   ```bash
   pip install -r requirements.txt
   ```
4. **Set Up and Seed the Database**
   ```bash
   python manage.py migrate
   python manage.py loaddata initial_data
   ```
5. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```
6. **Run the Development Servers**
   ```bash
   # Run the backend server
   cd ..
   python manage.py runserver

   # Run the frontend server in a different terminal
   cd frontend
   npm start
   ```


## Contact

 Email: elfarjichaimaa1@gmail.com

```
