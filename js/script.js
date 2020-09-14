'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

let html;

function linksAddEventListener() {
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

function generateTitleLinks(customSelector = '') {
  console.log('generateTitleLinks: ' + customSelector);
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  html = '';

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element *//* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    console.log('linkHTML ' + linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;
    console.log(html);
  }

  titleList.innerHTML = html;

  linksAddEventListener();
}

generateTitleLinks();

function titleClickHandler(event) {
  event.preventDefault();
  console.log('Link was clicked!');

  const clickedElement = this;

  /*[DONE]  remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {

    if (activeLink.classList.contains('active')) {
      console.log('removing the active class in class title class');
      activeLink.classList.remove('active');
    }

  }

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElemtn: ', clickedElement);
  console.log('clickedElemtn2: ' + clickedElement);
  clickedElement.classList.add('active');

  /*[DONE]  remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles) {
    if (activeArticle.classList.contains('active')) {
      console.log('removing the active class  in class post class');
      activeArticle.classList.remove('active');
    }
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector1: ', articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle: ', targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log('targetArticle2: ', targetArticle);

}


const optArticleTagsSelector = '.post-tags .list';
// const optTagsListSelector = '.tags.list'; // czemu pisze się razem ? 
generateTags();

function generateTags() {
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = [];

  /* find all articles */
  const articlesForTags = document.querySelectorAll(optArticleSelector);
  console.log(articlesForTags);

  /* START LOOP: for every article: */
  for (let article of articlesForTags) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log('tagsWrapper: ', tagsWrapper);
    console.log('tagsWrapper2: ' + tagsWrapper);
    /* make html variable with empty string */
    html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('tags: ', articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log('html+: ' + html);

      /* [NEW] check if this link is NOT already in allTags */
      if (allTags.indexOf(linkHTML) == -1) {
        /* [NEW] add generated code to allTags array */
        allTags.push(linkHTML);
      }


      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
 

    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  console.log('tagList: ', tagList );
  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTags.join(' ');
  console.log('tagList.innerHTML: ', tagList );
}


/**
 * Dodajemy akcja po kliknieciu w tag
 */
function tagClickHandler(event) {
  /* prevent default action for this event */
  //Uncaught TypeError: Cannot read property 'preventDefault' of undefined
  // at tagClickHandler (script.js:146)
  event.preventDefault();
  // if(event) event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('clickedElement:', clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = this.getAttribute('href');
  console.log('tag before replace: ' + href);
  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  console.log('tag,: ', tag);

  /* find all tag links with class active */

  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks) {
    //  remove class active 
    tagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let hrefTagLink of hrefTagLinks) {

    //add class active */
    hrefTagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags="' + tag + '"]');
}


function addClickListenersToTags() {
  /* find all links to tags */

  const links = document.querySelectorAll('.post-tags .list a'); //?????

  /* START LOOP: for each link */

  for (let link of links) {

    /* add tagClickHandler as event listener for that link */

    link.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}
addClickListenersToTags();


const optArticlePostSelector = '.post-author';
generateAuthors();
//__________________________________________________generateAuthors______________________________________________________
function generateAuthors() {
  /* find all articles */
  const articlesForAuthors = document.querySelectorAll(optArticleSelector);
  console.log('articlesForAuthors: ' + articlesForAuthors);

  let authorsWrapper = '';
  /* START LOOP: for every article: */
  for (let author of articlesForAuthors) {

    /* find authors wrapper */
    authorsWrapper = author.querySelector(optArticlePostSelector);
    console.log('authorsWrapper: ', authorsWrapper);
    /* make html variable with empty string */
    let html = '';

    /* get authors from data-author attribute */
    const articleAuthor = author.getAttribute('data-author');

    /* generate HTML of the link */
    const linkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';
    html = html + linkHTML;
    console.log('html: ', html);

    /* insert HTML of all the links into the tags wrapper */
    authorsWrapper.innerHTML = html;
    console.log('authorsWrapper innerHTML: ', authorsWrapper);

    /* END LOOP: for every article: */
  }
  console.log('authorsWrapper.length: ', authorsWrapper.classList.length);
  console.log('authorsWrapper.length2: ', authorsWrapper);
}

//__________________________________________________authorClickHandler______________________________________________________
/**
 * Dodajemy akcja po kliknieciu w autora
 */
function authorClickHandler(event) {
  event.preventDefault();


  const clickedElement = this;
  console.log('clickedElement:', clickedElement);

  var htmlString = this.getElementsByClassName('author-name')[0].innerHTML;
  console.log('htmlString: ' + htmlString);


  const href = this.getAttribute('href');
  console.log('tag before replace: ' + href);


  // const author = href.replace('#author-', '');
  const author = this.getElementsByClassName('author-name')[0].innerHTML;

  console.log('author: ', author);

  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]'); // do ogarnięcia 

  for (let activeAuthorLink of activeAuthorLinks) {
    activeAuthorLink.classList.remove('active');
  }

  const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');// do ogarnięcia 

  for (let hrefAuthorLink of hrefAuthorLinks) {

    console.log('hrefAuthorLink: ', hrefAuthorLink);
    hrefAuthorLink.classList.add('active');

  }

  generateTitleLinks('[data-author="' + author + '"]');
}

const optArticleAuthorSelector = '.post .post-author';
function addClickListenersToAuthors() {
  /* find all links to authors */
  console.log('addClickListenersToAuthors: find all links to authors');
  const links = document.querySelectorAll(optArticleAuthorSelector + '.post-author a, .list.authors a');
  /* START LOOP: for each link */

  for (let link of links) {
    console.log('addClickListenersToAuthors, link: ', link);
    /* add authorClickHandler as event listener for that link */

    link.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
  console.log('END addClickListenersToAuthors()');
}
addClickListenersToAuthors();


