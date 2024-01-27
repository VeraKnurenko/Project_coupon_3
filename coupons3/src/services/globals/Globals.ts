
class Globals {}

class DevelopmentGlobals extends Globals {
    public urls = {
        auth: "http://localhost:8080/auth/login",
        admin: "http://localhost:8080/admin/",
        companies: "http://localhost:8080/company/",
        customers: "http://localhost:8080/customer/",
    };
}

class ProductionGlobals extends Globals {
    public urls = {
        admin: "http://localhost:8080/admin/",
        companies: "http://localhost:8080/company/",
        customers: "http://localhost:8080/customer/",
        login: "http://localhost:8080/login/",
    };
}

const globals =
    process.env.NODE_ENV === "production"
        ? new ProductionGlobals()
        : new DevelopmentGlobals();

export default globals;