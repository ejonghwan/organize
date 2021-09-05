module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", { //MySQL에는 Comments로 저장됨
        // id는 기본적으로 들어가서 올라감
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: "utf8mb4", //utfmb4넣어주면 이모티콘도 가능
        collate: "utf8mb4_general_ci", //한글저장에 필요한 두가지
    });

    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User)
        db.Comment.belongsTo(db.Post)
    };
    return Comment;
}