nodemon default olarak js file değişikliklierinde server ı otomatik olarak restart eder. Ancak hbs dosyalarındaki değişiklikleri algılamaz.
Bunu algılamasını sağlamak için nodemon komutunu girerken extension ları belirlemek gereki.

nodemon src/app.js -e js,hbs


install request module:
 npm i request@2.88.0