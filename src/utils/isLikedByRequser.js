export const isLikedByReqUser = (reqUserId, post) => {

    if(!post || !post.liked) return false;

    for(let user of post.liked){
        if(reqUserId === user.id){
            return true;
        }
    }

    return false;
}