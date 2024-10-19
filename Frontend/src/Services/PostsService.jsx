const URL = "http://localhost:3001/api/";

export const getPosts = async () => {
    const res =  await fetch(URL + 'posts/feed');
    return [await res.json()];
}

export const uploadPost = async (postData) => {
    const res = await fetch(URL + 'posts/upload', {
        method: 'POST',
        headers: {
            "Content-Type":"multipart/form-data"
        },
        body: JSON.stringify(postData)
    });
    return await res.json();
}

export const commentPost = async (comment, postID) => {
    const JSONComment = {content: comment};
    const res = await fetch(URL + 'posts/' + postID + '/comment', {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(JSONComment)
    });
    return await res.json();
}

export const likePost = async (postID) => {
    const res = await fetch(URL + 'posts/' + postID + '/like', {
        method: 'POST'
    });
    return await res.json();
}


