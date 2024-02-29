const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const pkg = require("../package.json") ;

// eslint-disable-next-line @typescript-eslint/no-var-requires

const { ModuleFederationPlugin } = webpack.container;
const { dependencies: deps } = pkg;

const moduleFederationConfig = {
  name: 'app1',
  filename: 'remoteEntry.js',
  remotes: {
      /**
       * key : host app에서 사용할 remote app의 이름
       * value : '{name}@{remote app의 url}/{filename}'
       *   - name/filename : remote app - webpack.config - ModuleFederationPlugin에서의 값
       */
      // modules: 'modules@http://localhost:8083/remoteEntry.js',
  },
  exposes: {
    './TestButton': './src/components/TestButton',
    './TestButton2': './src/components/TestButton2',
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
    //   requiredVersion: false ,
    // },
    // ui: {
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
        },
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
      },
}