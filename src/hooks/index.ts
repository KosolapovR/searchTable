import {useEffect, useState} from "react";
import {API} from "../config";
import {mergePostsAndUsers} from "../utils/utils";
import {Post} from "../interfaces/Post";
import {User} from "../interfaces/User";
import {TableData} from "../interfaces/TableData";

export function useTableData(): Array<TableData>
{
    const [posts, setPosts] = useState<Array<Post>>([]);
    const [users, setUsers] = useState<Array<User>>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(
                `${API}/posts`
            );
            if (response.status === 200)
                setPosts(await response.json());
        })();

        //решил сделать еще один запрос на сервер
        // что бы вывести в таблице имена юзеров
        (async () => {
            const response = await fetch(
                `${API}/users`
            );
            if (response.status === 200)
                setUsers(await response.json());
        })();

    }, []);

    return mergePostsAndUsers(posts, users);
};
