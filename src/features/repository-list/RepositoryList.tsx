import {useLazyQuery} from "@apollo/client";
import {useEffect, useState} from "react";
import {GET_REPOSITORIES} from "../../api/repositoryQueries";
import SearchBar from "../search/SearchBar";
import Repository from "../repository/Repository";

const RepositoryList = () => {
    const [repositories, setRepositories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("stars:>500");
    const [loadRepositories, { called, loading, data }] = useLazyQuery(GET_REPOSITORIES, {
        variables: { query: searchQuery }
    });

    useEffect(() => {
        loadRepositories();
    }, [loadRepositories]);

    useEffect(() => {
        if (data && data.search && data.search.nodes) {
            setRepositories(data.search.nodes);
        }
    }, [data]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        loadRepositories();
    };

    if (loading) return <div>Loading...</div>;
    if (!called || !data) return <div>Start searching...</div>;

    return (
        <div>
            <SearchBar onSearch={handleSearch}/>
            {repositories.map(repo => (
                <Repository key={repo.id} details={repo} />
            ))}
        </div>
    );
};

export default RepositoryList;
