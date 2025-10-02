// Seat data structure
let seats = [];
const sections = ['A', 'B', 'C', 'D'];

// Initialize seats
function initializeSeats() {
    sections.forEach(section => {
        for (let row = 1; row <= 10; row++) {
            for (let num = 1; num <= 12; num++) {
                const isBooked = Math.random() > 0.7;
                seats.push({
                    id: `${section}${row}-${num}`,
                    section,
                    row,
                    number: num,
                    price: (section === 'A' || section === 'B') ? 250 : 350,
                    status: isBooked ? 'booked' : 'available'
                });
            }
        }
    });
}

// Render seating sections
function renderSeats() {
    const container = document.getElementById('seating-sections');
    if (!container) return;

    sections.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'mb-4';
        
        const price = (section === 'A' || section === 'B') ? 250 : 350;
        
        sectionDiv.innerHTML = `
            <div class="d-flex align-items-center gap-2 mb-3">
                <span class="badge bg-secondary">Section ${section}</span>
                <small class="text-muted">R${price} per seat</small>
            </div>
            <div class="row g-2" id="section-${section}"></div>
        `;
        
        container.appendChild(sectionDiv);
        
        // Add seats to section (showing first 3 rows only for simplicity)
        const sectionSeats = seats.filter(s => s.section === section && s.row <= 3);
        const sectionContainer = document.getElementById(`section-${section}`);
        
        sectionSeats.forEach(seat => {
            const col = document.createElement('div');
            col.className = 'col-1';
            
            const seatBtn = document.createElement('button');
            seatBtn.className = `seat ${seat.status}`;
            seatBtn.textContent = seat.number;
            seatBtn.disabled = seat.status === 'booked';
            seatBtn.onclick = () => toggleSeat(seat.id);
            
            col.appendChild(seatBtn);
            sectionContainer.appendChild(col);
        });
    });
}

// Toggle seat selection
function toggleSeat(seatId) {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.status === 'booked') return;
    
    seat.status = seat.status === 'selected' ? 'available' : 'selected';
    
    // Update button appearance
    const seatBtn = document.querySelector(`button[onclick="toggleSeat('${seatId}')"]`);
    if (seatBtn) {
        seatBtn.className = `seat ${seat.status}`;
    }
    
    updateBookingSummary();
}

// Update booking summary
function updateBookingSummary() {
    const selectedSeats = seats.filter(s => s.status === 'selected');
    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    const summaryDiv = document.getElementById('booking-summary');
    
    if (selectedSeats.length === 0) {
        summaryDiv.innerHTML = '<p class="text-muted text-center py-5">No seats selected</p>';
        return;
    }
    
    let html = '<div class="mb-3" style="max-height: 200px; overflow-y: auto;">';
    selectedSeats.forEach(seat => {
        html += `
            <div class="d-flex justify-content-between align-items-center p-2 mb-2 bg-light rounded">
                <small class="fw-medium">Section ${seat.section} - Row ${seat.row} - Seat ${seat.number}</small>
                <small class="fw-bold">R${seat.price}</small>
            </div>
        `;
    });
    html += '</div>';
    
    html += `
        <div class="border-top pt-3">
            <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Seats</span>
                <span class="fw-semibold">${selectedSeats.length}</span>
            </div>
            <div class="d-flex justify-content-between mb-3 fs-5 fw-bold">
                <span>Total</span>
                <span class="text-success">R${totalPrice}</span>
            </div>
            <button onclick="confirmBooking()" class="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2">
                <i class="bi bi-check-circle"></i>
                Confirm Booking
            </button>
        </div>
    `;
    
    summaryDiv.innerHTML = html;
}

// Confirm booking
function confirmBooking() {
    const selectedSeats = seats.filter(s => s.status === 'selected');
    
    if (selectedSeats.length === 0) {
        showToast('Please select at least one seat to continue.');
        return;
    }
    
    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    
    // Mark seats as booked
    selectedSeats.forEach(seat => {
        seat.status = 'booked';
        const seatBtn = document.querySelector(`button[onclick="toggleSeat('${seat.id}')"]`);
        if (seatBtn) {
            seatBtn.className = 'seat booked';
            seatBtn.disabled = true;
        }
    });
    
    showToast(`Successfully booked ${selectedSeats.length} seat${selectedSeats.length > 1 ? 's' : ''} for R${totalPrice}`);
    updateBookingSummary();
}

// Show toast notification
function showToast(message) {
    const toastEl = document.getElementById('bookingToast');
    const messageEl = document.getElementById('toast-message');
    messageEl.textContent = message;
    
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeSeats();
    renderSeats();
    updateBookingSummary();
});
