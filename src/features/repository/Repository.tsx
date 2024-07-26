// src/features/repository-list/Repository.tsx
import React from 'react';

interface RepositoryProps {
    details: {
        id: string;
        name: string;
        viewerHasStarred: boolean;
        stargazers: {
            totalCount: number;
        };
    };
}

const Repository: React.FC<RepositoryProps> = ({ details }) => (
    <div>
        <h3>{details.name}</h3>
        <p>{details.viewerHasStarred ? 'Starred' : 'Not starred'}</p>
        <p>Stars: {details.stargazers.totalCount}</p>
    </div>
);

export default Repository;
