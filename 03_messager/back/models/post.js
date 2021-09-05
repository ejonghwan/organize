
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", { //MySQL에는 Posts로 저장됨
        // id는 기본적으로 들어가서 올라감
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: "utf8mb4", //utfmb4넣어주면 이모티콘도 가능
        collate: "utf8mb4_general_ci", //한글저장에 필요한 두가지
    });

    Post.associate = (db) => {
        // 시퀄에서 이런 것들을 만들어줌. post에 연결된 애들이라 아래껄 쓸수있다
        //  post.getUser, < 가져오는건데 이건 include로도 돼서 잘 안씀
        //  post.addUser, < 추가하는거
        //  post.removeUser, < 지우는거
        //  post.setUser < 수정하는거

        db.Post.belongsTo(db.User) //db.User 한개에 속해있다 //belongsTo는 ---- 만들어줌  
        db.Post.hasMany(db.Comment) //post.addComments
        db.Post.hasMany(db.Image) //post.addImages 라는게 생김
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }) //다대다 
        // 1:1 관계 hasone 사용자와 사용자의 정보는 1:1로 엮여있음. 그럴 땐 
        // 유저 : 해즈원(유저인포). 유저인포 : 빌롱스투(유저) 

        db.Post.belongsToMany(db.User, {through: 'Like', as: 'Likers'});  //  post.addLikers, post.removeLikers 라는게 생김

        //리트윗
        db.Post.belongsTo(db.Post, { as: 'Retweet' }); //as로 별칭을 바꿔주면 위에 컬럼이 생길때 PostId가 아니라 RetweetId로 바뀜
        // belongsTo는 컬럼 만들어줌 RetweetId
    };
    return Post;
}