// API base URL - uses relative paths (proxied through Node.js server at localhost:3000).
// The proxy forwards all /api/* requests to backend at http://13.234.78.55:8080.
// For direct access (without proxy), change to: 'http://13.234.78.55:8080'
// IMPORTANT: Direct access requires CORS to be enabled on the backend.
const API = '';
const TOKEN_KEY = 'permitIQ_token';
const USER_KEY = 'permitIQ_user';
let currentRoute = '';
let currentPage = 0;
let currentQuery = '';

// ====== TOAST ======
function toast(msg, type = 'info') {
    const c = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    const icons = { success: '✓', error: '✗', info: 'ℹ', warning: '⚠' };
    t.innerHTML = `<span>${icons[type] || 'ℹ'}</span> ${msg}`;
    c.appendChild(t);
    setTimeout(() => t.remove(), 5000);
}

// ====== MODAL ======
function confirmModal(title, msg) {
    return new Promise(res => {
        const o = document.getElementById('modal-overlay');
        o.classList.remove('hidden');
        o.innerHTML = `<div class="modal-box">
            <h2>${title}</h2>
            <p>${msg}</p>
            <div class="modal-actions">
                <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
                <button class="btn btn-danger" id="modal-confirm-btn">Delete</button>
            </div>
        </div>`;
        document.getElementById('modal-confirm-btn').onclick = () => { closeModal(); res(true); };
    });
}
function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
}

// ====== AUTH ======
function getToken() { return localStorage.getItem(TOKEN_KEY); }
function getUser() { return JSON.parse(localStorage.getItem(USER_KEY) || 'null'); }
function saveAuth(token, user) { localStorage.setItem(TOKEN_KEY, token); localStorage.setItem(USER_KEY, JSON.stringify(user)); }
function clearAuth() { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); }
function isAuth() { return !!getToken(); }
function isAdmin() { const u = getUser(); return u && u.role === 'ROLE_ADMIN'; }

// ====== API CLIENT ======
async function apiRequest(method, path, body, isFormData = false) {
    const headers = {};
    if (!isFormData) headers['Content-Type'] = 'application/json';
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const opts = { method, headers };
    if (body) opts.body = isFormData ? body : JSON.stringify(body);
    const res = await fetch(`${API}${path}`, opts);
    if (res.status === 401) { clearAuth(); navigate('/login'); throw new Error('Session expired'); }
    if (!res.ok) {
        let msg = 'Request failed';
        try { const d = await res.json(); msg = d.message || d.error || msg; } catch {}
        throw new Error(msg);
    }
    if (res.status === 204) return null;
    return res.json();
}

const api = {
    login: (e, p) => apiRequest('POST', '/api/auth/login', { email: e, password: p }),
    signup: (d) => apiRequest('POST', '/api/auth/signup', d),
    getDocuments: (page = 0, size = 12, q = '') => apiRequest('GET', `/api/documents?page=${page}&size=${size}&q=${encodeURIComponent(q)}`),
    uploadDocument: (file) => { const fd = new FormData(); fd.append('file', file); return apiRequest('POST', '/api/documents/upload', fd, true); },
    updateDocument: (id, d) => apiRequest('PUT', `/api/documents/${id}`, d),
    deleteDocument: (id) => apiRequest('DELETE', `/api/documents/${id}`),
    getAdminStats: () => apiRequest('GET', '/admin/stats'),
};

// ====== ROUTER ======
function navigate(path) {
    history.pushState(null, '', path);
    render();
}
window.addEventListener('popstate', render);

// ====== RENDER ======
function render() {
    const path = window.location.pathname;
    currentRoute = path;
    renderNav();
    const main = document.getElementById('main-content');

    if (!isAuth() && !['/login', '/signup'].includes(path)) { navigate('/login'); return; }
    if (isAuth() && ['/login', '/signup'].includes(path)) { navigate('/dashboard'); return; }

    switch (path) {
        case '/login': renderLogin(main); break;
        case '/signup': renderSignup(main); break;
        case '/dashboard': renderDashboard(main); break;
        case '/upload': renderUpload(main); break;
        case '/profile': renderProfile(main); break;
        case '/expiring': renderExpiring(main); break;
        case '/admin': if (isAdmin()) renderAdmin(main); else navigate('/dashboard'); break;
        default:
            if (path.startsWith('/documents/') && path.endsWith('/edit')) {
                const id = path.split('/')[2];
                renderEditDocument(main, id);
            } else navigate('/dashboard');
    }
}

