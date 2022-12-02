function validateAndSubmitForm(){
    let isValid = false;

    const form = document.getElementById('addNewIdeaForm');
    let title_desc = form.querySelector('#idea-title').value; 
    let newIdea = {
        ideaTitle: title_desc,
        imgSrc: form.querySelector('#image-url').value,
        imgDesc: title_desc,
        ideaDesc:form.querySelector('#idea-desc').value
    };

    isValid = validateFormData(newIdea); //returns boolean after data is verified

    console.log(newIdea);
    if(isValid){
        form.reset();
        form.submit();
    }
}


function validateFormData(submittedIdea){
    
    if(submittedIdea.ideaTitle === ''){

    }

}
