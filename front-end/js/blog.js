const token = 'Bearer 89d16ea0a4f29bd86104aab38c7a398921d00472c364dbeb3c230d1931f7c2602327c5a18b6c0d9ae271eb5915a5406c5dc090b5e5944e1af16198f14996ddc00a096888603b6cb2f4a6ffc62081acfffd267fa89ba299f60607485a342f4b425fd08042913a9d42bea3b6674ed0612c5c706f7fc918cfe21beab4cfb90a9f42';

document.addEventListener('DOMContentLoaded', function () {
    // Get the blog post ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    // Fetch the blog post data based on the ID
    fetch(`https://strapi-5ded9797b1d3.herokuapp.com/api/blogs/${postId}?populate=*`, {
        headers: {
            Authorization: token
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
        blogPostDate.textContent = `Published on ${blogPost.attributes.date}`;
        blogPostImage.src = `https://strapi-5ded9797b1d3.herokuapp.com${blogPost.attributes.cover.data.attributes.url}`;

        // Render the body content paragraphs of the blog post
        blogPostContent.innerHTML = renderBody(blogPost.attributes.body);
    })
    .catch(error => console.error('Error fetching blog post:', error));
});

// Function to render the body content of the blog post
function renderBody(body) {
    return body.map(paragraph => `<p>${paragraph.children[0].text}</p>`).join('');
}


function checkNavBarSelected(link) {
    const navLinks = document.getElementsByClassName('nav-link');
    Array.from(navLinks).forEach(navLink => {
        navLink.classList.remove('bg-sky-900');
    });
    
    const clickedHref = link.getAttribute('href');
    Array.from(navLinks).forEach(navLink => {
        const href = navLink.getAttribute('href');
        if (href === clickedHref) {
            navLink.classList.add('bg-sky-900');
        }
    });

}
