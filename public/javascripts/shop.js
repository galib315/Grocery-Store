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

    //add pagination dynamically based on the no. of pages
    var totalPages = parseInt($("#isPaginate").text());
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var currentPage = parseInt(urlParams.get('page'));
    var prevPage = currentPage - 1;
    var nextPage = currentPage + 1;

    var prevBtn;
    var nextBtn;

    //disable both Previous and Next buttons if there is only 1 page to display
    if(totalPages == 1){
        prevBtn =   '<li class="page-item disabled">' +
                        '<a class="page-link" tabindex="-1">Previous</a>' +
                    '</li>';
        
        nextBtn =   '<li class="page-item disabled">' +
                        '<a class="page-link" tabindex="-1">Next</a>' +
                    '</li>';

    }

    //disable the Previous button if current page is the very first page OR page no. is missing from the query string
    else if((isNaN(currentPage)) || (currentPage == 1)){
        nextPage = 2;

        prevBtn =   '<li class="page-item disabled">' +
                        '<a class="page-link" tabindex="-1">Previous</a>' +
                    '</li>';
        
        nextBtn =   '<li class="page-item">' +
                        '<a class="page-link" href="?page=' + nextPage + '">Next</a>' +
                    '</li>';
    }

    //disable the Next button if current page is the very last page
    else if(currentPage == totalPages){
        prevBtn =   '<li class="page-item">' +
                        '<a class="page-link" href="?page=' + prevPage + '">Previous</a>' +
                    '</li>';

        nextBtn =   '<li class="page-item disabled">' +
                        '<a class="page-link" tabindex="-1">Next</a>' +
                    '</li>';
    }

    //enable both the Previous and Next buttons otherwise
    else if((currentPage > 1) && (currentPage < totalPages)){
        prevBtn =   '<li class="page-item">' +
                        '<a class="page-link" href="?page=' + prevPage + '">Previous</a>' +
                    '</li>';
        
        nextBtn =   '<li class="page-item">' +
                        '<a class="page-link" href="?page=' + nextPage + '">Next</a>' +
                    '</li>';
    }

    $("ul.pagination").append(prevBtn);

    for(var pageNum = 1; pageNum <= totalPages; pageNum++){
        var numberedList = '<li class="page-item"><a class="page-link" href="?page=' + pageNum + '">' + pageNum + '</a></li>';
        $("ul.pagination").append(numberedList);
    }

    $("ul.pagination").append(nextBtn);

    //get the current page no. and highlight the current pagination button
    $("li.page-item").each(function(){
        if($(this).find("a.page-link").text() == currentPage){
            //empty the current anchor style
            $(this).empty();

            //add new anchor style
            $(this).append(
                '<a style="background-color: gainsboro;" class="page-link" href="?page=' + currentPage + '">' + currentPage + '</a>'
            );
        }
    });
        
    //event handler for "Add to Cart" button on the shopping page(s)
    $("body").on("click", "a.add-btn", (function(){
        id = $(this).siblings(".id").text();
        var qty = $(this).siblings(".quantity").val();
        const minVal = 1;
        const maxVal = 50;

        if((qty < minVal) || (qty > maxVal)){
            alert("Quantity cannot be more than " + maxVal + " or less than " + minVal);
        }

        else{
            window.location.href = 'add-to-cart/' + id + '/' + qty;
        }

    }));

});