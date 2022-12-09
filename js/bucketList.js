const USER_BUCKET_LIST = 'userBucketList';
const USER_IDEAS_LIST = 'userIdeaList'
const IMG_ERR_MSG = document.querySelector('.imgErr').classList;
const deleteModal = document.getElementById('deleteConfirm');
const addUpdateModal = document.getElementById('addUpdateModal');
let addUpdateForm = document.getElementById('addUpdateForm');
let isUserSubmitted = false;

window.addEventListener("load", addStorageItemsOnLoad);
addListener('remove-bucketList-item', 'click', removeBucketListItem);
addListener('addToList', 'click', gatherAddCardData);

addUpdateForm.addEventListener('submit', validateAndSubmitForm);
deleteModal.addEventListener('show.bs.modal', setDeleteModalDataAttr);
addUpdateModal.addEventListener('show.bs.modal', checkFormType);



// MODALS
function checkFormType(event) {
    // let typeOfForm = event.relatedTarget.dataset.formType;
    // if (typeOfForm === 'addItem') {
    //     setAddModal();
    // }
    // else if (typeOfForm === 'updateItem') {
    //     setUpdateModal();
    // }
}


function setDeleteModalDataAttr(e) {
    //whichever card called this modal to show up we take the id and add it to the custom data-attribute of this modal 
    let deleteConfirmModal = deleteModal;
    let cardThatTriggered = e.relatedTarget.closest('.bucket-list-card').id;
    deleteConfirmModal.dataset.cardCalled = cardThatTriggered;
}

// user add/update idea
function validateAndSubmitForm(e) {
    e.preventDefault();

    let newBucketListItem = {
        imgSrc: document.getElementById('image-url').value,
        ideaTitle: document.getElementById('idea-title').value,
        ideaDesc: document.getElementById('idea-desc').value,
        imgDesc: document.getElementById('idea-title').value
    }
    isValidImage(newBucketListItem);
}

function addIdeasToContainer(newIdea) {
    let cardId = randomId();

    const template = document.getElementById('user-idea-temp');
    const container = document.getElementById('idea-container');

    let item = template.content.cloneNode(true);
    item.querySelector('.bucketList-idea-card').dataset.ideaItem = cardId;
    item.querySelector('.card-title').innerHTML = newIdea.ideaTitle;
    item.querySelector('.bucketList-idea-card').id = cardId;
    item.querySelector('.idea-img').src = newIdea.imgSrc;
    item.querySelector('.idea-img').alt = newIdea.imgDesc;
    item.querySelector('.idea-desc').innerHTML = newIdea.ideaDesc;
    // item.querySelector('.updateIdea').addEventListener('click', updateIdeaForm);
    // item.querySelector('.deleteIdea').addEventListener('click', deleteIdea);
    item.querySelector('.addToList').addEventListener('click', gatherAddCardData);
    container.prepend(item);
}

//users bucket list 
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
            itemID: `bucketList-${cardSelected.dataset.ideaItem}`,
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

function removeBucketListItem(event) {
    //get the data-attribute from the open modal and delete the card that matches the id   
    let idToDelete = event.target.closest('#deleteConfirm').dataset.cardCalled;
    let bucketListItem = document.getElementById('bucket-list-container').querySelector(`#${idToDelete}`);
    removeFromLocalStorage(USER_BUCKET_LIST, bucketListItem.id);
    bucketListItem.remove();
}

function mapAndAppendToBucketList(bucketListItem) {
    const bucketListItemTemplate = document.getElementById('bucket-list-item');
    const bucketListContainer = document.getElementById('bucket-list-container');

    let templateClone = bucketListItemTemplate.content.cloneNode(true);

    templateClone.querySelector('.bucket-list-card').dataset.bucketListItem = bucketListItem.itemDataAtt;
    templateClone.querySelector('.bucket-list-card').id = bucketListItem.itemID;
    templateClone.querySelector('.bucketList-img').src = bucketListItem.itemImg;
    templateClone.querySelector('.bucketList-img').alt = bucketListItem.itemImgDesc;
    templateClone.querySelector('.bucketList-title').innerHTML = bucketListItem.itemTitle;

    bucketListContainer.append(templateClone);
}

// localStorage
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

function addToLocalStorage(storageKey, item) {
    var storageArr = localStorageData(storageKey);
    storageArr.push(item);
    localStorage.setItem(storageKey, JSON.stringify(storageArr));
}

function removeFromLocalStorage(storageKey, itemId) {
    let existingData = localStorageData(storageKey);
    let newData = existingData.filter(item => item.itemID !== itemId);
    localStorage.setItem(storageKey, JSON.stringify(newData));
}

function localStorageData(key) {
    return localStorage.getItem(key) === null ||
        localStorage.getItem(key) === undefined ||
        localStorage.getItem(key) === '' ? [] : JSON.parse(localStorage.getItem(key));
}

//add event listener
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

function isValidImage(bucketListItem) {
    //since fetch wont reject on HTTP error status (404,500, etc.)
    //promise will resolve normally (with ok (property))
    fetch(bucketListItem.imgSrc, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                isUserSubmitted = true;
                addIdeasToContainer(bucketListItem);
            } else {
                showErrorMessage();
            }
        })
}

// Random ID Generator
function randomId() {
    let itemId = '';
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVQXYZ';
    let randomLetter = letters[Math.floor(Math.random() * letters.length)];

    itemId += randomLetter += performance.now();
    return itemId.replace('.', '');;
}


