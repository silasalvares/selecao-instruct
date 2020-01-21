export class InstructAppRender {

    constructor(app) {
        this.app = app;
        this.userList = [];
        this.registerElements();
        this.registerSubmitEvent();
        this.registerResetEvent();
    }

    registerElements() {
        this.formFilter = document.getElementById('form-filter');
        this.resetFilterButton = document.getElementById('reset-filter-button');
        this.filterText = document.getElementById('filter-text');
        this.userListDiv = document.getElementById('user-list');
    }

    registerSubmitEvent() {
        let self = this;
        this.formFilter.addEventListener('submit', (event) => {

            event.preventDefault();

            let domain = this.filterText.value;
            if (domain != null && domain != "") {
                let filteredUsers = self.userList.filter((user) => {
                    let match = [...user.email.matchAll(/\w+\@\w+\.(\w+)/g)][0]
                    return (match && (match[1] == domain));
                });
                self.renderUserList(filteredUsers);
            }
        });
    }

    registerResetEvent() {
        let self = this;
        this.resetFilterButton.addEventListener('click', () => {
            self.renderUserList(self.userList);
            self.filterText.value = '';
        });
    }

    loadUserList() {
        return this.app.listUsers();
    }

    createCard(user) {
        let cardTemplate = `<h2 class="title">${user.name}</h2>
                            <span class="subtext"><i class="fa fa-at"></i> ${user.username}</span>
                            <dl class="card-data">
                            <dt><i class="fa fa-envelope"></i></dt>
                            <dd class=".email-data">${user.email}</dd>
                            <dt><i class="fa fa-phone"></i></dt>
                            <dd class=".phone-data">${user.phone}</dd>
                            <dt><i class="fa fa-laptop"></i></dt>
                            <dd class=".Website-data">${user.website}</dd>
                            <dt><i class="fa fa-building"></i></dt>
                            <dd class=".email-address">
                                ${user.address.street},
                                ${user.address.suite}
                            </dd>
                            </dl>`;
        let div = document.createElement('div');
        div.classList = 'card';
        div.insertAdjacentHTML('beforeend', cardTemplate);
        return div;
    }

    creteEmptyList() {
        let p = document.createElement('p');
        p.className = 'empty-list'
        p.innerHTML = 'Nenhum registro encontrado';
        return p;
    }

    renderUserList(users) {
        let self = this;
        self.userListDiv.innerHTML = '';
        if (users.length === 0) {
            self.userListDiv.appendChild(this.creteEmptyList());
        } else {
            users.forEach((user) => {
                self.userListDiv.appendChild(this.createCard(user));
            }); 
        }
    }

    async render() {
        if (this.userList.length === 0) {
            await this.loadUserList().then((users) => {
                this.userList = users;
                this.renderUserList(this.userList);
            });
        }
    }

}