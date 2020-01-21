export class InstructApp {

    async listUsers(domain) {
        let users = []
        await fetch('http://jsonplaceholder.typicode.com/users')
            .then((resp) => resp.json())
            .then((json) => {
                users = json;
                if (domain != null && domain != '') {
                    users = users.filter((user) => {
                        let match = [...user.email.matchAll(/\w+\@\w+\.(\w+)/g)][0]
                        return (match && (match[1] == domain));
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });

        return users;
    }
}