document.addEventListener('DOMContentLoaded', function () {

    Array.from(document.getElementsByClassName("nav-link")).forEach(link => {
        link.addEventListener('click', function (event) {
            checkNavBarSelected(link);
        });

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
                <div class="p-4 md:w-1/3 grid-item zoom-in  ">
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
});
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

function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('grid-right')) {
                entry.target.classList.add('slide-in-right');
            }else if (entry.target.classList.contains('zoom-in')) {
                setTimeout
                entry.target.classList.add('zoom-in');
            }
            else {
                entry.target.classList.add('slide-in-left');
            }
            observer.unobserve(entry.target);
        }
    });
}

// Create a new Intersection Observer
const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.2
});

const gridItems = document.querySelectorAll('.grid-item');

// Observe each grid item
gridItems.forEach(item => {
    observer.observe(item);
});
