import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Shared {

    loadAdminLteCss() {
        let body = <HTMLDivElement>document.body;
        let link = document.createElement('link');
        link.innerHTML = '';
        link.href = '/assets/dist/css/adminlte.min.css';
        link.rel = 'stylesheet';
        body.appendChild(link);
    }

    loadAvatarScript() {
        let body = <HTMLDivElement>document.body;
        let script = document.createElement('script');
        script.innerHTML = '';
        script.src = 'https://openui5.hana.ondemand.com/resources/sap-ui-core.js';
        script.id = 'sap-ui-bootstrap';
        script['data-sap-ui-theme'] = 'sap_bluecrystal'; 
        script['data-sap-ui-libs'] = 'sap.m'; 
        // script.async = true;
        // script.defer = true;
        body.appendChild(script);
    }

    loadReadMoreScript() {
        // let body = <HTMLDivElement>document.body;
        // let script = document.createElement('script');
        // script.innerHTML = '';
        // script.src = '/assets/jquery-read-more.min.js';
        // body.appendChild(script);
    }

    loadAdminlteScript() {
        let body = <HTMLDivElement>document.body;
        let script = document.createElement('script');
        script.innerHTML = '';
        script.src = '/assets/dist/js/adminlte.min.js';
        body.appendChild(script);

        // "src/assets/dist/css/adminlte.min.css",

    }

    loadCSVExportScript() {
        let body = <HTMLDivElement>document.body;
        let script = document.createElement('script');
        script.innerHTML = '';
        script.src = '/assets/plugins/CSVExport.js';
        body.appendChild(script);
    }

}