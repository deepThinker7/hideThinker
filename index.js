// ==UserScript== 
// @name Hide motherfuckers
// @namespace deepThinker 
// @description Hide users in Kluv 
// @include http://www.thecage.co.il/* 
// @require http://code.jquery.com/jquery-3.3.1.js
// ==/UserScript==

let hiddenUsers = window.hiddenUsers;
$(document).ready(() => {
    hiddenUsers = getHiddenUsersList() || [];
    // Only if within profile page 
    initHideUserButton();
    hiddenUsers.forEach(user => {
        // Blog in front page 
        $('.frontpage_box_small_item:contains()').hide();
        // Comment
        $('article:contains()').hide();
        // User in usersList 
        $('td span.user:contains("מגן מסך")').hide(); 
    });
});

toggleUser = () => {
    const selectedUser = $('.profile-username > span').text();
    if (hiddenUsers.includes(selectedUser)) {
        hiddenUsers = hiddenUsers.filter(user => user !== selectedUser);
    } else {
        hiddenUsers.push(selectedUser);
    }
    localStorage.setItem('hiddenUsers', JSON.stringify(hiddenUsers));
    initHideUserButton();
}

getHiddenUsersList = () => {
    const users = localStorage.getItem('hiddenUsers');
    if (users) {
        return JSON.parse(users)
    } else {
        localStorage.setItem('hiddenUsers', JSON.stringify([]));
    }
}

initHideUserButton = () => {
    // Remove the btn if any before drawing 
    $('.hideUserBtn').remove();

    // Check if in profile page? 
    const username = $('.profile-username > span').text();
    const btnText = hiddenUsers.includes(username) ? 'הצג יוזר' : 'הסתר יוזר';

    $('.profileActionButtons').append(`
        <div class="col-md-3 col-sm-6 profileActionButtonsColumn hideUserBtn">
            <button class="btn btn-info btn-block" role="button" onClick="toggleUser()">
            <i class="icon-block" aria-hidden="true"></i>
            <span>&nbsp;</span>  
            ${btnText}
            </button>
        </div>
     `);
}