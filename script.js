// ===== Firebase Configuration & Initialization =====
const firebaseConfig = {
  apiKey: "AIzaSyAaVtjJ9MpA72E0yq6yWJH7zJm08YE3YtM",
  authDomain: "website-portfolio-4999d.firebaseapp.com",
  projectId: "website-portfolio-4999d",
  storageBucket: "website-portfolio-4999d.firebasestorage.app",
  messagingSenderId: "138002001938",
  appId: "1:138002001938:web:6dfecd9ea345ba76d7e8cb",
  measurementId: "G-RP1SW3ZEHJ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

let currentUser = null;
auth.onAuthStateChanged(user => {
  currentUser = user;
  updateAuthUI();
});

// Update authentication UI in header.
function updateAuthUI() {
  const authSection = document.getElementById('auth-section');
  if (currentUser) {
    authSection.innerHTML = `
      <span>Welcome, ${currentUser.email}</span>
      <button id="logout-btn">Logout</button>
    `;
    document.getElementById('logout-btn').addEventListener('click', () => {
      auth.signOut();
    });
  } else {
    authSection.innerHTML = `<button id="login-btn">Login</button>`;
    document.getElementById('login-btn').addEventListener('click', () => {
      document.getElementById('login-modal').style.display = 'flex';
    });
  }
}

// Login form submission.
document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => { document.getElementById('login-modal').style.display = 'none'; })
    .catch(err => alert(err.message));
});

// Signup form submission.
document.getElementById('signup-form').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => { document.getElementById('login-modal').style.display = 'none'; })
    .catch(err => alert(err.message));
});

document.getElementById('close-login-modal').addEventListener('click', () => {
  document.getElementById('login-modal').style.display = 'none';
});

// Global slider intervals.
let sliderIntervals = [];
function clearSliderIntervals() {
  sliderIntervals.forEach(id => clearInterval(id));
  sliderIntervals = [];
}

/**
 * loadProjectData()
 * Loads reaction counts for each project.
 */
function loadProjectData() {
  const projectIds = ["project1", "project2"];
  projectIds.forEach(projectId => {
    db.collection("projects").doc(projectId).get()
      .then(doc => {
        const projectCard = document.getElementById(projectId);
        if (projectCard) {
          if (doc.exists) {
            const data = doc.data();
            projectCard.querySelector('.like-count').textContent = data.likes || 0;
            projectCard.querySelector('.dislike-count').textContent = data.dislikes || 0;
          } else {
            db.collection("projects").doc(projectId).set({ likes: 0, dislikes: 0 });
          }
        }
      })
      .catch(err => console.error("Error loading project data:", err));
  });
}

