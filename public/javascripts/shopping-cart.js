var imgSrc;
var title;
var price;
var price_desc;
var product_desc;
var id;

//manipulate DOM elements on the shopping cart page
$(document).ready(function(){
    
    var precise_subTotal = 0;
    var subTotal = 0;
    const shippingFee = 9.99;
    var tax = 0;
    var grandTotal = 0;

    $("strong.item-price").each(function() {
        
        var getPrice = $(this).text();
        subTotal += parseFloat(getPrice);
        precise_subTotal = subTotal.toFixed(2);
        
        //remove the product that has been deleted from the shopping cart
        if(($(this).parent().next("td").find("strong").text()) == 0){
            $(this).parent().parent().remove();
        }
       
    });

    tax = (0.0625 * subTotal).toFixed(2);
    grandTotal = (subTotal + shippingFee + parseFloat(tax)).toFixed(2);
    
    $("#cart-summary").append(
    
        '<div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div></br>' +
            '<div class="p-4">' +
                '<ul class="list-unstyled mb-4">' +
                    '<li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Order Subtotal </strong><strong>$' + precise_subTotal + '</strong></li>' +
                    '<li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Shipping and handling </strong><strong>$' + shippingFee + '</strong></li>' +
                    '<li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Tax </strong><strong>$' + tax + '</strong></li>' +
                    '<li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Grand Total </strong><strong>$' + grandTotal + '</strong></li>' +
                '</ul>'+
                '<a class="btn btn-success" href="/checkout" role="button">Proceed to Checkout</a></br></br>' +
            '</div>' +
        '</div>'
    );
    
    //function to display popup window upon clicking the product title
    $(".cart-product-title").click(function(){
        imgSrc = $(this).parent().prev("img").attr("src");
        title = $(this).text();
        price = $(this).siblings("p").find(".price").text();
        price_desc = $(this).siblings("p").find(".price_desc").text();
        product_desc = $(this).siblings(".product_desc").text();
        id = $(this).siblings(".id").text();
        
        //remove the popup window elements if it already exists in the body
        if($("#myModal").length){
            $("#myModal").remove();
        }

        $("body").append(
            '<div class="modal fade" id="myModal" role="dialog">' +
                '<div class="modal-dialog">' +

                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<button type="button" class="close" data-dismiss="modal" id="closeButton">&times;</button>' +
                            '<h3 class="modal-title">Product Details</h3>' +
                        '</div>' +

                        '<div class="modal-body">' +
                            '<img class="img-popup-thumbnail" src="' + imgSrc + '"/>' +
                            '<h4>' + title + '</h4>' +
                            '<p><span class="price">' + price + '</span><span class="price_desc">' + price_desc + '</span></p>' +
                            '<p class="product_desc">' + product_desc + '</p>' +
                        '</div>' +

                        '<div class="modal-footer">' +
                            '<p class="id" hidden>' + id + '</p>' +
                            '<label for="updateQty">Add/Remove Quantities</label>' +
                            '<input class="quantity" type="number" name="quantity" value="0" min="-50" max="50">' +
                            '<a class="btn btn-warning add-btn-2" role="button">Update Quantity</a>' +
                        '</div>' +

                    '</div>' +
          
                '</div>' +

            '</div>'
        );
    });

    //event handler for "Add to Cart" button on the shopping cart page
    $("body").on("click", "a.add-btn-2", (function(){
        id = $(this).siblings(".id").text();
        var qty = $(this).siblings(".quantity").val();
        window.location.href = 'add-to-cart/' + id + '/' + qty + '/no-redirect';    //prevent redirect from the current page
    }));

});