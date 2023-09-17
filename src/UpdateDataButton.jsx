import React from 'react';
import axios from 'axios';

function UpdateDataButton({ onUpdate }) {
    const handleUpdateClick = () => {
        // Отправить POST-запрос на сервер для обновления данных
        axios.post('/api/update-data') // Подставьте реальный URL вашего бэкенд-сервера
            .then(response => {
                console.log('Данные успешно обновлены.');
                // Вызовите колбэк функцию onUpdate после успешного обновления данных
                if (onUpdate) {
                    onUpdate();
                }
            })
            .catch(error => {
                console.error('Ошибка при обновлении данных:', error);
            });
    };

    return (
        <button onClick={handleUpdateClick}>Парсить</button>
    );
}

export default UpdateDataButton;