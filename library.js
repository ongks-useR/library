
const myLibrary = [];

function Book(title, author, pages, book_status, print_date, rating) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = book_status;
    this.date = print_date;
    this.rating = rating;
}

function AddtoLibrary(title, author, pages, status, print_date, rating) {

    const book_info = new Book(title, author, pages, status, print_date, rating);
    myLibrary.push(book_info);
}

function DesignBook(index, title, author, pages, status, print_date, rating) {

    const status_icons = document.createElement('div');
    status_icons.setAttribute('class', 'status-icons');

    const new_book_icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    new_book_icon.setAttribute("class", "new-book")
    new_book_icon.setAttribute("viewBox", "0 0 448 512")

    new_book_path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    new_book_path.setAttribute("d", "M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16zm16 48l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z")

    new_book_icon.appendChild(new_book_path)

    new_book_icon.addEventListener('click', 
        function (e) { 
            const new_book_icon = e.currentTarget;
            const completed_icon = new_book_icon.nextSibling;
            const book = new_book_icon.parentElement.parentElement;
            
            // console.log(new_book_icon);
            // console.log(completed_icon);
    
            new_book_icon.style.display = "none";
            completed_icon.style.display = "block";

            myLibrary[book.dataset.id].status = "Completed";
        }
    )

    const completed_book_icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    completed_book_icon.setAttribute("class", "read")
    completed_book_icon.setAttribute("viewBox", "0 0 512 512")

    completed_book_path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    completed_book_path.setAttribute("d", "M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z")

    completed_book_icon.appendChild(completed_book_path)

    completed_book_icon.addEventListener('click',
        function (e) {
            const completed_icon = e.currentTarget;
            const new_book_icon = completed_icon.previousSibling;
            const book = completed_icon.parentElement.parentElement;
            
            // console.log(completed_icon)
            // console.log(new_book_icon);
    
            completed_icon.style.display = "none";
            new_book_icon.style.display = "block";

            myLibrary[book.dataset.id].status = "New"
        }
    )

    const remove_book_icon = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    remove_book_icon.setAttribute("class", "remove-book")
    remove_book_icon.setAttribute("viewBox", "0 0 448 512")

    remove_book_path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    remove_book_path.setAttribute("d", "M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z")
    
    remove_book_icon.appendChild(remove_book_path)

    remove_book_icon.addEventListener('click',
        function (e) {
            const remove_icon = e.currentTarget;
            const current_book = remove_icon.parentElement.parentElement;
    
            // console.log(current_book);
            current_book.remove()

            const index = parseInt(current_book.dataset.id);
            myLibrary.splice(index, 1)

            // Update dataset ID based on index of the new object in the book shelf
            const books = document.querySelectorAll(".book");
            books.forEach((book, index) => book.dataset.id = index)
        }
    )

    if (status === 'New') {
        status_icons.appendChild(new_book_icon)

        completed_book_icon.style.display = "none"
        status_icons.appendChild(completed_book_icon)
    }
    else {
        new_book_icon.style.display = "none"
        status_icons.appendChild(new_book_icon)

        status_icons.appendChild(completed_book_icon)
    }

    status_icons.appendChild(remove_book_icon)

    // Book Title
    const book_title = document.createElement('p');
    book_title.textContent = title;

    // Author Name
    const book_author = document.createElement('p');
    book_author.textContent = `Author: ${author}`;

    // Pages
    const book_print_length = document.createElement('p');
    book_print_length.textContent = `Print Length: ${pages} pages`;

    // Published Date
    const book_publish_date = document.createElement('p');
    const book_date_list = print_date.split('-');
    const print_month = MONTH_NAME[book_date_list[1]];
    const print_day = book_date_list[2];
    const print_year = book_date_list[0];
    book_publish_date.textContent = `Published Date: ${print_month} ${print_day}, ${print_year}`;

    // Rating of the book
    const book_rating = document.createElement('p');
    book_rating.textContent = `Rating: ${rating}`;

    // Book Info Section
    const book_info_section = document.createElement('div');
    book_info_section.setAttribute('class', "book-info")
    book_info_section.appendChild(book_author)
    book_info_section.appendChild(book_publish_date)
    book_info_section.appendChild(book_print_length)
    book_info_section.appendChild(book_rating)

    // Append status icons, book title and everything in the book info section into .book
    const book = document.createElement('div');
    book.setAttribute('class', 'book');
    book.setAttribute('data-id', index)
    book.appendChild(status_icons)
    book.appendChild(book_title)
    book.appendChild(book_info_section)

    const book_shelf = document.querySelector(".book-shelf");
    book_shelf.appendChild(book);
}

function ResetContent() {

    const book_title = document.querySelector("#title");
    const book_author = document.querySelector("#author");
    const book_rating = document.querySelector("#rating");
    const book_length = document.querySelector("#pages");
    const book_status = document.querySelector("#new");
    const book_date = document.querySelector("#print_date");

    book_title.value = ""
    book_author.value = ""
    book_rating.value = ""
    book_length.value = ""
    book_status.checked = true
    book_date.value = "2025-01-01"
}

const MONTH_NAME = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
}


const form = document.querySelector("form");

form.addEventListener('submit',
    e => {
        e.preventDefault()

        const data = new FormData(form);

        const webForm = {};

        data.forEach((input, id) => webForm[id] = input )

        AddtoLibrary(
            webForm.book_title,
            webForm.author,
            webForm.pages,
            webForm.status,
            webForm.print_date,
            webForm.rating
        )

        const book_shelf = document.querySelector(".book-shelf");
        book_shelf.textContent = "";
        ResetContent();

        myLibrary.forEach((book, index) => DesignBook(index, book.title, book.author, book.pages, book.status, book.date, book.rating));
    }
)


const form_handle = document.querySelector("#new-form");

form_handle.addEventListener('click',
    function (e) {
        const form_template = document.querySelector("form");

        const state = form_template.style.visibility;

        if (state === "hidden") {
            form_template.style.visibility = "visible";
        }
        else {
            form_template.style.visibility = "hidden";
        }
    }
)