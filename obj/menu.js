"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var namespace = "http://www.w3.org/2000/svg";
var CodeNodesMenu = (function () {
    function CodeNodesMenu(main) {
        var self = this;
        var addMode = null;
        this.main = main;
        this.g = document.createElementNS(namespace, "g");
        this.g.classList.add("menu-g");
        var selectedValue = null;
        var popup = document.createElement("div");
        popup.classList.add("codenodes-menu-popup");
        this.popup = popup;
        var popupLayer = document.createElement("div");
        popupLayer.classList.add("layer");
        var popupContent = document.createElement("div");
        popupContent.classList.add("content");
        var popupWraper = document.createElement("div");
        popupWraper.classList.add("wraper");
        var popupTitle = document.createElement("div");
        popupTitle.classList.add("title");
        var entitySelector = document.createElement("div");
        entitySelector.classList.add("select");
        var entitySelectorWrap = document.createElement("div");
        entitySelectorWrap.classList.add("entity-selector");
        var entityName = document.createElement("input");
        entityName.type = "text";
        var entityNameWrap = document.createElement("div");
        entityNameWrap.classList.add("entity-name");
        var popupOK = document.createElement("div");
        popupOK.classList.add("ok");
        popup.appendChild(popupLayer);
        popup.appendChild(popupWraper);
        popupWraper.appendChild(popupContent);
        entityNameWrap.appendChild(entityName);
        popupContent.appendChild(entityNameWrap);
        entitySelectorWrap.appendChild(entitySelector);
        popupContent.appendChild(entitySelectorWrap);
        popupContent.appendChild(popupOK);
        document.body.appendChild(popup);
        popupOK.addEventListener("click", function () {
            self.close();
            switch (addMode) {
                case "node":
                    main.addNode(entityName.value, selectedValue);
                    break;
                case "collection":
                    main.addCollection(entityName.value, selectedValue);
                    break;
            }
        });
        function fillEntitySelector() {
            entitySelector.innerHTML = "";
            self.main.types.forEach(function (t) {
                var opt = document.createElement("div");
                opt.classList.add("option");
                var name = document.createElement("div");
                var desc = document.createElement("div");
                name.classList.add("name");
                desc.classList.add("desc");
                name.textContent = t.name;
                desc.textContent = t.description;
                opt.appendChild(name);
                opt.appendChild(desc);
                opt.addEventListener("click", function () {
                    [].forEach.call(entitySelector.querySelectorAll(".option"), function (o) {
                        o.classList.remove("selected");
                    });
                    opt.classList.add("selected");
                    selectedValue = t.id;
                });
                entitySelector.appendChild(opt);
            });
        }
        var _loop_1 = function (i) {
            var rect = document.createElementNS(namespace, "rect"), t = document.createElementNS(namespace, "text");
            rect.classList.add("menu-rect");
            t.classList.add("menu-t");
            rect.setAttribute("x", (5).toString());
            rect.setAttribute("y", (35 * i).toString());
            t.setAttribute("x", (10).toString());
            t.setAttribute("y", ((35 * i) + 19).toString());
            self.g.appendChild(rect);
            self.g.appendChild(t);
            switch (i) {
                case 0:
                    t.textContent = "Add node";
                    rect.addEventListener("click", function (evt) {
                        popupTitle.textContent = t.textContent;
                        entityName.value = "New node";
                        entityName.focus();
                        fillEntitySelector();
                        addMode = "node";
                        popup.classList.add("visible");
                        evt.stopPropagation();
                    });
                    break;
                case 1:
                    t.textContent = "Add collection";
                    rect.addEventListener("click", function (evt) {
                        popupTitle.textContent = t.textContent;
                        entityName.value = "New collection";
                        entityName.focus();
                        fillEntitySelector();
                        addMode = "collection";
                        popup.classList.add("visible");
                        evt.stopPropagation();
                    });
                    break;
                case 2:
                    t.textContent = "Center";
                    rect.addEventListener("click", function (evt) {
                        main.center();
                        self.close();
                        evt.stopPropagation();
                    });
                    break;
                case 3:
                    t.textContent = "Reset";
                    rect.addEventListener("click", function (evt) {
                        main.clear();
                        self.close();
                        evt.stopPropagation();
                    });
                    break;
            }
        };
        for (var i = 0; i < 4; i++) {
            _loop_1(i);
        }
    }
    CodeNodesMenu.prototype.open = function (x, y) {
        this.g.classList.add("visible");
        this.g.setAttribute("transform", "translate(" + x.toString() + "," + y.toString() + ")");
        this.g.classList.add("visible");
    };
    CodeNodesMenu.prototype.close = function () {
        this.popup.classList.remove("visible");
        this.g.classList.remove("visible");
    };
    return CodeNodesMenu;
}());
exports.CodeNodesMenu = CodeNodesMenu;

//# sourceMappingURL=menu.js.map
