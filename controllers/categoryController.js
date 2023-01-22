const Category = require('../models/category');

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: 'Bad Request!'
            })
        }
        res.json({
            category: category
        })
    })

}

// exports.categoryById = (req, res, next, id)  => {
//     Category.findById(id). exec((err, category) => {
//         if (err ||! category) {
//             return res.status(404).json({
//                 error: 'Category Not Found!'
//             })
//         }
//         req.category  =  category;
//         next();
//     })
// }

// exports.showCategory = (req, res) => {
//     res.json({
//         category: req.category
//     });
// }
