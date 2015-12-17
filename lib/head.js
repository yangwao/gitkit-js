var util = require('util');
var Q = require('q');
var _ = require('lodash');
var path = require('path');

var GitData = require('./data');
var GitRef = require('./ref');
var parse = require('./utils/parse');

function GitHead(repo, name) {
    if (!(this instanceof GitHead)) return new GitHead(repo, sha);
    GitData.call(this, repo, name);

    this.name = name;
}
util.inherits(GitHead, GitData);

// Read the HEAD file and return the resolved Ref
GitHead.prototype.resolve = function() {
    var that = this;

    return this.readFile()
        .then(function(content) {
            var fields = parse.map(content.toString());
            if (!fields.ref) throw new Error('Invalid ref '+that.name);

            return new GitRef(that.repo, fields.ref);
        });
};

module.exports = GitHead;