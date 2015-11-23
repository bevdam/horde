

/* ------------------------------------------------------------------------ */
/*
        horde.task.open
*/
/* ------------------------------------------------------------------------ */


/* ------------------------------------------------------------------------ */
/*
        dependencies
*/
/* ------------------------------------------------------------------------ */


var util = require("./../util/util.js");


/* ------------------------------------------------------------------------ */
/*
        module
*/
/* ------------------------------------------------------------------------ */


module.exports = {


    /* -------------------------------------------------------------------- */
    /*
            functions
    */
    /* -------------------------------------------------------------------- */


    url : function(url, wait){

        util.log.ok("{0} : {1}".format("open.url".cyan, url.grey));

        var open = function(){

            util.execSync("open {0}".format(url));

        };

        if(wait){

            var attempt = function(){

                var request = require("request");

                request(url, function(error, response, body){

                    if(!error && response.statusCode === 200){

                        open();

                    }else{

                        setTimeout(attempt, 500);

                    }

                });

            };

            attempt();

        }else{

            open();

        }

    }

};
