const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const bookButton = document.getElementById('book-btn');

// Get the movie price from the dropdown
let ticketPrice = +movieSelect.value;

// Update the seat count and total price
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Copy selected seats into an array and map the index
  const selectedSeatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  // Enable or disable the book button based on seat selection
  if (selectedSeatsCount > 0) {
    bookButton.disabled = false;
  } else {
    bookButton.disabled = true;
  }
}

// Set the movie data in localStorage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Load data from localStorage
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Event listener for movie selection
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Event listener for seat selection
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// Event listener for booking the selected seats
bookButton.addEventListener('click', () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  if (selectedSeats.length === 0) {
    alert('Please select at least one seat to book.');
    return; // Stop if no seats are selected
  }

  alert(`You have booked ${selectedSeats.length} seat(s) for a total of $${total.innerText}`);

  // Change the button to 'Booked' and disable it after booking
  bookButton.innerText = 'Booked';
  bookButton.disabled = true;

  // Disable all selected seats after booking and mark as occupied
  selectedSeats.forEach((seat) => {
    seat.classList.remove('selected');
    seat.classList.add('occupied');
  });

  // Update the seat count and total after booking
  updateSelectedCount();
});
// JavaScript to pause the animation when hovered
const slider = document.querySelector('.images');
slider.addEventListener('mouseenter', () => {
    slider.style.animationPlayState = 'paused';
});
slider.addEventListener('mouseleave', () => {
    slider.style.animationPlayState = 'running';
});

