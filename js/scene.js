const token = 'Bearer 7adde395b3ed6acbe028d5076594fce90d95ea12e83d4eecb8aa42e98d1eed48c5a2b4e7c0606d1ca3870a8ccdf3683daf08f650a1fb555a2afd63a1a91a43212797f3994609d5e37e556d9cf7bec6c6ee736af09366987c220aa880fe858b0d0c081ed347cc4a8e2024d6582eb4e473a25a6642197eddb5f077ccd8289aa97b';

document.addEventListener('DOMContentLoaded', function () {
    fetch(`http://localhost:1337/api/blogs?populate=*`, {
        headers: {
            Authorization: token    
        }
    })
    .then(response => response.json())
    .then(data => {
        // Populate HTML with blog posts
        const blogPostsContainer = document.getElementById('blogPostsContainer');
        blogPostsContainer.innerHTML = '';
        console.log(data.data);
        data.data.forEach(post => {

            const firstParagraphText = post.attributes.body[0].children[0].text;
            const postHtml = `
                <div class="p-4 md:w-1/3">
                    <div class="h-full rounded-xl bg-white overflow-hidden">
                        <img class="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100" src="http://localhost:1337${post.attributes.cover.data.attributes.formats.medium.url}" alt="${post.attributes.title}">
                        <div class="p-6">
                            <h1 class="title-font text-lg font-medium text-gray-600 mb-3">${post.attributes.title}</h1>
                            <p class="leading-relaxed mb-3">${firstParagraphText}</p>

                            <div class="flex items-center flex-wrap">
                                <button class="bg-gradient-to-r from-cyan-400 to-blue-400 hover:scale-105 drop-shadow-md shadow-cla-blue px-4 py-1 rounded-lg" onclick="redirectToBlog(${post.id})">Learn more</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            blogPostsContainer.innerHTML += postHtml;
        });
    })
    .catch(error => console.error('Error fetching blog posts:', error));
});

// Function to redirect to blog.html with post ID in the URL
function redirectToBlog(postId) {
    window.location.href = `blog.html?id=${postId}`;
}
