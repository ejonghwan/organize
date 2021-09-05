module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define("Hashtag", { //MySQL에는 Hashtags로 저장됨
        // id는 기본적으로 들어가서 올라감
        content: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    }, {
        charset: "utf8mb4", //utfmb4넣어주면 이모티콘도 가능
        collate: "utf8mb4_general_ci", //한글저장에 필요한 두가지
    });

    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' })//다대다 관계에선 belongsToMany()
    };
    return Hashtag;
}