// ====== NAVBAR ======
function renderNav() {
    const nav = document.getElementById('navbar');
    if (!isAuth()) { nav.classList.add('hidden'); return; }
    nav.classList.remove('hidden');
    const u = getUser();
    nav.innerHTML = `
        <a class="navbar-brand" href="/dashboard" onclick="event.preventDefault(); navigate('/dashboard')">
            <img src="/logo.svg" alt="PermitIQ" class="logo-img" onerror="this.style.display='none'">
            <span class="navbar-brand-text">Permit<span>IQ</span></span>
        </a>
        <div class="navbar-links">
            <a href="/dashboard" onclick="event.preventDefault(); navigate('/dashboard')" class="${currentRoute === '/dashboard' ? 'active' : ''}">
                <span>Dashboard</span>
            </a>
            <a href="/upload" onclick="event.preventDefault(); navigate('/upload')" class="${currentRoute === '/upload' ? 'active' : ''}">
                <span>Upload</span>
            </a>
            <a href="/expiring" onclick="event.preventDefault(); navigate('/expiring')" class="${currentRoute === '/expiring' ? 'active' : ''}">
                <span>Expiring</span>
            </a>
            <a href="/profile" onclick="event.preventDefault(); navigate('/profile')" class="${currentRoute === '/profile' ? 'active' : ''}">
                <span>Profile</span>
            </a>
            ${u && u.role === 'ROLE_ADMIN' ? `<a href="/admin" onclick="event.preventDefault(); navigate('/admin')" class="nav-admin ${currentRoute === '/admin' ? 'active' : ''}"><span>Admin</span></a>` : ''}
            <button class="btn-logout" onclick="logout()">Logout</button>
        </div>
    `;
}

// ====== LOGOUT ======
function logout() {
    clearAuth();
    toast('Logged out successfully', 'success');
    navigate('/login');
}

// ====== LOGIN PAGE ======
function renderLogin(main) {
    main.innerHTML = `
        <div class="auth-page">
            <div class="auth-card">
                <div class="auth-logo">
                    <img src="/logo.svg" alt="PermitIQ" class="logo-img" onerror="this.style.display='none'">
                    <h1>Permit<span>IQ</span></h1>
                    <p>Smart Permit Monitoring System</p>
                </div>
                <div id="login-alert" class="auth-alert"></div>
                <form id="login-form">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-input" id="login-email" placeholder="your@email.com" required autocomplete="email">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-input" id="login-password" placeholder="Enter your password" required autocomplete="current-password">
                    </div>
                    <button type="submit" class="btn btn-primary btn-block btn-lg">Sign In</button>
                </form>
                <div class="auth-footer">
                    Don't have an account? <a href="/signup" onclick="event.preventDefault(); navigate('/signup')">Create one</a>
                </div>
            </div>
        </div>
    `;
    document.getElementById('login-form').onsubmit = async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        btn.disabled = true; btn.textContent = 'Signing in...';
        try {
            const res = await api.login(
                document.getElementById('login-email').value,
                document.getElementById('login-password').value
            );
            saveAuth(res.accessToken, { id: res.userId, name: res.name, email: res.email, role: res.role });
            toast(`Welcome back, ${res.name}!`, 'success');
            navigate('/dashboard');
        } catch (err) {
            const alert = document.getElementById('login-alert');
            alert.textContent = err.message;
            alert.className = 'auth-alert error show';
        } finally { btn.disabled = false; btn.textContent = 'Sign In'; }
    };
}

