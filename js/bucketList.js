const USER_BUCKET_LIST = 'userBucketList';
const USER_IDEAS_LIST = 'userIdeaList'
const IMG_ERR_MSG = document.querySelector('.imgErr').classList;
const deleteModal = document.getElementById('deleteConfirm');
const addUpdateModal = document.getElementById('addUpdateModal');
let addUpdateForm = document.getElementById('addUpdateForm');
let ideaContainer = document.getElementById('idea-container');
let isUserSubmitted = false;


addListener('remove-item', 'click', deleteItem);
addListener('addToList', 'click', gatherAddCardData);
addUpdateForm.addEventListener('submit', validateAndSubmitForm);
deleteModal.addEventListener('show.bs.modal', setDeleteModalDataAttr);
addUpdateModal.addEventListener('show.bs.modal', checkFormType);

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
addStorageItemsOnLoad();


// ------------------- MODAL FUNCTIONALITY ---------------------//
//checkFormType, addItemModal, updateItemModal, change modal content
//based on type of button that clicked
function checkFormType(e) {
    if (!e.relatedTarget) {
        //dropdown adds another event need to return it to not affect the modal values
        return;
    }
    resetFormOnOpen();
    //the add item button and the update button have a data type 
    //when they click to open the modal we grab that info and set it 
    let typeOfForm = e.relatedTarget.dataset.formType;
    addUpdateForm.dataset.formType = typeOfForm;

    if (typeOfForm === 'updateItem') {
        let itemToUpdate = e.relatedTarget.closest('.mainItem');
        addUpdateForm.dataset.cardCalled = itemToUpdate.id;
        updateItemModal(itemToUpdate);
    }
    else {
        addItemModal();
    }
}

function addItemModal() {
    let modalHeader = document.getElementById('addUpdateModalLabel');
    let formButton = document.getElementById('addUpdateButton');
    modalHeader.innerHTML = 'Add a New Idea';
    formButton.innerHTML = 'Add';
}

function updateItemModal(item) {
    let modalHeader = document.getElementById('addUpdateModalLabel');
    let formButton = document.getElementById('addUpdateButton');

    let imageUrlInput = document.getElementById('image-url');
    let titleInput = document.getElementById('idea-title');
    let descriptionInput = document.getElementById('idea-desc');

    modalHeader.innerHTML = 'Update Item'
    formButton.innerHTML = 'Update'
    imageUrlInput.value = item.querySelector('.idea-img').src;
    titleInput.value = item.querySelector('.card-title').innerHTML;
    descriptionInput.value = item.querySelector('.idea-desc').innerHTML;
}

function setDeleteModalDataAttr(e) {
    if (!e.relatedTarget) {
        return;
    }
    //whichever card called this modal to show up we take the id and add it to the custom data-attribute of this modal 
    let deleteConfirmModal = deleteModal;
    let cardThatTriggered = e.relatedTarget.closest('.mainItem').id;
    let typeOfCard = cardThatTriggered.includes('bucketList') ? 'bucket-list-container' : 'idea-container';
    let innerContent = typeOfCard === 'bucket-list-container' ?
        "Are you sure you want to remove this item from your bucket list?" :
        "Are you sure you want to remove this item? <span><h6 class='text-muted'>Removing this idea will no longer make it visible to others.</h6><span>";
    deleteConfirmModal.dataset.cardCalled = cardThatTriggered;
    deleteConfirmModal.dataset.itemType = typeOfCard;

    document.querySelector(".confirm-delete-modal").innerHTML = innerContent;
}

function validateAndSubmitForm(e) {
    e.preventDefault();

    let typeOfRequest = addUpdateForm.dataset.formType;

    let itemInformation = {
        imgSrc: document.getElementById('image-url').value,
        ideaTitle: document.getElementById('idea-title').value,
        ideaDesc: document.getElementById('idea-desc').value,
        imgDesc: document.getElementById('idea-title').value
    }
    isValidImage(itemInformation, typeOfRequest);
}

// ------------------- USER IDEAS/IDEAS ---------------------//
function updateExistingItem(updateInformation) {
    let id = addUpdateForm.dataset.cardCalled;
    let item = ideaContainer.querySelector(`#${id}`);

    item.querySelector('.card-title').innerHTML = updateInformation.ideaTitle;
    item.querySelector('.idea-img').src = updateInformation.imgSrc;
    item.querySelector('.idea-img').alt = updateInformation.imgDesc;
    item.querySelector('.idea-desc').innerHTML = updateInformation.ideaDesc;
    updateInformation.itemId = id;

    document.querySelector("[data-bs-dismiss='modal']").click();
    updateBucketListItem(updateInformation);
    updateLocalStorageItem(USER_IDEAS_LIST, updateInformation);
}

function addIdeasToContainer(idea) {
    let container = document.getElementById('idea-container');
    //only items coming from localstorage will already have an itemid
    let fromLocalStorage = idea.hasOwnProperty('itemId');
    let cardId;
    let template;

    cardId = fromLocalStorage ? idea.itemId : randomId();
    template = fromLocalStorage || isUserSubmitted ? document.getElementById('user-idea-temp') : document.getElementById('idea-temp');

    let item = template.content.cloneNode(true);
    item.querySelector('.bucketList-idea-card').dataset.ideaItem = cardId;
    item.querySelector('.card-title').innerHTML = idea.ideaTitle;
    item.querySelector('.bucketList-idea-card').id = cardId;
    item.querySelector('.idea-img').src = idea.imgSrc;
    item.querySelector('.idea-img').alt = idea.imgDesc;
    item.querySelector('.idea-desc').innerHTML = idea.ideaDesc;


    if (isUserSubmitted || fromLocalStorage) {
        item.querySelector('.updateIdea').addEventListener('click', checkFormType);
        item.querySelector('.deleteIdea').addEventListener('click', setDeleteModalDataAttr);
        idea.itemId = cardId;

        if (!fromLocalStorage) {
            addToLocalStorage(USER_IDEAS_LIST, idea);
        }
    }

    item.querySelector('.addToList').addEventListener('click', gatherAddCardData);
    container.prepend(item);
    if (isUserSubmitted) {
        document.querySelector("[data-bs-dismiss='modal']").click();
    }
    isUserSubmitted = false;
}

// -------------------USER BUCKET LIST ITEMS ---------------------//
function gatherAddCardData(event) {
    let buttonClicked = event.target;
    let cardSelected = buttonClicked.closest('.bucketList-idea-card');
    let allExistingInBucketList = Array.from(document.querySelectorAll('.bucket-list-card'));

    //check if user already has item in their bucket list (grab all the items with the class bucket-list-card)
    if (!allExistingInBucketList.find(item => item.dataset.bucketListItem === cardSelected.dataset.ideaItem) || allExistingInBucketList.length === 0) {
        let item = {
            itemImg: cardSelected.getElementsByClassName('idea-img')[0].src,
            itemImgDesc: cardSelected.getElementsByClassName('idea-img')[0].alt,
            itemTitle: cardSelected.getElementsByClassName('card-title')[0].innerHTML,
            itemId: `bucketList-${cardSelected.dataset.ideaItem}`,
            itemDataAtt: cardSelected.dataset.ideaItem
        }
        addToLocalStorage(USER_BUCKET_LIST, item);
        mapAndAppendToBucketList(item);
    }
    else {
        //show message to user 
        console.log("error");
    }
}

function deleteItem(event) {
    //get the data-attribute from the open modal and delete the card that matches the id   
    let idToDelete = event.target.closest('#deleteConfirm').dataset.cardCalled;
    let containerDeleteFrom = event.target.closest('#deleteConfirm').dataset.itemType;
    let bucketListItem = document.getElementById(containerDeleteFrom).querySelector(`#${idToDelete}`);

    let typeOfStorage = containerDeleteFrom === 'bucket-list-container' ? USER_BUCKET_LIST : USER_IDEAS_LIST;
    removeFromLocalStorage(typeOfStorage, bucketListItem.id);
    bucketListItem.remove();
}

function mapAndAppendToBucketList(bucketListItem) {
    const bucketListItemTemplate = document.getElementById('bucket-list-item');
    const bucketListContainer = document.getElementById('bucket-list-container');

    let templateClone = bucketListItemTemplate.content.cloneNode(true);
    templateClone.querySelector('.bucket-list-card').dataset.bucketListItem = bucketListItem.itemDataAtt;
    templateClone.querySelector('.bucket-list-card').id = bucketListItem.itemId;
    templateClone.querySelector('.bucketList-img').src = bucketListItem.itemImg;
    templateClone.querySelector('.bucketList-img').alt = bucketListItem.itemImgDesc;
    templateClone.querySelector('.bucketList-title').innerHTML = bucketListItem.itemTitle;

    bucketListContainer.append(templateClone);
}

function updateBucketListItem(newData) {
    let item = document.getElementById('bucket-list-container').querySelector(`#bucketList-${newData.itemId}`);
    console.log(item)
    if (item) {
        item.querySelector('.bucketList-title').innerHTML = newData.ideaTitle;
        item.querySelector('.bucketList-img').src = newData.imgSrc;
        item.querySelector('.bucketList-img').alt = newData.ideaTitle;


        let updatedBucketListItem = {
            itemId: `bucketList-${newData.itemId}`,
            itemDataAtt: newData.itemId,
            itemImg: newData.imgSrc,
            itemImgDesc: newData.imgDesc,
            itemTitle: newData.ideaTitle
        };

        updateLocalStorageItem(USER_BUCKET_LIST, updatedBucketListItem);
    }
}

// ------------------- LOCAL STORAGE---------------------//

function addStorageItemsOnLoad() {
    let userBucketListItems = localStorageData(USER_BUCKET_LIST);
    let userIdeaItems = localStorageData(USER_IDEAS_LIST);

    if (userBucketListItems.length > 0) {
        userBucketListItems.forEach(item => mapAndAppendToBucketList(item));
    }

    if (userIdeaItems.length > 0) {
        userIdeaItems.forEach(item => addIdeasToContainer(item));
    }
}

function updateLocalStorageItem(storageKey, updateInfo) {
    let items = localStorageData(storageKey);
    let previousItemIndex = items.findIndex(item => item.itemId === updateInfo.itemId);
    items.splice(previousItemIndex, 1, updateInfo);
    localStorage.setItem(storageKey, JSON.stringify(items));
}

function addToLocalStorage(storageKey, item) {
    let storageArr = localStorageData(storageKey);
    storageArr.push(item);
    localStorage.setItem(storageKey, JSON.stringify(storageArr));
}

function removeFromLocalStorage(storageKey, itemId) {
    let existingData = localStorageData(storageKey);
    let newData = existingData.filter(item => item.itemId !== itemId);
    localStorage.setItem(storageKey, JSON.stringify(newData));
}

function localStorageData(key) {
    return localStorage.getItem(key) === null ||
        localStorage.getItem(key) === undefined ||
        localStorage.getItem(key) === '' ? [] : JSON.parse(localStorage.getItem(key));
}

// ------------------- UTILS ---------------------//

function addListener(className, type, callback) {
    let itemsWithClassName = document.getElementsByClassName(className);
    for (let i = 0; i < itemsWithClassName.length; i++) {
        var button = itemsWithClassName[i];
        button.addEventListener(type, callback);
    }
}

function showErrorMessage() {
    if (IMG_ERR_MSG.contains('d-none')) {
        IMG_ERR_MSG.remove('d-none');
    }
}

function isValidImage(itemInformation, typeOfRequest) {
    //since fetch wont reject on HTTP error status (404,500, etc.)
    //promise will resolve normally (with ok (property))
    fetch(itemInformation.imgSrc, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {

                if (typeOfRequest === 'updateItem') {
                    updateExistingItem(itemInformation);
                }
                else {
                    isUserSubmitted = true;
                    addIdeasToContainer(itemInformation);
                }

            } else {
                showErrorMessage();
            }
        })
}

function randomId() {
    let itemId = '';
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVQXYZ';
    let randomLetter = letters[Math.floor(Math.random() * letters.length)];

    itemId += randomLetter += performance.now();
    return itemId.replace('.', '');
}

function resetFormOnOpen() {
    addUpdateForm.reset();
    if (!IMG_ERR_MSG.contains('d-none')) {
        IMG_ERR_MSG.add('d-none');
    }
}



