import axios from 'axios';
import './App.css'
import API_URL from "./apiConfig";

const UpdateDataButton = ({ onUpdate }) => {
    const handleUpdate = () => {
        axios.get(`${API_URL}/api/tariffs`)
            .then(() => {
                console.log('Данные успешно обновлены');
                onUpdate();
            })
            .catch((error) => {
                console.error('Произошла ошибка при обновлении данных:', error);
            });
    };

    return (
        <button className={'button__parse'} onClick={handleUpdate}>Парсить</button>
    );
};

export default UpdateDataButton;