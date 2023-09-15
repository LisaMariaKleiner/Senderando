let pizzen = ['Pizza Tonno', 'Pizza Hawai', 'Pizza Margherita', 'Pizza Capricciosa', 'Pizza Marinara', 'Pizza Prosciutto e funghi', 'Pizza Quattro Stagioni', 'Pizza Quattro Formaggi', 'Pizza Ortolana/Vegetariana'];
let descriptions = [
    'Belegt wird der Pizzateig bei der Thunfischpizza ganz klassisch mit Tomatensauce, Mozzarella, Thunfisch und – nicht zu vergessen – Zwiebeln.',
    'Pizza Hawaii ist eine Variante der Pizza, die aus dem Grundteig mit Tomatensauce, Schinken, Ananas und Käse besteht.',
    'Ihre Basis besteht aus dünnem, knusprigen, italienischen Pizzateig. Und belegt wird sie mit Tomatensauce, Mozzarella und ein paar frischen Basilikumblättern.',
    'Super saftig und aromatisch: Oliven, Schinken, Artischocken und Pilze machen diesen Belag einfach unwiderstehlich',
    'Besteht lediglich aus Tomaten, Knoblauch, Oregano und Olivenöl.',
    'Ein sehr einfacher Belag mit Schinken und Pilzen',
    'Die Vierjahreszeiten Pizza aus kräftigen Geschmacksnoten, Mozzarella und Tomate',
    'Eine Pizza für echte Käseliebhaber! Sie beinhaltet folgende Käsesorten: Provolone, Parmigiano Reggiano, Mozzarella, Stracchino, Fontina oder Gorgonzola',
    'Die Pizza Ortolana oder Pizza Vegetariana eignet sich hervorragend für alle, die gerne lecker essen, aber gleichzeitig auf ihre Figur achten. Neben Mozzarella und Tomaten wird diese Pizza mit Paprika, Auberginen und Zucchini, die in Streifen oder dünne Scheiben geschnitten werden, oder beliebigem anderem frisch gegrilltem Gemüse belegt.',
];
let prices = [7.99, 10.50, 7.50, 9.99, 5.50, 6.60, 11.80, 14.90, 13.90];
let formattedPrices = prices.map(price => {
    // Konvertiere den Preis in Text und behalte die Nullen bei
    return price.toFixed(2); // Zeigt immer zwei Dezimalstellen an
  });

// Array JSON für den Warenkorb
let basket = [];  

let amounts = [];


/* ==================================== Filterfunktion =================================*/
function filterProducts() {
    let search = getValueFromInput('search'); 
    search = search.toLowerCase();

    let list = document.getElementById('gerichte');
    list.innerHTML = '';

    for (let index = 0; index < pizzen.length; index++) {
        let pizza = pizzen[index];
        if (pizza.toLowerCase().includes(search)) {
            list.innerHTML += `
            <section class="product_container" id="products_${index}">
                <div class="product_info">
                    <p><b><u>${pizzen[index]}</u></b></p>
                    <p>${descriptions[index]}</p>
                    <p>${formattedPrices[index]} €</p>
                </div>
                <div id="add_to_basket">
                    <button onclick="addToArray(${index})" class="button-hover-addcart button"><span>Add to cart</span><i class="fa fa-shopping-cart"></i></button>
                </div>
            </section> 
        `;
        } 
    }
}


/* ========================= Nimmt das Input der Suchfunktion auf ===================*/
function getValueFromInput(search) {
    // Verwende die inputId, um das Eingabefeld zu finden und seinen Wert auszulesen
    const inputElement = document.getElementById(search);
  // Gib den Wert des Eingabefelds zurück
      return inputElement.value;
  }



/* ================================= Menü rendern ================================*/

function renderMenus() {
    hideButton();
    document.getElementById('warenkorb').classList.add('d-none');
    let showProducts = document.getElementById('gerichte');
    showProducts.innerHTML = '';

    for (let i = 0; i < pizzen.length; i++) {
        showProducts.innerHTML += `
        <section class="product_container" id="products_${i}">
            <div class="product_info">
                <p><b><u>${pizzen[i]}</u></b></p>
                <p>${descriptions[i]}</p>
                <p>${formattedPrices[i]} €</p>
            </div>
            <div id="add_to_basket">
                <button id="card_button${i}" onclick="addToArray(${i})" class="button-hover-addcart button"><span>Add to cart</span><i class="fa fa-shopping-cart"></i></button>
            </div>
        </section> 
        `;
    }
}


/* Zeigt den Container für den Warenkorb an und blendet den Productcontainer aus */
function renderBasket() {
    let productsInBasket = document.getElementById('warenkorb');
    productsInBasket.innerHTML = '';
    
    for (let index = 0; index < basket.length; index++) {
        productsInBasket.innerHTML += `
        <section id="basket_container${index}" class="basket_contain">
            <div class="amounts_calculator">
                <img onclick="remAmount(${index})" class="plus_minus" src="./img/minus.svg" alt="Ein Produkt weniger">
                <p>${amounts[index]}Stck.</p>
                <img onclick="addAmount(${index})" class="plus_minus" src="./img/plus.svg" alt="Ein Produkt mehr">
            </div>
            <div class="produktbeschreibung">
                <p><b><u>${basket[index].product}</u></b></p>
            </div>
            <div class="warenkorb_preis">
                <p>${basket[index].price} €</p>
            </div>
        </section>
    `;       
    }
    document.getElementById('warenkorb').classList.remove('d-none');
    showButton(); // Blendet den Button ein der zurück zum Productcontainer führt
    updateCart();
    document.getElementById('gerichte').classList.add('d-none');
}


