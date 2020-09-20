'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-'
  // optAuthorsListSelector = '.authors.list'
  ;

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
  console.log('customSelector: ', customSelector);
  const titleList = document.querySelector(optTitleListSelector);

  console.log('titleList: ', titleList);
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  html = '';
  console.log('articles length: ', articles.length);
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element *//* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    // console.log('linkHTML: ' + linkHTML);

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
  console.log('Link was clicked!, event: ', event);

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
  let articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector1: ', articleSelector);

  if (articleSelector.includes('#article')) {
    console.log('articleSelector.includes(#article): ', articleSelector.includes('#article'));

  } else if (articleSelector.includes('#tag-')) {
    console.log('articleSelector.includes(#tag-): ', articleSelector.includes('#tag-'));
    articleSelector = articleSelector.replace('tag-', '');

  }

  // articleSelector = articleSelector.getElementsByClassName('author-name')[0].innerHTML;
  console.log('articleSelector2: ', articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle: ', targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log('active targetArticle: ', targetArticle);

}



// const optTagsListSelector = '.tags.list'; // czemu pisze się razem ? 
generateTags();

function calculateTagsParams(tags) {

  const params = {
    max: '0',
    min: '999999'
  };

  for (let tag in tags) {
    params.max = tags[tag] > params.max ? tags[tag] : params.max;
    params.min = Math.min(tags[tag], params.min);
  }

  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  const classValue = optCloudClassPrefix + classNumber;
  return classValue;
}


function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

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
      console.log('tag+: ' + tag);

      if (!Object.prototype.hasOwnProperty.call(allTags, tag)) {
        /* add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */

    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  // console.log('tagList: ', tagList);
  // console.log('allTags: ', allTags);
  // console.log('tagList.innerHTML: ', tagList);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams: ', tagsParams);

  let allTagsHTML = '';

  for (let tag in allTags) {
    // const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>';
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';

    // console.log('tagLinkHTML: ', tagLinkHTML);
    allTagsHTML += tagLinkHTML;
    // allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '(' + allTags[tag] + ')' + '</a></li>';
  }

  tagList.innerHTML = allTagsHTML;
}


/**
 * Dodajemy akcja po kliknieciu w tag
 */
function tagClickHandler(event) {
  /* prevent default action for this event */

  event.preventDefault();

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
    console.log('active lik: ', hrefTagLink);
    //add class active */
    hrefTagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags() {
  /* find all links to tags */

  // const links = document.querySelectorAll('.post-tags .list.tags a'); //?????
  const links = document.querySelectorAll('.post-tags .list a, .list.tags a');
  console.log('links: ', links);

  for (let link of links) {

    /* add tagClickHandler as event listener for that link */

    link.addEventListener('click', tagClickHandler);

  }
}

addClickListenersToTags();

const optArticlePostSelector = '.post-author';
generateAuthors();
//__________________________________________________generateAuthors______________________________________________________


function calculateAuthorsParams(authors) {

  const params = {
    max: '0',
    min: '999999'
  };

  for (let author in authors) {
    params.max = authors[author] > params.max ? authors[author] : params.max;
    params.min = Math.min(authors[author], params.min);
  }

  return params;
}

function calculateAuthorClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  const classValue = 'author-size-' + classNumber;
  return classValue;
}

function generateAuthors() {
  let allAuthors = {};
  /* find all articles */
  const articlesForAuthors = document.querySelectorAll(optArticleSelector);
  console.log('articlesForAuthors: ', articlesForAuthors);

  let authorsWrapper = '';
  let articleAuthor = '';
  let html = '';
  for (let author of articlesForAuthors) {

    /* find authors wrapper */
    authorsWrapper = author.querySelector(optArticlePostSelector);
    console.log('authorsWrapper: ', authorsWrapper);

    /* get authors from data-author attribute */
    articleAuthor = author.getAttribute('data-author');
    console.log('articleAuthor: ', articleAuthor);

    if (!Object.prototype.hasOwnProperty.call(allAuthors, articleAuthor)) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }



    /* [NEW] find list of tags in right column */
    const authorList = document.querySelector('.authors');

    /* make html variable with empty string */

    const authorsParams = calculateAuthorsParams(allAuthors);
    console.log('articleAuthor: ', articleAuthor, author);
    console.log('authorsParams: ', authorsParams);

    /* generate HTML of the link */
    // const linkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';
    const linkHTML = '<li><a class= "' + calculateAuthorClass(allAuthors[articleAuthor], authorsParams) + '" href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';
    html += linkHTML;
    console.log('html: ', html);

    /* insert HTML of all the links into the tags wrapper */
    authorList.innerHTML = html;
    console.log('authorsWrapper innerHTML: ', authorsWrapper);
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
  /* find all Lks to authors */
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


