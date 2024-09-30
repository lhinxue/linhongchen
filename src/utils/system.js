const openLink = (v) => window.open(v).focus();

const wait = (ms) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

export { openLink, wait };
