var imgSrc;
var title;
var price;
var price_desc;
var product_desc;
var id;

//manipulate DOM elements on the shopping page(s) (NOT the shopping cart page)
$(document).ready(function(){
    
    //function to display popup window upon clicking the product title
    $(".product_title").click(function(){
        imgSrc = $(this).parent().prev("img").attr("src");
        title = $(this).text();
        price = $(this).siblings("p").find(".price").text();
        price_desc = $(this).siblings("p").find(".price_desc").text();
        product_desc = $(this).siblings(".product_desc").text();
        id = $(this).siblings(".id").text();
        
        //remove the popup window element if it already exists in the body
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
                            '<input class="quantity" type="number" name="quantity" value="1" min="1" max="50">' +
                            '<a class="btn btn-warning add-btn" role="button">Add to Cart</a>' +
                        '</div>' +

                    '</div>' +
          
                '</div>' +

            '</div>'
        );
    });

    //event handler for "Add to Cart" button on the shopping page(s)
    $("body").on("click", "a.add-btn", (function(){
        id = $(this).siblings(".id").text();
        var qty = $(this).siblings(".quantity").val();
        window.location.href = 'add-to-cart/' + id + '/' + qty; 
    }));

});