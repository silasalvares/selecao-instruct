import { InstructApp } from './instruct-app';
import { InstructAppRender } from './instruct-app-render';

document.addEventListener("DOMContentLoaded", function() {
    let app = new InstructApp();
    let appRender = new InstructAppRender(app);

    appRender.render();
});