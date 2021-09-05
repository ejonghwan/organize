

module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("Image", { //MySQL에는 Images로 저장됨
        // id는 기본적으로 들어가서 올라감
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        charset: "utf8", //utfmb4넣어주면 이모티콘도 가능
        collate: "utf8_general_ci", //한글저장에 필요한 두가지
    });

    Image.associate = (db) => {
        db.Image.belongsTo(db.Post)
    };
    return Image;
}