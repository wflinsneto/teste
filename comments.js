const express = require('express');
const bodyParser = require('body-parser');

    //Create a web server that listens on port 3000
    //When you visit the root URL, it should display a list of comments
    //When you visit the URL /new, it should display a form that lets you submit a new comment

    const app = express();
    const port = 3000;

    app.use(bodyParser.urlencoded({ extended: true }));

    let comments = ['This is the first comment!', 'Here is another comment.'];

    // Route to display the list of comments
    app.get('/', (req, res) => {
        let commentList = comments.map(comment => `<li>${comment}</li>`).join('');
        res.send(`<h1>Comments</h1><ul>${commentList}</ul><a href="/new">Add a new comment</a>`);
    });

    // Route to display the form for adding a new comment
    app.get('/new', (req, res) => {
        res.send(`
            <h1>New Comment</h1>
            <form action="/new" method="POST">
                <textarea name="comment" rows="4" cols="50" required></textarea><br>
                <button type="submit">Submit</button>
            </form>
        `);
    });

    // Route to handle form submission and add a new comment
    app.post('/new', (req, res) => {
        const newComment = req.body.comment;
        if (newComment) {
            comments.push(newComment);
        }
        res.redirect('/');
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });