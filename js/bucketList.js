if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}



function ready() {
    const dummyData =
    [
        {
            ideaTitle: "Hot Air Balloon Ride",
            ideaDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et sollicitudin ac orci phasellus.",
            imgSrc: "https://images.unsplash.com/photo-1568751302450-3d84e00f2348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YnVja2V0JTIwbGlzdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            imgDesc: "hot air balloon"
        },
        {
            ideaTitle: "Learn to Play Chess",
            ideaDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et sollicitudin ac orci phasellus.",
            imgSrc: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlc3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            imgDesc: "chess board"
        },
        {
            ideaTitle: "Sky Diving",
            ideaDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et sollicitudin ac orci phasellus.",
            imgSrc: "https://images.unsplash.com/photo-1483301563007-8d0161daa1d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2t5JTIwZGl2ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            imgDesc: "sky diving"
        },
        {
            ideaTitle: "Run a Marathon",
            ideaDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et sollicitudin ac orci phasellus.",
            imgSrc: "https://images.unsplash.com/photo-1596727362302-b8d891c42ab8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFyYXRob258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            imgDesc: ""
        },
        {
            ideaTitle: "Ride a Roller Coaster",
            ideaDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et sollicitudin ac orci phasellus.",
            imgSrc: "https://images.unsplash.com/photo-1567609894562-d00168e290f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cm9sbGVyJTIwY29hc3RlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            imgDesc: "marathon"
        },
        {
            ideaTitle: "Visit Machu Picchu",
            ideaDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et sollicitudin ac orci phasellus.",
            imgSrc: "https://images.unsplash.com/photo-1581875403743-a3bf92862c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1hY2h1JTIwcGljaHV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            imgDesc: "machu picchu peru"
        },
        {
            ideaTitle: "Visit Stonehenge",
            ideaDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et sollicitudin ac orci phasellus.",
            imgSrc: "https://images.unsplash.com/photo-1503624277759-70b9549d70f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHN0b25lJTIwaGVuZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            imgDesc: "stonehenge"
        },
        {
            ideaTitle: "Visit the Eiffel Tower",
            ideaDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et sollicitudin ac orci phasellus.",
            imgSrc: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8RWlmZmVsJTIwVG93ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            imgDesc: "eiffel tower"
        },
        {
            ideaTitle: "Visit Maldive Islands",
            ideaDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et sollicitudin ac orci phasellus.",
            imgSrc: "https://images.unsplash.com/photo-1602002418679-43121356bf41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGJ1Y2tldCUyMGxpc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            imgDesc: "maldive islands"
        }
    ]

    dummyData.forEach(idea => {
        addIdeasToContainer(idea);
    });
    
    addListener('remove-bucketList-item', 'click', removeBucketListItem);
    addListener('addToList', 'click', addToBucketList);
}

function removeBucketListItem(event) {
    let buttonClicked = event.target;
    buttonClicked.closest('.bucket-list-card').remove();
    // let itemsInList = document.getElementById('bucket-list-container').children;
}

function addToBucketList(event) {
    let buttonClicked = event.target;
    let cardSelected = buttonClicked.closest('.card');

    let item = {
        itemImg: cardSelected.getElementsByClassName('idea-img')[0].src,
        itemImgDesc: cardSelected.getElementsByClassName('idea-img')[0].alt,
        itemTitle: cardSelected.getElementsByClassName('card-title')[0].innerHTML
    }
    mapAndAppendToBuckedList(item);
}

function mapAndAppendToBuckedList(bucketListItem) {
    const bucketListItemTemplate = document.getElementById('bucket-list-item');
    const bucketListContainer = document.getElementById('bucket-list-container');

    let templateClone = bucketListItemTemplate.content.firstElementChild.cloneNode(true);

    templateClone.getElementsByClassName('remove-bucketList-item')[0].addEventListener('click', removeBucketListItem);

    templateClone.querySelector('.bucketList-img').src = bucketListItem.itemImg;
    templateClone.querySelector('.bucketList-img').alt = bucketListItem.itemImgDesc;
    templateClone.querySelector('.bucketList-title').innerHTML = bucketListItem.itemTitle;

    bucketListContainer.append(templateClone);
}

function addIdeasToContainer(newIdea) {
    const template = document.getElementById('idea-temp');
    const container = document.getElementById('idea-container');

    let item = template.content.cloneNode(true);
    item.querySelector('.card-title').innerHTML = newIdea.ideaTitle;
    item.querySelector('.idea-img').src = newIdea.imgSrc;
    item.querySelector('.idea-img').alt = newIdea.imgDesc;
    item.querySelector('.idea-desc').innerHTML = newIdea.ideaDesc;
    container.append(item);
}

function addListener(className, type, callback) {
    let itemsWithClassName = document.getElementsByClassName(className);
    for (let i = 0; i < itemsWithClassName.length; i++) {
        var button = itemsWithClassName[i];
        button.addEventListener(type, callback);
    }
}

function isValidImage(url) {
    let isValid = false;

    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = () => {
      let status = request.status;
      if (status == 200) 
      {
        isValid = true;
      };
    }

    return isValid;
}