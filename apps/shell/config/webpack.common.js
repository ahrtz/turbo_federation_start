const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const pkg = require("../package.json") ;
const { NativeFederationTypeScriptHost,NativeFederationTypeScriptRemote } = require('@module-federation/native-federation-typescript/webpack');
const { ModuleFederationPlugin } = webpack.container;

const { dependencies: deps } = pkg;

const moduleFederationConfig = {
  name: 'shell',
  filename: 'remoteEntry.js',
  remotes: {
    test2: 'app1@http://localhost:8083/remoteEntry.js',
  },
  exposes:{

  },
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps.react,
      eager:true
    },
    'react-dom': {
      singleton: true,
      eager:true,
      requiredVersion: deps['react-dom'],
    },
    // lib: {
    //   singleton: true,
    //   requiredVersion: false,
    // },
  },
};

module.exports = {
    entry: `${path.resolve(__dirname, "../src")}/index.tsx`,
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
    module:{
        rules : [
            {   // 리액트 바벨 설정
                test: /\.(ts|tsx|js|jsx)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'esbuild-loader',
                    options: {
                        loader: 'tsx',
                        target: 'es2015'
                    }
                }
            },
        ]
    },
      plugins: [
          new ModuleFederationPlugin(moduleFederationConfig),
          NativeFederationTypeScriptHost({ moduleFederationConfig }),
          // NativeFederationTypeScriptRemote({ moduleFederationConfig,tsConfigPath:'../tsconfig.json'  }),
          new HtmlWebpackPlugin({
            template: "public/index.html",
          }),
          new webpack.ProvidePlugin({
            React: "react",
          }),
        ],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../src/"),
          'app1': path.resolve(__dirname, '../../app1/dist')
        },
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
      },
}