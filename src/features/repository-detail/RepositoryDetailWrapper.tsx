import React from 'react';
import { useParams } from 'react-router-dom';
import RepositoryDetail from './RepositoryDetail'; // Путь может быть другим, в зависимости от структуры вашего проекта

interface RouteParams {
    owner: string;
    name: string;
}

const RepositoryDetailWrapper: React.FC = () => {
    const { owner, name } = useParams<RouteParams>();

    console.log(owner, name)
    // Проверяем, что параметры существуют
    if (!owner || !name) {
        return <p>Error: Missing owner or name parameter.</p>;
    }

    return <RepositoryDetail owner={owner} name={name} />;
};

export default RepositoryDetailWrapper;
