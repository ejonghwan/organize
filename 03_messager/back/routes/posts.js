

const express = require('express');
const router = express.Router();
const { Post, User, Image, Comment } = require('../models');
const { Op } = require('sequelize') //오퍼레이터



router.get('/', async (req, res, next) => { //posts

    try {
        const where = {} // 초기로딩일땐 10개를 바로 불러오면 되는데, 스크롤했을 땐 조건이 다르기때문에 where를 밖으로 빼줌
        const lastId = parseInt(req.query.lastId, 10); //query string으로 보내서 req.query에 들어있음.
        if(lastId) { //초기 로딩이 아닐 때
            where.id = { [Op.lt]: lastId } //지금 lastId보다 작은애들 불러옴.   조건: 아이디where.id가 라스트아이디lastId 보다 작은Op.lt 
            //21 20 19 18 17 16 15 14 13 12(lastId) 12가 라스트 아이디면 11부터 -> 11 10 9 8 7 6 5 4 3 2 1
        }

        const posts = await Post.findAll({ //lastId limit 방식.
            where: where,
            limit: 10, //10개만 가져와라
            // offset: 100, // 101~ 110번까지 가져와라. 근데 문제가 있음, 중간에 추가됐을 때 
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC']
            ], // DESC 내림차순, ASC 오름차순
            // where: { id: lastId }, //조건 where: {userId: 1} 1번 아이디를 가진 사람의 글을 모두 가져와라 
            include: [{
                model: User,
                attributes: { exclude: ['password'] },
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                        model: User,
                        attributes: ['id', 'nickname']
                    }]
            }, {// 불러오는 데이터에도 좋아요한 뎁스 넣어주기
                model: User, //좋아요 한 유저
                as: 'Likers', // db model에서 만든 as 꼭 넣어주기
                attributes: ['id'],
            },{
                model: Post, //리트윗한 게시물
                as: 'Retweet', //리트윗한 게시물이 post.Retweet으로 담김
                include: [{
                    model: User,
                    attributes: ['id', 'nickname']
                }, {
                    model: Image,
                }]
            },]
        })
        // console.log(posts)
        res.status(200).json(posts)
    } catch (error) {
        console.error(error)
        next(error)
    }
    
    
})


module.exports = router

