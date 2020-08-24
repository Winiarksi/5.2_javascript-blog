'use strict';

function titleClickHandler(event) {
  console.log('Link was clicked!');
  console.log(event);
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {

    if (activeLink.classList.contains('active')) {
      console.log("removing the active class in class title class");
      activeLink.classList.remove('active');
    }

  }


  /* add class 'active' to the clicked link */

  /* remove class 'active' from all articles */
  
  const activeArticles = document.querySelectorAll('.posts article.active')
  for (let activeArticle of activeArticles) {
    if(activeArticle.classList.contains('active')){
      console.log("removing the active class  in class post class");
      activeArticle.classList.remove('active');
    }
  }
  /* get 'href' attribute from the clicked link */

  /* find the correct article using the selector (value of 'href' attribute) */

  /* add class 'active' to the correct article */
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}