// ====== SIGNUP PAGE ======
function renderSignup(main) {
    main.innerHTML = `
        <div class="auth-page">
            <div class="auth-card">
                <div class="auth-logo">
                    <img src="/logo.svg" alt="PermitIQ" class="logo-img" onerror="this.style.display='none'">
                    <h1>Permit<span>IQ</span></h1>
                    <p>Create your account</p>
                </div>
                <div id="signup-alert" class="auth-alert"></div>
                <form id="signup-form">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" class="form-input" id="signup-name" placeholder="John Doe" required>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-input" id="signup-email" placeholder="your@email.com" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-input" id="signup-password" placeholder="Min 8 characters" required minlength="8">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Age</label>
                            <input type="number" class="form-input" id="signup-age" placeholder="25" min="13" max="120" required>
                        </div>
                        <div class="form-group">
                            <label>Gender</label>
                            <select class="form-input" id="signup-gender" required>
                                <option value="">Select...</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                                <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Phone (optional)</label>
                            <input type="text" class="form-input" id="signup-phone" placeholder="+1 234 567 890">
                        </div>
                        <div class="form-group">
                            <label>Company (optional)</label>
                            <input type="text" class="form-input" id="signup-company" placeholder="Company Inc.">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block btn-lg">Create Account</button>
                </form>
                <div class="auth-footer">
                    Already have an account? <a href="/login" onclick="event.preventDefault(); navigate('/login')">Sign in</a>
                </div>
            </div>
        </div>
    `;
    document.getElementById('signup-form').onsubmit = async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        btn.disabled = true; btn.textContent = 'Creating account...';
        try {
            await api.signup({
                name: document.getElementById('signup-name').value,
                email: document.getElementById('signup-email').value,
                password: document.getElementById('signup-password').value,
                age: parseInt(document.getElementById('signup-age').value),
                gender: document.getElementById('signup-gender').value,
                phoneNumber: document.getElementById('signup-phone').value || null,
                company: document.getElementById('signup-company').value || null,
            });
            toast('Account created! Please sign in.', 'success');
            navigate('/login');
        } catch (err) {
            const alert = document.getElementById('signup-alert');
            alert.textContent = err.message;
            alert.className = 'auth-alert error show';
        } finally { btn.disabled = false; btn.textContent = 'Create Account'; }
    };
}

// ====== DASHBOARD ======
async function renderDashboard(main) {
    main.innerHTML = `<div class="page"><div class="loading"><div class="spinner"></div></div></div>`;
    try {
        const res = await api.getDocuments(0, 100);
        const docs = res.content || [];
        const total = docs.length;
        const active = docs.filter(d => d.status === 'ACTIVE').length;
        const expiring = docs.filter(d => d.status === 'EXPIRING_SOON').length;
        const expired = docs.filter(d => d.status === 'EXPIRED' || d.expired).length;

        main.innerHTML = `
            <div class="page">
                <h1 class="page-title">Dashboard</h1>
                <p class="page-subtitle">Monitor all your permits and certificates</p>
                <div class="stats-grid">
                    <div class="stat-card stat-total">
                        <span class="stat-icon">📄</span>
                        <div class="stat-value">${total}</div>
                        <div class="stat-label">Total Documents</div>
                    </div>
                    <div class="stat-card stat-active">
                        <span class="stat-icon">✅</span>
                        <div class="stat-value">${active}</div>
                        <div class="stat-label">Active</div>
                    </div>
                    <div class="stat-card stat-expiring">
                        <span class="stat-icon">⚠️</span>
                        <div class="stat-value">${expiring}</div>
                        <div class="stat-label">Expiring Soon</div>
                    </div>
                    <div class="stat-card stat-expired">
                        <span class="stat-icon">❌</span>
                        <div class="stat-value">${expired}</div>
                        <div class="stat-label">Expired</div>
                    </div>
                </div>
                <div class="dashboard-header">
                    <h2 style="font-family:var(--font-heading);font-size:22px;font-weight:700;">Your Documents</h2>
                    <div class="search-bar">
                        <input type="text" id="search-input" placeholder="Search documents..." value="${currentQuery}">
                        <button onclick="searchDocs()">Search</button>
                    </div>
                </div>
                <div id="doc-grid" class="doc-grid">
                    ${renderDocGrid(docs)}
                </div>
                <div class="text-center mt-24">
                    <button class="btn btn-primary btn-lg" onclick="navigate('/upload')">+ Upload New Document</button>
                </div>
            </div>
        `;

        document.getElementById('search-input').addEventListener('keyup', (e) => { if (e.key === 'Enter') searchDocs(); });
        startCountdowns();
    } catch (err) {
        main.innerHTML = `<div class="page"><div class="empty-state"><div class="empty-icon">⚠️</div><h3>Error loading dashboard</h3><p>${err.message}</p><button class="btn btn-primary" onclick="render()">Retry</button></div></div>`;
    }
}

