// Step 1: Select all tabs
const tabs = document.querySelectorAll('.tab-link');
const content = document.getElementById('content'); // Content area
const defaultTab = document.querySelector('.tab-link.active'); // Default active tab

// Step 2: Load the default tab content on page load
if (defaultTab) {
  const tabName = defaultTab.getAttribute('data-tab');
  updateContent(tabName); // Call the content update function for the default tab
  updateTitle(tabName);   // Set the browser title for the default tab
}

// Step 3: Add a click event to each tab
tabs.forEach(tab => {
  tab.addEventListener('click', function (event) {
    event.preventDefault(); // Stop the default link action

    // Remove 'active' class from all tabs
    tabs.forEach(t => t.classList.remove('active'));

    // Add 'active' class to the clicked tab
    this.classList.add('active');

    // Get the tab name from the data attribute
    const tabName = this.getAttribute('data-tab');

    // Step 4: Update content and browser title
    updateContent(tabName);
    updateTitle(tabName);
  });
});

// Function to update the content dynamically
function updateContent(tabName) {
  const slideshowContainer = document.createElement('div');
  slideshowContainer.classList.add('slideshow');

  if (tabName === 'home') {
    content.innerHTML = `
      <h1>Hello, I'm Tristan.</h1>
      <br>
      <h2>Skills:</h2>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
      </ul>
      <p>--------------------</p>
      <p><strong>My goal</strong> is to build websites for you <em>dirt cheap or free</em> so I can build up my project portfolio.</p>
      <br>
      <p>(To learn more about me, go to the About Page or to request a website head to the contact page.)</p>
      <div id="socialMedia">
        <!-- Additional social media info can be added here -->
      </div>
    `;
  } else if (tabName === 'about') {
    content.innerHTML = `
      <h1>About Me</h1>
      <br>
      <p><strong>My name</strong> is Tristan Vanderweert, and I’m a full-stack developer as well as a student pilot.
      <br>
      <br>
      <strong>I specialize</strong> in HTML, CSS, JavaScript, cybersecurity, and ethical hacking, and I thrive on breaking down complex challenges into manageable steps. 
      <br>
      <br>
      <strong>My problem-solving approach</strong> is all about dividing big issues into smaller, actionable tasks so I can tackle them efficiently. Beyond 
      <br>
      <br>
      <strong>my technical pursuits</strong>, I’m driven by an unwavering passion for aviation—I aspire to join the Air Force and attend the Air Force Academy to become a fighter pilot. Whether coding or flying, I believe precision, discipline, and a relentless pursuit of excellence are the keys to success.</p>
    `;
  } else if (tabName === 'projects') {
    content.innerHTML = `
      <h1>My Projects</h1>
      <br>
      <p>our portfolio is empty for now</p>
      <br>
      <!--place holders for projects-->
      <h3>Showcase 1</h3>
      <div class="slideshow" id="slideshow1"></div>
      <h3>Showcase 2</h3>
      <div class="slideshow" id="slideshow2"></div>
    `;

    const images1 = [
      'images/screenshot1.png',
      'images/screenshot2.png',
      'images/screenshot3.png',
    ];

    const images2 = [
      'images/screenshot4.png',
      'images/screenshot5.png',
      'images/screenshot6.png',
    ];

    let currentIndex1 = 0;
    let currentIndex2 = 0;

    function showImage(index, images, slideshow) {
      slideshow.innerHTML = `<img src="${images[index]}" alt="Screenshot ${index + 1}" style="transition: opacity 0.5s ease;">`;
      // Append buttons after showing the image
      appendButtons(slideshow, index, images);
    }

    function appendButtons(slideshow, index, images) {
      const nextButton = document.createElement('button'); 
      nextButton.style.position = 'absolute';
      nextButton.style.right = '10px';
      nextButton.style.top = '50%';
      nextButton.style.transform = 'translateY(-50%)';
      nextButton.textContent = 'Next';
      nextButton.addEventListener('click', () => {
        currentIndex1 = (currentIndex1 + 1) % images.length;
        showImage(currentIndex1, images, slideshow);
      });

      const prevButton = document.createElement('button');
      prevButton.style.position = 'absolute';
      prevButton.style.left = '10px';
      prevButton.style.top = '50%';
      prevButton.style.transform = 'translateY(-50%)';
      prevButton.textContent = 'Previous';
      prevButton.addEventListener('click', () => {
        currentIndex1 = (currentIndex1 - 1 + images.length) % images.length;
        showImage(currentIndex1, images, slideshow);
      });

      slideshow.appendChild(prevButton);
      slideshow.appendChild(nextButton);

      const fullscreenButton = document.createElement('button'); 
      fullscreenButton.textContent = 'Full Screen'; 
      fullscreenButton.addEventListener('click', () => { 
        if (document.fullscreenElement) { 
          document.exitFullscreen(); 
        } else { 
          slideshow.requestFullscreen(); 
        } 
      }); 
      slideshow.appendChild(fullscreenButton);
    }

    showImage(currentIndex1, images1, document.getElementById('slideshow1'));
    showImage(currentIndex2, images2, document.getElementById('slideshow2'));

    // Function to start auto-cycling for slideshow 1
    function startAutoCycle1() {
      setInterval(() => {
        currentIndex1 = (currentIndex1 + 1) % images1.length;
        showImage(currentIndex1, images1, document.getElementById('slideshow1'));
      }, 5000); // Change image every 5 seconds
    }

    // Function to start auto-cycling for slideshow 2
    function startAutoCycle2() {
      setInterval(() => {
        currentIndex2 = (currentIndex2 + 1) % images2.length;
        showImage(currentIndex2, images2, document.getElementById('slideshow2'));
      }, 5000); // Change image every 5 seconds
    }

    startAutoCycle1(); // Start auto-cycling for slideshow 1
    startAutoCycle2(); // Start auto-cycling for slideshow 2

  } else if (tabName === 'contact') {
    content.innerHTML = `
      <h1>Contact Page</h1>
      <style>
      /* Resetting default spacing */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      /* Base styles for body */
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        padding: 20px;
        line-height: 1.6;
      }
      
      /* Container for the contact form */
      .contact-container {
        max-width: 600px;
        background-color: #fff;
        margin: 40px auto;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      
      /* Form heading styling */
      .contact-container h2 {
        text-align: center;
        margin-bottom: 20px;
        font-size: 24px;
        color: #333;
      }
      
      /* Styling for form labels */
      .contact-form label {
        display: block;
        margin-bottom: 5px;
        color: #555;
        font-weight: bold;
      }
      
      /* Styling for form inputs and textarea */
      .contact-form input,
      .contact-form textarea {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
      }
      
      /* Input focus style */
      .contact-form input:focus,
      .contact-form textarea:focus {
        border-color: #0078D4;
        outline: none;
      }
      
      /* Styling for the submit button */
      .contact-form button {
        width: 100%;
        padding: 12px;
        background-color: #0078D4;
        color: #fff;
        font-size: 18px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      
      /* Button hover effect */
      .contact-form button:hover {
        background-color: #0053a6;
      }
      </style>
      <div class="contact-container">
        <h2>Contact Me</h2>
        <form class="contact-form" action="https://formspree.io/f/mgvavbrl" method="POST">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your full name" required>
          
          <label for="email">Email</label>
          <input type="email" id="email" name="_replyto" placeholder="Your email address" required>
          
          <label for="subject">Subject</label>
          <input type="text" id="subject" name="subject" placeholder="Subject" required>
          
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="6" placeholder="Your message here..." required></textarea>
          
          <button type="submit">Send Message</button>
        </form>
      </div>
    `;
  }
}

// Function to update the browser's title
function updateTitle(tabName) {
  if (tabName === 'home') {
    document.title = "Home - My Website";
  } else if (tabName === 'about') {
    document.title = "About Us - My Website";
  } else if (tabName === 'projects') {
    document.title = "Projects - My Website";
  } else if (tabName === 'contact') {
    document.title = "Contact - My Website";
  }
}
