import React from 'react';
import ResultList from '../components/resultList/ResultList';
import SearchSection from '../components/SearchSection/SearchSection';
import './DashBoard.scss'

const DashBoard = ({ users, searchParam, setSearchParam, incidents }) => {


    return (
        <div className="dashboard">
            <SearchSection users={users} setSearchParam={setSearchParam} searchParam={searchParam}/>
            <ResultList incidents={incidents} users={users}/>
        </div>
    );
};

export default DashBoard;