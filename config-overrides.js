module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};

    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "buffer": require.resolve("buffer/"),
        "stream": require.resolve("stream-browserify"),
        "vm": require.resolve("vm-browserify"),
    });

    config.resolve.fallback = fallback;
    return config;
}