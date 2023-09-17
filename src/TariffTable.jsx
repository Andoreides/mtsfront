import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './TafiffList.css';
import API_URL from "./apiConfig";

const TariffsList = () => {
    const [tariffs, setTariffs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' (по возрастанию) по умолчанию
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get(`${API_URL}/api/tariffs`)
            .then((response) => {
                const filteredTariffs = response.data.filter(tariff => tariff.name !== '' && tariff.description !== '' && tariff.price !== '');

                const splitPrice = (priceString) => {
                    const prices = priceString.split('₽');
                    return prices.map(price => price.trim());
                };

                const sortTariffs = (a, b) => {
                    const pricesA = splitPrice(a.price);
                    const pricesB = splitPrice(b.price);
                    const priceA = parseFloat(pricesA[0].replace(/[^\d.]/g, ''));
                    const priceB = parseFloat(pricesB[0].replace(/[^\d.]/g, ''));
                    return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
                };

                const sortedTariffs = filteredTariffs.sort(sortTariffs);

                const searchedTariffs = searchQuery
                    ? sortedTariffs.filter(tariff => {
                        const searchTerm = searchQuery.toLowerCase();
                        const tariffText = `${tariff.name.toLowerCase()} ${tariff.description.toLowerCase()} ${tariff.price.toLowerCase()}`;
                        return tariffText.includes(searchTerm);
                    })
                    : sortedTariffs;

                setTariffs(searchedTariffs);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Произошла ошибка при загрузке тарифов:', error);
                setIsLoading(false);
            });
    }, [sortOrder, searchQuery]);

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleSearch = (value) => {
        setSearchQuery(value);
    };

    return (
        <div className="tariffs-list">
            <div className="tariffs-list__filter">
                <label className="tariffs-list__filter-label">
                    Сортировка цен:
                    <select
                        className="tariffs-list__filter-select"
                        value={sortOrder}
                        onChange={handleSortOrderChange}
                    >
                        <option value="asc">По возрастанию</option>
                        <option value="desc">По убыванию</option>
                    </select>
                </label>
                <input
                    className="tariffs-list__filter-input"
                    type="text"
                    placeholder="Поиск"
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            {isLoading ? (
                <p className="tariffs-list__loading">Загрузка...</p>
            ) : (
                <ul className="tariffs-list__items">
                    {tariffs.map((tariff, index) => (
                        <li key={index} className="tariffs-list__item">
                            <h2 className="tariffs-list__item-title">{tariff.name}</h2>
                            <p className="tariffs-list__item-description">{tariff.description}</p>
                            <p className="tariffs-list__item-price">Цена: {tariff.price}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TariffsList;