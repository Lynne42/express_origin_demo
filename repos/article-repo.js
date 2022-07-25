

const { Article } = require('../models/article-model');


/**
 * Get all articles.
 * 
 * @returns 
 */
function getAll() {
    Article.all((err, articles) => {
        if(err) {
            return new Error('get articles error')
        }
        return articles
    })
}


/**
 * get  article
 */
function getArticle(id) {
    Article.find(id, (err, article) => {
        if(err) {
            return new Error('get article error')
        }
        return article
    })
}

function deleteArticle(id) {
    Article.delete(id, (err) => {
        if(err) {
            return new Error('delete article error')
        }
        return 1
    })
}

module.exports = {
    getAll,
    getArticle,
    deleteArticle,

}