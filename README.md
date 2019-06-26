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

We use Google App Engine to deploy this app. Before proceeding, please reach out to a member of the core development team and ask them for the `app.yaml` file as well as the `.env` file. Take the `app.yaml` file at put it at `reactapp/app.yaml`. Take the `.env` file and put it at `reactapp/.env`.

Also, make sure you have installed the [`gcloud` command-line tool](https://cloud.google.com/sdk/gcloud/). Finally, please ensure that you have the appropriate Google Cloud permissions to deploy the application.

Once you have the `app.yaml` and `.env` files in-place and the `gcloud` tool is installed, run the following commands from the `reactapp` directory:

1. `npm install --save`
2. `npm run-script build`
3. `gcloud config set project climatepixweb-244121`
4. `gcloud app deploy`

Verify the details and following the interactive instructions when running `gcloud app deploy`. Once the deploy is done, the app should be available at [https://climatepix.mila.quebec](https://climatepix.mila.quebec).
