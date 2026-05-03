const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const config = {
    entry: {
      employees: './src/employees.jsx',
    },

    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'public'),
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.jsx'],
    },

    optimization: {
      splitChunks: {
        name: 'vendor',
        chunks: 'all',
      },
    },
    
    devtool: 'source-map',
  };

  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }

  return config;
};