import React, { useContext } from 'react';

function FuzzySearch() {
  return (
    <form>
      <input type="text" />
    </form>
  );
}

function fuzzySearch() {
  let options = {
    findAllMatches: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "description",
      "studentCohort",
      "targetGroup",
      "title"
    ]
  };
  var fuse = new Fuse(list, options); // "list" is the item array
  var result = fuse.search("");
}


PdateSubmitted: ''

dateSubmmited: "6/10/2019 11:25am"
description: "A user-advertised site, that does really nothing more than rewards users with achievements for accomplishing propagation of the site itself mostly, and dynamically regenerates a statically linked badge page of some sort that even feeds a custom OG meta image based on the current user's page and stats so users can visibly share their stats across facebook or other sites/apps that show preview images for linked URLs?"
studentCohort: "FSWPT - 3"
targetGroup: "Web App"
title: 'A task based site, that rewards achievements for completing social tasks'