export function initLoginModal() {
  console.log("initLoginModal called");
  const loginBtn = document.getElementById('loginBtn');
  console.log("loginBtn:", loginBtn);
  const modal = document.getElementById('id01');
  const cancelBtn = document.getElementById('cancelBtn');
  const loginForm = document.getElementById('loginForm');
  const unameInput = document.getElementById('uname');
  const pswInput = document.getElementById('psw');
  const rememberCheckbox = document.getElementById('remember');
  // Check both localStorage and sessionStorage for auth info
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  const username = localStorage.getItem('username') || sessionStorage.getItem('username');
  if (token && username) {
   updateLoginUI(username);
  } else {
   updateLoginUI(null);
  }

  if (!modal || !loginBtn || !cancelBtn || !loginForm) return;

  loginBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    const loginInfo = sessionStorage.getItem('loginInfo');
    if (loginInfo) {
      const info = JSON.parse(loginInfo);
      unameInput.value = info.username || '';
      pswInput.value = info.password || '';
      rememberCheckbox.checked = info.remember || false;
    }
  });

  cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Login submitted');
    const username = unameInput.value;
    const password = pswInput.value;
    const remember = rememberCheckbox.checked;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
        const error = await response.json();
        console.log('Login failed error:', error);
        alert(error.message || 'Login failed');
        return;
        }

        const data = await response.json();
        console.log('Login successful:', data);

        if (remember) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('username', data.username);
        } else {
        sessionStorage.setItem('authToken', data.token);
        sessionStorage.setItem('username', data.username);
        }

        modal.style.display = 'none';
        updateLoginUI(data.username);

    } catch (error) {
        alert('Login error, please try again');
        console.log('Inside catch block');
        console.error('Login request failed:', error);
    }
    }); 
}

function updateLoginUI(username) {
  const authContainer = document.getElementById('authContainer');
  if (!authContainer) return;
  if (username) {
    authContainer.innerHTML = `
      <button id="logoutBtn" class="logout-btn">Logout</button>
      <div class="welcome-msg">Welcome, ${username}</div>
    `;
    document.getElementById('logoutBtn').addEventListener('click', () => {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('username');
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        location.reload();
    });
  } else {

    authContainer.innerHTML = `<button id="loginBtn" class="login">Login</button>`;
    document.getElementById('loginBtn').addEventListener('click', () => {
      document.getElementById('id01').style.display = 'block';
    });
  }
}