// ===== Global Content Update Function =====
function updateContent(tabName) {
  const content = document.getElementById('content');
  if (tabName === 'home') {
    content.innerHTML = `
      <h1>Hello, I'm Tristan.</h1>
      <h2>Skills:</h2>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
      </ul>
      <div id="container1">
        <p>A little about me: I'm a passionate web developer who loves exploring new technologies, including cybersecurity and ethical hacking.</p>
      </div>
    `;
  } else if (tabName === 'about') {
    content.innerHTML = `
      <h1>About Me</h1>
      <p>My name is Tristan Vanderweert. I'm a full-stack developer and an aspiring fighter pilot. I enjoy problem solving, creative interface design, and exploring cybersecurity.</p>
    `;
  } else if (tabName === 'projects') {
    clearSliderIntervals();
    content.innerHTML = `
      <h1>My Projects</h1>
      <section id="projects-section">
        <!-- Project Card 1 -->
        <div class="project-card" id="project1" data-project-id="project1">
          <div class="project-slider" id="slider-project1">
            <img src="images/screenshot1.png" alt="Project 1 Image 1" class="active">
            <img src="images/screenshot2.png" alt="Project 1 Image 2">
            <img src="images/screenshot3.png" alt="Project 1 Image 3">
          </div>
          <div class="project-info">
            <h3>Project One</h3>
            <p>This project showcases my skills in web development with a modern, clean design.</p>
          </div>
          <div class="project-interactions">
            <button class="like-btn">Like <span class="like-count">0</span></button>
            <button class="dislike-btn">Dislike <span class="dislike-count">0</span></button>
            <button class="share-btn">Share</button>
          </div>
          <div class="project-comments">
            <h4>Comments</h4>
            <div class="comments-area"></div>
            <form onsubmit="submitProjectComment(event, 'project1')">
              <input type="text" name="comment" placeholder="Leave a comment" required>
              <button type="submit">Post</button>
            </form>
          </div>
        </div>
  
        <!-- Project Card 2 -->
        <div class="project-card" id="project2" data-project-id="project2">
          <div class="project-slider" id="slider-project2">
            <img src="https://via.placeholder.com/300x200?text=Project+2+Image+1" alt="Project 2 Image 1" class="active">
            <img src="https://via.placeholder.com/300x200?text=Project+2+Image+2" alt="Project 2 Image 2">
            <img src="https://via.placeholder.com/300x200?text=Project+2+Image+3" alt="Project 2 Image 3">
          </div>
          <div class="project-info">
            <h3>Project Two</h3>
            <p>This project exhibits my front-end expertise and attention to detail in design.</p>
          </div>
          <div class="project-interactions">
            <button class="like-btn">Like <span class="like-count">0</span></button>
            <button class="dislike-btn">Dislike <span class="dislike-count">0</span></button>
            <button class="share-btn">Share</button>
          </div>
          <div class="project-comments">
            <h4>Comments</h4>
            <div class="comments-area"></div>
            <form onsubmit="submitProjectComment(event, 'project2')">
              <input type="text" name="comment" placeholder="Leave a comment" required>
              <button type="submit">Post</button>
            </form>
          </div>
        </div>
      </section>
    `;
    initializeSlider('slider-project1');
    initializeSlider('slider-project2');
    
    document.querySelectorAll('.like-btn').forEach(btn => {
      btn.addEventListener('click', function(){
        const projectCard = this.closest('.project-card');
        const projectId = projectCard.getAttribute('data-project-id');
        updateProjectReaction(projectId, 'like');
      });
    });
    document.querySelectorAll('.dislike-btn').forEach(btn => {
      btn.addEventListener('click', function(){
        const projectCard = this.closest('.project-card');
        const projectId = projectCard.getAttribute('data-project-id');
        updateProjectReaction(projectId, 'dislike');
      });
    });
    document.querySelectorAll('.share-btn').forEach(btn => {
      btn.addEventListener('click', function(){
        if (navigator.share) {
          navigator.share({
            title: document.title,
            text: 'Check out this project!',
            url: window.location.href
          }).then(() => console.log('Thanks for sharing!'))
            .catch(console.error);
        } else {
          navigator.clipboard.writeText(window.location.href)
            .then(() => alert('URL copied to clipboard!'));
        }
      });
    });
    loadProjectData();
    loadComments('project1');
    loadComments('project2');
  } else if (tabName === 'contact') {
    content.innerHTML = `
      <h1>Contact Me</h1>
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
window.updateContent = updateContent;

function updateTitle(tabName) {
  if (tabName === 'home') {
    document.title = "Home - My Website";
  } else if (tabName === 'about') {
    document.title = "About - My Website";
  } else if (tabName === 'projects') {
    document.title = "Projects - My Website";
  } else if (tabName === 'contact') {
    document.title = "Contact - My Website";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-link');
  const defaultTab = document.querySelector('.tab-link.active');
  if (defaultTab) {
    const tabName = defaultTab.getAttribute('data-tab');
    updateContent(tabName);
    updateTitle(tabName);
  }
  tabs.forEach(tab => {
    tab.addEventListener('click', function (event) {
      event.preventDefault();
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      const tabName = this.getAttribute('data-tab');
      updateContent(tabName);
      updateTitle(tabName);
    });
  });
});

// ===== Slideshow Functions =====
function initializeSlider(sliderId) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;
  const images = slider.querySelectorAll('img');
  if (images.length < 2) return;
  let currentIndex = 0;
  const intervalId = setInterval(() => {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
  }, 5000);
  sliderIntervals.push(intervalId);
}

function toggleFullscreen(sliderId) {
  const slider = document.getElementById(sliderId);
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    slider.requestFullscreen().catch(err => console.error(err));
  }
}

// ===== Firebase Comment Functions =====

/**
 * Submit a top-level comment.
 * Users must be logged in and may only comment once per project.
 */
function submitProjectComment(event, projectId) {
  event.preventDefault();
  if (!currentUser) {
    alert("Please login to comment.");
    return;
  }
  const form = event.target;
  const input = form.querySelector('input[name="comment"]');
  const commentText = input.value.trim();
  if (commentText === '') return;
  
  // Check if user already commented on this project (top-level comment).
  db.collection("comments")
    .where("projectId", "==", projectId)
    .where("userId", "==", currentUser.uid)
    .where("parentCommentId", "==", null)
    .get()
    .then(snapshot => {
      if (!snapshot.empty) {
        alert("You have already commented on this project.");
      } else {
        db.collection("comments").add({
          projectId: projectId,
          text: commentText,
          likes: 0,
          dislikes: 0,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          userId: currentUser.uid,
          parentCommentId: null
        })
        .then(() => {
          console.log("Comment added successfully!");
          input.value = '';
          loadComments(projectId);
        })
        .catch(err => console.error("Error adding comment:", err));
      }
    });
}

/**
 * Submit a reply to a comment.
 */
function submitReply(event, projectId, parentCommentId) {
  event.preventDefault();
  if (!currentUser) {
    alert("Please login to reply.");
    return;
  }
  const form = event.target;
  const input = form.querySelector('input[name="reply"]');
  const replyText = input.value.trim();
  if (replyText === '') return;
  
  db.collection("comments").add({
    projectId: projectId,
    text: replyText,
    likes: 0,
    dislikes: 0,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    userId: currentUser.uid,
    parentCommentId: parentCommentId
  })
  .then(() => {
    console.log("Reply added successfully!");
    input.value = '';
    // Reload replies for the parent comment.
    loadReplies(parentCommentId);
  })
  .catch(err => console.error("Error adding reply:", err));
}

/**
 * Load top-level comments (parentCommentId === null) for a project,
 * then load replies for each comment.
 */
function loadComments(projectId) {
  const projectCard = document.getElementById(projectId);
  if (!projectCard) return;
  const commentsArea = projectCard.querySelector('.comments-area');
  if (!commentsArea) return;
  commentsArea.innerHTML = "";
  db.collection("comments")
    .where("projectId", "==", projectId)
    .where("parentCommentId", "==", null)
    .orderBy("createdAt", "desc")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const comment = doc.data();
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment-item');
        commentDiv.setAttribute('data-comment-id', doc.id);
        commentDiv.innerHTML = `
          <p class="comment-text">${comment.text}</p>
          <div class="comment-actions">
            <button class="comment-like-btn">Like <span class="comment-like-count">${comment.likes}</span></button>
            <button class="comment-dislike-btn">Dislike <span class="comment-dislike-count">${comment.dislikes}</span></button>
            <button class="reply-btn">Reply</button>
          </div>
          <div class="replies"></div>
        `;
        // Attach reaction event listeners.
        commentDiv.querySelector('.comment-like-btn').addEventListener('click', function() {
          updateCommentReaction(doc.id, 'like');
        });
        commentDiv.querySelector('.comment-dislike-btn').addEventListener('click', function() {
          updateCommentReaction(doc.id, 'dislike');
        });
        // Attach reply button listener.
        commentDiv.querySelector('.reply-btn').addEventListener('click', function() {
          showReplyForm(doc.id, projectId, commentDiv);
        });
        commentsArea.appendChild(commentDiv);
        // Load replies for this comment.
        loadReplies(doc.id);
      });
    })
    .catch(err => console.error("Error loading comments:", err));
}

/**
 * Load replies (comments where parentCommentId equals the given commentId)
 * and append them to the parent comment's "replies" container.
 */
function loadReplies(parentCommentId) {
  const parentCommentDiv = document.querySelector(`[data-comment-id="${parentCommentId}"]`);
  if (!parentCommentDiv) return;
  const repliesContainer = parentCommentDiv.querySelector('.replies');
  repliesContainer.innerHTML = "";
  db.collection("comments")
    .where("parentCommentId", "==", parentCommentId)
    .orderBy("createdAt", "asc")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const reply = doc.data();
        const replyDiv = document.createElement('div');
        replyDiv.classList.add('comment-item');
        replyDiv.setAttribute('data-comment-id', doc.id);
        replyDiv.innerHTML = `
          <p class="comment-text">${reply.text}</p>
          <div class="comment-actions">
            <button class="comment-like-btn">Like <span class="comment-like-count">${reply.likes}</span></button>
            <button class="comment-dislike-btn">Dislike <span class="comment-dislike-count">${reply.dislikes}</span></button>
          </div>
        `;
        replyDiv.querySelector('.comment-like-btn').addEventListener('click', function() {
          updateCommentReaction(doc.id, 'like');
        });
        replyDiv.querySelector('.comment-dislike-btn').addEventListener('click', function() {
          updateCommentReaction(doc.id, 'dislike');
        });
        repliesContainer.appendChild(replyDiv);
      });
    })
    .catch(err => console.error("Error loading replies:", err));
}

/**
 * Show a reply form below a comment.
 */
function showReplyForm(parentCommentId, projectId, commentDiv) {
  // Avoid adding multiple reply forms.
  if (commentDiv.querySelector('.reply-form')) return;
  const replyForm = document.createElement('form');
  replyForm.classList.add('reply-form');
  replyForm.innerHTML = `
    <input type="text" name="reply" placeholder="Write a reply" required>
    <button type="submit">Reply</button>
  `;
  replyForm.addEventListener('submit', e => {
    submitReply(e, projectId, parentCommentId);
    // Remove the reply form after submission.
    replyForm.remove();
  });
  commentDiv.appendChild(replyForm);
}

/**
 * Update like/dislike for a comment and update the DOM.
 */
function updateCommentReaction(commentId, type) {
  const field = type === 'like' ? 'likes' : 'dislikes';
  db.collection("comments").doc(commentId).update({
    [field]: firebase.firestore.FieldValue.increment(1)
  })
  .then(() => {
    console.log(`Comment ${type} updated for: ${commentId}`);
    const commentElem = document.querySelector(`[data-comment-id="${commentId}"]`);
    if (commentElem) {
      if (type === 'like') {
        const likeCountElem = commentElem.querySelector('.comment-like-count');
        likeCountElem.textContent = parseInt(likeCountElem.textContent) + 1;
      } else {
        const dislikeCountElem = commentElem.querySelector('.comment-dislike-count');
        dislikeCountElem.textContent = parseInt(dislikeCountElem.textContent) + 1;
      }
    }
  })
  .catch(err => console.error("Error updating comment reaction:", err));
}

/**
 * Update project reaction.
 * Each user can only react once per project.
 */
function updateProjectReaction(projectId, type) {
  if (!currentUser) {
    alert("Please login to react.");
    return;
  }
  const reactionDocId = `${projectId}_${currentUser.uid}`;
  db.collection("projectReactions").doc(reactionDocId).get()
    .then(doc => {
      if (doc.exists) {
        alert("You have already reacted to this project.");
      } else {
        db.collection("projectReactions").doc(reactionDocId).set({
          projectId: projectId,
          userId: currentUser.uid,
          reaction: type
        })
        .then(() => {
          const field = (type === "like") ? "likes" : "dislikes";
          return db.collection("projects").doc(projectId).update({
            [field]: firebase.firestore.FieldValue.increment(1)
          });
        })
        .then(() => {
          const projectCard = document.getElementById(projectId);
          if (projectCard) {
            if (type === "like") {
              const likeCountElem = projectCard.querySelector('.like-count');
              likeCountElem.textContent = parseInt(likeCountElem.textContent) + 1;
            } else {
              const dislikeCountElem = projectCard.querySelector('.dislike-count');
              dislikeCountElem.textContent = parseInt(dislikeCountElem.textContent) + 1;
            }
          }
        })
        .catch(err => console.error("Error updating project reaction:", err));
      }
    })
    .catch(err => console.error("Error checking reaction:", err));
}