function renderDocGrid(docs) {
    if (!docs || docs.length === 0) {
        return `<div class="empty-state">
            <div class="empty-icon">📂</div>
            <h3>No documents yet</h3>
            <p>Upload your first permit or certificate to get started.</p>
            <button class="btn btn-primary" onclick="navigate('/upload')">Upload Now</button>
        </div>`;
    }
    return docs.map(d => {
        const statusClass = d.expired ? 'expired' : d.status === 'EXPIRING_SOON' ? 'expiring' : 'active';
        const cardClass = d.expired ? 'card-expired' : d.status === 'EXPIRING_SOON' ? 'card-expiring' : 'card-active';
        const badgeClass = d.expired ? 'badge-expired' : d.status === 'EXPIRING_SOON' ? 'badge-expiring' : 'badge-active';
        const badgeText = d.expired ? 'Expired' : d.status === 'EXPIRING_SOON' ? 'Expiring Soon' : 'Active';
        const countClass = d.expired ? 'expired' : d.status === 'EXPIRING_SOON' ? 'warning' : '';
        return `<div class="doc-card ${cardClass}">
            <div class="doc-card-header">
                <h3>${esc(d.documentName)}</h3>
                <span class="badge ${badgeClass}">${badgeText}</span>
            </div>
            <div class="doc-card-body">
                ${d.documentType ? `<div class="doc-info-row"><span class="label">Type</span><span class="badge badge-type">${esc(d.documentType)}</span></div>` : ''}
                ${d.permitNumber ? `<div class="doc-info-row"><span class="label">Permit #</span><span class="value">${esc(d.permitNumber)}</span></div>` : ''}
                ${d.authorityName ? `<div class="doc-info-row"><span class="label">Authority</span><span class="value">${esc(d.authorityName)}</span></div>` : ''}
                <div class="doc-info-row">
                    <span class="label">Expires</span>
                    <span class="value">${d.expiryDate || 'N/A'}</span>
                </div>
                <div class="doc-countdown ${countClass}" data-expiry="${d.expiryDate || ''}" data-id="${d.id}">
                    ${d.expired ? 'EXPIRED' : d.remainingDays !== undefined ? `${d.remainingDays}d ${d.remainingHours}h ${d.remainingMinutes}m` : 'N/A'}
                </div>
            </div>
            <div class="doc-card-actions">
                <button class="btn btn-outline btn-sm" onclick="navigate('/documents/${d.id}/edit')">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteDoc(${d.id})">Delete</button>
            </div>
        </div>`;
    }).join('');
}

async function searchDocs() {
    const q = document.getElementById('search-input').value;
    currentQuery = q;
    currentPage = 0;
    try {
        const res = await api.getDocuments(0, 100, q);
        document.getElementById('doc-grid').innerHTML = renderDocGrid(res.content || []);
        startCountdowns();
    } catch (err) { toast(err.message, 'error'); }
}

async function deleteDoc(id) {
    const ok = await confirmModal('Delete Document', 'Are you sure you want to delete this document? This action cannot be undone.');
    if (!ok) return;
    try {
        await api.deleteDocument(id);
        toast('Document deleted', 'success');
        render();
    } catch (err) { toast(err.message, 'error'); }
}

// ====== COUNTDOWN ======
function startCountdowns() {
    setInterval(() => {
        document.querySelectorAll('.doc-countdown[data-expiry]').forEach(el => {
            const expiry = el.dataset.expiry;
            if (!expiry) return;
            const target = new Date(expiry + 'T23:59:59');
            const diff = target - Date.now();
            if (diff <= 0) { el.textContent = 'EXPIRED'; el.className = 'doc-countdown expired'; return; }
            const days = Math.floor(diff / 86400000);
            const hours = Math.floor((diff % 86400000) / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            el.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            if (days < 30) el.classList.add('warning'); else el.classList.remove('warning');
        });
    }, 1000);
}

// ====== UPLOAD PAGE ======
function renderUpload(main) {
    main.innerHTML = `
        <div class="page">
            <h1 class="page-title">Upload Document</h1>
            <p class="page-subtitle">Upload a permit, certificate, or license document</p>
            <div class="upload-area" id="upload-area">
                <span class="upload-icon">📄</span>
                <h3>Drop your file here</h3>
                <p>or click to browse</p>
                <p class="upload-hint">Supports PDF, JPG, PNG (max 10MB)</p>
                <input type="file" id="file-input" accept=".pdf,.jpg,.jpeg,.png">
            </div>
            <div class="upload-preview" id="upload-preview">
                <span style="font-size:32px;">📎</span>
                <div class="file-info">
                    <div class="file-name" id="file-name"></div>
                    <div class="file-size" id="file-size"></div>
                </div>
                <button class="btn btn-primary" id="upload-btn">Upload</button>
            </div>
            <div style="margin-top:24px;" id="upload-progress" class="hidden text-center">
                <div class="spinner" style="margin:0 auto 12px;"></div>
                <p>Processing your document with AI...</p>
            </div>
        </div>
    `;

    const area = document.getElementById('upload-area');
    const input = document.getElementById('file-input');
    const preview = document.getElementById('upload-preview');
    const fname = document.getElementById('file-name');
    const fsize = document.getElementById('file-size');
    const uploadBtn = document.getElementById('upload-btn');
    let selectedFile = null;

    area.onclick = () => input.click();

    area.ondragover = (e) => { e.preventDefault(); area.classList.add('dragover'); };
    area.ondragleave = () => area.classList.remove('dragover');
    area.ondrop = (e) => { e.preventDefault(); area.classList.remove('dragover'); handleFile(e.dataTransfer.files[0]); };

    input.onchange = () => { if (input.files[0]) handleFile(input.files[0]); };

    function handleFile(file) {
        const allowed = ['application/pdf', 'image/jpeg', 'image/png'];
        const ext = file.name.split('.').pop().toLowerCase();
        if (!['pdf', 'jpg', 'jpeg', 'png'].includes(ext)) { toast('Only PDF, JPG, PNG allowed', 'error'); return; }
        if (file.size > 10 * 1024 * 1024) { toast('File exceeds 10MB limit', 'error'); return; }
        selectedFile = file;
        fname.textContent = file.name;
        fsize.textContent = (file.size / 1024 / 1024).toFixed(2) + ' MB';
        preview.classList.add('show');
    }

    uploadBtn.onclick = async () => {
        if (!selectedFile) { toast('Please select a file', 'warning'); return; }
        document.getElementById('upload-progress').classList.remove('hidden');
        uploadBtn.disabled = true;
        try {
            await api.uploadDocument(selectedFile);
            toast('Document uploaded and processed successfully!', 'success');
            navigate('/dashboard');
        } catch (err) {
            toast(err.message, 'error');
            document.getElementById('upload-progress').classList.add('hidden');
            uploadBtn.disabled = false;
        }
    };
}

// ====== EDIT DOCUMENT ======
async function renderEditDocument(main, id) {
    main.innerHTML = `<div class="page"><div class="loading"><div class="spinner"></div></div></div>`;
    try {
        const res = await api.getDocuments(0, 1000);
        const doc = (res.content || []).find(d => d.id == id);
        if (!doc) { main.innerHTML = `<div class="page"><div class="empty-state"><h3>Document not found</h3></div></div>`; return; }

        main.innerHTML = `
            <div class="page" style="max-width:640px;">
                <h1 class="page-title">Edit Document</h1>
                <p class="page-subtitle">Update details for "${esc(doc.documentName)}"</p>
                <div style="background:#fff;border-radius:var(--radius-lg);border:1px solid var(--border);padding:32px;">
                    <form id="edit-form">
                        <div class="form-group">
                            <label>Document Name</label>
                            <input type="text" class="form-input" id="edit-name" value="${esc(doc.documentName || '')}" required>
                        </div>
                        <div class="form-group">
                            <label>Document Type</label>
                            <input type="text" class="form-input" id="edit-type" value="${esc(doc.documentType || '')}" placeholder="e.g. Insurance, PUC, License">
                        </div>
                        <div class="form-group">
                            <label>Permit Number</label>
                            <input type="text" class="form-input" id="edit-permit" value="${esc(doc.permitNumber || '')}">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Issue Date</label>
                                <input type="date" class="form-input" id="edit-issue" value="${doc.issueDate || ''}">
                            </div>
                            <div class="form-group">
                                <label>Expiry Date</label>
                                <input type="date" class="form-input" id="edit-expiry" value="${doc.expiryDate || ''}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Authority Name</label>
                            <input type="text" class="form-input" id="edit-authority" value="${esc(doc.authorityName || '')}">
                        </div>
                        <div style="display:flex;gap:12px;margin-top:24px;">
                            <button type="submit" class="btn btn-primary">Save Changes</button>
                            <button type="button" class="btn btn-outline" onclick="navigate('/dashboard')">Cancel</button>
                            <button type="button" class="btn btn-danger" style="margin-left:auto;" onclick="deleteDoc(${doc.id})">Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('edit-form').onsubmit = async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            btn.disabled = true; btn.textContent = 'Saving...';
            try {
                await api.updateDocument(id, {
                    documentName: document.getElementById('edit-name').value,
                    documentType: document.getElementById('edit-type').value,
                    permitNumber: document.getElementById('edit-permit').value,
                    issueDate: document.getElementById('edit-issue').value || null,
                    expiryDate: document.getElementById('edit-expiry').value || null,
                    authorityName: document.getElementById('edit-authority').value,
                });
                toast('Document updated!', 'success');
                navigate('/dashboard');
            } catch (err) { toast(err.message, 'error'); }
            finally { btn.disabled = false; btn.textContent = 'Save Changes'; }
        };
    } catch (err) {
        main.innerHTML = `<div class="page"><div class="empty-state"><h3>Error: ${err.message}</h3></div></div>`;
    }
}

