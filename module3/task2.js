const WithTime = require('./with-time');
const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

console.log(withTime.rawListeners("end"));

withTime.execute(getPost, 1)
    .then((post) => {
        console.log('post is', post);
    });

async function getPost(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post = await response.json();
    return post;
}