$(document).ready(function(){
    $(".product_title").click(function(){
        var imgSrc = $(this).parent().prev("img").attr("src");
        var title = $(this).text();
        var price = $(this).siblings("p").find(".price").text();
        var price_desc = $(this).siblings("p").find(".price_desc").text();
        var product_desc = $(this).siblings(".product_desc").text();
        
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
                            '<img src="' + imgSrc + '" width="250" height="250" />' +
                            '<h4>' + title + '</h4>' +
                            '<p><span class="price">' + price + '</span><span class="price_desc">' + price_desc + '</span></p>' +
                            '<p class="product_desc">' + product_desc + '</p>' +
                        '</div>' +

                        '<div class="modal-footer">' +
                            '<input class="quantity" type="number" name="quantity" value="1" min="1" max="50">' +
                            '<button id = "add_btn" type="button" class="btn btn-warning btn-sm">Add to Cart</button>' +
                        '</div>' +

                    '</div>' +
          
                '</div>' +

            '</div>'
        );
    });

});