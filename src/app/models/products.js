var tw = tw || { models: {}};
(function(tw, m) {
    'use strict';
    if(!tw.models) { tw.models =  {}};

    /**
     * Get the List of products (bottled water)
     */
    tw.models.products = {
        selected: {},
        list: [],
        fetchAll: function() {
            m.request({
                method: "GET",
                url: tw.config.api_endpoint + "/products",
                data: {lang: tw.language.get()}
            })
            .then(function(response) {
                tw.models.products.list = response;
            })
        },
        fetchOne: function(id) {
            m.request({
                method: "GET",
                url: tw.config.api_endpoint + "/product/" + id,
                data: {lang: tw.language.get()}
            })
            .then(function(response) {
                tw.models.product.item = response;
            })
        }
    }

})(tw,m);

