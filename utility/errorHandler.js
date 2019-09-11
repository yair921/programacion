exports.errorHandler = (args) => {
    console.error(`Method ${args.method} error -> ${args.message}`);
    throw new Error('An error has ocurred.');
};