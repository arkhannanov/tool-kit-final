import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_REPOSITORIES } from "../../api/repositoryQueries";
import SearchBar from "../search/SearchBar";
import Repository from "../repository/Repository";
import styles from "./RepositoryList.module.css";

const PAGE_SIZE = 10;

const RepositoryList: React.FC = () => {
    const [repositories, setRepositories] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("stars:>500");
    const [cursor, setCursor] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCursors, setPageCursors] = useState<{ [key: number]: string | null }>({ 1: null });

    const [loadRepositories, { loading, data }] = useLazyQuery(GET_REPOSITORIES, {
        fetchPolicy: 'network-only',
        variables: { query: searchQuery, first: PAGE_SIZE, after: cursor }
    });

    useEffect(() => {
        loadRepositories();
    }, [cursor, searchQuery, loadRepositories]);

    useEffect(() => {
        if (data && data.search && data.search.nodes) {
            setRepositories(data.search.nodes);
            // Установка курсора для текущей страницы и следующего курсора
            if (data.search.pageInfo.hasNextPage) {
                const newPageCursors = { ...pageCursors };
                newPageCursors[currentPage + 1] = data.search.pageInfo.endCursor;
                setPageCursors(newPageCursors);
            }
        }
    }, [data]);


    useEffect(() => {
        if (data && data.search && data.search.nodes) {
            setRepositories(data.search.nodes);
        }
    }, [data]);

    const goToPage = (page: number) => {
        console.log(pageCursors)
        const cursorForPage = pageCursors[page];
        console.log(page, cursorForPage, pageCursors)
        setCursor(cursorForPage);
        setCurrentPage(page);
    };

    const handleSearch = (query: string) => {
        setCursor(null);
        setPageCursors({ 1: null }); // Очищаем курсоры и стартуем с первой страницы
        setCurrentPage(1);
        setSearchQuery(query);
    };


    const renderPageNumbers = () => {
        if (!data || !data.search || !data.search.repositoryCount) return null;
        const totalPages = Math.ceil(data.search.repositoryCount / PAGE_SIZE);
        const pages = Array.from({ length: Math.min(10, totalPages) }, (_, i) => i + 1); // Ограничиваем максимум 10 страницами

        return pages.map(page => (
            <button
                key={page}
                onClick={() => goToPage(page)}
                className={currentPage === page ? styles.active : ''}
            >
                {page}
            </button>
        ));
    };

    return (
        <div className={styles.listWrapper}>
            <SearchBar onSearch={handleSearch} />
            {repositories.length > 0 ? (
                repositories.map(repo => {
                    console.log(repo)
                return (
                    <Repository key={repo.id} details={repo} />
                )
                })
            ) : (
                <div>No repositories found.</div>
            )}
            <div className={styles.pagination}>
                {renderPageNumbers()}
            </div>
        </div>
    );
};

export default RepositoryList;
