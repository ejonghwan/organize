
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", { //MySQL에는 users로 저장됨
        // id는 기본적으로 들어가서 올라감. 아래는 필수
        email: {
            type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
            allowNull: false, // false 가 필수
            unique: true, // 고유한 값
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false, // false 가 필수
        },
        password: {
            type: DataTypes.STRING(100), // 비밀번호는 암호화를 하기 때문에 길이를 길게
            allowNull: false, // false 가 필수
        },
    }, {
        charset: "utf8",
        collate: "utf8_general_ci", //한글저장에 필요한 두가지
    });

    // 관계
    User.associate = (db) => {
        //belongsTo 는 컬럼을 만들어줌
        db.User.hasMany(db.Post); //하나의 User에 여러 Post가 연결되어있다 
        db.User.hasMany(db.Comment)

        //중간 테이블의 이름은 두번째 인자로 정해줌 반대 테이블에서도 똑같이 넣어야함
        // 나중에 as로 좋아요한 사람을 가져올 수 있음. 별칭.
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }) 

        //다대다 관계에서 같은 유저에서 관계를 찾을 땐 먼저 찾을걸 foreignKey에 넣어줌
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId', });
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId', });

    };
    return User;
}