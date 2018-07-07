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
        term: "",
        list: [],
        currentfocus: -1,
        setForm: function (value) {
            tw.geocoder.form = value;
        },
        setSize: function (value) {
            tw.geocoder.size = value;
        },
        search: function (value) {
            if (value.length > 4) {
                m.request({
                        method: "GET",
                        url: tw.config.geocoder.search,
                        data: {
                            key: tw.config.geocoder.key,
                            format: "json",
                            addressdetails: "1",
                            limit: 3,
                            q: value
                        }
                    })
                    .then(function (response) {
                        tw.geocoder.list = response;
                        //tw.geocoder.render(response, value);
                    })
            }
        },
        keydown: function (e) {
            e.redraw = false;
            if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                if (tw.geocoder.currentfocus !== tw.geocoder.list.length - 1) {
                    tw.geocoder.currentfocus++;
                }
            } else if (e.keyCode == 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                if (tw.geocoder.currentfocus !== -1) {
                    tw.geocoder.currentfocus--;
                }
            } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                //console.log(vnode);
                console.log(tw.geocoder);
                e.preventDefault();
                if (tw.geocoder.currentfocus > -1) {
                    tw.models.map.center = {
                        lat: tw.geocoder.list[tw.geocoder.currentfocus].lat,
                        lon: tw.geocoder.list[tw.geocoder.currentfocus].lon
                    }
                    m.route.set(
                        '/report/' +
                        tw.models.map.center.lat +
                        ',' +
                        tw.models.map.center.lon
                    );
                    tw.geocoder.list = [];
                    tw.geocoder.currentfocus = -1;
                    tw.models.reports.fetchOne()
                }
            }
        },
        view: function (vnode) {
            var input = [
                m("input", {
                    type: "hidden",
                    id: "current-location-lat"
                }),
                m("input", {
                    type: "hidden",
                    id: "current-location-lon"
                }),
                m("div", {
                        class: "field is-fullwidth"
                    },
                    m("p", {
                        id: "search-control",
                        class: "control is-expanded has-icons-right"
                    }, [
                        m("input", {
                            id: "city",
                            type: "text",
                            class: "input " + tw.geocoder.size + " search-input",
                            placeholder: "_('Bitte auswählen')",
                            onkeyup: m.withAttr("value", function (value) {
                                if (tw.geocoder.term !== value) {
                                    tw.geocoder.list = [];
                                    tw.geocoder.currentfocus = -1;
                                    tw.geocoder.term = value;
                                    tw.geocoder.search(value)
                                }

                            }),
                            onkeydown: function (e) {
                                tw.geocoder.keydown(e)
                            }
                        }),
                        m("span", {
                            class: "icon is-normal is-right search-icon"
                        }, m("i", {
                            class: "fa fa-search"
                        })),
                        m("div", {
                                class: "autocomplete-suggestions"
                            },
                            vnode.state.list.map(function (entry, idx) {
                                return m("div", {
                                        class: vnode.state.currentfocus === idx ? "autocomplete-suggestion autocomplete-selected" : "autocomplete-suggestion",
                                        onclick: m.withAttr("class", function () {
                                            tw.geocoder.list = [];
                                            tw.geocoder.currentfocus = -1;
                                            tw.models.map.center = {
                                                lat: this.lat,
                                                lon: this.lon
                                            }
                                            m.route.set(
                                                '/report/' +
                                                this.lat +
                                                ',' +
                                                this.lon
                                            );
                                            tw.models.reports.fetchOne()
                                        }, entry)
                                    },
                                    m.trust(highlightWords(entry.display_name, vnode.state.term)));
                            })
                        )
                    ])
                )
            ];
            if (tw.geocoder.form) {
                return m("form", {
                    role: "form"
                }, input)
            } else {
                return input;
            }

        }
    }

    function highlightWords(line, word) {
        //split word!
        var wordlist = word.split(" ");
        for (var i = 0; i < wordlist.length; i++) {
            if (wordlist[i].length > 0) {
                var regex = new RegExp('(' + wordlist[i] + ')', 'gi');
                line = line.replace(regex, "<b>$1</b>");
            }
        }
        return line;
    }


})(tw, m);