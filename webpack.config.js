const webpack = require("webpack");
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const { GitRevisionPlugin } = require("git-revision-webpack-plugin");
const SentryCliPlugin = require("@sentry/webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "kujawa",
    projectName: "webpack-playground",
    orgPackagesAsExternal: false,
    webpackConfigEnv,
    argv,
  });

  const gitCommitHash = new GitRevisionPlugin().commithash();
  const gitCommitHashShortened = gitCommitHash.substring(0, 8);

  return merge(defaultConfig, {
    devServer: {
      https: true,
    },
    devtool: "hidden-source-map",
    plugins: [
      new webpack.DefinePlugin({
        "process.env.GIT_COMMIT_HASH": JSON.stringify(gitCommitHash),
      }),

      new SentryCliPlugin({
        authToken:
          "288686163f564ca9878973e779b09c095188f0f3ec724c8abc17ac0732810652",
        dryRun: true, // process.env.NODE_ENV !== 'prod',
        include: "./dist",
        org: "paul-kujawa",
        project: "webpack-playground",
        release: gitCommitHash,
        setCommits: { auto: true },
        urlPrefix: `~/paul-sentry-releases-poc/${gitCommitHashShortened}/`,
        // urlPrefix: `https://frontend-sspa-dev.storage.googleapis.com/shelf-usages/${gitCommitHash.substring(0, 8)}/`
      }),
    ],
    module: {
      rules: [
        { test: /.(svg|png|jpe?g)$/, type: "asset/resource" },
        { test: /\.m?js/, resolve: { fullySpecified: false } },
      ],
    },
  });
};
