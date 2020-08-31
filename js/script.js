'use strict';

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

let html;

function generateTitleLinks() {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
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
  clickedElement.classList.add('active'); // CZEMU NIE MA PODPOWIEDZI ??? 

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

/* const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles'; */

const optArticleTagsSelector = '.post-tags .list';

function generateTags() {
  /* find all articles */
  const articlesForTags = document.querySelectorAll(optArticleSelector);
  console.log(articlesForTags);

  /* START LOOP: for every article: */
  for (let article of articlesForTags) {

    /* find tags wrapper */
    const tagsWrapper = document.querySelector(optArticleTagsSelector);

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
      console.log(html);
      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    
    /* END LOOP: for every article: */
  }
}

generateTags();