const STORAGE_KEY = 'repair-local-submissions';
const form = document.getElementById('repairForm');
const statusDiv = document.getElementById('status');

function setStatus(message, kind) {
    const backgrounds = {
        info: '#e3f2fd',
        success: '#c8e6c9',
        error: '#ffcdd2'
    };

    statusDiv.style.display = 'block';
    statusDiv.style.background = backgrounds[kind] || backgrounds.info;
    statusDiv.innerText = message;
}

function loadSubmissions() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return [];
    }

    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
        return [];
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('equipId').value.trim();
    const status = document.getElementById('statusSelect').value;
    const hoursValue = document.getElementById('hours').value;
    const comment = document.getElementById('comment').value.trim();
    const hours = hoursValue === '' ? null : Number(hoursValue);

    if (!id) {
        setStatus('Укажите ID оборудования.', 'error');
        return;
    }

    if (hours !== null && (!Number.isFinite(hours) || hours < 0)) {
        setStatus('Наработка должна быть числом не меньше 0.', 'error');
        return;
    }

    const submission = {
        id,
        status,
        hours,
        comment,
        timestamp: new Date().toISOString()
    };

    setStatus('Сохраняем локально...', 'info');

    try {
        const queue = loadSubmissions();
        queue.push(submission);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));

        form.reset();
        setStatus(`✅ Данные сохранены локально. В очереди: ${queue.length}.`, 'success');
    } catch (error) {
        console.error('Local storage save failed:', error);
        setStatus('Ошибка сохранения. Проверьте память устройства и повторите.', 'error');
    }
});