// ====== PROFILE PAGE ======
function renderProfile(main) {
    const u = getUser();
    main.innerHTML = `
        <div class="page" style="max-width:720px;">
            <h1 class="page-title">My Profile</h1>
            <p class="page-subtitle">Manage your account information</p>
            <div class="profile-card">
                <div class="profile-header">
                    <div class="profile-avatar">${(u.name || 'U').charAt(0).toUpperCase()}</div>
                    <div>
                        <h2>${esc(u.name)}</h2>
                        <p>${esc(u.email)}</p>
                    </div>
                </div>
                <div class="profile-body">
                    <div class="profile-info-grid">
                        <div class="profile-info-item"><div class="pil-label">Name</div><div class="pil-value">${esc(u.name)}</div></div>
                        <div class="profile-info-item"><div class="pil-label">Email</div><div class="pil-value">${esc(u.email)}</div></div>
                        <div class="profile-info-item"><div class="pil-label">Role</div><div class="pil-value">${u.role === 'ROLE_ADMIN' ? 'Administrator' : 'User'}</div></div>
                    </div>
                    <div class="mt-24" style="border-top:1px solid var(--border);padding-top:24px;">
                        <form id="profile-edit-form" style="display:grid;gap:16px;max-width:480px;">
                            <div class="form-group">
                                <label>Full Name</label>
                                <input type="text" class="form-input" id="prof-name" value="${esc(u.name)}" required>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Phone</label>
                                    <input type="text" class="form-input" id="prof-phone" placeholder="Optional">
                                </div>
                                <div class="form-group">
                                    <label>Company</label>
                                    <input type="text" class="form-input" id="prof-company" placeholder="Optional">
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Age</label>
                                <input type="number" class="form-input" id="prof-age" placeholder="Optional" min="13" max="120">
                            </div>
                            <button type="submit" class="btn btn-primary" style="width:fit-content;">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('profile-edit-form').onsubmit = async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        btn.disabled = true; btn.textContent = 'Saving...';
        try {
            const token = getToken();
            const body = new URLSearchParams();
            body.append('name', document.getElementById('prof-name').value);
            const phone = document.getElementById('prof-phone').value;
            if (phone) body.append('phoneNumber', phone);
            const company = document.getElementById('prof-company').value;
            if (company) body.append('company', company);
            const age = document.getElementById('prof-age').value;
            if (age) body.append('age', age);

            await fetch(API + '/profile/edit', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: body,
                redirect: 'manual',
            });
            const cur = getUser();
            saveAuth(getToken(), { ...cur, name: document.getElementById('prof-name').value });
            toast('Profile updated!', 'success');
            render();
        } catch (err) { toast(err.message, 'error'); }
        finally { btn.disabled = false; btn.textContent = 'Save Changes'; }
    };
}

// ====== EXPIRING PAGE ======
async function renderExpiring(main) {
    main.innerHTML = `<div class="page"><div class="loading"><div class="spinner"></div></div></div>`;
    try {
        const res = await api.getDocuments(0, 100);
        const all = res.content || [];
        const expiringDocs = all.filter(d => d.status === 'EXPIRING_SOON' && !d.expired);

        main.innerHTML = `
            <div class="page">
                <h1 class="page-title">⚠️ Expiring Soon</h1>
                <p class="page-subtitle">Documents expiring within the next 30 days</p>
                ${expiringDocs.length === 0 ? `<div class="empty-state"><div class="empty-icon">🎉</div><h3>All clear!</h3><p>No documents are expiring soon.</p></div>`
                : `<div class="expiring-list">${expiringDocs.map(d => `
                    <div class="expiring-item">
                        <div class="ei-info">
                            <h4>${esc(d.documentName)}</h4>
                            <span>${d.documentType ? esc(d.documentType) + ' · ' : ''}Expires: ${d.expiryDate || 'N/A'}${d.permitNumber ? ' · ' + esc(d.permitNumber) : ''}</span>
                        </div>
                        <div class="ei-countdown" style="color:var(--orange-dark);">${d.remainingDays}d ${d.remainingHours}h</div>
                        <button class="btn btn-outline btn-sm" onclick="navigate('/documents/${d.id}/edit')">View</button>
                    </div>
                `).join('')}</div>`}
                <div class="text-center mt-32">
                    <button class="btn btn-outline" onclick="navigate('/dashboard')">Back to Dashboard</button>
                </div>
            </div>
        `;
    } catch (err) {
        main.innerHTML = `<div class="page"><div class="empty-state"><h3>Error: ${err.message}</h3></div></div>`;
    }
}

// ====== ADMIN PAGE ======
async function renderAdmin(main) {
    main.innerHTML = `<div class="page"><div class="loading"><div class="spinner"></div></div></div>`;
    try {
        const stats = await api.getAdminStats();

        main.innerHTML = `
            <div class="page">
                <h1 class="page-title">🔐 Admin Panel</h1>
                <p class="page-subtitle">System overview and monitoring</p>
                <div class="admin-stats">
                    <div class="stat-card stat-total">
                        <span class="stat-icon">👥</span>
                        <div class="stat-value">${stats.users || 'N/A'}</div>
                        <div class="stat-label">Total Users</div>
                    </div>
                    <div class="stat-card stat-total">
                        <span class="stat-icon">📄</span>
                        <div class="stat-value">${stats.documents || 'N/A'}</div>
                        <div class="stat-label">Total Documents</div>
                    </div>
                </div>
                <div class="empty-state" style="background:#fff;border-radius:var(--radius-lg);border:1px solid var(--border);margin-top:24px;">
                    <div class="empty-icon">🔧</div>
                    <h3>User Management</h3>
                    <p>User listing and management is available through the backend's admin interface.<br>REST API endpoints for user management can be added to extend this panel.</p>
                    <div style="display:flex;gap:12px;justify-content:center;margin-top:16px;">
                        <button class="btn btn-outline" onclick="navigate('/dashboard')">Back to Dashboard</button>
                    </div>
                </div>
            </div>
        `;
    } catch (err) {
        main.innerHTML = `<div class="page"><div class="empty-state"><h3>Error: ${err.message}</h3></div></div>`;
    }
}

// ====== FAB ======
function renderFab() {
    const c = document.getElementById('fab-container');
    if (!isAuth()) { c.innerHTML = ''; return; }
    c.innerHTML = `
        <div class="fab-menu" id="fab-menu">
            <div class="fab-item" onclick="navigate('/upload'); toggleFab()">
                <span class="fi-icon">📤</span> Upload Document
            </div>
            <div class="fab-item" onclick="navigate('/expiring'); toggleFab()">
                <span class="fi-icon">⚠️</span> Expiring Soon
            </div>
            <div class="fab-item" onclick="navigate('/dashboard'); toggleFab()">
                <span class="fi-icon">🏠</span> Dashboard
            </div>
            <div class="fab-item" onclick="navigate('/profile'); toggleFab()">
                <span class="fi-icon">👤</span> Profile
            </div>
        </div>
        <button class="fab-main" id="fab-main" onclick="toggleFab()">+</button>
    `;
}

function toggleFab() {
    document.getElementById('fab-main').classList.toggle('open');
    document.getElementById('fab-menu').classList.toggle('open');
}

document.addEventListener('click', (e) => {
    const fab = document.getElementById('fab-container');
    if (fab && !fab.contains(e.target)) {
        const btn = document.getElementById('fab-main');
        const menu = document.getElementById('fab-menu');
        if (btn) btn.classList.remove('open');
        if (menu) menu.classList.remove('open');
    }
});

// ====== UTILITY ======
function esc(s) {
    if (!s) return '';
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
}

// ====== APP INIT ======
document.addEventListener('DOMContentLoaded', () => {
    renderFab();
    render();
});
