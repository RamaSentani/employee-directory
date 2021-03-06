// Initialize variables
const cardContainer = document.querySelector('.cards-container');
const overlay = document.querySelector('.overlay');
const url = 'https://randomuser.me/api/?results=12&nat=us';

// Create a card for each employee
function createCard(index, name, email, address, img) {
    const card = document.createElement('DIV');
    card.classList.add('card');
    card.setAttribute('id', `card-${index}`);

    const imgDiv = document.createElement('DIV');
    imgDiv.classList.add('card-img');
    const cardImg = document.createElement('IMG');
    cardImg.setAttribute('src', img);
    cardImg.setAttribute('alt', `${name.first} ${name.last}`);
    imgDiv.appendChild(cardImg);

    const cardContent = document.createElement('DIV');
    cardContent.classList.add('card-content');

    const cardHeader = document.createElement('H4');
    cardHeader.classList.add('card-header');
    cardHeader.innerText = `${name.first} ${name.last}`;

    const cardEmail = document.createElement('P');
    cardEmail.classList.add('card-email');
    cardEmail.innerText = email;

    const cardCity = document.createElement('P');
    cardCity.classList.add('card-city');
    cardCity.innerText = address.city;

    cardContent.appendChild(cardHeader);
    cardContent.appendChild(cardEmail);
    cardContent.appendChild(cardCity);

    card.appendChild(imgDiv);
    card.appendChild(cardContent);

    cardContainer.appendChild(card);
}

// Create an overlay for each employee
function createOverlay(index, name, email, address, img, dob, phone) {
    const card = document.createElement('DIV');
    card.classList.add('card');
    card.classList.add(`card-${index}`);

    const imgDiv = document.createElement('DIV');
    imgDiv.classList.add('card-img');
    const cardImg = document.createElement('IMG');
    cardImg.setAttribute('src', img);
    cardImg.setAttribute('alt', `${name.first} ${name.last}`);
    imgDiv.appendChild(cardImg);

    const cardContent = document.createElement('DIV');
    cardContent.classList.add('card-content');

    const cardHeader = document.createElement('H4');
    cardHeader.classList.add('card-header');
    cardHeader.innerText = `${name.first} ${name.last}`;

    const cardEmail = document.createElement('P');
    cardEmail.classList.add('card-email');
    cardEmail.innerText = email;

    const cardCity = document.createElement('P');
    cardCity.classList.add('card-city');
    cardCity.innerText = address.city;

    cardContent.appendChild(cardHeader);
    cardContent.appendChild(cardEmail);
    cardContent.appendChild(cardCity);

    const cardDetails = document.createElement('DIV');
    cardDetails.classList.add('card-details');

    const closeModal = document.createElement('SPAN');
    closeModal.classList.add('close-modal');
    closeModal.innerHTML = "&times;";

    const cardPhone = document.createElement('P');
    cardPhone.classList.add('card-phone');
    cardPhone.innerText = phone;

    const cardAddress = document.createElement('P');
    cardAddress.classList.add('card-address');
    cardAddress.innerHTML = `${address.city}, ${address.state} ${address.zip}`;

    const cardBday = document.createElement('P');
    cardBday.classList.add('card-birthday');
    cardBday.innerHTML = `Birthday: <span>${dob}</span>`;

    cardDetails.appendChild(cardPhone);
    cardDetails.appendChild(cardAddress);
    cardDetails.appendChild(cardBday);

    card.appendChild(closeModal);
    card.appendChild(imgDiv);
    card.appendChild(cardContent);
    card.appendChild(cardDetails);

    overlay.appendChild(card);

}

// ===============================
// Connect to the Random User API
// ===============================

// Create a new XHR object
const xhr = new XMLHttpRequest();

// Callback function to run
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            // Convert results into an object
            const results = JSON.parse(xhr.responseText);
            // Loop through the results and create a card for each employee
            for (var i = 0; i < results.results.length; i++) {
                var index = i + 1;
                var userName = {
                    first: results.results[i].name.first,
                    last: results.results[i].name.last
                };
                var userEmail = results.results[i].email;
                var userAddress = {
                    street: results.results[i].location.street,
                    city: results.results[i].location.city,
                    state: results.results[i].location.state,
                    zip: results.results[i].location.postcode
                };
                var userImg = results.results[i].picture.large;
                // need to convert this result to display MM/DD/YY
                var userBday = results.results[i].dob.date;
                var year = userBday.substring(0, 4);
                var month = userBday.substring(5, 7);
                var day = userBday.substring(8, 10);
                userBday = `${month}/${day}/${year}`;

                var userPhone = results.results[i].cell;

                // Create the card
                createCard(index, userName, userEmail, userAddress, userImg);

                // Create overlay
                createOverlay(index, userName, userEmail, userAddress, userImg, userBday, userPhone);
            }

            // ==================
            // EVENT LISTENERS
            // ==================

            // Listen on the PARENT
            $('.cards-container .card').on('click', function () {

                // Get the value of the employee #card-X
                var cardID = $(this).attr('id');
                var employeeNumber = cardID.slice(5, 7);
                // console.log('Employee Number: ' + employeeNumber);

                // Display the overlay & card that matches the employee number
                // overlay.style.display = 'flex';
                overlay.style.left = 0;
                const cardToShow = document.querySelector('.overlay .card-' + employeeNumber);
                cardToShow.style.display = 'flex';
                cardToShow.classList.add('selected');

                // Close the Modal if user clicks the X
                $('.close-modal').on('click', function () {
                    // Hide the overlay & card
                    // overlay.style.display = 'none';
                    overlay.style.left = '100%';
                    $('.overlay .card').css('display', 'none');
                    $('.overlay .card').removeClass('selected');
                });

                // OR - listen for a keydown event and close the modal when ESC key is pressed
                $(document).keydown(function (e) {
                    if (e.which === 27) {
                        // Hide the overlay & card
                        overlay.style.left = '100%';
                        $('.overlay .card').css('display', 'none');
                        $('.overlay .card').removeClass('selected');
                    }
                });

            });


        }
    }
};

// Open the request
xhr.open('GET', url);

// Send the request
xhr.send();