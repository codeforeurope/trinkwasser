(function (tw, m) {
    'use strict';
    /**
     * This function binds the nominatim geocoder from mapquest to the input with id 'city'.
     * A user can then start typing (autocomplete) and select the right address from the dropdown.
     * Once the address is selected, the next button becomes active and the selected location is set
     * for the next screen in the display.
     */
    tw.geocoder = {
        form: false,
        size: "is-large",
        selected: {},
        list: [],
        currentfocus: -1,
        setForm: function(value){
            tw.geocoder.form = value;
        },
        setSize: function(value){
            tw.geocoder.size = value;
        },
        search: function(value) {
            if(value.length > 4){
                m.request({
                    method: "GET",
                    url: tw.config.geocoder.search,
                    data: {
                        key: tw.config.geocoder.key,
                        format:"json",
                        addressdetails:"1",
                        limit: 3,
                        q: value
                    }
                })
                .then(function(response) {
                    tw.geocoder.list = response;
                })
            }
        },
        render: function(){
            if(tw.geocoder.list.length > 0) {
                return m("div", {class: "autocomplete-suggestions"},
                    Object.keys(tw.geocoder.list).map(function(key){
                        if(tw.geocoder.list[key].display_name) {
                            return m("div",{
                                class: "autocomplete-suggestion",
                                onclick: m.withAttr("class", function(){
                                    tw.geocoder.selected = this;
                                    tw.geocoder.list = [];
                                    m.route.set(
                                        '/report/' + 
                                            this.lat + 
                                            ',' + 
                                            this.lon
                                        );
                                }, tw.geocoder.list[key])
                            }, tw.geocoder.list[key].display_name);
                        }
                    })
                )
            }
        },
        keydown: function(e){
            if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                tw.geocoder.currentfocus++;
                /*and and make the current item more visible:*/
                //addActive(x);
            } else if (e.keyCode == 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                tw.geocoder.currentfocus--;
                /*and and make the current item more visible:*/
                //addActive(x);
            } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault();
                if (tw.geocoder.currentfocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    //if (x) x[currentFocus].click();
                }
            }
        },
        view: function(){
            var input = [
                m("input", { type: "hidden", id: "current-location-lat"}),
                m("input", { type: "hidden", id: "current-location-lon"}),
                m("div", { class: "field is-fullwidth"},
                    m("p", { class: "control is-expanded has-icons-right" },
                        [
                            m("input",{ 
                                id: "city",
                                type: "text",
                                class: "input " + tw.geocoder.size + " search-input",
                                placeholder: "_('Bitte auswählen')",
                                onkeyup: m.withAttr("value", function(value){
                                    tw.geocoder.selected = {};
                                    tw.geocoder.search(value)
                                }),
                                onkeydown: function(e) {
                                    tw.geocoder.keydown(e)
                                },
                                value: tw.geocoder.selected.display_name
                            }),
                            m("span", { class: "icon is-normal is-right search-icon" }, m("i", { class: "fa fa-search" })),
                            tw.geocoder.render()
                        ]
                    )
                )
            ];
            if(tw.geocoder.form){
                return m("form", { 
                    role: "form"
                },input)
            } else {
                return input;
            }
            
        }
    }
})(tw, m);
