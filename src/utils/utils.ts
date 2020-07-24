import {Post} from "../interfaces/Post";
import {User} from "../interfaces/User";
import {TableData} from "../interfaces/TableData";
import {BODY, ID, TITLE, USERNAME} from "../config/types";

export function mergePostsAndUsers(posts: Array<Post>, users: Array<User>): Array<TableData> {
    const mergedArray: Array<TableData> = [];
    posts.forEach(p => {
        let username = users.find(u => u.id === p.userId)?.username;
        if (username)
            mergedArray.push({
                id: p.id,
                username,
                body: p.body,
                title: p.title
            })
    });

    return mergedArray;
}

export function sortArray(data: Array<TableData>, col: String, dir: Boolean): Array<TableData> {
    switch (col) {
        case ID: {
            return data.sort((a, b) => dir ? a.id - b.id : b.id - a.id);
        }
        case USERNAME: {
            const sorted = data.sort((a, b) => {
                if (a.username && b.username) {
                    return a.username.toLowerCase() > b.username.toLowerCase() ?
                        1 :
                        b.username.toLowerCase() > a.username.toLowerCase() ?
                            -1 : 0
                } else {
                    return 0;
                }
            });

            return dir ? sorted : sorted.reverse();
        }
        case TITLE: {
            const sorted = data.sort((a, b) => {
                if (a.title && b.title) {
                    return a.title.toLowerCase() > b.title.toLowerCase() ?
                        1 :
                        b.title.toLowerCase() > a.title.toLowerCase() ?
                            -1 : 0
                } else {
                    return 0;
                }
            });

            return dir ? sorted : sorted.reverse();
        }
        case BODY: {
            const sorted = data.sort((a, b) => {
                if (a.body && b.body) {
                    return a.body.toLowerCase() > b.body.toLowerCase() ?
                        1 :
                        b.body.toLowerCase() > a.body.toLowerCase() ?
                            -1 : 0
                } else {
                    return 0;
                }
            });

            return dir ? sorted : sorted.reverse();
        }
        default:
            return data;
    }
}

export function searchArray(data: Array<TableData>, input: string): Array<TableData> {
    const resultData: Array<TableData> = [];

    const pattern = new RegExp(input, 'g');
    data.forEach((row, i) => {
        for (let [key, value] of Object.entries(row)) {
            if (String(value).search(pattern) !== -1) {
                resultData.push(row);
                break;
            }
        }
    });

    return resultData;
}

export function deletePost(data: Array<TableData>, postId: number): Array<TableData> {
    return data.filter(row => row.id !== postId);
}
