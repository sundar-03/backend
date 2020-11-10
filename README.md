# Instructions for setting up the repository

## Backend
* Give execute permissions to ```deploy.sh``` (`chmod +x deploy.sh`).
* Run the deploy.sh script (`./deploy.sh`).
    - The script just builds the frontend files (for now).
* Make sure mongodb (v3.0+) is installed.
* Inside the `env` directory, rename `.env.example` to `.env` and give the necessary values to the environment variables.
* Make sure mongo.
* Entry point: `index.js`.


## Frotend (For dev purposes)
* `cd frontend`
* `npm i`
* `npm start`