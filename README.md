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

## Viewing PR Previews

Whenever you create a PR to this repository, a version of your PR will be deployed via [Netlify Deploy Previews](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/). For example, if your PR number is 20, the code in your PR will be deployed to https://deploy-preview-20--climatepix.netlify.com/.

The build status will be posted on your PR. When the PR integration says that the site has been built, click the "Details" link next to "Deploy preview ready!" to be taken to the deployed PR automatically.

## Testing the app in dev mode

For testing purposes, we should better avoid uploading pictures in the same place as final users. To do that, 
you can add the React environment variable `REACT_APP_DEV=1` to your `.env` file.

If `REACT_APP_DEV` is set and contains a value evaluated to `true`, 
then your pictures will be uploaded in a folder called `dev` on Firebase.

Otherwise, if `REACT_APP_DEV` is not set or is evaluate to `false`, 
then the app will be in production mode, 
and pictures will be uploaded in a folder called `public` on Firebase.
