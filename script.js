document.getElementById('repairForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const statusDiv = document.getElementById('status');
    
    // Собираем данные
    const formData = {
        id: document.getElementById('equipId').value,
        status: document.getElementById('statusSelect').value,
        hours: document.getElementById('hours').value,
        comment: document.getElementById('comment').value,
        timestamp: new Date().toISOString()
    };

    console.log('Данные к отправке:', formData);

    // Заглушка отправки на сервер
    statusDiv.style.display = 'block';
    statusDiv.style.background = '#e8f5e9';
    statusDiv.innerText = 'Отправка...';

    setTimeout(() => {
        statusDiv.style.background = '#c8e6c9';
        statusDiv.innerText = '✅ Данные успешно сохранены (локально)';
        document.getElementById('repairForm').reset();
    }, 1500);
});
