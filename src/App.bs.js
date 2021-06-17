// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import FuseJs from "fuse.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Firestore from "firebase/firestore";

import './App.css';
;

function App$ServiceTile(Props) {
  var item = Props.item;
  return React.createElement("p", {
              key: item.id,
              className: "myLabel"
            }, item.desc);
}

var ServiceTile = {
  make: App$ServiceTile
};

function App(Props) {
  var match = React.useState(function () {
        return [];
      });
  var setAll = match[1];
  var all = match[0];
  var match$1 = React.useState(function () {
        return /* Empty */0;
      });
  var setHits = match$1[1];
  var hits = match$1[0];
  var db = Firestore.getFirestore();
  var onChange = function (e) {
    var q = e.target.value;
    if (q === "") {
      return Curry._1(setHits, (function (param) {
                    return /* Empty */0;
                  }));
    }
    var options = {
      includeScore: true,
      keys: [
        "categories",
        "desc",
        "expert.name"
      ]
    };
    var f = new FuseJs(all, options);
    var h = f.search(q);
    return Curry._1(setHits, (function (param) {
                  return /* Filtered */{
                          _0: Belt_Array.map(h, (function (o) {
                                  return o.item;
                                }))
                        };
                }));
  };
  var searchHits = hits ? hits._0 : all;
  React.useEffect((function () {
          Firestore.getDocs(Firestore.collection(db, "services")).then(function (querySnapshot) {
                if (!querySnapshot.empty) {
                  var results = Belt_Array.map(querySnapshot.docs, (function (d) {
                          var data = d.data({
                                serverTimestamps: "none"
                              });
                          return {
                                  categories: data.categories,
                                  expert: data.expert,
                                  desc: data.desc,
                                  duration: data.duration,
                                  type_: data.type_,
                                  price: data.price,
                                  id: d.id
                                };
                        }));
                  Curry._1(setAll, (function (param) {
                          return results;
                        }));
                }
                return Promise.resolve(undefined);
              });
          
        }), []);
  return React.createElement("div", {
              className: "App"
            }, React.createElement("header", {
                  className: "App-header"
                }, React.createElement("input", {
                      type: "search",
                      onChange: onChange
                    })), React.createElement("section", {
                  className: "App-results"
                }, Belt_Array.map(searchHits, (function (item) {
                        return React.createElement(App$ServiceTile, {
                                    item: item
                                  });
                      }))));
}

var make = App;

export {
  ServiceTile ,
  make ,
  
}
/*  Not a pure module */
