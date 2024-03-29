export class Router {
    _config;
    _routes;
    _errorPage;
    _defaultPage;
    _routerOutlet;

    /*
    * @constructor
    * @param {object} config
    * @param {array} routes
    * @param {object} errorPage
    * @param {object} defaultPage
    * @param {string} routerOutlet
    * */
    constructor(config, routes, errorPage, defaultPage, routerOutlet) {
        if (config instanceof Object) {
            this._config = config;
        } else throw new TypeError("Config' is not an object.");

        if (routes instanceof Array) {
            this._routes = routes;
        } else throw new TypeError("Routes is not an array.");

        if (errorPage instanceof Object) {
            this._errorPage = errorPage;
        } else throw new TypeError("Error page is not an Object.");

        if (defaultPage instanceof Object) {
            this._defaultPage = defaultPage;
        } else throw new TypeError("Default page is not an Object.")

        if (typeof routerOutlet === "string") {
            this._routerOutlet = routerOutlet;
        } else throw new TypeError("routerOutlet is not a string.");
    }

    hashRouterRunner() {
        window.addEventListener("DOMContentLoaded", (Event) => {
            const routerOutlet = document.getElementById(`${this._routerOutlet}`);
            routerOutlet.innerHTML = this.hashViewRenderer();
        });

        window.addEventListener("hashchange", (Event) => {
            const routerOutlet = document.getElementById(`${this._routerOutlet}`);
            routerOutlet.innerHTML = this.hashViewRenderer();
        });
    }

    hashViewRenderer() {
        let viewToRender = this._errorPage.render();
        const currentHashUrl = this.hashUrlParser();
        const arrayLength = this._routes.length;
        let increment = 0;

        if (currentHashUrl === undefined) {
            return this._defaultPage.render();
        }

        while (increment < arrayLength) {
            const currentRoutesDefinition = this._routes[increment];
            if (String(currentRoutesDefinition.path) === String(currentHashUrl)) {
                viewToRender = currentRoutesDefinition.component.render();
                break;
            }

            if (increment === arrayLength - 1) {
                viewToRender = this._errorPage.render();
                break;
            }
            increment++;
        }

        return viewToRender;
    }

    hashUrlParser() {
        return window.location.hash.split("#")[1];
    }
}
