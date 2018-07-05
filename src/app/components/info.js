var tw = tw || {
    components: {}
};
/**
 * Render the "info" block for the main page
 */
(function (tw, m) {

    'use strict';
    if (!tw.components) {
        tw.components = {}
    };
    tw.components.info = {
        view: function () {
            return m("div", {
                    class: "container"
                },
                m("div", {
                    class: "content"
                }, [
                    m("p", "_('Geben Sie eine Adresse ein und finden Sie heraus, welche Wasserqualität Sie erwarten können. Für alle Stoffe und Organismen im Wasser vorhanden ist, versuchen wir zu zeigen, welche Auswirkungen sie auf die Sie haben und ob die gemessene Wasserqualität ist gut oder schlecht für Sie.')"),
                    m("h4", "_('Sicheres Trinkwasser und angemessene sanitäre Einrichtungen')"),
                    m("p", "_('Der Zugang zu sauberem Trinkwasser und angemessenen sanitären Einrichtungen ist eines der politischen Ziele der Vereinten Nationen. Aber was ist sauberes Trinkwasser? Wo sollten Sie suchen? Und Wasser kaufen Sie im Laden gesund? Wir versuchen, diese Fragen zu beantworten.')"),
                    m("p", "_('Durch das Sammeln von Informationen über die Wasserqualität , klar und vergleichen zu können, versuchen wir ein besseres Verständnis zu bekommen')"),
                    m("h4", "_('Wollen Sie helfen Wasserqualität Informationen zu verbessern?')"),
                    m("p", "_('Diese Website ist nur ein Teil unseres Projektes. Wir können immer Hilfe verwenden, um Daten zu sammeln und haben eine offene Hardware-Projekt gestartet, das bald Sie Ihr eigenes Wasser messen kann. Es ist wichtig, eine Menge Daten zu sammeln. Dies würde dazu beitragen, das Wissen über Wasser zu erhöhen überhaupt .')")
                ])
            );
        }
    }
})(tw, m);