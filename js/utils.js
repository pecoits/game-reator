// ===== UTILS =====
export function showGameError(message) {
    var modal = document.getElementById('error-modal');
    var msgEl = document.getElementById('error-modal-message');
    var closeBtn = document.getElementById('btn-close-error');
    if (!modal) { console.error(message); return; }
    msgEl.textContent = message;
    modal.style.display = 'flex';
    closeBtn.onclick = function() { modal.style.display = 'none'; };
}

export function showBootError(message) {
    var modal = document.getElementById('boot-error-modal');
    var msgEl = document.getElementById('boot-error-message');
    if (!modal) { console.error(message); return; }
    msgEl.textContent = message;
    modal.style.display = 'flex';
    var loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) loadingScreen.style.display = 'none';
}

export function showGameConfirm(title, message, onYes) {
    var modal = document.getElementById('confirm-modal');
    var titleEl = document.getElementById('confirm-modal-title');
    var msgEl = document.getElementById('confirm-modal-message');
    var yesBtn = document.getElementById('btn-confirm-yes');
    var noBtn = document.getElementById('btn-confirm-no');
    if (!modal) { if (confirm(message)) onYes(); return; }
    titleEl.textContent = title;
    msgEl.textContent = message;
    modal.style.display = 'flex';
    yesBtn.onclick = function() { modal.style.display = 'none'; onYes(); };
    noBtn.onclick  = function() { modal.style.display = 'none'; };
}
