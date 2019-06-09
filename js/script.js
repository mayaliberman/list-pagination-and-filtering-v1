/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//two global variables one for locating the class
//  student-item, the second will be used to show the number of students per page
const listItems = document.getElementsByClassName('student-item');
const numOfItems = 10;

//this function will create the 10 students per page when activated with the listItems as the first parameter.
function showPage(list, page) {
  let startIdx = page * numOfItems - numOfItems;
  let endIdx = page * numOfItems;
  for (let i = 0; i < list.length; i++) {
    //if the list node list is greater than the
    // start index number and less than the index ending number the correct list will be showed
    if (i >= startIdx && i < endIdx) {
      list[i].style.display = 'block';
    } else {
      list[i].style.display = 'none';
    }
  }
}

//this function will append the links per page adding a new created classes and adding them like pagination, ul, li, and a
const appendPageLinks = list => {
  let pages = Math.ceil(list.length / numOfItems);
  const newDiv = document.createElement('div');
  newDiv.className = 'pagination';
  document.getElementsByClassName('page')[0].appendChild(newDiv);
  const ulPage = document.createElement('ul');
  document.getElementsByClassName('pagination')[0].appendChild(ulPage);
  for (let i = 0; i < pages; i++) {
    ulPage
      .appendChild(document.createElement('li'))
      .appendChild(document.createElement('a')).textContent = i + 1;
  }
  //activate the first page with the first 10 names.
  showPage(list, 1);
  //the link assignment of 'a'
  let pageLinks = document.querySelectorAll('a');
  //assigning the class to active
  pageLinks[0].className = 'active';
  // looping on all the page links with the add event. Re-assign the class name to an empty string
  for (let i = 0; i < pages; i++) {
    pageLinks[i].addEventListener('click', e => {
      //thanks to my friend @Juan L who helped me with this
      //  https://treehouse-fsjs-102.slack.com/archives/CBPMRMA82/p1560006620027500?thread_ts=1559984748.024500&cid=CBPMRMA82
      for (let j = 0; j < pageLinks.length; j++) {
        pageLinks[j].className = '';
      }
      //activation all the pages within the loop.
      showPage(list, i + 1);
      //event target reassign to an active class.
      e.target.className = 'active';
    });
  }
};
//activate the function with the global variable.
appendPageLinks(listItems);

const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
document.getElementsByClassName('page-header')[0].appendChild(searchDiv);
const searchInput = document.createElement('input');
searchInput.placeholder = 'Search for Student...';

const submitButton = document.createElement('button');
submitButton.textContent = 'search';

document.getElementsByClassName('student-search')[0].appendChild(searchInput);
document.getElementsByClassName('student-search')[0].appendChild(submitButton);

const h3 = document.querySelectorAll('h3');

function searchBar(searchInput, listItems) {
  for (let i = 0; i < listItems.length; i++) {
    if (
      searchInput.value.length !== 0 &&
      h3[i].textContent.toLowerCase() === searchInput.value.toLowerCase()
    ) {
      listItems[i].style.display = 'block';
      console.log('full name', listItems[i]);
    }  
    
     if (
      searchInput.value.length !== 0 &&
      h3[i].textContent.toLowerCase()[0] === searchInput.value.toLowerCase()[0]
    ) {
      listItems[i].style.display = 'block';
      console.log('only first letter', listItems[i]);
    } else {
      listItems[i].style.display = 'none';
    }
  }
  searchInput.value = '';
}

submitButton.addEventListener('click', event => {
  event.preventDefault();
  searchBar(searchInput, listItems);
});