function addAmount(i) {
    amounts[i] += 1;
    updateCart();
    renderBasket();
}

  /* ==================== Pusht die Objekte ins neue Array basket ============== */
function addToArray(i) {
    let product = pizzen[i];
    let price = formattedPrices[i];
    let index = findMeal(product); // Änderung hier: Übergeben Sie den Produktnamen, nicht das Array-Element
    if (index === -1) {
        basket.push({"product": product, "price": price});
        amounts.push(1); // Wenn das Produkt neu hinzugefügt wird, fügen Sie eine Menge von 1 hinzu
    } else {
        amounts[index] += 1; // Wenn das Produkt bereits vorhanden ist, erhöhen Sie die Menge um 1
    }
    // Ändern Sie die Hintergrundfarbe des Buttons auf Grün für 1 Sekunde
    let button = document.getElementById(`card_button${i}`);
    button.classList.add("highlight-button");

    setTimeout(() => {
        // Entfernen Sie die Hintergrundfarbe und die "highlight-button"-Klasse
        button.classList.remove("highlight-button");
    }, 1000); // 1000 Millisekunden entsprechen 1 Sekunde
    updateCart();
    
}


// Blendet den Warenkorb aus und die Produkte wieder ein
function backToStart() {
    for (let index = 0; index < basket.length; index++) {
        document.getElementById('warenkorb').classList.add('d-none'); 
    }  
    document.getElementById('gerichte').classList.remove('d-none');
    hideButton();
    
}


// Blendet den "zurück zur Übersicht" Button aus
function hideButton() {
    document.getElementById(`button`).classList.add('d-none');
}


// Blendet den "zurück zur Übersicht" Button ein
function showButton() {
    document.getElementById(`button`).classList.remove('d-none');
}


// Funktion zum Berechnen des Gesamtpreises
function calculateTotalPrice() {
    let totalPrice = 0;
    for (let index = 0; index < basket.length; index++) {
      totalPrice += parseFloat(basket[index].price) * amounts[index];
    }
    return totalPrice.toFixed(2); // Auf zwei Dezimalstellen runden
}


// Funktion zum errechnen der Mehrwertsteuer (VAT = Value added tax)
function vat(gesamtsumme, mehrwertsteuersatz) {
    let vat = gesamtsumme * (mehrwertsteuersatz / 100);
    return vat;
}


// Überprüft den aktuellen Preis
function updateCart() {
    let totalPrice = calculateTotalPrice();
    let mehrwertsteuer = vat(totalPrice, 19);
    // Überprüfen Sie, ob totalPrice eine gültige Zahl ist, bevor Sie toFixed verwenden
    if (!isNaN(totalPrice)) {
        document.getElementById("final_sum").innerHTML = `
            <b>Gesamtpreis: ${totalPrice} €</b><br>
            <p>Darin enthaltene Mehrwertsteuer: ${mehrwertsteuer.toFixed(2)} €</p>
        `;
        if (totalPrice > 14.99){
            document.getElementById('order_button').classList.add('order_button_start');
        } else {
            document.getElementById('final_sum').innerHTML = `Mindestbestellwert von 15,00€ noch nicht erreicht!`;
            document.getElementById('order_button').classList.remove('order_button_start');
        }
    } else {
        // Fehlerbehandlung, falls totalPrice keine gültige Zahl ist
        document.getElementById("final_sum").innerHTML = "Fehler beim Berechnen des Gesamtpreises";
    }
}


// Funktion mit dem Übergabeparameter "menu"
function getMenuIndex(menu) {
    for (let index = 0; index < basket.length; index++) {
        if (basket[index].product === menu) { //durchsucht das Array basket, bis es den Inhalt beim ersten Mal gefunden hat
            return index;
        }
    }
    return -1; // Wenn das Produkt nicht gefunden wird
}// Findet er kein Ergebnis, gibt er -1 aus. (automatisch)


//Essen befindet sich schon im Warenkorb?
function findMeal (meal){
    let index = getMenuIndex(meal);
    return index;
}


// Entferne 1 von Amount
function remAmount(i) {
    if (amounts[i] > 1) { // Hiermit möchte ich verhindern, dass in einen negativen Wert gegangen wird
        amounts[i] -= 1; // Erst dann reduziere um 1
        updateCart(); // aktualisiere den Gesamtpreis
    } else {
        basket.splice(i, 1);
        amounts.splice(i, 1); 
    }
    updateCart();
    renderBasket(); // aktualisiere den Warenkorb 
}


// Erhöhe das Amount um 1
function addAmount(i) {
    amounts[i] += 1;
    updateCart();
    renderBasket();
}
        

function sendOrder() {
    document.getElementById('warenkorb').innerHTML = '';
    document.getElementById('warenkorb').innerHTML = 'Vielen Dank! Ihre Bestellung wurde versendet!';
    document.getElementById('final_sum').innerHTML = '';
}


/* ================================= Button Info PopUp Fenster ==============================*/
    
function togglePopup() {
    const popup = document.getElementById('popup');
    popup.classList.toggle('hidden');
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.add('hidden');
}