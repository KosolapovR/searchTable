import React, {useState, useRef} from "react";
import styled from "styled-components";
import {sortArray, searchArray, deletePost} from "../utils/utils";
import {useTableData} from "../hooks";
import {BODY, ID, TITLE, USERNAME} from "../config/types";
import {TableData} from "../interfaces/TableData";
import {SortIcons} from "../interfaces/SortIcons";
import SortIcon from "../components/SortIcon";
import {API} from "../config";

const Table = styled.table`
  td,
  th {
    padding: 7px;
    &:nth-child(1) {
      text-align: center;
      width: 40px;
    }
    &:nth-child(2) {
      text-align: center;
      width: 8rem;
    }
    &:nth-child(5) {
      width: 2.5em;
    }
    &:nth-child(6) {
      width: 2.5em;
    }
  }
  th {
    &:nth-child(5) input {
      width: 200%;
      padding: 0 4px;
    }
  }
`;

const TableBody = styled.tbody`
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  display: block;
  height: calc(100vh - 100px);
  overflow-x: hidden;
  overflow-y: auto;
  -moz-border-radius-bottomleft: 10px;
  -moz-border-radius-bottomright: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(100, 100, 100, 0.3);
    box-shadow: inset 0 0 6px rgba(100, 100, 100, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 6px rgba(100, 100, 100, 0.2);
    box-shadow: inset 0 0 6px rgba(100, 100, 100, 0.2);
    background-color: #aaa;
  }

  tr {
    display: table;
    width: 100%;
    table-layout: fixed;
    padding-right: 10px;
  }

  tr:nth-child(odd) {
    background: rgba(214, 225, 255, 0.44);
  }
`;

const TableHead = styled.thead`
  background: #7e4bff;
  color: #ffffff;
  font-weight: 600;
  height: 3rem;
  width: 100%;
  display: table;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  -moz-border-radius-topleft: 10px;
  -moz-border-radius-topright: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  table-layout: fixed;
`;

const DelCell = styled.td`
    i{
    cursor: pointer;
      &:hover{
        color: #b5393c;
      }
    }
`;

export default function PostsPage() {
    const initialSortIconState = {
        id: null,
        username: null,
        title: null,
        body: null
    };
    const [sortedData, setSortedData] = useState<Array<TableData>>([]);
    const [sortIcon, setSortIcon] = useState<SortIcons>(initialSortIconState);

    const initialData = useTableData();

    const inputRef = useRef(null);

    const handleDeletePost = async (id: number) => {

        const response = await fetch(
            `${API}/posts/${id}`,
            {method: 'DELETE'}
        );
        if (response.status === 200){
            let newData;
            if(sortedData.length){
                newData = deletePost(sortedData, id);
            }else{
                newData = deletePost(initialData, id);
            }
            setSortedData(newData);
        }
    };

    const handleSort = (e: any) => {
        const column = e.target.parentElement.dataset.sort || e.target.dataset.sort;

        let dir = true;
        switch (column) {
            case ID: {
                setSortIcon({...initialSortIconState, id: !sortIcon.id});
                dir = !sortIcon.id!;
                break;
            }
            case USERNAME: {
                setSortIcon({...initialSortIconState, username: !sortIcon.username});
                dir = !sortIcon.username!;
                break;
            }
            case TITLE: {
                setSortIcon({...initialSortIconState, title: !sortIcon.title});
                dir = !sortIcon.title!;
                break;
            }
            case BODY: {
                setSortIcon({...initialSortIconState, body: !sortIcon.body});
                dir = !sortIcon.body!;
                break;
            }
        }
        if (sortedData.length && typeof dir !== 'object') {
            setSortedData([...sortArray(sortedData, column, dir)]);
        } else {
            setSortedData(sortArray(initialData, column, dir));
        }
    };

    const handleSearchChange = () => {
        let currentInput: any = inputRef.current;
        if (currentInput)
            if (currentInput.value === "") {
                setSortedData([...sortArray(initialData, ID, true)]);
            } else {
                setSortedData([...searchArray(tableRows, currentInput.value)]);
            }
    };

    const tableRows = sortedData.length > 0 ? sortedData : initialData;

    return (
        <>
            {tableRows ? (
                <Table>
                    <TableHead>
                        <tr>
                            <th onClick={handleSort} data-sort={ID}>
                                ID <SortIcon data-sort={ID} status={sortIcon.id}/>
                            </th>
                            <th onClick={handleSort} data-sort={USERNAME}>
                                Author <SortIcon status={sortIcon.username}/>
                            </th>
                            <th onClick={handleSort} data-sort={TITLE}>
                                Title <SortIcon status={sortIcon.title}/>
                            </th>
                            <th onClick={handleSort} data-sort={BODY}>
                                Text <SortIcon status={sortIcon.body}/>
                            </th>
                            <th>
                                <input ref={inputRef} onChange={handleSearchChange}/>
                            </th>
                            <th/>
                        </tr>
                    </TableHead>
                    <TableBody>
                        {tableRows.map(row => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.username}</td>
                                <td>{row.title}</td>
                                <td>{row.body}</td>
                                <td>Edit</td>
                                <DelCell><i className="fas fa-trash" onClick={() => {handleDeletePost(row.id)}}></i></DelCell>
                            </tr>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div>preloader</div>
            )}
        </>
    );
}
