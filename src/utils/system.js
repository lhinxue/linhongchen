const openLink = (v) => window.open(v).focus();

const wait = (ms) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

const doNothing = () => {};

const atMost = (v, limit) => (v > limit ? limit : v);

export { openLink, wait, doNothing, atMost };
