const get = (key) => {
    const cachedValue = localStorage.getItem(key);
    return cachedValue ? JSON.parse(cachedValue) : undefined;
};

const set = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const Cache = { get, set };

export default Cache;
