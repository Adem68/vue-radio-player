module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/radio-player/" : "/",
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
            args[0].title = "Radio Player";
            return args;
        })
}
};
