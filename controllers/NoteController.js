var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID
router.use(bodyParser.json());
var mongoose = require('mongoose');

router.get('/', function (req, res) {
    console.log("Request /Notes/")
    db.collection('Notes').find().toArray(function (err, results) {
        console.log("found " + results.length + " results")
        res.json(results);
    })
});


router.get('/categoryFiltered', function (req, res) {
    console.log("Request /Notes/categoryFiltered")
    categories = req.query["categories"].split(";")
    db.collection('Notes').find({
        'category': {
            $in: categories
        }
    }).toArray(function (err, results) {
        console.log("found " + results.length + " results")
        res.json(results);
    })
});
/*
router.get('/filtered', function (req, res) {
    console.log("Request /offres/filtered")
    query={}
    if(Object.keys(req.query).indexOf("type")>-1){
        query["type"] = new RegExp('^' + escapeStringRegexp(req.query["type"]) + '$', 'i');
    }
    if(Object.keys(req.query).indexOf("duration")>-1){
        query["duration"] = new RegExp('^' + escapeStringRegexp(req.query["duration"]) + '$', 'i');
    }
    if(Object.keys(req.query).indexOf("sector")>-1){
        query["sector"] = new RegExp('^' + escapeStringRegexp(req.query["sector"]) + '$', 'i');
    }
    if(Object.keys(req.query).indexOf("start_date")>-1){
        query["start_date"] = { $gte: req.query["start_date"] }
    }
    if(Object.keys(req.query).indexOf("remunMini")>-1){
        query["remuneration"] = { $gte: +req.query["remunMini"] }
    }
    if(Object.keys(req.query).indexOf("location")>-1){
        locations=req.query["location"].split(";")
        locations.splice(-1,1)
        query["location"] = { $in: locations }
    }
    if(Object.keys(req.query).indexOf("company")>-1){
        companies=req.query["company"].split(";")
        companies.splice(-1,1)
        query["company"] = { $in: companies }
    }
    if(Object.keys(req.query).indexOf("publicationDate")>-1){
        correspondance={
            "today":(new Date()).getTime()-24*60*60*1000,
            "week":(new Date()).getTime()-7*24*60*60*1000,
            "month":(new Date()).getTime()-30*24*60*60*1000
        }
        //On cherche les offres dont la date de publication est en ts supérieure
        query["created_date"] = { $gte: ''+correspondance[req.query["publicationDate"]] }
    }
    
    const promise = new Promise(function(resolve, reject) {
        if(Object.keys(req.query).indexOf("companySize")>-1 || Object.keys(req.query).indexOf("isPartner")>-1){
            db.collection('companies').find().toArray(function(err, resultsComp) {
                resolve(resultsComp);
            })
        } else{
            resolve([])
        }
    });

    promise.then(function(resultsComp) {
        companyDico={}
        resultsComp.forEach((company) => {
            companyDico[company["_id"]]=company
        })

        db.collection('offers').find(query).toArray(function(err, results) {
            expandWithMatching(results);
            resultsFiltered=[]
            results.forEach((offre)=>{
                isInFilter=true;
                if(Object.keys(req.query).indexOf("matchingMini")>-1){
                    if (offre.matchingScore<req.query["matchingMini"]){
                        isInFilter=false
                    }
                }
                if(Object.keys(req.query).indexOf("companySize")>-1 || Object.keys(req.query).indexOf("isPartner")>-1){
                    if (Object.keys(companyDico).indexOf(""+offre["id_company"])==-1){
                        isInFilter=false
                    } else{
                        company = companyDico[offre["id_company"]]
                        if(Object.keys(req.query).indexOf("companySize")>-1 && ""+company["taille"]!=""+req.query["companySize"]){
                            isInFilter=false;
                        }

                        if(Object.keys(req.query).indexOf("isPartner")>-1 && !company["isPartner"]){
                            isInFilter=false;
                        }
                    }
                }

                if (isInFilter){
                    resultsFiltered.push(offre)
                }
            });
            res.json(resultsFiltered);
        })
    });
});

router.get('/byCompanyId', function (req, res) {
    console.log("Request /offres/byCompanyId")

    var id = mongoose.Types.ObjectId("5e2700cf1c9d44000011f2ba");

    //query={}
    //query["id_company"] = new RegExp('^' + escapeStringRegexp(id) + '$', 'i');

    db.collection('offers').find({"id_company": id}).toArray(function(err, results) {
        res.json(results);
    })
});*/


router.post('/post', function (req, res) {
    console.log("Request /notes/post");
    db.collection('Notes').insertOne(req.body);
    res.send(req.body);
});

/*
router.post('/update', function (req, res) {
    console.log("Request /offres/update");
    console.log(req.body);
    var idOffer = mongoose.Types.ObjectId(req.body["id"])
    delete req.body.id;
    delete req.body.matchingScore;
    req.body.id_company = mongoose.Types.ObjectId(req.body.id_company)
    db.collection('offers').update({"_id":idOffer}, req.body);
    //On check si quelqu'un attendait une offre de ce type
    notificationModule.checkNotifForAllUsers(req.body)
    res.send(req.body);
});

router.delete('/deleteById/:id', function (req, res) {
    console.log("Request /offres/delete");

    var id = mongoose.Types.ObjectId(req.params.id);

    db.collection('offers').remove({_id : id});
    res.send(req.body);
});

*/
module.exports = router;