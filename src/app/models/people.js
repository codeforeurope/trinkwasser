var tw = tw || { models: {}};
/**
 * Simple model for the people involved in the project
 */
(function(tw, m) {
    'use strict';
    if(!tw.models) { tw.models =  {}};

    tw.models.people = {
        selected: {},
        list: [
            {name: "Vanessa Wormer", twitter: "remrow", department: "redaction"},
            {name: "Isabelle Müller", twitter: "isa_mue", department: "redaction"},
            {name: "Heiko Nicht", twitter: "HeikoNicht", department: "design"},
            {name: "Felix Ebert", twitter: "femeb", github: "felixebert", department: "development"},
            {name: "Ulrich Stech", twitter: "masterX244", department: "development"},
            {name: "Duncan Healy", github: "duncanhealy", department: "development"},
            {name: "Milo van der Linden", github: "milovanderlinden", twitter: "miblon", department: "development"},
            {name: "Alexander Walther", twitter: "alexplus_de", department: "general"},
            {name: "Tom Görner", department: "general"},
            {name: "Gerd Hoffman", department: "general"}
        ]
    }

})(tw,m);

