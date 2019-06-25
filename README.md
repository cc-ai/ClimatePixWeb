# ClimatePixWeb

React website for crowd image collection of natural disaster images.

## About This App

This repo contains the react side code for creating a page to upload images.

## Local Setup

1. Clone the repository
2. Make sure you have node and npm installed
3. Navigate to reactapp
4. Install all the required node libraries using `npm install --save`
5. Run the reactapp `npm start`
6. To run the doc's server run `npx styleguidist server` from the project directory or `npx styleguidist build` to build the html version. We are using react-styleguidedist library.

## Deploying The App

We use Google App Engine to deploy this app.

1. Make sure you have installed the [`gcloud` command-line tool](https://cloud.google.com/sdk/gcloud/). 
2. Before proceeding, please reach out to a member of the core development team and ask them for:
   - the `app.yaml` file
   - the `ClimatePixWeb` Google project ID.
3. Copy the `app.yaml` file at `reactapp/app.yaml`.
4. Create a file `reactapp/.env` and copy all environment variables from `app.yaml` to this `.env` file:
   - Environment variables are listed into section `env_variables:` in `app.yaml`.
   - Each variable in `app.yaml` has format `name: value`, once per line. You should
     copy them to `.env` using the syntax `name=value`, once per line.
5. Please ensure that you have the appropriate Google Cloud permissions to deploy the application.
   Especially, you need to set the default gcloud project using the `ClimatePixWeb` Google project ID:
   - `gcloud config set project <ClimatePixWeb project ID here>`.
6. Finally, run the following commands from the `reactapp` directory:
   - `npm install --save`
   - `npm run-script build`
   - `gcloud app deploy`

Verify the details and follow the interactive instructions when running `gcloud app deploy`. Once the deploy is done, the app should be available at [https://climatepix.mila.quebec](https://climatepix.mila.quebec).
