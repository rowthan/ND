/**
 * Created by rowthan on 2016/4/24 0024.
 */
var Column = require('../models/Column');

exports.getColumn = function (callback) {
    Column.find({},function (err,result) {
        callback(err,result);
    })
};

exports.addColumn = function (columnName,callback) {
    Column.findOne({name:columnName}, function (err,column) {
        if(column){
            callback(err,column);
        }
        else{
            var column_new = Column({
                name: columnName
            });
            column_new.save(function (err, column) {
                callback(err,column);
            })
        }
    })
};