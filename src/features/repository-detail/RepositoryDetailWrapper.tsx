import React from 'react';
import { useParams } from 'react-router-dom';
import RepositoryDetail from './RepositoryDetail';

const RepositoryDetailWrapper: React.FC = () => {
    const { owner, name } = useParams<Record<string, string | undefined>>();

    if (!owner || !name) {
        return <p>Error: Missing owner or name parameter.</p>;
    }

    return <RepositoryDetail owner={owner} name={name} />;
};

export default RepositoryDetailWrapper;
