The images of products are categorized into folders under Public/images directory like Vegetables, Fruits e.t.c.

The "src" folder have 3 folders.
	1. db : It only consists of DB conenction information and helps in conencting with DB/document.
	2. models: This folder consists of different product models with certain specification of the different attributes of the products.
		   It consists of vegetable and fruit model as of now and later on, i will be adding more models as we go ahead with project.
	3. seed: This folder consists of files which is useful in pushing the data into db with all the attributes that are being presented in the model.
	4.views: Ignore this folder as i just wanted to check if the datas from the DB such as vegetable products or fruit prodcuts are corerctly rendered 
		in index.hbs .

app.js : This file is created in order to find the required products from DB , sending the data to client side and check the rendering of the products in client side. (Ignore this)