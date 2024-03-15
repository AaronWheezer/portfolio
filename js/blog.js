const token = 'Bearer 7adde395b3ed6acbe028d5076594fce90d95ea12e83d4eecb8aa42e98d1eed48c5a2b4e7c0606d1ca3870a8ccdf3683daf08f650a1fb555a2afd63a1a91a43212797f3994609d5e37e556d9cf7bec6c6ee736af09366987c220aa880fe858b0d0c081ed347cc4a8e2024d6582eb4e473a25a6642197eddb5f077ccd8289aa97b';

document.addEventListener('DOMContentLoaded', function () {
    // Get the blog post ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    // Fetch the blog post data based on the ID
    fetch(`http://localhost:1337/api/blogs/${postId}?populate=*`, {
        headers: {
            Authorization: token // Your authorization token here
        }
    })
    .then(response => response.json())
    .then(data => {
        // Populate HTML with blog post content
        const blogPostTitle = document.querySelector('h2');
        const blogPostDate = document.querySelector('.py-2');
        const blogPostImage = document.querySelector('img');
        const blogPostContent = document.querySelector('.leading-relaxed');

        const blogPost = data.data; // Assuming the blog post data is returned in the 'data' property

        // Update HTML elements with blog post data
        blogPostTitle.textContent = blogPost.attributes.title;
        blogPostDate.textContent = `Published on ${blogPost.attributes.publishedAt}`;
        blogPostImage.src = `http://localhost:1337${blogPost.attributes.cover.data.attributes.formats.medium.url}`;

        // Render the body content paragraphs of the blog post
        blogPostContent.innerHTML = renderBody(blogPost.attributes.body);
    })
    .catch(error => console.error('Error fetching blog post:', error));
});

// Function to render the body content of the blog post
function renderBody(body) {
    return body.map(paragraph => `<p>${paragraph.children[0].text}</p>`).join('');
}
