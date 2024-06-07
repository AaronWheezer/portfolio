const token = 'Bearer 89d16ea0a4f29bd86104aab38c7a398921d00472c364dbeb3c230d1931f7c2602327c5a18b6c0d9ae271eb5915a5406c5dc090b5e5944e1af16198f14996ddc00a096888603b6cb2f4a6ffc62081acfffd267fa89ba299f60607485a342f4b425fd08042913a9d42bea3b6674ed0612c5c706f7fc918cfe21beab4cfb90a9f42';

document.addEventListener('DOMContentLoaded', function () {
    // Get the blog post ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    fetch(`https://strapi-5ded9797b1d3.herokuapp.com/api/blogs?populate=*`, {
        headers: {
            Authorization: `Bearer 89d16ea0a4f29bd86104aab38c7a398921d00472c364dbeb3c230d1931f7c2602327c5a18b6c0d9ae271eb5915a5406c5dc090b5e5944e1af16198f14996ddc00a096888603b6cb2f4a6ffc62081acfffd267fa89ba299f60607485a342f4b425fd08042913a9d42bea3b6674ed0612c5c706f7fc918cfe21beab4cfb90a9f42`
          }
    })
    .then(response => response.json())
    .then(data => {
        // Populate HTML with blog posts
        const blogPostsContainer = document.getElementById('blogPostsContainer');
        blogPostsContainer.innerHTML = '';
        data.data.forEach(post => {
    
            const firstParagraphText = post.attributes.body[0].children[0].text;
            const postHtml = `
                <div class="p-4 md:w-1/3 fade-in grid-item">
                    <div class="h-full rounded-xl bg-white overflow-hidden flex flex-col">
                        <img class="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100" src="./assets/img/${post.attributes.title}.jpg" alt="${post.attributes.title}">
                        <div class="p-6 flex flex-col" style="height: 300px;"> <!-- Set a fixed height for the post content -->
                            <h1 class="title-font text-lg font-medium text-gray-600 mb-3">${post.attributes.title}</h1>
                            <p class="leading-relaxed mb-3 " style="overflow: hidden;">${firstParagraphText}</p>

                            <div class="flex-grow"></div> <!-- This will push the button to the bottom -->
                            <div class="flex items-center">
                                <button class="bg-sky-900 hover:scale-105 drop-shadow-md text-white shadow-cla-blue px-4 py-1 rounded-lg" onclick="redirectToBlog(${post.id})">Learn more</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            blogPostsContainer.innerHTML += postHtml;
        });
    })     
    .catch(error => console.error('Error fetching blog posts:', error));

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
        blogPostImage.src = `./assets/img/${blogPost.attributes.title}.jpg`;
        console.log(blogPost.attributes.body);
        // Render the body content paragraphs of the blog post
        const contentBlocks = blogPost.attributes.body

        contentBlocks.forEach(block => {
            let element;

            // Handle different block types
            switch (block.type) {
                case 'paragraph':
                    if (block.children[0].text.trim() === "") {
                        element = document.createElement('br');
                    } else {
                        element = document.createElement('p');
                        element.textContent = block.children[0].text;
                        if (block.children[0].bold) {
                            element.style.fontWeight = 'bold';
                        }
                        break;
                    }
                    break;
                case 'title':
                case 'heading':
                    element = document.createElement('h2');
                    element.textContent = block.children[0].text;
                    if (block.children[0].bold) {
                        element.style.fontWeight = 'bold';
                    }
                    break;
                // Add more cases for other types as needed
                default:
                    console.warn(`Unknown block type: ${block.type}`);
                    return;
            }

            // Append the element to the content container
            blogPostContent.appendChild(element);
        });
    })
    .catch(error => console.error('Error fetching blog post:', error));
});



// Function to redirect to blog.html with post ID in the URL
function redirectToBlog(postId) {
    window.location.href = `blog.html?id=${postId}`;
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
