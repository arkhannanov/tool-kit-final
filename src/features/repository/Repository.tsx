import React from 'react';
import styles from './Repository.module.css';

interface RepositoryProps {
    details: {
        name: string;
        viewerHasStarred: boolean;
        stargazers: {
            totalCount: number;
        };
        url: string;
        pushedAt: string;
    }
}

const Repository: React.FC<RepositoryProps> = ({ details }) => (
    <div className={styles.repositoryWrapper}>
        <p>{details.name}</p>
        <p>Stars: {details.stargazers.totalCount}</p>
        <p>Last Commit: {new Date(details.pushedAt).toLocaleDateString()}</p>
        <p><a href={details.url}>Repository on GitHub</a></p>
    </div>
);

export default Repository;
