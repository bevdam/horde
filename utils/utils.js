

/* ------------------------------------------------------------------------ */
/*
        utils
*/
/* ------------------------------------------------------------------------ */


/* -------------------------------------------------------------------- */
/*
        prototypes
*/
/* -------------------------------------------------------------------- */


String.prototype.format = function(){

    var args = arguments;

    this.unkeyed_index = 0;

    return this.replace(/\{(\w*)\}/g, function(match, key){

        if(key === ""){

            key = this.unkeyed_index;
            this.unkeyed_index++;

        }

        if(key === String(+key)){

            return args[key] !== "undefined" ? args[key] : match;

        }else{

            args.forEach(function(arg){
                if(typeof arg === "object" && typeof arg[key] !== "undefined"){
                    return arg[key];
                }
            });

            return match;

        }

    }.bind(this));

};


/* ------------------------------------------------------------------------ */
/*
        module
*/
/* ------------------------------------------------------------------------ */


module.exports = {

    formatDate : function(time, format){

        var dateFormat = require("dateformat");

        return dateFormat(time, format || "h:MM:ss TT");

    },

    promise : function(){

        return new Promise(function(resolve, reject){

            resolve();

        });

    },

    execSync : function(command){

        require("child_process").execSync(command, { stdio : [0, 1, 2] });

    },

    rsync : function(source, destination, excludes){

        var grunt = require("grunt");
        var path = require("path");
        var fs = require("fs");

        if(!fs.existsSync(source)){
            return;
        }

        grunt.file.mkdir(destination);

        if(
            excludes &&
            excludes instanceof Array &&
            excludes.length > 0
        ){
            excludes = " --exclude=" + excludes.join(" --exclude=");
        }else{
            excludes = "";
        }

        this.execSync("rsync -avz --ignore-times --checksum {2} {0} {1}".format(source, destination, excludes));

    },

    extend : require("node.extend"),

    cache : require("./utils.cache.js"),

    files : require("./utils.files.js"),

    validate : require("./utils.validate.js")

};