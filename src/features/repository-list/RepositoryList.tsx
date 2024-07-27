import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_REPOSITORIES } from "../../api/repositoryQueries";
import SearchBar from "../search/SearchBar";
import Repository from "../repository/Repository";
import styles from "./RepositoryList.module.css";

const PAGE_SIZE = 10; // Количество репозиториев на странице

const RepositoryList: React.FC = () => {
    const [repositories, setRepositories] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("stars:>500");
    const [cursor, setCursor] = useState<string | null>(null);

    const [loadRepositories, { loading, data }] = useLazyQuery(GET_REPOSITORIES, {
        variables: { query: searchQuery, first: PAGE_SIZE, after: cursor }
    });

    useEffect(() => {
        loadRepositories();
    }, [loadRepositories]);

    useEffect(() => {
        if (data && data.search && data.search.nodes) {
            setRepositories(data.search.nodes);
        }
    }, [data]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCursor(null);
        loadRepositories({ variables: { query, first: PAGE_SIZE, after: null } });
    };

    const goToNextPage = () => {
        const pageInfo = data?.search?.pageInfo;
        if (pageInfo && pageInfo.hasNextPage) {
            const newCursor = pageInfo.endCursor;
            setCursor(newCursor);
            loadRepositories({ variables: { query: searchQuery, first: PAGE_SIZE, after: newCursor } });
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!data || !repositories.length) return <div>Start searching...</div>;

    return (
        <div className={styles.listWrapper}>
            <SearchBar onSearch={handleSearch} />
            {repositories.map(repo => (
                <Repository key={repo.id} details={repo} />
            ))}
            {data?.search?.pageInfo.hasNextPage && (
                <button onClick={goToNextPage} className={styles.paginator}>
                    Load More
                </button>
            )}
        </div>
    );
};

export default RepositoryList;
