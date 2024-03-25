document.addEventListener('DOMContentLoaded', function () {
    Array.from(document.getElementsByClassName("nav-link")).forEach(link => {
        link.addEventListener('click', function (event) {
            checkNavBarSelected(link);
        });

    fetch(`http://localhost:3000/api/data`, {
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
                <div class="p-4 md:w-1/3 flip-in grid-item">
                    <div class="h-full rounded-xl bg-white overflow-hidden flex flex-col">
                        <img class="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100" src="http://localhost:1337${post.attributes.cover.data.attributes.formats.medium.url}" alt="${post.attributes.title}">
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
            }else if (entry.target.classList.contains('flip-in')) {
                entry.target.classList.add('flip-in');
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