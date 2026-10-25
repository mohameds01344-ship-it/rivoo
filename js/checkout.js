(() => {

    const root = document.getElementById("productDetail");

    if (!root) {

        return;

    }


    /* =========================
       GET PRODUCT FROM URL
    ========================= */

    const parameters = new URLSearchParams(
        window.location.search
    );

    const productId = parameters.get("id");


    const product = RIVO_PRODUCTS.find(item => {

        return item.id === productId;

    }) || RIVO_PRODUCTS[0];


    if (!product) {

        root.textContent = "Product not found.";

        return;

    }


    let selectedSize = "";

    let selectedColor = product.colors[0];


    /* =========================
       RENDER PRODUCT PAGE
    ========================= */

    function renderProduct() {

        const language = getRivoLanguage();

        const t = RIVO_TRANSLATIONS[language];


        document.title = `${product.name} | RIVO STORE`;


        const governorateValues = [

            "Cairo",
            "Giza",
            "Qalyubia",
            "Alexandria",
            "Gharbia",
            "Monufia",
            "Dakahlia",
            "Sharqia",
            "Port Said",
            "Ismailia",
            "Suez",
            "Damietta",
            "Kafr El Sheikh",
            "Beheira",
            "Fayoum",
            "Beni Suef",
            "Minya",
            "Asyut",
            "Sohag",
            "Qena",
            "Luxor",
            "Aswan",
            "Red Sea",
            "New Valley",
            "Matrouh",
            "North Sinai",
            "South Sinai"

        ];


        const governorateOptions = governorateValues.map(
            (value, index) => {

                return `

                    <option value="${value}">

                        ${t.governorates[index]}

                    </option>

                `;

            }
        ).join("");


        root.innerHTML = `

            <!-- PRODUCT IMAGE -->

            <div class="detail-gallery">

                <div class="detail-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <span class="product-badge">

                        ${product.badge}

                    </span>

                </div>

                <p class="detail-image-caption">

                    RIVO STORE / EXPRESSION SERIES

                </p>

            </div>


            <!-- PRODUCT INFORMATION -->

            <div class="detail-info">

                <p class="eyebrow">

                    ${product.subtitle}

                </p>

                <h1 class="detail-title">

                    ${product.name}

                </h1>

                <p class="detail-price">

                    ${Number(product.price).toLocaleString()}
                    ${RIVO_CONFIG.currency}

                </p>

                <p class="detail-description">

                    ${product.description}

                </p>


                <!-- COLOR -->

                <div class="choice-group">

                    <label class="form-label">

                        ${t.selectColor}

                    </label>

                    <div class="color-options">

                        ${product.colors.map(color => `

                            <button
                                type="button"
                                class="color-option ${color === selectedColor ? "active" : ""}"
                                data-color="${color}"
                            >

                                <span class="color-dot"></span>

                                ${color}

                            </button>

                        `).join("")}

                    </div>

                </div>


                <!-- SIZE -->

                <div class="choice-group">

                    <label class="form-label">

                        ${t.selectSize}

                    </label>

                    <div class="size-options" id="sizeOptions">

                        ${product.sizes.map(size => `

                            <button
                                type="button"
                                class="size-option"
                                data-size="${size}"
                            >

                                ${size}

                            </button>

                        `).join("")}

                    </div>

                </div>


                <!-- CUSTOMER FORM -->

                <form class="order-form" id="orderForm">

                    <h2>

                        ${t.completeOrder}

                    </h2>

                    <p class="form-note">

                        ${t.formNote}

                    </p>


                    <div class="form-grid">


                        <div class="field">

                            <label for="customerName">

                                ${t.fullName}

                            </label>

                            <input
                                type="text"
                                id="customerName"
                                name="customerName"
                                autocomplete="name"
                                required
                            >

                        </div>


                        <div class="field">

                            <label for="phone">

                                ${t.phone}

                            </label>

                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                autocomplete="tel"
                                placeholder="01XXXXXXXXX"
                                required
                            >

                        </div>


                        <div class="field full">

                            <label for="governorate">

                                ${t.governorate}

                            </label>

                            <select
                                id="governorate"
                                name="governorate"
                                required
                            >

                                <option value="">

                                    ${t.chooseGovernorate}

                                </option>

                                ${governorateOptions}

                            </select>

                        </div>


                        <div class="field full">

                            <label for="address">

                                ${t.address}

                            </label>

                            <textarea
                                id="address"
                                name="address"
                                autocomplete="street-address"
                                placeholder="${t.addressPlaceholder}"
                                required
                            ></textarea>

                        </div>


                        <div class="field">

                            <label for="quantity">

                                ${t.quantity}

                            </label>

                            <select id="quantity" name="quantity">

                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>

                            </select>

                        </div>


                        <div class="field">

                            <label for="payment">

                                ${t.payment}

                            </label>

                            <select
                                id="payment"
                                name="payment"
                                required
                            >

                                <option value="">

                                    ${t.choosePayment}

                                </option>

                                <option value="Cash on Delivery">

                                    ${t.cod}

                                </option>

                                <option value="Instapay">

                                    ${t.instapay}

                                </option>

                                <option value="Mobile Wallet">

                                    ${t.wallet}

                                </option>

                            </select>

                        </div>


                        <div class="field full">

                            <label for="notes">

                                ${t.notes}

                            </label>

                            <textarea
                                id="notes"
                                name="notes"
                                placeholder="${t.notesPlaceholder}"
                            ></textarea>

                        </div>


                    </div>


                    <!-- ORDER SUMMARY -->

                    <div class="order-summary">

                        <span id="summaryText"></span>

                        <strong id="summaryPrice"></strong>

                    </div>


                    <!-- SUBMIT ORDER -->

                    <button
                        type="submit"
                        class="button button-dark submit-order"
                    >

                        ${t.sendOrder}

                    </button>


                    <p
                        class="form-error"
                        id="formError"
                        hidden
                    ></p>


                    <p class="small-print">

                        ${t.deliveryNote}

                    </p>

                </form>

            </div>

        `;


        /* =========================
           SELECT SIZE
        ========================= */

        root.querySelectorAll("[data-size]").forEach(button => {

            button.addEventListener("click", () => {

                selectedSize = button.dataset.size;


                root.querySelectorAll("[data-size]").forEach(item => {

                    item.classList.toggle(
                        "active",
                        item === button
                    );

                });


                updateSummary();

            });

        });


        /* =========================
           SELECT COLOR
        ========================= */

        root.querySelectorAll("[data-color]").forEach(button => {

            button.addEventListener("click", () => {

                selectedColor = button.dataset.color;


                root.querySelectorAll("[data-color]").forEach(item => {

                    item.classList.toggle(
                        "active",
                        item === button
                    );

                });


                updateSummary();

            });

        });


        /* =========================
           QUANTITY
        ========================= */

        document.getElementById("quantity").addEventListener(
            "change",
            updateSummary
        );


        /* =========================
           FORM SUBMIT
        ========================= */

        document.getElementById("orderForm").addEventListener(
            "submit",
            sendOrder
        );


        updateSummary();

    }


    /* =========================
       ORDER SUMMARY
    ========================= */

    function updateSummary() {

        const t = RIVO_TRANSLATIONS[getRivoLanguage()];

        const quantity = Number(
            document.getElementById("quantity")?.value || 1
        );

        const total = product.price * quantity;


        const summaryText = document.getElementById("summaryText");

        const summaryPrice = document.getElementById("summaryPrice");


        if (summaryText) {

            summaryText.textContent =

                `${product.name} | ` +
                `${selectedColor} | ` +
                `${selectedSize || t.selectSizeSummary} | ` +
                `${t.qtyShort}: ${quantity}`;

        }


        if (summaryPrice) {

            summaryPrice.textContent =

                `${total.toLocaleString()} ${RIVO_CONFIG.currency}`;

        }

    }


    /* =========================
       SEND ORDER TO WHATSAPP
    ========================= */

    function sendOrder(event) {

        event.preventDefault();


        const t = RIVO_TRANSLATIONS[getRivoLanguage()];

        const error = document.getElementById("formError");

        error.hidden = true;


        // Make sure a size is selected.

        if (!selectedSize) {

            error.textContent = t.chooseSizeError;

            error.hidden = false;


            document.getElementById("sizeOptions").scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

            return;

        }


        // Make sure the WhatsApp number was changed.

        if (

            !RIVO_CONFIG.whatsappNumber ||

            RIVO_CONFIG.whatsappNumber === "201000000000"

        ) {

            error.textContent = t.whatsappError;

            error.hidden = false;

            return;

        }


        // Read the customer's form data.

        const formData = new FormData(event.currentTarget);


        const customerName = formData.get("customerName");

        const phone = formData.get("phone");

        const governorate = document.getElementById("governorate");

        const governorateName =
            governorate.options[governorate.selectedIndex].text;

        const address = formData.get("address");

        const quantity = Number(formData.get("quantity"));

        const payment = formData.get("payment");

        const notes = formData.get("notes") || t.none;


        // Calculate subtotal.

        const subtotal = product.price * quantity;


        // Translate the payment method.

        const paymentNames = {

            "Cash on Delivery": t.cod,

            "Instapay": t.instapay,

            "Mobile Wallet": t.wallet

        };


        // Build the WhatsApp message.

        const message = [

            t.orderTitle,

            "",

            t.productDetails,

            `${t.product}: ${product.name}`,

            `${t.color}: ${selectedColor}`,

            `${t.size}: ${selectedSize}`,

            `${t.quantityLabel}: ${quantity}`,

            `${t.unitPrice}: ${product.price} EGP`,

            `${t.subtotal}: ${subtotal} EGP`,

            "",

            t.customerDetails,

            `${t.name}: ${customerName}`,

            `Phone: ${phone}`,

            `${t.governorateLabel}: ${governorateName}`,

            `${t.address}: ${address}`,

            `${t.paymentMethod}: ${paymentNames[payment]}`,

            `${t.orderNotes}: ${notes}`,

            "",

            t.deliveryFee,

            `${t.total}: ${subtotal} EGP + delivery`,

            "",

            t.orderSource

        ].join("\n");


        // Open WhatsApp with the prepared order.

        const whatsappURL =

            "https://wa.me/" +

            RIVO_CONFIG.whatsappNumber +

            "?text=" +

            encodeURIComponent(message);


        window.open(

            whatsappURL,

            "_blank"

        );

    }


    /* =========================
       INITIALIZE
    ========================= */

    window.addEventListener(

        "rivo-language-change",

        renderProduct

    );


    renderProduct();

})();