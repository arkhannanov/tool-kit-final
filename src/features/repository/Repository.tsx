import React from 'react';
import styles from './Repository.module.css';
import { Link } from "react-router-dom";

interface RepositoryProps {
    details: {
        defaultBranchRef: {
            name: string;
        }
        id: string;
        name: string;
        owner: {
            login: string;
        };
        stargazers: {
            totalCount: number;
        };
        url: string;
        pushedAt: string;
    }
}

const Repository: React.FC<RepositoryProps> = ({ details }) => {
    return (
        <div className={styles.repositoryWrapper}>
            <Link to={`/repository/${details.owner.login}/${details.name}`}>{details.name}</Link>
            <p>{details.name}</p>
            <p>Stars: {details.stargazers.totalCount}</p>
            <p>Last Commit: {new Date(details.pushedAt).toLocaleDateString()}</p>
            <p><a href={details.url}>Repository on GitHub</a></p>
        </div>
    );
};

export default Repository;
